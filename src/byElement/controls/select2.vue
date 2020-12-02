<template>
  <div>
    {{list}}
    <el-select
      v-model="viewValue"
      :disabled="false"
      :placeholder="placeholder"
      v-loading="load"
      :default-first-option="config.add"
      :allow-create="config.add"
      :filterable="config.add || config.filterable"
      :clearable="config.clearable"
      :multiple="config.multiple"
      :multiple-limit="config.multipleLimit"
      @focus="inFocus"
    >
      <el-option
        v-for="item in list"
        :key="item.key"
        :label="item.txt"
        :value="item.key"
        :disabled="item.disabled"
      ></el-option>
    </el-select>
  </div>
</template>
<script>
import { Select, Option } from "element-ui";
import control from "../mixins/control";
export default {
  name: "con-select",
  mixins: [control],
  components: {
    ElSelect: Select,
    ElOption: Option
  },
  data() {
    return {
      list: [],
      load: false,
      others: {},
      v: null,
      holder: "请选择"
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
    placeholder: {
      get() {
        // if (!this.list || !this.list.length) {
        //   return "暂无";
        // } else {
          return this.holder;
        // }
      },
      set(val) {
        this.holder = val;
      }
    },
    viewValue: {
      get() {
        if (typeof this.val === "undefined" || this.val === null) {
          return this.val;
        } else if (typeof this.val === "function") {
          return null;
        } else if (this.config.multiple) {
          let tmp;
          if (typeof this.val === "string") {
            tmp = this.val.split(",");
            tmp = tmp.filter(r => {
              return r !== "";
            });
          } else {
            tmp = this.val;
          }
          if (tmp.length) {
            this.holder = "";
          }
          return tmp;
        } else {
          return this.val + "";
        }
      },
      set(val) {
        this.holder = "请选择";
        if (this.list) {
          this.rowData = this.list.filter(r => {
            return r.key === val + "";
          })[0];
        }
        this.val = val;
      }
    },
    returnValue() {
      if (this.val !== null && this.list) {
        let curRow = this.rowData;
        if (curRow && curRow.other && this.config && this.config.other) {
          for (let key in this.config.other) {
            this.others[key] = curRow.other[this.config.other[key]];
          }
        }
      }
      if ([null, "", undefined].includes(this.val)) {
        return this.val;
      } else {
        return this.val + "";
      }
    },
    disabled() {
      // return !this.config.map && (!this.list || !this.list.length || this.config.disabled);
      return !this.list || !this.list.length || this.config.disabled; //map数据一样可以添加disabled
    }
  },
  methods: {
    inFocus(){
      const self = this
      self.load = true
      setTimeout(()=>{
      self.load = false
      self.list = [
        {key:'0',txt:'第一个'},
        {key:'1',txt:'第二个'},
        {key:'2',txt:'第三个'},
        {key:'3',txt:'第四个'},
        {key:'4',txt:'第五个'}
      ]
      },3000)
    },
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
              txt: this.config.map[key]
            }
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
          this.list.filter(r => {
            return r.key === this.val + "";
          }).length === 0
        ) {
          this.val = null;
        }
        this.$emit("ready", this.val);
      }
    },
    setValue(val) {
      if (val && this.config.multiple && typeof val === "string") {
        this.val = val.split(",");
      } else if(!this.list.length) {
        for(let i in val){
          $c.log(i)
          this.list.push({key:i,txt:val[i]})
          $c.log(this.list)
          //$c.log(this.list)
        }
        this.val = 4;
      }
    }
  }
};
</script>
