<template>
  <el-tabs v-model="val" type="card" @tab-click="handleClick">
    <el-tab-pane
      v-for="(item, index) in defaultData"
      :key="index"
      :label="item.label"
      :name="item.key"
    ></el-tab-pane>
  </el-tabs>
</template>
<script>
import control from "../mixins/control";
export default {
  mixins: [control],
  data() {
    return {
      defaultData: [
        { label: "TAB", key: "TAB" },
        { label: "TAB2", key: "TAB2" }
      ]
    };
  },
  created() {
    if (this.value === null || typeof this.value === "undefined") {
      this.val = "";
    } else {
      this.val = this.value;
    }
    if (this.config && this.config.source) {
      this.defaultData = this.config.source;
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
    handleClick() {
      this.$emit("search");
    }
  }
};
</script>
<style lang="scss">
.el-tabs--card {
  .el-tabs__header {
    border-bottom: none !important;
  }
}
.el-tabs__item.is-top {
  width: 94px;
  padding-right: 0px !important;
  padding-left: 0px !important;
  text-align: center;
  border-right: -1px #e9e9e9 solid;
}
.el-tabs.el-tabs--top {
  background: #ffffff;
}
.el-tabs__header.is-top {
  margin-bottom: 0px;
}
.el-tabs__item.is-top.is-active {
  border-bottom: 2px solid #1890ff !important;
}
</style>
