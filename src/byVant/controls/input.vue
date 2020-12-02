<template>
  <div class="qh-input">
    <van-field
      v-model="formValue"
      :placeholder="`请输入${c.txt}`"
      :autosize="config.autosize"
      :rows="config.rows"
      :type="config.type"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      formValue: ""
    };
  },
  props: {
    c: Object,
    name: String
  },
  computed: {
    config() {
      let config = this.c.config || {};
      return config;
    }
  },
  mounted() {
    this.formValue = this.c.value || this.formValue || "";
  },
  methods: {
    setValue(val) {
      this.formValue = val;
    }
  }
};
</script>
