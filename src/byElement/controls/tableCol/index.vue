<template>
  <el-container class="table-all" v-loading="load" v-if="cfg && cfg.cols">
    <el-main class="table-main">
      <el-table
        class="con-el-table"
        :span-method="colspanMethod"
        size="mini"
        ref="table"
        :data="list"
        :fit="cfg.fit"
        highlight-current-row
        stripe
        border
        :row-key="cfg.key"
        :tree-props="cfg.tree"
        :default-expand-all="cfg.expandAll"
        @selection-change="handleSelectionChange"
        @sort-change="sortChange"
      >
        <el-table-column v-if="cfg.check" type="selection" align="center" min-width="50"></el-table-column>
        <el-table-column v-if="cfg.autoId" type="index" width="50" label="序号" align="center" :index="setIndex"> </el-table-column>
        <table-col
          v-for="(c, i) in cfg.cols"
          :key="c.col + i + c.width"
          :c="c"
          :cfg="cfg"
          :rows="val"
          :page="me"
          :searchList="searchList"
        ></table-col>
        <el-table-column v-if="cfg.tableBtns" label="操作" :width="btnWidth">
          <com-btns
            inline
            class="btnsCell"
            slot-scope="scope"
            :btns="cfg.tableBtns"
            :item="scope"
            :reload="getData"
            :reSelect="$refs.table.setCurrentRow"
            :table="$refs.table"
            :page="me"
          ></com-btns>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer class="table-footer" height="auto" v-if="cfg.pager">
      <el-pagination
        v-if="hasPage"
        :pager-count="5"
        layout="total, sizes, prev, pager, next, jumper"
        class="el-page"
        :page-sizes="[10, 20, 30, 50, 100]"
        :total="total"
        :page-size.sync="page._anyline_page_rows"
        :current-page.sync="page._anyline_page"
        @size-change="sizeChange"
        @current-change="getData"
      ></el-pagination>
    </el-footer>
  </el-container>
  <el-alert v-else-if="!cfg" title="table 控件没有获取到config配置" type="error" :closable="false"></el-alert>
  <el-alert v-else title="config 没有获取到cols配置" type="error" :closable="false"></el-alert>
</template>
<script>
let sizeKey = "pageSize";
let pageKey = "page";
import {
  Container as elContainer,
  Header as elHeader,
  Footer as elFooter,
  Main as elMain,
  Table as elTable,
  TableColumn as elTableColumn,
  Pagination as elPagination,
  Alert as elAlert
} from "element-ui";
import control from "../../mixins/control";
import comBtns from "../../components/Btns";
import tableCol from "./col";
import { handleTableSpan, handleObjectSpanMethod } from "../../../utils/tableUtils";
export default {
  name: "con-table",
  mixins: [control],
  components: {
    elContainer,
    elHeader,
    elFooter,
    elMain,
    elTable,
    elPagination,
    elTableColumn,
    elAlert,
    comBtns,
    tableCol
  },
  data() {
    let size = sessionStorage.getItem(sizeKey) * 1;
    let page = sessionStorage.getItem(pageKey) * 1;

    const self = this;
    if (!size || isNaN(size)) {
      size = 10;
    }
    return {
      //选中checkde 集合
      multipleSelection: [],
      // 要合并的单元格的rowspan 数据
      rowspanObj: {},
      me: self,
      load: false,
      total: 0,
      btnWidth: 100,
      hasPage: false,
      isEdit: 0,
      page: {
        _anyline_page_rows: size,
        _anyline_page: page
      },
      order: {
        order: "",
        by: ""
      }
    };
  },
  props: {
    on: {
      type: Object,
      default(val) {
        return val || {};
      }
    },
    searchList: {
      type: Object,
      default(val) {
        return val || {};
      }
    },
    otherSearch: {
      type: Object,
      default(val) {
        return val || {};
      }
    },
    config: Object
  },
  computed: {
    cfg() {
      let { config } = this;
      if (!config) {
        return {};
      }
      const cols =
        config.cols &&
        config.cols.filter(r => {
          return !!r.col;
        });
      return {
        test: config.test,
        key: config.key !== false ? config.key || "ID" : null,
        autoId: config.autoId === false ? config.autoId : true,
        autoAdd: config.edit ? config.autoAdd : false,
        maps: config.maps || {},
        cols,
        tableBtns: config.tableBtns,
        expandAll: config.expandAll,
        tree: config.tree,
        dao: config.dao || config.dataSource,
        fit: config.fit === true,
        edit: config.edit === true,
        check: config.check === true,
        load: config.load !== false,
        pager: config.pager !== false
      };
    },
    mergekeys() {
      // 要纵向合并的单元格的key数组
      return this.config.mergekeys;
    },
    returnValue() {
      return this.val;
    },
    disabled() {
      return this.config.disabled;
    },
    list() {
      this.val = this.val || [];
      this.isEdit;
      let lastRow = JSON.stringify(this.val[this.val.length - 1]);
      if (this.cfg.edit && this.cfg.autoAdd) {
        if (lastRow !== "{}") {
          let tmpRow = {
            id: Symbol()
          };
          // if (this.cfg.tree) {
          //   tmpRow[this.cfg.tree.children] = [
          //     {
          //       id: Symbol(),
          //     },
          //   ];
          // }
          this.val.push(tmpRow);
        }
      } else {
        if (lastRow === "{}" && this.val.length > 1) {
          this.val.pop();
        }
      }
      this.$nextTick(this.setBtnColWidth);
      return this.val;
    }
  },
  created() {
    this.checkMap();
    this.getData();
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    colspanMethod(tableObj) {
      //纵向合并的方法
      return handleObjectSpanMethod(tableObj, this.mergekeys, this.rowspanObj, true);
    },
    getDataList(datas) {
      this.dataList = datas;
      // 先处理一下数据，拿到要合并单元格的 rowspan 数据
      this.rowspanObj = handleTableSpan(this.mergekeys, this.dataList);
    },

    setIndex(i) {
      let count = this.page._anyline_page_rows;
      let num = this.page._anyline_page - 1;
      if (num < 0) {
        num = 0;
      }
      return i + 1 + count * num;
    },
    /**
     * 兼容旧版的方法
     */
    // setOldCols(cols) {
    //   if (cols) {
    //     return cols.map((r) => {
    //       r.txt = r.txt || r.viewName;
    //       r.col = r.col || r.colName;
    //       return r;
    //     });
    //   }
    //   return cols;
    // },
    /**
     * 兼容旧版的方法
     */
    getRowData(_anyline_page) {
      this.getData(_anyline_page);
    },
    /**
     * 加载完毕
     */
    over() {
      this.load = false;
      this.on.over && this.on.over();
    },
    /**
     * 查询数据
     */
    getData(_anyline_page) {
      if (this.cfg.dao) {
        if (this.cfg.load) {
          this.load = true;
        }
        // this.on.before && this.on.before();
        if (_anyline_page) {
          this.page._anyline_page = _anyline_page;
        }
        const { searchList, otherSearch, page, order } = this;
        sessionStorage.setItem(pageKey, page._anyline_page);
        let queryConditions = Object.assign(searchList, otherSearch, page, order);
        if (this.on.beforeDataLoad) {
          queryConditions = this.on.beforeDataLoad(queryConditions);
        }
        // this.setBtnColWidth();
        // debugger;
        this.cfg
          .dao(queryConditions)
          .then(r => {
            this.over();
            if (r.row) {
              this.val = r.row;
              this.getDataList(this.val);
            } else {
              this.val = r;
              this.getDataList(this.val);
            }
            if (this.config.edit) {
              this.config.edit = false;
            }
            this.hasPage = !!r.navi;
            if (r.navi) {
              this.total = r.navi.totalRow;
            }
            this.$nextTick(() => {
              this.setBtnColWidth();
            });
          })
          .catch(err => {
            this.over();
            $$.err(err);
          });
      } else if (this.cfg.test) {
        let row = this.cfg.test;
        this.val = row;
        this.getDataList(this.val);
      } else {
        let rows = [];
        this.val = rows;
        this.$nextTick(() => {
          this.setBtnColWidth();
        });
      }
    },
    /**
     * 排序处理
     */
    sortChange(e) {
      const { prop, order } = e;
      if (order == "ascending") {
        this.order.ORDER = "ASC";
      } else {
        this.order.ORDER = "DESC";
      }
      this.order.FIELD = prop;
      this.getData();
    },
    /**
     * 计算按钮列宽度
     */
    setBtnColWidth() {
      if (this.cfg.tableBtns && this.$refs.table) {
        let btns = this.$refs.table.$el.getElementsByClassName("btnsCell");
        let w = 0,
          tmp;
        for (let $el of btns) {
          tmp = 0;
          for (let c of $el.children) {
            tmp += 30 + 13 * c.innerText.trim().length + 10;
          }
          tmp > w ? (w = tmp) : 0;
        }
        w = w || 100;
        if (w) {
          // this.btnWidth = w;
          this.$nextTick(() => {
            if (this.$refs["table"]) {
              this.$refs["table"].columns[this.$refs["table"].columns.length - 1].width = w + 11;
              this.$refs["table"].doLayout();
            }
          });
        }
      }
    },
    /**
     * 每页展示条数修改
     */
    sizeChange() {
      this.page._anyline_page = 1;
      sessionStorage.setItem(sizeKey, this.page._anyline_page_rows);
      this.getData();
    },
    /**
     * 检查map传参
     */
    checkMap() {
      if (this.cfg && this.cfg.cols) {
        for (let c of this.cfg.cols.filter(r => {
          return !r.hidden;
        })) {
          if (c.dataType && c.dataType.indexOf("m--") === 0) {
            let key = c.dataType.replace("m--", "");
            if (!this.cfg.maps[key]) {
              $$.msg.error(`table控件缺少map入参 [ ${key} ]`);
            }
          }
        }
      }
    },
    /**
     * 获取表格控件
     */
    getTable() {
      return this.$refs.table;
    }
  }
};
</script>
