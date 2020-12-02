<template>
  <bg class="login-all">
    <div :class="['login-content', skin]">
      <div class="login-box" @keydown.enter="enter">
        <div class="login-txt">
          <h1>
            <span class="unit">
              <img v-if="logo" :src="logo" />
              <span v-if="unit" v-html="unit"></span>
            </span>
            <span v-if="title" class="title" v-text="title"></span>
          </h1>
          <h2 v-html="slogan"></h2>
        </div>
        <el-form
          class="login-dlg"
          :model="user"
          :disabled="load"
          ref="form"
          :rules="rules"
          v-if="!forgetPwd"
        >
          <el-form-item class="dlg-tit">
            <h3>用户登录</h3>
            <h4>USER LOGIN</h4>
          </el-form-item>
          <el-form-item prop="act" class="item">
            <el-input
              v-model="user.act"
              name="act"
              ref="act"
              @focus="focus"
              placeholder="请输入账号"
            >
              <i class="el-icon-user el-input__icon" slot="prefix"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="pwd" class="item">
            <el-input
              v-model="user.pwd"
              type="password"
              name="pwd"
              ref="pwd"
              @focus="focus"
              placeholder="请输入密码"
            >
              <i class="el-icon-lock el-input__icon" slot="prefix"></i>
            </el-input>
          </el-form-item>
          <el-form-item
            class="item"
            v-if="showAuthcode && skin && false"
            prop="authcode"
            style="margin-bottom:10px"
          >
            <div style="display:flex">
              <el-input
                v-model="user.authcode"
                name="authcode"
                ref="authcode"
                @focus="focus"
                placeholder="请输入验证码"
              >
                <i class="el-icon-key el-input__icon" slot="prefix"></i>
              </el-input>
              <div class="forget_mm" style="width:151px;margin-left:10px;">
                <img style="width:100%" :src="src" alt="" />
              </div>
            </div>
          </el-form-item>
          <el-form-item class="fgt">
            <el-checkbox v-model="save">记住密码</el-checkbox>
            <div class="forget_mm" @click="forgetPwdEvent">忘记密码</div>
          </el-form-item>
          <el-form-item>
            <el-button :loading="load" size="medium" type="primary" @click="login">{{
              load ? "正在登录" : "登录"
            }}</el-button>
          </el-form-item>
        </el-form>
        <el-form
          class="login-dlg"
          :model="changeCipher"
          :disabled="load"
          ref="changeCipherForm"
          :rules="changeCipherRules"
          v-if="forgetPwd"
        >
          <el-form-item class="dlg-tit">
            <h3>用户登录</h3>
            <h4>USER LOGIN</h4>
          </el-form-item>
          <el-form-item prop="act" class="item">
            <el-input
              v-model="changeCipher.act"
              name="act"
              ref="act"
              placeholder="请输入账号123465"
            >
              <i class="el-icon-user el-input__icon" slot="prefix"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="pwd" class="item">
            <el-input
              v-model="changeCipher.pwd"
              type="password"
              name="pwd"
              ref="pwd"
              placeholder="请输入密码"
            >
              <i class="el-icon-lock el-input__icon" slot="prefix"></i>
            </el-input>
          </el-form-item>
          <el-form-item class="item" prop="authcode" style="margin-bottom:10px">
            <div style="display:flex">
              <el-input
                v-model="changeCipher.authcode"
                name="authcode"
                ref="authcode"
                placeholder="请输入图形验证码"
              >
                <i class="el-icon-key el-input__icon" slot="prefix"></i>
              </el-input>
              <div class="forget_mm" style="width:151px;margin-left:10px;">
                <img style="width:100%" :src="src" alt="" />
              </div>
            </div>
          </el-form-item>

          <el-form-item prop="phoneCode" class="item">
            <el-input
              v-model="changeCipher.phoneCode"
              name="phoneCode"
              ref="phoneCode"
              placeholder="手机验证码"
            >
              <i class="el-icon-key el-input__icon" slot="prefix"></i>
            </el-input>
            <div>12312</div>
          </el-form-item>
          <el-form-item>
            <el-button :loading="load" size="medium" type="primary" @click="login">{{
              load ? "正在提交" : "提交"
            }}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </bg>
</template>
<script>
import { Form, FormItem, Input, Button, Checkbox } from "element-ui";
import bg from "./Bg";
import $ from "../../../http";
import CryptoJS from "../../../utils/crypto";
const key = "RESU";
const src = "/api/sso/auth/vrf/setimg";
export default {
  components: {
    bg,
    elForm: Form,
    elFormItem: FormItem,
    elInput: Input,
    elButton: Button,
    elCheckbox: Checkbox
  },
  created() {
    let userStr = window.sessionStorage.getItem(key);
    if (userStr) {
      this.user = JSON.parse(userStr);
      this.save = true;
    }
  },
  data() {
    const { app } = this.$store.getters;
    return {
      forgetPwd: false,
      src,
      unit: app.short || app.unit,
      logo: app.logo,
      title: app.title,
      slogan: app.slogan,
      skin: app.skin,
      isEncryption: app.isEncryption,
      load: false,
      save: false,
      user: {
        act: "",
        pwd: "",
        authcode: ""
      },
      changeCipher: {
        act: "",
        pwd: "",
        authcode: "",
        phoneCode: ""
      },
      changeCipherRules: {
        act: [{ required: true, message: "请输入账号", trigger: "blur" }],
        pwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
        authcode: [{ required: true, message: "请输入图形验证码", trigger: "blur" }],
        phoneCode: [{ required: true, message: "请输入手机验证码", trigger: "blur" }]
      },
      rules: {
        act: [{ required: true, message: "请输入账号", trigger: "blur" }],
        pwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
        authcode: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      }
    };
  },
  computed: {
    showAuthcode() {
      return this.$store.state.isShowAuthCode;
    }
  },
  methods: {
    forgetPwdEvent() {
      this.$nextTick(() => {
        this.forgetPwd = true;
      });
    },
    login() {
      this.$refs.form.validate().then(r => {
        if (r) {
          this.load = true;
          let data = {};
          if (this.skin) {
            Object.assign(data, {
              act: this.user.act,
              pwd: this.user.pwd,
              // authcode: this.user.authcode
            });
          } else if (this.isEncryption) {
            Object.assign(data, { act: this.user.act, pwd: CryptoJS.encrypt(this.user.pwd) });
          } else {
            Object.assign(data, { act: this.user.act, pwd: this.user.pwd });
          }
          // return;
          $.get("sso/auth/lg", data)
            .then(({ USER, POWER }) => {
              this.load = false;
              if (this.save) {
                window.localStorage.setItem(key, JSON.stringify(this.user));
              } else {
                window.localStorage.removeItem(key);
              }
              this.$emit("login", USER, POWER);
              this.$store.commit("setIsShowAuthCode", false);
            })
            .catch(() => {
              this.load = false;
              this.$store.commit("setIsShowAuthCode", true);
              $c.log("第一次失败");
            });
        }
      });
    },
    focus(e) {
      this.$refs[e.target.name].select();
    },
    enter(e) {
      switch (e.target.name) {
        case "act":
          this.$refs.pwd.focus();
          break;
        case "pwd":
          this.login();
          break;
      }
    }
  }
};
</script>
