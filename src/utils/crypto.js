/**
 * 工具类
 * BDLMWZejmrtxz058
 */
import Vue from "vue";
import CryptoJS from "crypto-js";
export default {
  //ECB模式加密
  encrypt(word, keyStr) {
    keyStr = keyStr ? keyStr : "BDLMWZejmrtxz058";
    var key = CryptoJS.enc.Utf8.parse(keyStr); //Latin1 w8m31+Yy/Nw6thPsMpO5fg==
    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  },
  //解密
  decrypt(word, keyStr) {
    keyStr = keyStr ? keyStr : "BDLMWZejmrtxz058";
    var key = CryptoJS.enc.Utf8.parse(keyStr); //Latin1 w8m31+Yy/Nw6thPsMpO5fg==
    var decrypt = CryptoJS.AES.decrypt(word, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
  }
};

// export default {
//   //CBC模式加密
//   // 加密
//   encrypt(word, keyStr, ivStr) {
//     keyStr = keyStr ? keyStr : "BDLMWZejmrtxz058";
//     ivStr = ivStr ? ivStr : "BDLMWZejmrtxz058";
//     let key = CryptoJS.enc.Utf8.parse(keyStr);
//     let iv = CryptoJS.enc.Utf8.parse(ivStr);
//     let srcs = CryptoJS.enc.Utf8.parse(word);

//     let encrypted = CryptoJS.AES.encrypt(srcs, key, {
//       iv,
//       mode: CryptoJS.mode.CBC,
//       padding: CryptoJS.pad.ZeroPadding
//     });
//     return encrypted.toString();
//   },
//   // 解密
//   decrypt(word, keyStr, ivStr) {
//     keyStr = keyStr ? keyStr : "BDLMWZejmrtxz058";
//     ivStr = ivStr ? ivStr : "BDLMWZejmrtxz058";
//     var key = CryptoJS.enc.Utf8.parse(keyStr);
//     let iv = CryptoJS.enc.Utf8.parse(ivStr);

//     var decrypt = CryptoJS.AES.decrypt(word, key, {
//       iv,
//       mode: CryptoJS.mode.CBC,
//       padding: CryptoJS.pad.ZeroPadding
//     });
//     return decrypt.toString(CryptoJS.enc.Utf8);
//   }
// };
