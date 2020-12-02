<template>
  <div>
    <el-input
      v-model="val"
      :disabled="disabled"
      :placeholder="config.placeholder || '请输入'"
      ref="input"
      :rows="autosize"
      @focus="focus"
      :type="config.type"
    ></el-input>
  </div>
</template>
<script>
import { Input } from "element-ui";
import control from "../mixins/control";
export default {
  components: {
    elInput: Input
  },
  mixins: [control],
  created() {
    if (this.value === null || typeof this.value === "undefined") {
      this.val = "";
    } else {
      this.val = this.value;
    }
  },
  computed: {
    returnValue() {
      return this.val;
    },
    disabled() {
      return this.config.disabled;
    },
    autosize() {
      if (typeof this.config.rows != "undefined") {
        return this.config.rows;
      } else {
        return "2";
      }
    }
  },
  methods: {
    focus() {
      let input = this.$refs.input.$el.getElementsByTagName("INPUT");
      input[0] && input[0].select();
    }
  }
};
</script>
<style>
@-moz-document url-prefix() {
  .el-time-panel__content::before,
  .el-time-panel__content::after {
    top: 55% !important;
  }
}
</style>
