<template>
  <van-form v-if="f" ref="form" class="qh-form">
    <slot name="top"></slot>
    <template v-for="(t, key) in f">
      <template v-if="t.el">
        <van-field
          :name="key"
          :label="t.txt"
          :key="key"
          :class="t.className"
          :disabled="t.disabled"
          :value="data[key] + ''"
          :rules="t.rule"
          autosize
        >
          <template #input>
            <component
              :is="t.el || conInput"
              :c="t.config"
              :item="t"
              :k="key"
              v-model="data[key]"
              :ref="key"
              :readonly="readonly"
              @change="e => inputChange(e, t)"
            ></component>
          </template>
        </van-field>
      </template>
      <div v-else-if="t === 'cut'" :key="key" class="cut"></div>
      <template v-else>
        <van-field
          :name="key"
          :label="t.txt"
          :key="key"
          v-model="data[key]"
          placeholder="请输入"
          :ref="key"
          :type="t.config.type"
          :class="t.className"
          :disabled="t.disabled"
          :rules="t.rule"
        ></van-field>
      </template>
    </template>
    <div class="van-cell van-field other">
      <slot></slot>
    </div>
  </van-form>
</template>
<script>
import conInput from "../controls/input";
import control from "./controls";
import { conTxt } from "../../../vant/";
export default {
  props: {
    form: Object,
    readonly: Boolean
  },
  components: {
    conInput,
    control
  },
  data() {
    return {
      conInput,
      data: {},
      rules: {}
    };
  },
  computed: {
    f: {
      get() {
        // $c.log(232);
        let f = {};
        for (let key in this.form) {
          if (typeof this.form[key] === "object") {
            if (!this.form[key].config) {
              this.form[key].config = {};
            }
            if (this.readonly) {
              this.form[key].el = this.form[key].el || conTxt;
            }
            if (this.form[key].value) {
              this.data[key] = this.form[key].value;
            }
          }
          f[key] = this.form[key];
        }
        return f;
      },
      set(form) {
        this.form = form;
      }
    }
  },
  methods: {
    inputChange(val, t) {
      const $form = this;
      const form = this.form;
      t.change &&
        t.change({
          val,
          form,
          $form
        });
    },
    getRef(key) {
      let refs = this.$refs[key];
      if (refs[0]) {
        return refs[0];
      } else {
        return refs;
      }
    },
    setDatas(data, key) {
      if (key) {
        this.getRef(key).formValue = data[key];
      } else {
        this.data = data;
        let tmp;
        for (let key in data) {
          tmp = this.getRef(key);
          if (typeof tmp.formValue !== "undefined") {
            tmp.formValue = data[key];
          }
        }
      }
    },
    getDatas() {
      // this.$refs.form.validate().then(v => {
      //   $c.log(v);
      // });
      let data = {};
      for (let key in this.form) {
        if (typeof this.form[key] === "object") {
          if (
            this.$refs[key][0] &&
            !["undefined", "null"].includes(typeof this.$refs[key][0].formValue)
          ) {
            data[key] = this.$refs[key][0].formValue;
          } else {
            data[key] = "";
            $c.error(`${key}控件获取失败`);
          }
        } else if (!["undefined", "null"].includes(typeof data[key])) {
          data[key] = this.form[key];
        }
      }
      return data;
    },
    validate() {
      this.$refs.form.resetValidation();
      return this.$refs.form.validate();
    }
  }
};
</script>
