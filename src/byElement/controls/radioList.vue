<template>
  <el-radio-group v-model="val">
    <el-radio v-for="item in list" :key="item.key" :label="item.key">{{item.txt}}</el-radio>
  </el-radio-group>
</template>
<script>
import { RadioGroup, Radio } from "element-ui";
import control from "../mixins/control";
export default {
  name: "con-select",
  mixins: [control],
  components: {
    elRadioGroup: RadioGroup,
    elRadio: Radio,
  },
  data() {
    return {
      list: [],
      load: false,
      others: {},
      v: null,
    };
  },
  created() {
    if (typeof this.value === "undefined") {
      this.val = null;
    } else {
      this.val = this.value;
    }
    if (this.config.auto !== false) {
      this.byDao(this.config.daoData ? this.config.daoData : {}, true);
    }
  },
  computed: {
    returnValue() {
      return this.val;
    },
    disabled() {
      return (
        !this.config.map &&
        (!this.list || !this.list.length || this.config.disabled)
      );
    },
  },
  methods: {
    /**获取备选项列表 */
    async byDao(search, noEdit) {
      if (this.config.dao) {
        if (!this.config.needPars || (this.config.needPars && search)) {
          this.load = true;
          this.list = await this.config.dao(search);
          this.list = this.list || [];
          this.load = false;
        }
      } else if (this.config.map && !this.config.map.length) {
        for (let key in this.config.map) {
          this.list.push({
            key: key,
            txt: this.config.map[key],
            other: {
              key: key,
              txt: this.config.map[key],
            },
          });
        }
      } else {
        this.list = this.config.map || [];
      }
      // 处理默认选中
      if (this.val) {
        if (typeof this.val === "function") {
          this.viewValue = this.val(this.list || []);
          // this.rowData =
        }
        // 如果列表内不包含当前项, 清除当前值
        if (
          !noEdit &&
          this.val !== "" &&
          this.list &&
          this.list.filter((r) => {
            return r.key === this.val + "";
          }).length === 0
        ) {
          this.val = null;
        }
        this.$emit("ready", this.val);
      }
    },
    setValue(val) {
      this.val = val;
    },
  },
};
</script>
