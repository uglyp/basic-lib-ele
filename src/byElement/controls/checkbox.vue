<template>
  <el-checkbox v-model="val" :true-label="1" :false-label="0" :disabled="disabled">{{ whether }}321534</el-checkbox>
</template>
<script>
import control from "../mixins/control";
import { Checkbox } from "element-ui";
export default {
  components: {
    elCheckbox: Checkbox
  },
  mixins: [control],
  created() {
    if (this.value === null || typeof this.value === "undefined") {
      this.val = false;
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
    whether() {
      if (this.config.whether) {
        return this.config.whether
        // if (!this.val || this.val == 0) {
        //   return "否";
        // } else {
        //   return "是";
        // }
      } else {
        return "";
      }
    }
  }
};
</script>
