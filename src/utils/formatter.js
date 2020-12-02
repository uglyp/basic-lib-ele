/**
 * w : 可编辑
 * n : 整数
 * m : map
 * d : 日期
 * dt: 日期, 时间
 * b : bool
 * $ : 金额
 */
import noImg from "../assets/img/no-img.png";
import { Select, Option } from "element-ui";
const getTypes = format => {
  if (format) {
    return format.split("-");
  } else {
    return [null, null, null];
  }
};
// w-
const getControl = (e, format, type3) => {
  const h = e.page.$createElement;
  if (e.row && e.row.isEmpty) {
    return "";
  }
  let { disabled } = e.form || {};
  let { config } = e.conf;
  switch (format) {
    case "n":
      return h(
        "input",
        {
          class: "txtbox number",
          domProps: {
            value: e.val
          },
          attrs: {
            disabled
          },
          on: {
            input(ev) {
              let v = ev.target.value;
              if (isNaN(v * 1)) {
                ev.target.value = e.row[e.key] || "";
              } else {
                e.row[e.key] = v;
              }
              e.page.on && e.page.on.rowChange && e.page.on.rowChange(e.key, e.row, ev.target);
            },
            focus(ev) {
              ev.target.select();
            }
          }
        },
        ""
      );
    case "$":
      return h(
        "input",
        {
          class: "txtbox number",
          domProps: {
            value: e.val ? parseFloat(e.val).toFixed(type3 * 1 || 2) : ""
          },
          attrs: {
            disabled
          },
          on: {
            focus(ev) {
              ev.target.select();
            },
            blur(ev) {
              let v = ev.target.value;
              if (isNaN(v)) {
                ev.target.value = e.row[e.key] || "";
              } else {
                e.row[e.key] = v;
              }
              ev.target.value = parseFloat(ev.target.value).toFixed(1);
              e.page.on && e.page.on.rowChange && e.page.on.rowChange(e.key, e.row, ev.target);
            }
          }
        },
        ""
      );
    case "b":
      return h("input", {
        attrs: {
          type: "checkbox",
          checked: !!e.val,
          disabled
        },
        on: {
          change(ev) {
            e.page.$set(e.row, e.key, ev.target.checked ? 1 : 0);
            e.page.on && e.page.on.rowChange && e.page.on.rowChange(e.key, e.row);
          }
        }
      });
    case "con":
      return h(e.conf.el, {
        props: {
          config,
          value: e.row[e.key]
        },
        on: {
          change(val) {
            if (val !== (e.row[e.key] || "")) {
              e.page.$set(e.row, e.key, val);
            }
          }
        }
      });
    case "-link":
      return h(
        "a",
        {
          attr: {
            className: "link",
            href: "javascript:;"
          },
          class: {
            link: true,
            b: true
          },
          on: {
            click() {
              if (e.on) {
                if (e.on.click) {
                  e.on.click(e);
                }
              }
            }
          }
        },
        e.val
      );
    default:
      return h(
        "input",
        {
          class: "txtbox",
          domProps: {
            value: e.row[e.key]
          },
          attrs: {
            disabled
          },
          on: {
            input(ev) {
              e.page.$set(e.row, e.key, ev.target.value);
              e.page.on && e.page.on.rowChange && e.page.on.rowChange(e.key, e.row);
              e.on.edit();
            },
            focus(ev) {
              ev.target.select();
            }
          }
        },
        ""
      );
  }
};
// m-
const getMap = (e, format, type3) => {
  const h = e.page.$createElement;
  let types = ["", "success", "info", "warning", "danger"];
  let options;
  let map = e.page.cfg.maps[type3];
  if (!map) {
    return `maps[${type3}]丢失`;
  }
  switch (format) {
    case "w":
      options = [];
      for (let key in map) {
        options.push(
          h(Option, {
            props: {
              key: key,
              value: key,
              label: map[key].txt || map[key],
              disabled: map[key].disabled
            }
          })
        );
      }
      return h(
        Select,
        {
          class: "txtbox",
          props: {
            filterable: true,
            clearable: true,
            value: String(e.val || "")
          },
          on: {
            change(ev) {
              e.page.$set(e.row, e.key, ev);
              if (map[ev]) {
                let item = map[ev].other;
                if (item) {
                  for (let key in item) {
                    e.page.$set(e.row, key, item[key]);
                  }
                }
              }
              e.page.on && e.page.on.rowChange && e.page.on.rowChange(e.key, e.row);
            }
          }
        },
        options
      );
    case "t":
      if (map[e.val + ""]) {
        return h(
          "el-tag",
          {
            attrs: {
              size: "mini",
              effect: "dark",
              type: types[e.val]
            }
          },
          map[e.val + ""]
        );
      }
      return "";
    default:
      if (map) {
        if (map[e.val + ""]) {
          let item = map[e.val + ""].other;
          if (item) {
            for (let key in item) {
              e.page.$set(e.row, key, item[key]);
            }
          }
          return map[e.val + ""].txt || map[e.val + ""];
        } else {
          return "";
        }
      }
  }
};
// 空-
const getValue = (e, format, type3) => {
  if (!e.val && typeof e.val !== "number") {
    return "";
  } else {
    const h = e.page.$createElement;
    let config = e.conf.config || {};
    switch (format) {
      case "find":
        if (!e.searchList[e.key] || e.val.indexOf(e.searchList[e.key]) < 0) {
          return e.val;
        }
        return h("span", {}, [
          e.val.substring(0, e.val.indexOf(e.searchList[e.key])),
          h(
            "span",
            {
              class: {
                red: true
              }
            },
            e.searchList[e.key]
          ),
          e.val.substring(e.val.indexOf(e.searchList[e.key]) + e.searchList[e.key].length)
        ]);
      case "$":
        return parseFloat(e.val).toFixed(type3 * 1 || 2);
      case "n":
        return parseInt(e.val);
      case "d":
        return dateFormat(e.val);
      case "dt":
        return dateFormat(e.val, "yyyy-MM-dd hh:mm");
      case "open":
        return h(
          "a",
          {
            attr: {
              className: "link",
              href: "javascript:;"
            },
            style: "color:#37B0FF;cursor:pointer",
            on: {
              click() {
                e.conf.cliks(e.row);
              }
            }
          },
          e.val
        );
      case "link":
        return h(
          "a",
          {
            attr: {
              className: "link",
              href: "javascript:;"
            },
            class: {
              link: true,
              b: true
            },
            on: {
              click() {
                if (e.on) {
                  if (e.on.click) {
                    e.on.click(e);
                  }
                }
              }
            }
          },
          e.val
        );
      case "img":
        return h(
          "img",
          {
            attrs: {
              class: "el-table-img",
              src: e.row[e.key]
            },
            style: {
              height: config.height || "",
              width: config.width || ""
            },
            on: {
              error(e) {
                e.target.className += " err-img";
                e.target.src = noImg;
              }
            }
          },
          ""
        );
      default:
        return e.val;
    }
  }
};
// 日期格式化
const dateFormat = (date, fmt = "yyyy-MM-dd") => {
  if (!date) {
    return date;
  } else {
    date = new Date(date);
  }
  let opt = {
    "y+": date.getFullYear().toString(), // 年
    "M+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "h+": date.getHours().toString(), // 时
    "m+": date.getMinutes().toString(), // 分
    "s+": date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  let ret;
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"));
    }
  }
  return fmt;
};
export default e => {
  if (!e.config.edit && e.format) {
    e.format = e.format.replace("w-", "-");
  }
  const formatList = getTypes(e.format);
  switch (formatList[0]) {
    case "w":
      return getControl(e, formatList[1], formatList[2]);
    case "m":
      return getMap(e, formatList[1], formatList[2]);
    default:
      return getValue(e, formatList[1], formatList[2]);
  }
};
