<template>
  <el-aside class="left-tree" :width="width" ref="ea" v-if="config" v-loading="load">
    <el-tree
      v-if="data"
      ref="tree"
      :data="data"
      :props="props"
      :show-checkbox="config.check"
      :node-key="props.id"
      :default-expanded-keys="config.expandedKeys"
      check-on-click-node
      :default-expand-all="config.expandAll"
      :default-checked-keys="config.checkedKeys"
      highlight-current
      @check="check"
      @node-click="change"
    >
      <span slot-scope="n" class="node" @click="click(n.node,n.data)">
        <slot name="n" :n="n"></slot>
      </span>
    </el-tree>
    <span class="drag el-icon-rank" @mousedown="beginDrag"></span>
  </el-aside>
</template>
<script>
import { Aside, Tree } from "element-ui";
export default {
  components: {
    elAside: Aside,
    elTree: Tree,
  },
  props: {
    config: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      data: null,
      load: true,
      defOpen: [],
      w: 140,
    };
  },
  created() {
    this.getData();
    this.w = this.config.width || 140;
    window.addEventListener("mousemove", this.moveDrag);
    window.addEventListener("mouseup", () => (this.begin = false));
  },
  computed: {
    width() {
      return this.w + "px";
    },
    props() {
      this.config.props = this.config.props || {};
      return {
        id: this.config.props.id || "id",
        label: this.config.props.label || "t",
        children: this.config.props.children || "c",
        disabled: this.config.props.disabled || "d",
        isLeaf: this.config.props.isLeaf || "l",
      };
    },
  },
  methods: {
    getNode() {
      return this.$refs.tree.getCurrentNode();
    },
    getData(cb) {
      if (this.config) {
        let data = this.config.data || [];
        if (this.config.dao) {
          this.config.dao().then((r) => {
            this.load = false;
            data.push(...r);
            this.data = data;
            this.$emit("treeLoad", data);
            this.$nextTick(cb);
            // cb && cb();
          });
        }
      }
    },
    setCurrentKey(key) {
      this.$refs.tree.setCurrentKey(key);
      this.$set(this.config, "expandedKeys", [key]);
    },
    click(node, data) {
      // $c.log(this.getNode());
      // // this.getNode()
      // let n = this.getNode();
      // n.LABEL = "的防腐漆";
      this.$emit("n-click", node, data);
    },
    change(node, key) {
      this.$emit("change", key, node);
    },
    check(nodes, e) {
      let { checkedKeys } = e;
      this.$emit("check", checkedKeys, nodes);
    },
    beginDrag(e) {
      this.begin = e.button === 0;
      this.target = e.target;
    },
    moveDrag(e) {
      if (this.begin) {
        let w =
          e.clientX +
          this.target.offsetWidth / 2 -
          this.$refs.ea.$el.offsetLeft;
        let min = this.config.min || 140;
        let max = this.config.max || 300;
        if (w < min) {
          w = min;
        } else if (w > max) {
          w = max;
        }
        this.w = w;
      }
    },
  },
};
</script>
<style lang="scss">
// 树控件
.left-tree {
  margin-right: 1rem;
  max-height: 100%;
  overflow: visible !important;
  position: relative;
  z-index: 1;
  user-select: none;

  .el-tree {
    background-color: #f9f9f9;
    height: 100%;
    padding: 0.25rem 1rem;
    overflow-y: auto;

    .el-tree-node {
      &.is-current {
        > .el-tree-node__content {
          background-color: #e6f0ff;
          color: #0158ac;
          font-weight: 600;
        }
      }

      .el-tree-node__content {
        height: auto;
        padding: 0.75rem 0;

        .el-tree-node__expand-icon {
          padding: 0;
        }

        .el-checkbox {
          margin: 0 1rem;
        }

        .el-tree-node__label {
          font-size: 1.2rem;
          color: #333;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }
    }
  }
}
</style>