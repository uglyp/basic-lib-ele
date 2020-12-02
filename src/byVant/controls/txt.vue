<template>
  <span class="qh-txt" v-html="showTxt"></span>
</template>
<script>
export default {
  name: "conTxt",
  data() {
    return {
      formValue: "",
    };
  },
  props: {
    c: Object,
    value: [String, Number],
  },
  computed: {
    showTxt() {
      return this.config.showVal || this.formValue;
    },
    config() {
      let config = this.c || {};
      return config;
    },
  },
  mounted() {
    this.formValue = this.c.value || this.value || "";
  },
  methods: {
    setValue(val) {
      this.formValue = val;
    },
  },
};
</script>
