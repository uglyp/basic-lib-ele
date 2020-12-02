<template>
  <el-color-picker v-model="val" :disabled="disabled" color-format="rgb"></el-color-picker>
</template>
<script>
import { ColorPicker } from "element-ui";
import control from "../mixins/control";
export default {
  components: {
    elColorPicker: ColorPicker,
  },
  mixins: [control],
  computed: {
    returnValue() {
      return this.val;
    },
    disabled() {
      return this.config.disabled;
    },
  },
};
</script>
