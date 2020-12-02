<template>
  <bg class="err">
    <div class="msg">
      <h1>
        <img :src="logo" />
        <span class="unit" :style="size" v-html="unit"></span>
      </h1>
      <h2>系统维护中</h2>
      <p>给您造成不便 , 请谅解</p>
    </div>
  </bg>
</template>
<script>
import { Button } from "element-ui";
import bg from "./Bg";
export default {
  components: {
    bg,
    elButton: Button,
  },
  computed: {
    size() {
      if (this.unit) {
        const len = this.unit.replace(/<.*?>/g, "").length;
        let size = 70 / len;
        if (size > 8) {
          size = 8;
        }
        let fontSize = `${size}rem`;
        return {
          fontSize,
        };
      } else {
        return {};
      }
    },
  },
  data() {
    const { app } = this.$store.getters;
    return {
      logo: app.logo,
      unit: app.short || app.unit,
    };
  },
};
</script>
<style  lang="scss">
.err {
  .msg {
    color: #fff;
    box-sizing: border-box;
    padding-top: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-position: center;
    background-size: cover;
    line-height: 1;
    user-select: none;
    h1 {
      font-size: 8rem;
      // font-weight: 400;
      margin-bottom: 5rem;
      display: flex;
      align-items: center;
      img {
        max-height: 8rem;
        margin-right: 2rem;
      }
      .unit {
        // color: #f00;
        display: block;
        position: relative;
        img {
          display: block;
          position: absolute;
          // float: left;
          max-width: 100%;
          padding-top: 0.5rem;
        }
      }
    }
    h2 {
      font-size: 8.8rem;
      font-weight: 400;
      font-family: "SimSun";
      margin-bottom: 3rem;
    }
    p {
      font-size: 3.6rem;
    }
  }
}
</style>