let lan = "zh";
if (window.config) {
  lan = window.config.language || lan;
}
const lanMap = {
  zh: {
    urlErr: "[404] 请求地址不存在",
    sysErr: "系统异常, 请联系系统管理员",
    otherErr: "其他错误",
    daoErr: "dao对象错误",
    emptyErr: "网络连接异常"
  },
  en: {
    urlErr: "[404] not found",
    sysErr: "[500] Internal Server Error",
    otherErr: "Error ..",
    daoErr: "sys err by dao",
    emptyErr: "Network lost connection"
  }
};
let msg = lanMap[lan];
import axios from "axios";
const httpMap = {
  200(resolve, reject, reData, dao, params, config) {
    let { data } = reData;
    let server;
    if (data && data.code + "" === "200") {
      data.code = data.result ? "ok" : "err";
      if (dao.out) {
        data = dao.out(data, params);
      }
      if (data.navi) {
        let row = data.data;
        let navi = data.navi;
        data.data = {
          row,
          navi
        };
      }
      server = serverMap[data.code];
    } else if (data.code) {
      server = httpMap[data.code] || httpMap._;
    } else if (data) {
      if (typeof data === "string") {
        if (/无法找到该Mock API/.test(data)) {
          window.$$.msg.error(`接口[ ${dao.url || dao} ] mock 数据连接失败, 请检查Eolinker配置`);
        } else {
          window.$$.msg.error(data);
        }
      }
      reject(`返回数据格式错误 dao=${dao.url ? dao.url : dao}`);
      return;
    }
    server(resolve, reject, data, dao, params, config);
  },
  404(resolve, reject, reData) {
    if (reData && reData.response && reData.response.data) {
      window.$$.msg.error(msg.urlErr);
    } else {
      window.$$.msg.error(msg.urlErr);
    }
    reject();
  },
  302() {
    window.$$.msg.error(`[302] ??`);
  },
  401(resolve, reject, reData, dao) {
    $c.warn("[401]is invalid", dao);
    if (!window.config.login && reData.redirect) {
      window.location.href = reData.redirect;
    } else {
      if (window.$app) {
        if (reData.message) {
          $$.msg.error(reData.message);
        }
        window.$app.exit && window.$app.exit();
        window.$app.out && window.$app.out();
      } else {
        reject(new Error(401));
      }
    }
  },
  500(resolve, reject, reData) {
    if (reData.response.data.message) {
      window.$$.msg.error(reData.response.data.message);
    } else {
      window.$$.msg.error(msg.sysErr);
    }
    reject(msg.sysErr);
  },
  _(resolve, reject, reData, url) {
    if (reData && reData.response) {
      window.$$.msg.error(`[${reData.response.status}] ${reData.response.statusText}`);
    } else {
      window.$$.msg.error(msg.otherErr);
      $c.error(url);
    }
    reject(reData);
  }
};
const serverMap = {
  err(resolve, reject, reData, dao, params, config) {
    if (!config.silent) {
      window.$$.msg.error(`${reData.message || reData.msg}`);
    }
    reject(reData);
  },
  ok(resolve, reject, reData, dao, params, config) {
    let re;
    if (config.showMsg) {
      window.$$.msg.show(reData.message || reData.msg);
    }
    if (typeof reData.dataValue !== "undefined") {
      re = reData.dataValue;
    } else if (typeof reData.data !== "undefined") {
      re = reData.data;
    } else {
      re = {};
    }
    resolve(re);
  },
  302(resolve, reject, reData, dao, params, config) {
    // 错误
    if (!config.silent) {
      window.$$.msg.error(`${reData.message}`);
    }
    reject(reData);
  },
  _(resolve, reject, reData) {
    window.$$.msg.error(`未知错误: ${reData.message}`);
    reject(reData);
  }
};
const http = (method, dao, params, config = {}, jsonParams) => {
  let url;
  // 处理应用中的固定入参数
  if (window.$app && window.$app.fixParams) {
    let p = $app.fixParams();
    params = Object.assign(params || {}, p);
  }
  if (typeof dao === "string") {
    url = dao;
  } else if (typeof dao === "object") {
    url = dao.url;
    if (!url) {
      window.$$.msg.error(msg.daoErr, dao);
      return;
    }
  } else if (typeof dao === "undefined") {
    window.$$.msg.error("dao 对象不存在,请仔细确认");
    $c.error(params);
    return;
  }
  let api = config.apiPath || (window.config && window.config.apiPath) || "/api";
  let httpConfig = {
    method: method,
    url: api + "/" + url
  };
  if (params) {
    if (dao.in) {
      params = dao.in(params);
    }
    for (let key in params) {
      if (params[key] === null) {
        delete params[key];
      }
    }
  }
  // httpConfig.headers = {
  //   accept: 'application/json'
  // }
  if (method === "POST" && !config.isFormData) {
    httpConfig.data = params;
    if (!jsonParams) {
      httpConfig.headers = {
        "Content-Type": "application/x-www-form-urlencoded"
      };
      httpConfig.transformRequest = [
        data => {
          let ret = "";
          for (let it in data) {
            if (typeof data[it] === "object" && data[it].length) {
              for (let r of data[it]) {
                ret += encodeURIComponent(it) + "=" + encodeURIComponent(r) + "&";
              }
            } else {
              ret += encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
            }
          }
          return ret;
        }
      ];
    }
  } else if (method === "GET") {
    httpConfig.params = params;
  } else {
    httpConfig.data = params;
  }
  // 个别应用中是否展示全局loading
  const appLoading = lev => {
    if (config && window.$app && !config.noLoad && window.$app.setLoad) {
      $app.setLoad(lev);
    }
  };
  return new Promise((resolve, reject) => {
    appLoading(1);
    axios(httpConfig)
      .then(r => {
        appLoading();
        let httpFun = httpMap[r.status] || httpMap._;
        httpFun(resolve, reject, r, dao, params, config);
      })
      .catch(r => {
        appLoading();
        if (config.silent) {
          $c.warn("请求报错");
        } else if (r.response) {
          let httpFun = httpMap[r.response.status] || httpMap._;
          httpFun(resolve, reject, r, dao, params, config);
        } else if (r) {
          $$.err(r);
        } else {
          window.$$.msg.error(msg.emptyErr);
          $$.err(r);
        }
        reject(r);
      });
  });
};
const $ = {
  get: (url, params, config) => http("GET", url, params, config),
  file: (url, params) =>
    http("POST", url, params, {
      apiPath: "/file",
      isFormData: true
    }),
  post: (url, params, config) => http("POST", url, params, config),
  jsonPost: (url, params, config) => http("POST", url, params, config, true)
};
export default $;
