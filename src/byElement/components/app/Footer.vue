<template>
  <el-footer height="4rem" v-if="app.footerTxt || txt" class="footer" v-text="`版权所有 © ${app.footerTxt || txt}`"></el-footer>
</template>
<script>
import { Footer } from "element-ui";
export default {
  components: {
    elFooter: Footer,
  },
  props: {
    txt: String,
  },
  computed: {
    app() {
      const { app } = this.$store.getters;
      return app;
    },
  },
};
</script>
<style lang="scss" scoped>
.el-footer.footer {
  color: #fff;
  background-color: #013567;
  font-size: 1.2rem;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  line-height: 1;
}
</style>