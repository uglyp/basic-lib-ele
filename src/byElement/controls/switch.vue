<template>
  <el-switch
    size="mini"
    v-model="val"
    :disabled="disabled"
    :name="config.name"
    :validate-event="config.validate"
    @change="change"
  ></el-switch>
</template>
<script>
import { Switch } from "element-ui";
import control from "../mixins/control";
export default {
  mixins: [control],
  components: {
    elSwitch: Switch,
  },
  created() {
    if (this.value === null || typeof this.value === "undefined") {
      this.val = "";
    } else {
      this.val = this.value;
    }
  },
  methods: {
    change() {
      this.config && this.config.change && this.config.change();
    },
  },
  computed: {
    returnValue() {
      return !!this.val;
    },
    disabled() {
      return this.config.disabled;
    },
  },
};
</script>
