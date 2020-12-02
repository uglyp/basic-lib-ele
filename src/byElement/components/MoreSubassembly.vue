<template>
  <div v-if="showMore">
    <div class="control1" v-for="(item, index) in useVal" :key="item.ID">
      <div v-if="stamp" class="stamp_more">{{ index + 1 }}</div>
      <component
        ref="el"
        :is="elTmp"
        :form="form"
        :value.sync="item.VALUE"
        :config="lastConfig.config"
        :on="lastConfig.on"
        :readOnly="readOnly"
        :dataKey="dataKey"
        @change="change"
        :placeholder="placeholder[index] || '请输入'"
      ></component>
      <div class="icon-box">
        <span class="more-icon" @click="deleteData(index)" v-if="useVal.length !== 1">
          <img src="../../assets/img/delet.png" alt="" />
        </span>
        <span class="more-icon" v-if="useVal.length - 1 === index" @click="add">
          <img src="../../assets/img/plus.png" alt="" />
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import {
  conInput,
  conTxt,
  conUploadImg,
  conUpload2,
  conCascader,
  conPassword
} from "../../../element/";
import control from "../mixins/control";
const RndNum = n => {
  var rnd = "";
  for (var i = 0; i < n; i++) {
    rnd += Math.floor(Math.random() * 100);
  }
  return rnd;
};
export default {
  props: {
    config: [Object, String, Array],
    form: Object,
    reload: Function,
    comForm: Object,
    dataKey: String,
    readOnly: Boolean
  },
  name: "moreAdd",
  mixins: [control],
  data() {
    return {
      conTxt,
      showMoreAdd: false,
      showMore: false,
      useVal: [
        {
          ID: RndNum(6),
          VALUE: ""
        }
      ]
    };
  },
  mounted() {
    if (this.value === null || typeof this.value === "undefined") {
      this.val = this.useVal;
    } else {
      this.val = this.value || this.useVal;
    }
    this.showMore = true;
  },
  watch: {
    val: {
      deep: true,
      handler(val, old) {
        if (val.length > 0 && typeof val !== "string") {
          let ise = val.some(res => {
            return res.VALUE && true;
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
    useVal: {
      deep: true,
      handler(val) {
        this.val = val;
      }
    }
  },
  computed: {
    // checkValue() {
    //   if (this.val.length > 0) {
    //     let ise = this.val.some(res => {
    //       return res.VALUE && true;
    //     });
    //     if (ise) {
    //       return this.val;
    //     } else {
    //       return "";
    //     }
    //   }
    // },
    returnValue() {
      return this.val;
    },
    stamp() {
      return this.config.stamp || false;
    },
    min() {
      return this.config.min || 1;
    },
    max() {
      return this.config.max;
    },
    elTmp() {
      if (
        this.readOnly &&
        ![conUpload2, conUploadImg, conCascader, conPassword].includes(this.config.addEl)
      ) {
        return this.conTxt;
      } else {
        return this.config.addEl.el || conInput;
      }
    },
    lastConfig() {
      this.config = this.config || {};
      if (this.config.addEl.config) {
        this.$set(this.config.addEl.config, "disabled", this.config.addEl.config.disabled || false);
      }
      return {
        config: this.config.addEl.config || {},
        on: this.config.addEl.on || {}
      };
    },
    placeholder() {
      return typeof this.config.addEl.placeholder !== "undefined" &&
        this.config.addEl.placeholder.length > 0
        ? this.config.addEl.placeholder
        : false;
    }
  },
  methods: {
    change(val, old, rowData) {
      this.$emit("update:value", val);
      const { form, config } = this;
      this.$emit("change", {
        val,
        old,
        rowData,
        config,
        $form: form,
        comForm: this.comForm,
        $el: this.$refs.el,
        reload: this.reload
      });
    },
    add() {
      if (this.useVal.length + 1 > this.max) {
        $$.msg.warn(`最多添加${this.max}项`);
        return;
      } else {
        this.useVal.push({
          ID: RndNum(6),
          VALUE: ""
        });
      }
    },
    // 删除
    deleteData(i) {
      if (this.useVal.length - 1 < this.min) {
        $$.msg.warn(`至少保留${this.min}项`);
        return;
      } else {
        // this.val.pop();
        this.useVal.splice(i, 1);
      }
    },
    //获取控件值
    getValue() {
      let value = this.useVal;
      if (value === null || typeof value === "undefined") {
        // value = [];
      }
      return value;
    },
    // 绑定值
    setValue(val) {
      this.useVal = val;
    }
  }
};
</script>
<style lang="scss" scoped>
.control1 {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.control1:last-of-type {
  margin-bottom: 0px;
}
.stamp_more {
  align-self: flex-start;
  margin-right: 10px;
}
.more-icon {
  width: 21px;
  height: 21px;
  display: block;
  margin-left: 5px;
  cursor: pointer;
}
.icon-box {
  display: flex;
  min-width: 55px;
}
</style>
