<template>
  <!-- <van-field class="select-box" readonly autosize>
    <template #input>
      <van-field
        readonly
        clickable
        autosize
        name="picker"
        :value="names"
        label
        :placeholder="placeholder"
        @click="open"
        :disabled="disabled"
        :right-icon="disabled ? '' : 'arrow-down'"
      />
    </template>
    <template #extra>
      <tree :config="treeConfig" @change="getValues" ref="tree" />
    </template>
  </van-field> -->
  <span :class="['dropdown', { 'is-disabled': disabled }]" @click="open">
    <span class="txt" v-text="names || placeholder"></span>
    <van-icon :name="disabled ? '' : 'arrow-down'" />
    <tree :config="treeConfig" @change="getValues" ref="tree" />
  </span>
</template>
<script>
import tree from "../components/treePopup";
export default {
  name: "conSelectTree",
  components: { tree },
  props: {
    item: {
      type: Object,
      default(c) {
        return c || {};
      },
    },
    c: {
      type: Object,
      default(c) {
        return c || {};
      },
    },
  },
  data() {
    return {
      checked: { keys: [], vals: [] },
      list: [],
    };
  },
  created() {
    const { val } = this.item;
    if (val && val.keys && val.vals) {
      this.checked = val;
    }
  },
  mounted() {
    // $c.log(222, this.checked.keys);
    this.$refs.tree.setValue(this.checked);
  },
  watch: {
    disabled(v) {
      // $c.log(123, v);
      if (v) {
        // this.names = "";
        this.checked = { keys: [], vals: [] };
        this.$refs.tree && this.$refs.tree.clear();
      }
    },
  },
  computed: {
    disabled() {
      // $c.log(123, this.item.disabled);
      return !!this.item.disabled;
    },
    placeholder() {
      // $c.log(12, this.disabled);
      if (this.disabled) {
        return "";
      }
      let txt = "请选择";
      if (
        this.item.rule &&
        this.item.rule.filter((r) => {
          return r.required;
        }).length
      ) {
        txt += "(必填)";
      }
      // $c.log(223, txt);
      return txt;
    },
    treeConfig() {
      return Object.assign({}, this.c, {
        txt: this.item.txt,
        props: {
          c: "ITEMS_U",
        },
      });
    },
    formValue: {
      set() {},
      get() {
        return this.checked.keys;
      },
    },
    names() {
      // $c.log(11, this.checked.vals.join(), 22);
      return this.checked.vals.join();
    },
  },
  methods: {
    setValue(val) {
      this.checked = val;
    },
    open() {
      if (!this.disabled) {
        this.$refs.tree.open();
      }
    },
    getValues(checked) {
      this.checked = checked;
      this.$emit("input", this.checked.keys.join());
      this.$emit("change", this.checked);
    },
  },
};
</script>
