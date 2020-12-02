<template>
  <div class="radiosx">
    <el-checkbox
      v-for="(i, index) in config.datas"
      :key="index"
      v-model="val"
      :true-label="index == 0 ? 1 : 0"
      :false-label="index != 0 ? 1 : 0"
      >{{ whether(index) }}</el-checkbox
    >
  </div>
</template>
<script>
import control from "../mixins/control";
export default {
  mixins: [control],
  created() {
    if (this.value === null || typeof this.value === "undefined") {
      this.val = 1;
    } else {
      this.val = this.value;
    }
  },
  computed: {
    returnValue() {
      if (this.val === false) {
        this.val == "";
      }
      return this.val;
    },
    disabled() {
      return this.config.disabled;
    },
    whether() {
      return function(index) {
        return index == 0 ? this.config.datas[0] : this.config.datas[1];
      };
    }
  }
};
</script>
<style>
.radiosx .el-checkbox__label {
  color: #666 !important;
}
.radiosx .el-checkbox__inner {
  background: #fff !important;
  border-color: #dcdfe6 !important;
}
.radiosx .el-checkbox__inner:after {
  border: 1px solid #37b0ff !important;
  border-left: 0 !important;
  border-top: 0 !important;
}
</style>
