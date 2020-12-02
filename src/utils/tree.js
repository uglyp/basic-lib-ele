const listToMenu = (
  list,
  root,
  map = {
    id: "id",
    t: "t", // 文字的字段名
    i: "i", // 图标的字段名
    u: "u", // url的字段名, 不能重复
    p: "p" // 父级的字段名
  },
  hasDefault
) => {
  let tmpList = [];
  let tmp = {};
  for (let r of list) {
    tmp = {};
    for (let key in map) {
      tmp[key] = r[map[key]];
    }
    tmp.c = [];
    tmpList.push(tmp);
  }
  return menuFormat(tmpList, root, hasDefault);
};
const menuFormat = (list, root, hasDefault) => {
  let tmp = list.filter(r => {
    return r.p === root;
  });
  for (let r of tmp) {
    r.c = menuFormat(
      list.filter(r => {
        return r.p !== root;
      }),
      r.id,
      hasDefault
    );
    if (hasDefault && r.c.length) {
      r.c.unshift({
        id: Math.random(),
        t: typeof hasDefault === "string" ? hasDefault : r.t,
        u: r.u,
        i: r.i
      });
    }
  }
  return tmp;
};
export default {
  listToMenu
};
