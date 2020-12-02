<template>
  <el-date-picker
    v-model="val"
    :disabled="lastConfig.disabled"
    :placeholder="lastConfig.placeholder"
    :type="lastConfig.type || 'date'"
    :format="format"
    :value-format="valueFormat"
    prefix-icon="el-icon-date"
    :editable="lastConfig.editable"
    :clearable="lastConfig.clearable"
    :picker-options="{disabledDate}"
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
import { DatePicker } from "element-ui";
import control from "../mixins/control";
const map = {
  date: "yyyy-MM-dd",
  datetime: "yyyy-MM-dd HH:mm:ss",
  year: "yyyy",
  week: "yyyy 年 第 WW 周",
};
export default {
  components: {
    elDatePicker: DatePicker,
  },
  mixins: [control],
  created() {
    if (
      this.value === null ||
      (typeof this.value === "undefined" && !this.lastConfig.defaultTime)
    ) {
      this.val = "";
    } else if (this.lastConfig.defaultTime) {
      this.val = this.lastConfig.defaultTime;
    } else {
      this.val = this.value;
    }
  },
  computed: {
    format() {
      return map[this.lastConfig.type] || map.date;
    },
    valueFormat() {
      let s = JSON.parse(JSON.stringify(map));
      s.week = s.date;
      return s[this.lastConfig.type] || map.date;
    },
    returnValue() {
      return this.val;
    },
    lastConfig() {
      const config = this.config || {};
      return {
        max: config.max || null,
        type: config.type || "date",
        editable: config.editable !== false,
        clearable: config.clearable !== false,
        disabled: config.disabled || false,
        placeholder: config.placeholder || "选择日期",
        defaultTime: config.defaultTime,
      };
    },
  },
  methods: {
    disabledDate(d) {
      if (!this.lastConfig.max) {
        return false;
      } else {
        return d > new Date(this.lastConfig.max);
      }
    },
  },
};
</script>
