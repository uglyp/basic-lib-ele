<template>
  <el-input
    v-model="val"
    :disabled="disabled"
    :placeholder="config.placeholder || '请输入'"
    ref="input"
    @focus="focus"
    :type="config.type"
  ></el-input>
</template>
<script>
import control from "../../mixins/control";
import { Input } from "element-ui";
export default {
  mixins: [control],
  components: {
    elInput: Input
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
  watch: {
    val(v, old) {
      if (
        v &&
        typeof v !== "number" &&
        (isNaN((v + "") * 1) || v.indexOf(".") >= 0 || v.indexOf("0") === 0)
      ) {
        this.val = old;
      } else {
        this.$emit("update:value", v);
        this.$emit("change", v, old);
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
