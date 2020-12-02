<template>
  <div>
    <div class="composite_com" v-for="(item, index) in compositeData" :key="index">
      <el-checkbox v-model="item.FILE_VALUE" :true-label="1" :false-label="0" :disabled="disabled"></el-checkbox>
      <div class="composite_com_title">{{ item.FILE_TXT }}</div>
      <el-input class="composite_com_input" placeholder="请上传相关资料" disabled v-model="item.FILE_NAME" ref="input"></el-input>
      <upload @change="uploadChange" @uploadClick="uploadClick(index)" :config="{ disabled: disabledItem(item.FILE_VALUE) }" ref="upload"></upload>
      <el-button size="mini" style="margin-left:10px" type="primary" @click="delUrl(index)" v-if="item.FILE_URL && !disabled">删除</el-button>
      <el-button size="mini" style="margin-left:10px" type="primary" @click="downLoadUrl(index)" v-if="item.FILE_URL">下载</el-button>
    </div>
  </div>
</template>
<script>
import control from "../mixins/control";
import { Checkbox, Input, Button } from "element-ui";
import upload from "./uploadForCmposite";
const down = (url, name) => {
  let id = "down_" + Math.random();
  let $f = document.createElement("a");
  $f.id = id;
  $f.href = `${url}?rna=${name}&dl=1`;
  $f.target = "_blank";
  $f.style.display = "none";
  document.body.append($f);
  $f.click();
  $f.remove();
};
export default {
  components: {
    elCheckbox: Checkbox,
    elInput: Input,
    elButton: Button,
    upload
  },
  mixins: [control],
  watch: {
    val: {
      deep: true,
      handler(val, old) {
        if (typeof val !== "undefined" && val.length > 0 && typeof val !== "string") {
          let ise = val.some(res => {
            return res.FILE_VALUE === 1 && res.FILE_VALUE && res.FILE_TXT && res.FILE_URL && res.FILE_NAME && true;
          });
          if (ise) {
            this.$emit("update:value", val);
            this.$emit("change", val, old, this.rowData);
          } else {
            this.$emit("update:value", "");
            this.$emit("change", "");
          }
        }
      }
    },
    compositeData: {
      deep: true,
      handler(val) {
        this.val = val;
      }
    }
  },
  methods: {
    //处理传给后台的数据  和  后台返回的数据
    makeOutData(val) {
      let newArr = [];
      val.map(i => {
        if (i.FILE_VALUE === 1) {
          newArr.push(i);
        }
      });
      return newArr;
    },
    makeInData(val) {
      let newData = this.compositeData;
      newData.map((v, i) => {
        val.forEach((vv, ii) => {
          if (v.FILE_TXT == vv.FILE_TXT) {
            v.FILE_VALUE = vv.FILE_VALUE;
            v.FILE_URL = vv.FILE_URL;
            v.FILE_NAME = vv.FILE_NAME;
          }
        });
      });
      return newData;
    },
    //获取控件值
    getValue() {
      let value = this.makeOutData(this.compositeData);
      if (value === null || typeof value === "undefined") {
        // value = [];
      }
      return value;
    },
    // 绑定值
    setValue(val) {
      $c.log(val, "*-*-*");
      this.compositeData = this.makeInData(val);
    },
    disabledItem(i) {
      if (this.disabled) {
        return true;
      } else if (!this.disabled && i == 0) {
        return true;
      }
    },
    downLoadUrl(i) {
      down(this.compositeData[i].FILE_URL, this.compositeData[i].FILE_NAME);
    },
    uploadClick(i) {
      $c.log(i);
      this.uploadIndex = i;
    },
    delUrl(i) {
      this.compositeData[i].FILE_NAME = "";
      this.compositeData[i].FILE_URL = "";
    },
    uploadChange(r) {
      if (r && r.response && r.response.code == "200") {
        let { data } = r.response;
        if (data) {
          this.compositeData[this.uploadIndex].FILE_NAME = data.FILE_NAME;
          this.compositeData[this.uploadIndex].FILE_URL = data.FILE_URL;
        }
      }
      $c.log(this.compositeData);
    }
  },
  created() {
    if (this.value === null || typeof this.value === "undefined") {
      this.val = this.compositeData;
    } else {
      this.val = this.value || this.compositeData;
    }
  },
  data() {
    return {
      uploadIndex: 0,
      compositeData: [
        { FILE_VALUE: 0, FILE_TXT: "采购审批（请示）", FILE_URL: "", FILE_NAME: "" },
        { FILE_VALUE: 0, FILE_TXT: "采购流程记录表", FILE_URL: "", FILE_NAME: "" },
        { FILE_VALUE: 0, FILE_TXT: "委托代理协议", FILE_URL: "", FILE_NAME: "" },
        { FILE_VALUE: 0, FILE_TXT: "中标通知书", FILE_URL: "", FILE_NAME: "" },
        { FILE_VALUE: 0, FILE_TXT: "验收材料", FILE_URL: "", FILE_NAME: "" },
        { FILE_VALUE: 0, FILE_TXT: "全额发票", FILE_URL: "", FILE_NAME: "" }
      ]
    };
  },
  computed: {
    returnValue() {
      return this.val;
    },
    disabled() {
      return this.config.disabled || false;
    }
  }
};
</script>
<style lang="scss" scoped>
.composite_com_title {
  width: 120px;
  margin: 0 10px;
}
.composite_com_input {
  width: 300px;
  margin-right: 10px;
}
.composite_com {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  &:last-of-type {
    margin-bottom: 0px;
  }
}
::v-deep .el-button.is-disabled {
  border: 1px solid #e3e3e3 !important;
  background-color: #e3e3e3 !important;
  border-color: #e3e3e3 !important;
}
</style>
