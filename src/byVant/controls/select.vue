<template>
  <span :class="['dropdown', { 'is-disabled': disabled }]" @click="open">
    <span class="txt" v-text="name || placeholder"></span>
    <van-icon :name="disabled ? '' : 'arrow-down'" />
    <popup
      ref="p"
      :config="{ list, multiple: c.multiple, txt: item.txt, val: item.val }"
      @onConfirm="onConfirm"
    />
  </span>
</template>
<script>
import popup from "../components/selectPopup";
export default {
  components: { popup },
  name: "conSelect",
  props: {
    c: {
      type: Object,
      default(c) {
        return c || {};
      }
    },
    item: {
      type: Object,
      default(c) {
        return c || {};
      }
    }
  },
  data() {
    return {
      list: [],
      formValue: null,
      txt: null,
      showPicker: false,
      val: null,
      b: null
    };
  },
  created() {
    this.getList();
  },
  computed: {
    name() {
      if (this.item.config.multiple) {
        let t = this.txt || this.list[this.item.val];
        let v = this.val || this.item.val;
        if (typeof v === "object" && v && v.length) {
          $c.log(111);
          t = [];
          for (let val of v) {
            t.push(this.list[val]);
          }
          v = v.join();
        }

        if (v) {
          this.$emit("input", v);
          this.$emit("change", v);
        }
        return v;
      } else {
        let t = this.txt || this.list[this.item.val];
        let v = this.val || this.item.val;
        if (typeof v === "object" && v && v.length) {
          t = [];
          for (let val of v) {
            t.push(this.list[val]);
          }
          t = t.join();
        }
        if (v) {
          this.$emit("input", v);
          this.$emit("change", v);
        }
        return t;
      }
    },
    disabled() {
      return !!this.item.disabled;
    },
    placeholder() {
      if (this.item.disabled) {
        return "";
      }
      let txt = "请选择";
      if (
        this.item.rule &&
        this.item.rule.filter(r => {
          return r.required;
        }).length
      ) {
        txt += "(必填)";
      }
      return txt;
    }
  },
  methods: {
    open() {
      const { disabled } = this.item;
      // this.txt = this.item.txt;
      // this.val = this.item.val;
      if (!disabled) {
        this.$refs.p.open();
      }
    },
    onConfirm(txt, v) {
      this.formValue = v;
      this.txt = txt;
      this.val = v;
      this.$emit("input", v);
      this.$emit("change", v);
    },
    async getList() {
      if (this.c.dao) {
        this.list = await this.c.dao({});
      } else if (this.c.map) {
        this.list = this.c.map;
      }
    }
  }
};
</script>
