<template>
  <el-radio-group v-model="val" @change="onChange">
    <el-radio v-for="(item,index) in defaultData" :key="index" :label="item.key">{{item.label}}</el-radio>
  </el-radio-group>
</template>
<script>
import control from "../mixins/control";
export default {
  mixins: [control],
  data() {
    const self = this;
    return {
      defaultData: [
        {
          label: "昨日",
          key: "yesterday",
          onCheck() {
            self.setDate([self.getDate(-1), self.getDate(-1)]);
          }
        },
        {
          label: "今天",
          key: "today",
          onCheck() {
            self.setDate([self.getDate(0), self.getDate(0)]);
          }
        },
        {
          label: "上周",
          key: "lastWeek",
          onCheck() {
            self.setDate([self.getMonday("s", -1), self.getMonday("e", -1)]);
          }
        },
        {
          label: "本周",
          key: "thisWeek",
          onCheck() {
            self.setDate([self.getMonday("s"), self.getMonday("e")]);
          }
        },
        {
          label: "上月",
          key: "lastMonth",
          onCheck() {
            self.setDate([self.getMonth("s", -1), self.getMonth("e", -1)]);
          }
        },
        {
          label: "本月",
          key: "thisMonth",
          onCheck() {
            self.setDate([self.getMonth("s", 0), self.getMonth("e", 0)]);
          }
        },
        {
          label: "去年",
          key: "lastYear",
          onCheck() {
            self.setDate([self.getYear("s", -1), self.getYear("e", -1)]);
          }
        },
        {
          label: "本年",
          key: "thisYear",
          onCheck() {
            self.setDate([self.getYear("s", 0), self.getYear("e", 0)]);
          }
        }
      ],
      date: [],
      old: null
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
    // 设置隐藏数据
    this.setHide();
    this.dateControlChange();
  },
  mounted() {
    this.onChange(this.val);
  },
  computed: {
    returnValue() {
      return this.val;
    },
    disabled() {
      return this.config.disabled;
    },
    dateRangeValue() {
      return this.date;
    }
  },
  methods: {
    /**设置隐藏值 */
    setHide() {
      this.defaultData = this.defaultData.filter(r => {
        return (
          (this.config &&
            this.config.hide &&
            !this.config.hide.includes(r.label)) ||
          !this.config ||
          !this.config.hide
        );
      });
    },
    /**配置联动控件 */
    dateControlChange() {
      if (this.form && this.form.form && this.form.form.dateRange) {
        // 保留联动控件自身的change 事件
        const oldChange = this.form.form.dateRange.change;
        // 联动控件的change 事件重新赋值
        this.form.form.dateRange.change = e => {
          if (this.val === this.old && e.old.length) {
            this.val = null;
          } else {
            this.old = this.val;
          }
          oldChange && oldChange(e);
        };
      }
    },
    /**绑定控件值 */
    setDate(val) {
      if (this.config && this.config.on && this.config.on.change) {
        this.config.on.change(val);
      }
      if (!this.form) {
        return;
      }
      this.$nextTick(() => {
        let form;
        if (this.form.setDatas) {
          form = this.form;
        } else {
          form = this.form.$refs.form;
        }
        form.setDatas(val, "dateRange");
      });
    },
    /**修改 */
    onChange(date) {
      const curItem = this.defaultData.filter(r => {
        return r.key === date;
      })[0];
      if (curItem) {
        curItem.onCheck && curItem.onCheck(curItem);
      }
    },
    dateFromat(y, m, d) {
      return `${y}-${m}-${d} 00:00:00`;
    },
    /**设置天 */
    getDate(dates) {
      //  //dates为数字类型，0代表今日,-1代表昨日，1代表明日，返回yyyy-mm-dd格式字符串，dates不传默认代表今日。
      var dd = new Date();
      var n = dates || 0;
      dd.setDate(dd.getDate() + n);
      var y = dd.getFullYear();
      var m = dd.getMonth() + 1;
      var d = dd.getDate();
      m = m < 10 ? "0" + m : m;
      d = d < 10 ? "0" + d : d;
      return this.dateFromat(y, m, d);
    },
    /**设置周 */
    getMonday(type, dates) {
      // //type为字符串类型，有两种选择，"s"代表开始,"e"代表结束，dates为数字类型，不传或0代表本周，-1代表上周，1代表下周
      var now = new Date();
      var nowTime = now.getTime();
      var day = now.getDay();
      var longTime = 24 * 60 * 60 * 1000;
      var n = longTime * 7 * (dates || 0);
      let dd;
      if (type == "s") {
        dd = nowTime - (day - 1) * longTime + n;
      } else if (type == "e") {
        dd = nowTime + (7 - day) * longTime + n;
      }
      dd = new Date(dd);
      var y = dd.getFullYear();
      var m = dd.getMonth() + 1;
      var d = dd.getDate();
      m = m < 10 ? "0" + m : m;
      d = d < 10 ? "0" + d : d;
      return this.dateFromat(y, m, d);
    },
    /**设置月 */
    getMonth(type, months) {
      // //type为字符串类型，有两种选择，"s"代表开始,"e"代表结束，months为数字类型，不传或0代表本月，-1代表上月，1代表下月
      var d = new Date();
      var year = d.getFullYear();
      var month = d.getMonth() + 1;
      if (Math.abs(months) > 12) {
        months = months % 12;
      }
      if (months != 0) {
        if (month + months > 12) {
          year++;
          month = (month + months) % 12;
        } else if (month + months < 1) {
          year--;
          month = 12 + month + months;
        } else {
          month = month + months;
        }
      }
      month = month < 10 ? "0" + month : month;
      // var date = d.getDate();
      var firstday = year + "-" + month + "-" + "01";
      var lastday = "";
      if (
        month == "01" ||
        month == "03" ||
        month == "05" ||
        month == "07" ||
        month == "08" ||
        month == "10" ||
        month == "12"
      ) {
        lastday = year + "-" + month + "-" + 31;
      } else if (month == "02") {
        if (
          (year % 4 == 0 && year % 100 != 0) ||
          (year % 100 == 0 && year % 400 == 0)
        ) {
          lastday = year + "-" + month + "-" + 29;
        } else {
          lastday = year + "-" + month + "-" + 28;
        }
      } else {
        lastday = year + "-" + month + "-" + 30;
      }
      var day = "";
      if (type == "s") {
        day = firstday;
      } else {
        day = lastday;
      }
      return day + "  00:00:00";
    },
    /**设置年 */
    getYear(type, dates) {
      //type为字符串类型，有两种选择，"s"代表开始,"e"代表结束，dates为数字类型，不传或0代表今年，-1代表去年，1代表明年
      var dd = new Date();
      var n = dates || 0;
      var year = dd.getFullYear() + Number(n);
      let day;
      if (type == "s") {
        day = year + "-01-01 00:00:00";
      } else if (type == "e") {
        day = year + "-12-31 00:00:00";
      } else if (!type) {
        day = year + "-01-01 00:00:00/" + year + "-12-31 00:00:00";
      }
      return day;
    }
  }
};
</script>
