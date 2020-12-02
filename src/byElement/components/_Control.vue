<template>
  <div class="control">
    <div
      class="rely"
      @click="clickRely"
      v-if="!checkRelys && config.config && config.config.relys"
    ></div>
    <component
      ref="el"
      :is="elTmp"
      :form="form"
      :value.sync="lastConfig.value"
      :config="lastConfig.config"
      :on="lastConfig.on"
      :readOnly="readOnly"
      :dataKey="dataKey"
      @change="change"
      @ready="ready"
    ></component>
    <el-checkbox
      v-if="config.exclude"
      v-model="excludeData"
      class="exclude"
      size="mini"
      true-label="off"
      false-label="on"
      >排除</el-checkbox
    >
  </div>
</template>
<script>
import { conInput, conTxt, conUploadImg, conUpload2, conCascader,conPassword } from "../../../element/";
export default {
  props: {
    config: [Object, String],
    form: Object,
    reload: Function,
    comForm: Object,
    dataKey: String,
    readOnly: Boolean
  },
  data() {
    return {
      conTxt,
      checkData: false,
      excludeData: "on",
      relyMap: {}
    };
  },
  computed: {
    elTmp() {
      if (this.readOnly && ![conUpload2, conUploadImg, conCascader,conPassword].includes(this.config.el)) {
        return this.conTxt;
      } else {
        return this.config.el || conInput;
      }
    },
    checkRelys() {
      for (let key in this.relyMap) {
        if (!this.relyMap[key]) {
          return false;
        }
      }
      return true;
    },
    lastConfig() {
      this.config = this.config || {};
      if (this.config.config) {
        this.$set(this.config.config, "disabled", this.config.config.disabled || false);
      }
      return {
        value: this.config.value,
        config: this.config.config || {},
        on: this.config.on || {}
      };
    }
  },
  created() {
    this.relyMapInit();
  },
  mounted() {
    if (typeof this.config.value !== "undefined") {
      this.setValue(this.config.value);
    }
  },
  methods: {
    // 子控件是否数据绑定完毕
    ready(val) {
      this.$emit("ready", val, this.dataKey);
    },
    // 设置依赖项是否通过验证
    setRely(key) {
      this.relyMap[key] = true;
    },
    // 初始化依赖项判断模型
    relyMapInit() {
      if (this.config.config && this.config.config.relys) {
        for (let key of this.config.config.relys) {
          this.$set(this.relyMap, key, false);
        }
      }
    },
    // 检查依赖项
    clickRely() {
      this.checkData = true;
      this.$emit("valiItem", this.config.config.relys, errTxt => {
        if (this.checkData) {
          this.checkData = !errTxt;
        }
      });
    },
    // 清除控件值
    clear() {
      this.$refs.el.clear();
    },
    // 获取控件值
    getValue() {
      let value = this.$refs.el.getValue();
      if (value === null || typeof value === "undefined") {
        value = "";
      }
      if (this.config.exclude) {
        this.$emit("setDatas", this.excludeData, this.config.exclude);
      }
      return value;
    },
    // 绑定值
    setValue(val) {
      this.$refs.el.setValue(val);
    },
    // 修改事件
    change(val, old, rowData) {
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
    }
  }
};
</script>
