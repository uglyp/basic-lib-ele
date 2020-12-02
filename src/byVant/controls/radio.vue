<template>
  <van-radio-group v-model="formValue">
    <van-radio v-for="(t, k) in list" :key="k" :name="k">{{ t }}</van-radio>
  </van-radio-group>
</template>
<script>
export default {
  name: "conRadio",
  props: {
    c: {
      type: Object,
      default(c) {
        return c || {};
      }
    }
  },
  data() {
    return { list: [], formValue: null };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      if (this.c.dao) {
        this.list = await this.c.dao({});
      } else if (this.c.map) {
        this.list = this.c.map;
      }
    }
  }
};
</script>
