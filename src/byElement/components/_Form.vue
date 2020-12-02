<template>
  <el-form
    :size="size || 'small'"
    :class="{ inline: inline }"
    :label-width="labelWidth || '100px'"
    :label-position="labelPosition"
    :rules="rules"
    @validate="valid"
    ref="form"
    :model="data"
    :disabled="disabled"
    :validate-on-rule-change="false"
  >
    <slot name="top-item"></slot>
    <template v-for="(c, key) in lastForm">
      <el-form-item
        class="con-item"
        :label="c.txt"
        :key="key"
        v-show="!c.hd"
        v-if="c && (c.txt || c.el || c.preTxt || c.preTxt || c.suffixTxt) && !c.hidden"
        :class="c.className || 'defaultClass'"
        :prop="key"
      >
        <span v-if="c.preTxt" class="pre" v-text="c.preTxt"></span>
        <com-control
          :readOnly="readOnly"
          :config="c"
          :reload="reload"
          :ref="key"
          :dataKey="key"
          :form="elform"
          :comForm="comForm"
          v-show="c && !c.hidden"
          @setDatas="setDatas"
          @valiItem="valiItem"
          @ready="ready"
          @change="(val, old, rowData) => change(val, old, rowData, c.change, key)"
        >
        </com-control>
        <span v-if="c.suffixTxt" :style="c.suffixTxtClass" class="pre" v-text="c.suffixTxt"></span>
      </el-form-item>
    </template>
    <el-form-item v-if="!noLastSlot" class="full last-item">
      <slot name="last-item"></slot>
    </el-form-item>
  </el-form>
</template>
<script>
import comControl from "./_Control";
import { Form, FormItem } from "element-ui";
export default {
  name: "comForm",
  data() {
    return {
      data: {},
      rules: {},
      elform: null,
      comForm: null,
      noSet: true
    };
  },
  components: {
    comControl,
    elForm: Form,
    elFormItem: FormItem
  },
  props: {
    disabled: Boolean,
    reload: Function,
    form: Object,
    size: String,
    readOnly: Boolean,
    inline: Boolean,
    noLastSlot: Boolean,
    labelWidth: String,
    labelPosition: {
      type: String,
      default: "top"
    }
  },
  computed: {
    lastForm() {
      return this.form;
    }
  },
  created() {
    this.fillModel();
    !this.readOnly && this.getRules();
  },
  mounted() {
    this.elform = this.$refs.form;
    this.comForm = this;
  },
  methods: {
    ready(val, key) {
      this.form[key].value = val;
      this.$emit("ready", val, key);
    },
    // 设置为禁用状态
    setDisabled(isDisabled = true) {
      this.disabled = isDisabled;
    },
    // 校验表单
    valid(curKey, check) {
      if (check) {
        for (let key in this.form) {
          if (
            this.form[key] &&
            this.form[key].config &&
            this.form[key].config.relys &&
            this.form[key].config.relys.includes(curKey)
          ) {
            this.$refs[key][0].setRely(curKey);
          }
        }
      }
    },
    // 生成数据模型(用于校验表单)
    fillModel() {
      let data = {};
      for (let key in this.form) {
        if (this.form[key] && (this.form[key].txt || this.form[key].el)) {
          data[key] = this.form[key].value;
          if (this.form[key].exclude) {
            this.form[this.form[key].exclude] = null;
          }
        } else {
          data[key] = null;
        }
      }
      this.data = data;
    },
    // 获取校验规则
    getRules() {
      let rules = {};
      for (let key in this.form) {
        if (this.form[key] && this.form[key].rule) {
          rules[key] = [];
          for (let rk in this.form[key].rule) {
            if (rk === "required") {
              if (this.form[key].rule[rk]) {
                rules[key].push({
                  required: true,
                  message: `${this.form[key].txt}不能为空`,
                  trigger: "change"
                });
              }
            } else {
              rules[key].push(this.form[key].rule[rk]);
            }
          }
        }
      }
      this.rules = null;
      this.$nextTick(() => {
        this.rules = rules;
      });
    },
    // 校验整个表单
    validate(callBack) {
      this.$refs.form.validate(v => {
        callBack(v);
      });
    },
    // 校验单独的组件
    valiItem(keys, callBack) {
      for (let key of keys) {
        this.$refs.form.validateField(key, callBack);
      }
    },
    // 清空表格
    clear(key) {
      if (key) {
        this.$control(key).clear();
      } else {
        for (let key in this.form) {
          this.$control(key).clear();
        }
      }
    },
    // 绑定数据 如果传key 则绑定单独某一项
    setDatas(data, key) {
      // this.noSet = false;
      if (!data) {
        $c.warn(`赋值对象为${data}`);
        this.clear();
        // this.noSet = true;
        return;
      }
      if (key) {
        this.$control(key).setValue(data);
      } else {
        // let other;
        for (let key in this.form) {
          if ([null, undefined].includes(data[key])) {
            data[key] = "";
          }
          this.$control(key).setValue(data[key]);
        }
      }
      this.$nextTick(() => {
        this.$refs.form && this.$refs.form.clearValidate();
      });
    },
    // 获取数据
    getDatas(key) {
      if (key) {
        return this.$control(key, true).getValue();
      } else {
        let data = {};
        for (let key in this.form) {
          data[key] = this.$control(key, true).getValue();
          if (
            this.form[key].hidden ||
            typeof data[key] === "undefined" ||
            data[key] === null ||
            key[0] === "_"
          ) {
            delete data[key];
          }
          if (this.form[key] && this.form[key].config && this.form[key].config.other) {
            let datas = this.$control(key, true).getValue();
            if (
              typeof this.form[key].config.other === "object" &&
              this.form[key].config.other.length
            ) {
              for (let k of this.form[key].config.other) {
                if (typeof this.form[k] !== "undefined") {
                  $c.error(`${k}的值${datas[k]}被覆盖`);
                }
                data[k] = datas[k];
              }
            } else {
              for (let k in this.form[key].config.other) {
                if (typeof this.form[k] !== "undefined") {
                  $c.error(`${k}的值${datas[k]}被覆盖`);
                }
                data[k] = datas[this.form[key].config.other[k]];
              }
            }
            // eslint-disable-next-line
          }
        }
        return data;
      }
    },
    //
    change(val, old, rowData, env, key) {
      // $c.log(2, val, val.val);
      this.data[key] = val.val ? "sad" : "";
      if (env && this.noSet) {
        env(val, old, rowData, this.reload);
      }
    },
    // 根据key 获取标签
    $control(key, getParent) {
      if (this.$refs[key] && this.$refs[key].length) {
        if (getParent) {
          return this.$refs[key][0];
        } else {
          return this.$refs[key][0].$children[0];
        }
      } else if (typeof this.form[key] !== "undefined") {
        // 无需绑定
        return {
          getValue: () => {
            return this.form[key];
          },
          setValue: val => {
            this.$set(this.form, key, val);
          },
          clear() {}
        };
      } else {
        // eslint-disable-next-line
        console.error(`组件[${key}]获取失败`);
        return { getValue() {}, setValue() {}, clear() {} };
      }
    },
    // 发布订阅 监听tem-list组件, 监听标签关闭事件
    closeSearchTag(key) {
      this.clear(key);
    }
  }
};
</script>
