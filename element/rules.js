import { email, mobile } from "./regs";
const EMAIL = {
  validator: (rule, val, callback) => {
    if (!val) {
      callback(new Error(`请输入邮箱`));
    } else if (!email.test(val)) {
      callback(new Error("请输入正确格式的邮箱"));
    } else {
      callback();
    }
  },
  trigger: "blur"
};
const MOBILE = [
  {
    required: true,
    message: "请输入手机号码",
    trigger: "blur"
  },
  {
    validator: (rule, val, callback) => {
      if (!val) {
        callback(new Error(`请输入手机号码`));
      } else if (!mobile.test(val)) {
        callback(new Error("请输入正确格式的手机号码"));
      } else {
        callback();
      }
    },
    trigger: "blur"
  }
];
const PWD = [
  {
    required: true,
    message: "请输入密码",
    trigger: "blur"
  },
  {
    validator: (rule, val, callback) => {
      const msg = `1.密码不能包含空格. 
          2.密码不能低于10位,而且必须包含字
          母,数字,符号其中两种`;
      if (!val) {
        callback(new Error("Please enter your password"));
      } else if (val.length < 10) {
        callback(new Error(msg));
      } else if (val.indexOf(" ") > -1) {
        callback(new Error(msg));
      } else {
        let lv = 0;
        if (val.match(/[A-Za-z]/g)) {
          lv++;
        }
        if (val.match(/[\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F]/g)) {
          lv++;
        }
        if (val.match(/[0-9]/g)) {
          lv++;
        }
        if (lv < 2) {
          callback(new Error(msg));
        } else {
          callback();
        }
      }
    },
    trigger: "blur"
  }
];
const PWDS = [
  {
    required: true,
    message: "请确认密码",
    trigger: "blur"
  },
  {
    validator: (rule, val, callback) => {
      const msg = `1.密码不能包含空格. 
          2.密码不能低于10位,而且必须包含字
          母,数字,符号其中两种`;
      if (!val) {
        callback(new Error("Please enter your password"));
      } else if (val.length < 10) {
        callback(new Error(msg));
      } else if (val.indexOf(" ") > -1) {
        callback(new Error(msg));
      } else {
        let lv = 0;
        if (val.match(/[A-Za-z]/g)) {
          lv++;
        }
        if (val.match(/[\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F]/g)) {
          lv++;
        }
        if (val.match(/[0-9]/g)) {
          lv++;
        }
        if (lv < 2) {
          callback(new Error(msg));
        } else {
          callback();
        }
      }
    },
    trigger: "blur"
  }
];
const cpwdValidator = (rule, val, callback, pwd,fun) => {
  if (!val) {
    callback(new Error("请输入密码"));
    fun(false)
  } else if (val !== pwd) {
    callback(new Error(`两次输入的密码不一致！`));
    fun(false)
  } else {
    callback();
    fun(true)
  }
};
const pwdValidator = (rule, val, callback,testFun,acc) => {
  testFun(val, callback,acc)
};

export { EMAIL, PWD, PWDS, MOBILE, cpwdValidator,pwdValidator };
