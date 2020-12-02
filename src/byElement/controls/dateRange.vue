<template>
  <el-date-picker
    v-model="val"
    :disabled="lastConfig.disabled"
    :placeholder="lastConfig.placeholder"
    :type="lastConfig.elType || 'datetimerange'"
    prefix-icon="el-icon-date"
    range-separator="至"
    :value-format="lastConfig.valueType"
    :start-placeholder="lastConfig.placeholder1"
    :end-placeholder="lastConfig.placeholder2"
    :default-time="['00:00:00', '00:00:00']"
    size="mini"
  ></el-date-picker>
</template>
<script>
/**
 * 日期选择器
 * value              {String| Number}      值
 * config             {Object}              配置对象
 * config.disabled    {Boolean}             是否禁用
 * config.placeholder {String}              非范围选择时的占位内容
 * config.timestamp   {Boolean}             是否为时间戳格式
 */
import control from "../mixins/control";
import { DatePicker } from "element-ui";
export default {
  components: {
    elDatePicker: DatePicker
  },
  mixins: [control],
  created() {
    if (this.value === null || typeof this.value === "undefined") {
      this.val = [];
    } else {
      this.val = this.value;
    }
  },
  computed: {
    returnValue() {
      return this.val;
    },
    lastConfig() {
      const config = this.config || {};
      return {
        elType: config.elType || "datetimerange",
        disabled: config.disabled || false,
        placeholder: config.placeholder || "选择日期",
        placeholder1: config.rangePlaceholder[0] || "请选择开始日期",
        placeholder2: config.rangePlaceholder[1] || "请选择结束日期",
        valueType: config.valueType || "yyyy-MM-dd HH:mm:ss"
      };
    }
  }
};
</script>
