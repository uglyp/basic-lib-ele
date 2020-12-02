/* global require,module*/
const protocol = "http://"; // 协议
let setting = "mock"; // 当前使用环境
// const now = Date.now(); // 时间戳， 用于打包
// const host = 'fe.test.cn'
try {
  setting = require("./cur.config"); // 如果切换环境不要改上面的变量, 要新建这个文件然后改这里,  这样才不会影响到其他人
} catch (err) {
  // --
}
// 原 环境配置， 外部引入
// const server = require('qh-service')[setting];
// 环境配置
const apiServer = {
  mock: "qihoinfo.w.eolinker.com/#/home/ams/project/inside/api/list?groupID=-1&projectHashKey=SUWPave6950de7e106fe3806aa8351852f3b8ea5355e118&spaceKey=qihoinfo"
} [setting];
const config = {
  productionSourceMap: false,
  // filenameHashing: false, // 打包相关
  outputDir: "dist", // 打包相关
  assetsDir: "", // 打包相关
  devServer: {
    // host,
    // sockHost: host,
    disableHostCheck: true, //
    open: false, // 自动打开浏览器
    https: false, // 是否开启HTTPS
    hotOnly: true, // 是否开启热加载
    port: 9013, // 端口
    proxy: {
      "/api": {
        target: protocol + apiServer,
        changeOrigin: true,
        secure: true,
        pathRewrite: {
          "^/api": ""
        }
      },
      "/file": {
        target: protocol + "file.qnlm.ac",
        changeOrigin: true,
        secure: true,
        pathRewrite: {
          "^/file": ""
        }
      },
      "/plugin": {
        // target: protocol + 'fss.cse.com.cn/',//
        target: protocol + "file.qnlm.ac/plugin/", //
        changeOrigin: true,
        secure: true,
        pathRewrite: {
          "^/plugin": ""
        }
      }
    }
  }
};
module.exports = config;
