<template>
  <el-cascader
    class="cascader-organ"
    v-model="valA"
    :class="{ disabled: disableds, disnone: disnones }"
    :options="options"
    v-loading="load"
    @change="onRankingTypeChange"
    :placeholder="holder"
    :disabled="disableds"
    @remove-tag="removes"
    :key="isResouceShow"
    :filterable="lastConfig.filterable"
    ref="refHandle"
    :clearable="lastConfig.clearable"
    :props="{
      multiple: lastConfig.multiple,
      emitPath: false,
      label: lastConfig.label,
      value: lastConfig.value,
      children: lastConfig.children,
      checkStrictly: lastConfig.checkStrictly
    }"
    :show-all-levels="lastConfig.allLevel"
  ></el-cascader>
</template>
<script>
import control from "../mixins/control";
import { Cascader } from "element-ui";
export default {
  name: "caseC",
  components: {
    ElCascader: Cascader
  },
  props: {
    placeholder: {
      type: String,
      default: "请选择"
    }
  },
  mixins: [control],
  watch: {
    val: {
      deep: true,
      handler(val, old) {
        if (val) {
          this.valSelect = true;
          this.$emit("update:value", val);
          this.$emit("change", val, old, this.rowData);
        } else {
          this.valSelect = true;
          this.$emit("update:value", "");
          this.$emit("change", "");
        }
      }
    },
    valA: {
      deep: true,
      handler(val) {
        this.val = val;
        // $c.log(12, val);
        if (this.config.max) {
          if (this.valA.length >= this.config.max) {
            this.dis(this.options);
          } else {
            this.ais(this.options);
          }
        }
      }
    }
  },
  created() {
    // $c.log(33, this, this.$vnode);
    this.getData();
    if (this.value === null || typeof this.value === "undefined") {
      this.val = "";
    } else {
      this.val = this.value;
    }
  },
  mounted() {},
  data() {
    return {
      load: false,
      options: null,
      isResouceShow: 0,
      valA: "",
      dy: true
    };
  },
  computed: {
    holder() {
      return this.placeholder;
    },
    valSelect: {
      get: function() {},
      set: function() {
        if (this.val != "" && this.options != null && this.dy) {
          //this.dis(this.options)
          if (typeof this.val == "object") {
            this.valA = new Array();
            this.foo(this.options);
            this.dy = false;
          } else if (typeof this.val == "string" || typeof this.val == "number") {
            this.valA = this.val;
          }
        }
      }
    },
    returnValue() {
      return this.val;
    },
    lastConfig() {
      const config = this.config || {};
      return {
        dao: config.dao,
        // map: config.map,
        option: config.option,
        multiple: typeof config.multiple === "undefined" ? true : !!config.multiple,
        allLevel: typeof config.allLevel === "undefined" ? false : !!config.allLevel,
        label: typeof config.label === "undefined" ? "NM" : config.label,
        value: typeof config.value === "undefined" ? "SN" : config.value,
        children: typeof config.children === "undefined" ? "ITEMS" : config.children,
        disabled: typeof config.disabled === "undefined" ? false : config.disabled,
        checkStrictly: typeof config.checkStrictly === "undefined" ? true : config.checkStrictly,
        clearable: typeof config.clearable === "undefined" ? false : config.clearable,
        filterable: typeof config.filterable === "undefined" ? false : config.filterable
      };
    },
    loading() {
      return !this.options;
    },
    disableds() {
      return this.readOnly == true || this.lastConfig.disabled == true ? true : false;
    },
    disnones() {
      return this.lastConfig.disabled == true ? true : false;
    }
  },
  methods: {
    dis(item) {
      for (let i of item) {
        if (i.isDis) {
          i.disabled = true;
        }
        this.valA.map(v => {
          if (v == i.SN) {
            i.disabled = false;
          }
        });
        if (i.ITEMS) {
          this.dis(i.ITEMS);
        }
      }
    },
    ais(item) {
      for (let i of item) {
        if (i.isDis) {
          i.disabled = false;
        }
        if (i.ITEMS) {
          this.ais(i.ITEMS);
        }
      }
    },
    removes(val, old, rowData) {
      // const self = this;
      const { form, config } = this;
      this.$emit("change", {
        val: this.valA.filter(id => val != id),
        old,
        rowData,
        config,
        $form: form,
        comForm: this.comForm,
        $el: this.$refs.el,
        reload: this.reload
      });
      this.valA = this.valA.filter(id => val != id);
      ++this.isResouceShow;
    },
    foo(das) {
      // $c.log(2, this.val);
      for (let i of das) {
        if (this.val && this.val.filter(val => val == i[this.lastConfig.value]).length != 0) {
          this.valA.push(this.val.filter(val => val == i[this.lastConfig.value])[0]);
        }
        if (i[this.lastConfig.children]) {
          this.foo(i[this.lastConfig.children]);
        }
      }
    },
    async getData() {
      this.load = true;
      if (this.lastConfig.dao) {
        await this.config.dao().then(vals => {
          this.options = vals;
          //   ;
        });
        this.valSelect = true;
        this.load = false;
      } else {
        // $c.log(this.lastConfig);
        this.options = this.lastConfig.option;
        this.load = false;
      }

      this.setOnlyOrg();
    },
    onRankingTypeChange(val) {
      // $c.log(3, val);
      // const self = this;
      this.$emit("update:value", val);
      // const { form, config } = this;
      // this.$emit("change", {
      //   val,
      //   old,
      //   rowData,
      //   config,
      //   $form: form,
      //   comForm: this.comForm,
      //   $el: this.$refs.el,
      //   reload: this.reload,
      // });
    },
    setValue(val) {
      $c.log(234, val);
      if (
        val &&
        typeof val === "object" &&
        val.length &&
        typeof val[0] === "object" &&
        val[0].length &&
        !val[0][1]
      ) {
        this.org = val[0][0];
        this.setOnlyOrg();
      } else {
        this.val = val;
      }
    },
    setOnlyOrg() {
      if (this.org && this.options) {
        const org = this.options.filter(r => {
          return r.value === this.org;
        })[0];
        if (org) {
          let list = [];
          for (let s of org.children) {
            list.push([org.value, s.value]);
          }
          this.val = list;
        }
      }
    }
  }
};
</script>
<style lang="scss">
.el-cascader__tags {
  .el-tag {
    margin: 4px 0 4px 6px !important;
    max-width: calc(100% - 6px) !important;
  }
}
.disabled {
  .el-input__inner {
    border: 0;
    background: initial !important;
    padding: 0;
    color: #555 !important;
  }
  .el-input__suffix {
    display: none;
  }
  .el-cascader__tags {
    word-break: break-all;
    display: block;
    right: 0;
    line-height: 32px;
    transform: initial;
    top: 0;
    > span {
      display: inline;
      color: #555;
      &:after {
        content: ",";
      }
      &:last-of-type {
        &:after {
          content: "";
        }
      }
    }
    .el-tag {
      margin: 0 !important;
      padding: 0 !important;
      white-space: inherit;
      background: initial !important;
      display: inline !important;
      .el-tag__close {
        display: none;
      }
    }
  }
}
</style>
