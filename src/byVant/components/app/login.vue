<template>
  <div class="login">
    <h1>
      <img :src="app.logo" />
      {{ app.short }}
    </h1>
    <h2 v-text="app.titled"></h2>
    <div class="user">
      <van-form @submit="login">
        <h3>用户登录</h3>
        <h4>USER LOGIN</h4>
        <van-field
          left-icon="manager"
          v-model="user.act"
          placeholder="请输入账号"
          label-align="center"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          left-icon="lock"
          v-model="user.pwd"
          type="password"
          placeholder="请输入密码"
          label-align="center"
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
    <p class="by">
      兴船报国创新超越
      <br />打造精品做强主业
    </p>
  </div>
</template>
<script>
export default {
  props: {
    user: Object
  },
  mounted() {
    $c.log(this.app, "app里的内容");
  },
  computed: {
    app() {
      return this.$store.getters.app;
    }
  },
  methods: {
    login() {
      this.$emit("login", this.user, this.ck);
    }
  }
};
</script>
