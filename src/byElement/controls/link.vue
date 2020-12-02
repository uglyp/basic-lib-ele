<template>
  <div>
    <el-link type="primary" @click="clickEvent" :underline="false">{{ val }}</el-link>
  </div>
</template>
<script>
import { Link } from "element-ui";
import control from "../mixins/control";
export default {
  mixins: [control],
  components: {
    elLink: Link
  },
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
    }
  },
  methods: {
    clickEvent() {
      if (this.config.clickEvent) {
        this.config.clickEvent(this.val);
      }
    }
  }
};
</script>
