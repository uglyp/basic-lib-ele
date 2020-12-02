<template>
  <div class="login qnlm">
    <div>
    <h1>
      <img src="file/login/img/logo2.png" class="qnlm" />
      {{app.short}}
    </h1>
    <div class="unging-content">
                <p class="unging-content-chinese">青岛海洋科学与技术试点国家实验室</p>
                <div class="unging-content-english">
                    <img src="file/english.png">
                </div>
            </div>
    <h2 v-text="app.title" class="qnlm"></h2>
    <div class="user qnlm">
      <van-form @submit="login" class="qnlm" refs="form">
        <van-field
          left-icon="manager"
          v-model="user.act"
          placeholder="请输入账号"
          label-align="center"
          class="qnlmpt"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          left-icon="lock"
          v-model="user.pwd"
          type="password"
          placeholder="请输入密码"
          label-align="center"
          class="qnlmpt"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field class="ck">
          <template #input>
            <van-checkbox v-model="user.isSave" shape="square">记住密码</van-checkbox>
          </template>
        </van-field>
        <van-button class="btn" block type="info" native-type="submit">登录</van-button>
      </van-form>
    </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    user: Object,
  },
  computed: {
    app() {
      return this.$store.getters.app;
    },
  },
  mounted(){
    if(!this.user.isSave){
      this.user.act='';
      this.user.pwd = ''
    }
  },
  methods: {
    login() {
      this.$emit("login", this.user, this.ck);
    }
  },
};
</script>