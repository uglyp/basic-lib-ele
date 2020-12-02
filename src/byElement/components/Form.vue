<template>
  <el-form
    v-if="dataOver"
    :size="size || 'small'"
    :model="data"
    :rules="rules"
    :disabled="disabled"
    @submit.native.prevent
    ref="form"
    v-loading="load"
  >
    <template v-for="(t, key) in fm">
      <el-form-item
        v-if="typeof t === 'object' && (t.txt || t.el || t.hd) && !t.hidden"
        v-show="!t.hd"
        :key="key"
        :label-width="lw"
        :prop="key"
        :class="[t.className, { many: t.txt && t.txt.length > 10 }]"
        inline-message
      >
        <span slot="label" v-show="t.txt" v-text="t.txt"></span>
        <span v-if="t.before && !rdOnly" class="tip-before" :style="getTipAttr(t.before, 'style')" v-text="getTipAttr(t.before)"></span>
        <div class="right-parent">
          <div class="bottom-parent">
            <component
              :is="getEl(t)"
              :config="t.config || {}"
              :el="t.el"
              :ref="key"
              :dataKey="key"
              :value.sync="data[key]"
              :form="comForm"
              @change="(val, old, rowData) => change(val, old, rowData, t)"
            ></component>
            <span v-if="t.after && !rdOnly" class="tip-after" :style="getTipAttr(t.after, 'style')" v-text="getTipAttr(t.after)"></span>
          </div>
          <span v-if="t.right && !rdOnly" class="tip-right" :style="getTipAttr(t.right, 'style')" v-text="getTipAttr(t.right)"></span>
        </div>
      </el-form-item>
    </template>
    <el-form-item v-if="!noLastSlot" class="full last-item">
      <slot name="last-item"></slot>
    </el-form-item>
    <slot name="right"></slot>
  </el-form>
</template>
<script>
import { Form, FormItem } from "element-ui";
import conInput from "../controls/input";
import conTxt from "../controls/txt";
import compositeCom from "../controls/compositeCom";
import tableForForm from '../controls/tableForForm'
const setDef = form => {
  let data = {};
  for (let key in form) {
    if (typeof form[key] === "object") {
      data[key] = form[key].value || "";
    } else {
      data[key] = form[key];
    }
  }
  return data;
};
export default {
  components: {
    elForm: Form,
    elFormItem: FormItem
  },
  props: {
    size: String,
    form: Object,
    on: Object,
    labelWidth: String,
    readOnly: Boolean,
    disabled: Boolean,
    noLastSlot: Boolean
  },
  data() {
    let data = setDef(this.form);
    // $c.log(123, data);
    return {
      res: 0, // 如果form 不更新. 用这个变量强刷
      conInput,
      conTxt,
      load: false,
      data,
      comForm: this
    };
  },
  mounted() {
    this.ev.load && this.ev.load(this);
  },
  computed: {
    dataOver() {
      // $c.log(123, !!this.data, this.data);
      return !!this.data;
    },
    lw() {
      if (this.labelWidth) {
        return this.labelWidth;
      }
      let max = 0;
      if (this.form) {
        let len = 0;
        for (let k in this.form) {
          // $c.log(12, k, this.form[k]);
          if (!this.form[k].hidden && !this.form[k].hd && this.form[k].txt && k.indexOf("_") !== 0) {
            len = this.form[k].txt.length;
            if (this.form[k].rule && this.form[k].rule.required) {
              len += 0.5;
            }
            len += 1;
            if (len > max) {
              max = len;
            }
          }
        }
      }
      if (max) {
        return `${max}em`;
      }
    },
    fm() {
      this.res;
      return this.form;
    },
    ev() {
      return this.on || {};
    },
    rules() {
      const form = Object.assign({}, this.form);
      let rules = {};
      for (let k in form) {
        let item = form[k];
        if (typeof item === "object" && item.rule) {
          // $c.log(item.txt, item.rule.required);
          if (item.rule.required === true) {
            item.rule.required = {
              required: true,
              trigger: "change",
              message: `${item.txt || "当前内容"}不能为空`
            };
          }
          rules[k] = [];
          for (let rk in item.rule) {
            if (item.rule[rk]) {
              rules[k].push(item.rule[rk]);
            }
          }
          if (!rules[k]) {
            delete rules[k];
          }
        }
      }
      // $c.log(2, rules);
      return rules;
    },
    rdOnly() {
      return this.readOnly || this.readonly;
    }
  },
  methods: {
    getTipAttr(tip, attr = "txt") {
      if (typeof tip === "object") {
        return tip[attr];
      } else {
        if (attr === "txt") {
          return tip;
        }
      }
    },
    change(val, old, rowData, t) {
      const { form, data } = this;
      // $c.log(22)
      if (typeof val === "function") {
        val = "";
      }
      if (typeof old === "function") {
        old = "";
      }
      t.change &&
        t.change({
          val,
          old,
          rowData,
          t,
          form,
          data,
          $form: this
        });
      this.$nextTick(() => {
        this.res = Math.random();
      });
    },
    getEl(t) {
      t.el = t.el || conInput;
      // $c.log(22, this.rdOnly);
      if (this.rdOnly&&t.el!=compositeCom&&t.el!=tableForForm && !t.exclude) {
        // if (t.el.isView) {
        //   return t.el;
        // } else {
        // }
        return conTxt;
      } else {
        return t.el;
      }
    },
    submit(callback, success) {
      this.$refs.form
        .validate()
        .then(() => {
          this.load = true;
          let p = callback(this.getDatas());
          p.then(r => {
            this.load = false;
            $$.msg.show("保存成功");
            success(r);
          }).catch(() => {
            this.load = false;
          });
        })
        .catch(err => {
          if (err !== false) {
            $c.error(err);
          }
          this.load = false;
        });
    },
    valiDates(key, callback) {
      let $form = this.$refs.form;
      if (key) {
        if (typeof key === "string") {
          key = [key];
        }
        let count = key.length;
        let checked = 0;
        $form.validateField(key, (msg, v) => {
          if (!v) {
            checked++;
          }
          if (checked === count) {
            callback && callback();
          }
        });
      } else {
        $form
          .validate()
          .then(() => {
            callback && callback();
          })
          .catch(() => {
            // -
          });
      }
    },
    getDatas(key) {
      if (key) {
        return this.$con(key).getValue();
      } else {
        let data = {};
        for (let key in this.form) {
          data[key] = this.$con(key).getValue();
        }
        return data;
      }
    },
    setDatas(data, key) {
      if (key) {
        $c.log(data, "=====", key);
        data = data || "";
        this.$con(key).setValue(data);
      } else {
        data = data || {};
        this.data = data;
        for (let key in this.form) {
          if (data[key] !== null && typeof data[key] !== "undefined") {
            this.$con(key).setValue(data[key]);
          }
        }
      }
      this.$nextTick(() => {
        this.$refs.form && this.$refs.form.clearValidate();
        this.ev.setDatas && this.ev.setDatas(this.form);
      });
    },
    clear() {
      this.$refs.form.resetFields();
    },
    $con(key) {
      let $t = this.$refs[key];
      let $f = this.form[key];
      if ($t && $f) {
        if ($f.hidden) {
          return {
            setValue() {
              // -
            },
            getValue() {
              return null;
            }
          };
        } else if ($f.el || $f.txt || $f.hd) {
          return $t[0];
        } else {
          return {
            setValue() {
              // self.form[key] = val;
            },
            getValue() {
              // return self.form[key];
            }
          };
        }
      } else {
        return {
          setValue() {
            // self.form[key] = val;
          },
          getValue() {
            // return self.form[key];
          }
        };
      }
    }
  }
};
</script>
