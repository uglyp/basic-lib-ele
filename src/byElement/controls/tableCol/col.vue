<template>
  <el-table-column
    v-if="!c.hidden"
    :label="c.txt"
    :prop="c.col"
    :width="c.width"
    :sortable="c.sort ? 'custom' : false"
    :class-name="getCellClass(c)"
    :align="c.align || 'left'"
    :formatter="(row, col, val, $i) => formatter(row, col, val, $i, c.dataType, c)"
    resizable
    :show-overflow-tooltip="useTooltip"
  >
    <table-col
      v-for="(col, key) in c.children"
      :key="key + col.SOLE_ID"
      :c="col"
      :cfg="cfg"
      :rows="rows"
      :page="page"
      :searchList="searchList"
    ></table-col>
  </el-table-column>
</template>
<script>
import formatter from "../../../utils/formatter";
import { TableColumn } from "element-ui";
import { reg } from "../../../utils/url.js";
export default {
  components: {
    elTableColumn: TableColumn
  },
  name: "tableCol",
  props: {
    c: Object,
    cfg: Object,
    rows: Array,
    page: Object,
    form: Object,
    table: Object,
    searchList: Object
  },
  computed: {
    useTooltip() {
      return !this.cfg.edit;
    }
  },
  methods: {
    /**
     * 检查列, 是否是可编辑类名
     */
    getCellClass(c) {
      if (this.cfg.edit && c.dataType && c.dataType.indexOf("w-") > -1) {
        return "edit-cell";
      } else {
        return "";
      }
    },
    /**
     * 格式化
     */
    formatter(row, col, val, $i, format, conf) {
      if (this.c.formatter) {
        return this.c.formatter(val);
      }
      const { page } = this;
      const item = {
        val,
        format,
        page,
        col,
        row,
        rows: this.rows,
        curRow: this.curRow,
        key: col.property,
        config: this.cfg,
        form: this.form,
        table: this.$refs.table,
        searchList: this.searchList,
        conf,
        on: {
          edit: () => {
            page.isEdit = Math.random();
          },
          click(e) {
            let s = e.val;
            if (reg.test(s)) {
              if (s.indexOf("https://") != -1 || s.indexOf("http://") != -1) {
                window.open(s, "_blank");
              } else {
                window.open(`http://${s}`, "_blank");
              }
            } else {
              window.$$.msg.error("网址不合法");
            }
          }
        }
      };
      return formatter(item);
    }
  }
};
</script>
