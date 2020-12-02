<template>
  <el-container class="dxh-table" v-if="config">
    <el-aside v-if="lastConfig.trees && lastConfig.showTree" width="20%" v-loading="treeload">
      <el-radio-group v-model="curTree" v-if="showTabRadio">
        <el-radio-button v-for="(item, i) in lastConfig.trees" :key="i" :label="i">{{
          item.txt
        }}</el-radio-button>
      </el-radio-group>
      <el-input v-model="treeVal" :placeholder="treeHolder" v-if="showTreeSearch" type="text" @keyup.enter.native="searchHandler"
        class="el-tree-search__input">
        <el-button slot="append" icon="el-icon-search" @click="searchHandler"></el-button>
      </el-input>
      <template v-for="(treeData, i) in treeDatas">
        <div v-if="i === curTree" class="tree-p" :key="i" ref="elTreeParent">
          <el-tree :data="treeData" node-key="id" :props="defaultProps" ref="tree" highlight-current @node-click="node => treeClick(node, i)">
            <template slot-scope="{ data }">
              <p>
                <span v-if="sno(data)" class="active">{{ data.txt }}</span>
                <span v-else>{{ data.txt }}</span>
              </p>
            </template>
          </el-tree>
        </div>
      </template>
    </el-aside>
    <el-container class="dxh-table-main">
      <el-header v-if="config.search" height="auto">
        <div class="search">
          <el-input v-model="searchVal" size="small" :placeholder="config.search.holder"></el-input>
          <el-button type="primary" @click="search" size="small">查询</el-button>
        </div>
      </el-header>
      <el-main class="con-table">
        <el-table border fit size="mini" :data="rows" @row-dblclick="dblclick" header-align="center" v-loading="load"
          highlight-current-row :show-summary="lastConfig.showSum" ref="table" @current-change="selectedRow"
          @sort-change="sortChange" :cell-class-name="lastConfig.cellClassName">
          <el-table-column type="selection" width="50" align="center" header-align="center" v-if="config.check && !disabled"></el-table-column>
          <el-table-column type="index" width="50" label=" " align="center" header-align="center">
          </el-table-column>
          <el-table-column header-align="center" align="center" v-if="config.edit && !disabled && lastConfig.addDel && !config.tableBtns"
            :width="Object.keys(btnList).length * 40">
            <el-button slot="header" type="text">批量删除</el-button>
            <dxh-btns slot-scope="scope" :btns="btnList" inline :item="scope"></dxh-btns>
          </el-table-column>
          <el-table-column header-align="center" align="center" :width="Object.keys(config.tableBtns).length * 80 + 'px'"
            v-if="config.tableBtns && !disabled" label="操作">
            <dxh-btns slot-scope="scope" :btns="config.tableBtns" inline :item="scope" align="center"></dxh-btns>
          </el-table-column>
          <template v-for="(col, i) in cols">
            <el-table-column v-if="
                col.dataType &&
                  col.dataType.indexOf('c') === 0 &&
                  curC(col) &&
                  !disabled &&
                  config.edit
              "
              :key="i" :label="col.viewName" :prop="col.colName" header-align="center" :min-width="col.width" :align="alignMap[col.align]"
              show-overflow-tooltip :class-name="disabled ? '' : 'edit-cell'">
              <template slot-scope="scope">
                <component :scope="scope" :is="curC(col).el" :config="curC(col).config" :value.sync="scope.row[col.colName]"></component>
              </template>
            </el-table-column>
            <el-table-column v-else :key="i" :label="col.viewName" :prop="col.colName" :min-width="col.width"
              header-align="center" :align="alignMap[col.align]" show-overflow-tooltip :sortable="col.sortable === 'true' ? 'custom' : false"
              :class-name="
                col.dataType && col.dataType.indexOf('w') > -1 && !disabled ? 'edit-cell' : ''
              "
              :formatter="(r, c, val, $i) => formatter(r, c, val, $i, col.dataType)">
              <span slot="header" v-if="col.question">
                {{ col.viewName }}
                <el-popover v-if="col.question" placement="top-start" title="提示" trigger="hover" :content="col.question">
                  <i slot="reference" class="el-icon-question"></i>
                </el-popover>
              </span>
            </el-table-column>
          </template>
          <div class="empty" slot="empty">
            <img :src="emptyImg" />
            <span>没有满足条件的数据哦</span>
          </div>
        </el-table>
      </el-main>
      <el-footer class="footer-page" v-if="!lastConfig.hideFooter && lastConfig.pager">
        <el-pagination :pager-count="5" layout="total, sizes, prev, pager, next, jumper" :total="total" class="el-page"
          :page-size.sync="page.limit" :current-page.sync="page.page" :page-sizes="[10, 15, 25, 50, 100, 200, 500]"
          @size-change="getRowData" @current-change="getRowData"></el-pagination>
      </el-footer>
    </el-container>
  </el-container>
</template>
<script>
  import {
    dict
  } from "qh-dao";
  // import { listDao, dict } from "qh-dao";
  import control from "../mixins/control";
  import btns from "../components/Btns";
  import formatter from "../utils/formatter";
  import emptyImg from "../assets/img/empty.png";
  export default {
    mixins: [control],
    data() {
      let self = this;
      return {
        defWidth: 100,
        emptyImg,
        self: this,
        cols: [],
        rows: null,
        load: false,
        alignMap: dict.align,
        orderBy: {},
        curRow: null,
        curId: null,
        defaultProps: {
          label: "txt",
          children: "children"
        },
        page: {
          limit: 15,
          page: 1
        },
        total: 0,
        btnList: {
          add: {
            tip: "新增行",
            type: "text",
            icon: "el-icon-plus",
            click() {
              self.rows.push({
                isEmpty: true
              });
            }
          },
          del: {
            tip: "删除行",
            type: "text",
            icon: "el-icon-delete-solid",
            click(e) {
              if (!self.lastConfig.keepLastRow || self.rows.length > 1) {
                let delRow = () => {
                  if (self.rows.length) {
                    self.rows.splice(e.item.$index, 1);
                  }
                };
                if (self.on.delRow && !e.item.row.isEmpty) {
                  /**删除行事件 */
                  self.on.delRow(e.item.row, delRow);
                } else {
                  delRow();
                }
              } else {
                self.$message.error("最少保留一行");
              }
            }
          }
        },
        searchVal: "",
        quickSearch: {},
        treeload: false,
        curTree: 0,
        treeData: null,
        treeSearch: {},
        treeDatas: [],
        treeVal: "", // 过滤 tree数据的关键词
        treeKeys: [] // 展开节点的 node id
      };
    },
    components: {
      dxhBtns: btns
    },
    props: {
      on: Object,
      searchList: Object
    },
    watch: {
      val: {
        deep: true,
        handler(val) {
          this.rows = val || [];
          this.getCols();
          if (this.lastConfig.noWiden && !this.rows.length) {
            this.defWidth = 100;
          } else {
            this.defWidth = null;
          }
          this.config.rowCount = this.rows.length;
          this.config.emptyRowCount = this.rows.filter(r => {
            return r.isEmpty;
          }).length;
        }
      }
    },
    computed: {
      // 表格数据下标 index
      tableIndex() {
        let {
          currentPage,
          length
        } = this.page;
        return currentPage * length - 1 * length + 1;
      },
      showTabRadio() {
        return this.lastConfig.trees.length > 1;
      },
      showTreeSearch() {
        const {
          trees
        } = this.lastConfig;
        if (!trees) return false;
        return trees[this.curTree] && trees[this.curTree].holder;
      },
      treeHolder() {
        return this.showTabRadio ?
          this.showTreeSearch ?
          this.showTreeSearch :
          "" :
          this.lastConfig.trees[0].holder;
      },
      // 返回值
      returnValue() {
        return this.rows;
      },
      // 配置
      lastConfig() {
        const config = this.config || {};
        if (typeof config.tree === "object" && typeof config.tree.length === "undefined") {
          this.config.trees = [this.config.tree];
        }
        return {
          keepLastRow: typeof config.keepLastRow === "undefined" || config.keepLastRow,
          showTree: typeof config.showTree === "undefined" || config.showTree,
          on: config.on || {},
          rowCount: typeof config.rowCount === "undefined" ? 8 : config.rowCount,
          dataSource: config.dataSource,
          addDel: typeof config.addDel === "undefined" ? true : config.addDel,
          searchItem: config.searchItem,
          showSum: config.showSum,
          maps: config.maps || [],
          pager: typeof config.addDel === "undefined" ? true : config.addDel,
          cols: config.cols || [],
          customizes: config.customizes || [],
          tableName: config.tableName,
          trees: config.trees || null,
          searchKey: config.searchKey,
          searchHolder: config.searchHolder || "请输入",
          search: config.search || {},
          noCol: config.noCol || false,
          hideFooter: config.hideFooter || false,
          cellClassName: config.cellClassName,
          noWiden: config.noWiden
        };
      },
      // 是否可用
      disabled() {
        let form = this.form || {};
        return form.disabled || !!this.config.disabled;
      }
    },
    created() {
      if (!this.config) {
        this.$message.error("table 控件, config 不存在");
        return;
      } else if (!this.config.tableName && (!this.config.cols || !this.config.cols.length)) {
        this.$message.error("table 控件, config.tableName 和 config.cols 都不存在");
        return;
      }
      this.getCols();
      this.refresh();
    },
    mounted() {
      /**跳转下一个input的处理 */
      const enterDown = ev => {
        const downTable = document.getElementsByClassName("el-autocomplete-suggestion");
        for (let d of downTable) {
          d.style.display = "none";
        }
        let $tr;
        for (let el of ev.path) {
          if (el.tagName === "TR") {
            $tr = el;
            break;
          }
        }
        // 寻找下一个标签
        let items = $tr.getElementsByTagName("input");
        let focusNext;
        for (let item of items) {
          if (focusNext) {
            item.focus();
            focusNext = false;
            break;
          } else if (item == ev.target) {
            focusNext = true;
          }
        }
        // 如果是最后一个标签
        if (focusNext) {
          const $table = $tr.parentElement;
          const $trs = $table.getElementsByTagName("TR");
          let isNextRow;
          for (let tr of $trs) {
            if (isNextRow) {
              let inputList = tr.getElementsByTagName("INPUT");
              inputList[0] && inputList[0].focus();
              break;
            } else {
              isNextRow = tr.className.indexOf("current-row") > -1;
            }
          }
        }
      };
      this.$refs.table.$el.addEventListener("keydown", e => {
        switch (e.key) {
          case "Enter":
            enterDown(e);
            break;
        }
      });
    },
    methods: {
      /** 选中行 */
      selectedRow(row) {
        this.rows.map((r, i) => {
          if (r === row) {
            this.curId = i;
          }
        });
        this.curRow = row;
        if (this.on && this.on.selectedRow && row) {
          this.on.selectedRow(row);
        }
      },
      /** 获取表格 */
      getTable() {
        return this.$refs.table;
      },
      /** 根据列配置获取当前列的 type1 */
      curC(col) {
        return this.lastConfig.customizes[col.dataType.substring(col.dataType.lastIndexOf("-") + 1)];
      },
      /** 清空 */
      empty() {
        this.rows = [];
        this.treeDatas = [];
        this.treeSearch = {};
        this.quickSearch = {};
      },
      /** 绑定刷新 */
      refresh() {
        if (this.lastConfig.trees) {
          this.getTreeData();
        }
        if (this.lastConfig.dataSource) {
          this.getRowData();
        } else {
          this.getRows();
        }
      },
      /** 是否展示滚动条 */
      isLoad(show) {
        this.load = show;
      },
      /** 获取列模型 */
      async getCols() {
        this.cols = [];
        this.cols.push(...this.lastConfig.cols);
        // if (this.lastConfig.tableName) {
        //   listDao
        //     .getColumns(this.lastConfig.tableName)
        //     .then(r => {
        //       this.cols = r.filter(r => {
        //         return r.hidden !== 0;
        //       });
        //       this.checkColsDataType(this.cols);
        //     })
        //     .catch(() => {
        //       // this.cols = [];
        //     });
        // } else {
        //   // -
        // }
        if (this.lastConfig.cols.length) {
          this.checkColsDataType(this.cols);
        }
      },
      /** 获取行数据 */
      async getRowData() {
        let search = {};
        if (this.lastConfig.on.beforeDataLoad) {
          search = this.lastConfig.on.beforeDataLoad(search);
        }
        const s = Object.assign(
          search,
          this.page,
          this.orderBy,
          this.treeSearch,
          this.quickSearch,
          this.searchList
        );
        this.isLoad(true);
        this.lastConfig
          .dataSource(s)
          .then(data => {
            this.isLoad();
            this.rows = data.row === null ? [] : data.row;
            this.lastConfig.on.search && this.lastConfig.on.search(this.rows);
            if (this.lastConfig.noWiden && (!data.rows || !data.rows.length)) {
              this.defWidth = 100;
            } else {
              this.defWidth = null;
            }
            if (this.lastConfig.on.firstLoad) {
              this.lastConfig.on.firstLoad(this.rows, this.$refs["table"]);
              delete this.lastConfig.on.firstLoad;
            }
            this.config.rowCount = data.navi.count;
            // total------------------------------------------------------????
            this.total = data.navi.count;
            this.$nextTick(this.setColWidth);
            this.$nextTick(() => {
              this.$emit("mounted", this.rows);
            });
          })
          .catch(() => {
            this.isLoad();
          });
      },
      /** 获取树模型 */
      async getTreeData() {
        if (this.lastConfig.showTree) {
          this.treeload = true;
          for (let i = 0; i < this.lastConfig.trees.length; i++) {
            this.$set(this.treeDatas, i, await this.lastConfig.trees[i].source());
          }
          this.treeload = false;
        }
      },
      /** 数据格式化 */
      formatter(row, col, val, $i, format) {
        const item = {
          val,
          format,
          page: this,
          col,
          row,
          rows: this.rows,
          curRow: this.curRow,
          key: col.property,
          config: this.config,
          form: this.form,
          table: this.$refs.table
        };
        return formatter(item);
      },
      /** 获取选中行 */
      getSelectedValue(callback) {
        callback && callback(this.config.check ? this.$refs.table.selection : [this.curRow]);
      },
      /** 取消选中行 */
      cancelSelectRows() {
        this.$refs.table.clearSelection();
      },
      /* 选中指定行 */
      selectedRows(rows, state = true) {
        if (rows && this.config.check) {
          rows.forEach(row => {
            this.$refs.table.toggleRowSelection(row, state);
          });
        } else {
          this.$refs.table.setCurrentRow(rows);
        }
      },
      /** 检测列模型的自定义数据类别有没有传参 */
      checkColsDataType(cols) {
        let noHasMaps = [];
        let noHasCustomize = [];
        for (let col of cols) {
          if (col.dataType) {
            col._dataType = col.dataType.split("-");
            // 验证是否有未传参的map
            if (col.dataType[0] === "m" && !this.lastConfig.maps[col._dataType[2]]) {
              noHasMaps.push(col._dataType[2]);
            }
            // 验证是否有未传参的 自定义
            if (col.dataType[0] === "c" && !this.lastConfig.customizes[col._dataType[2]]) {
              noHasCustomize.push(col._dataType[2]);
            }
          }
        }
        let errTxt = "";
        if (noHasMaps.length) {
          errTxt += `当前列表组件需要配置map ${noHasMaps}`;
        }
        if (noHasCustomize.length) {
          errTxt += `当前列表组件需要配置自定义实现 ${noHasCustomize}`;
        }
        if (errTxt) {
          this.$message.error(errTxt);
        }
      },
      /** 获取空行 */
      getRows() {
        let list = [];
        for (let i = 0; i < this.lastConfig.rowCount; i++) {
          list.push({
            isEmpty: true
          });
        }
        this.config.emptyRowCount = this.lastConfig.rowCount;
        this.rows = list;
      },
      /** 添加数据 */
      addRows(rows, pCode) {
        if (pCode) {
          rows = rows.filter(r => {
            return !this.rows.filter(row => {
              if (row[pCode] === r[pCode]) {
                this.$message.error(`[ ${row[pCode]} ] 已存在`);
                return true;
              } else {
                return false;
              }
            }).length;
          });
        }
        this.config.emptyRowCount = this.rows.filter(r => {
          return r.isEmpty;
        }).length;
        let delCount = this.config.emptyRowCount;
        if (rows.length < delCount) {
          delCount = rows.length;
        }
        let index = 0;
        for (let i = 0; i < this.rows.length; i++) {
          if (this.rows[i].isEmpty) {
            break;
          } else {
            index = i;
          }
        }
        this.rows.splice(index, this.config.emptyRowCount, ...rows);
      },
      /** 树节点被选中 */
      treeClick(node, i) {
        const onTreeClick = this.lastConfig.trees[i].treeClick;
        this.treeSearch = onTreeClick && onTreeClick(node);
        this.getRowData();
      },
      /** 快捷搜索
       *  点击搜索之前做一层拦截逻辑判断
       *  before 函数返回 false则终止搜索
       * */
      search() {
        this.quickSearch[this.lastConfig.search.key] = this.searchVal.trim();
        const re =
          this.lastConfig.search && this.lastConfig.search.before ?
          this.lastConfig.search.before() :
          true;
        re && this.getRowData();
      },
      /** 排序 */
      sortChange(e) {
        let sortType = "asc";
        e.order === "ascending" ? (sortType = "asc") : (sortType = "desc");
        this.orderBy = {
          sortBy: e.prop,
          sortType
        };
        this.getRowData();
      },
      /* 关键词定位tree节点 */
      searchHandler() {
        let val = this.treeVal.trim();
        const treeData = this.treeDatas[this.curTree];
        this.treeKeys = this.getKeys(treeData, val);
        this.$refs.tree[0].root.store.setDefaultExpandedKeys(this.treeKeys);

        this.$nextTick(() => {
          const dom = this.$refs.tree[0].$el.getElementsByClassName("active")[0] || null;

          if (dom) {
            const clientH = this.$refs.tree[0].$el.clientHeight;
            const offsetT = dom.offsetTop;
            const domH = dom.getBoundingClientRect().height;

            if (Math.abs(offsetT - clientH) > 0) {
              this.$refs.elTreeParent[0].scrollTo({
                top: Math.max(offsetT - clientH + domH, 0),
                behavior: "smooth"
              });
            }
          }
        });
      },
      /* 递归查找依赖关系 */
      getKeys(treeData, val) {
        let res = [];
        if (treeData.length > 0) {
          treeData.forEach(node => {
            if (node.txt.indexOf(val) > 0) {
              res.push(node.id);
            }
            if (node.children && node.children.length > 0) {
              // res = [...new Set([...res, ...this.getKeys(node.children, val)])];
            }
          });
        }
        return res;
      },
      /* 显示符合关键词的tree node */
      sno(data) {
        return this.treeKeys.includes(data.id);
      },
      /** 表格双击 */
      dblclick(row) {
        if (this.config.tableDblClick) {
          if (typeof this.config.tableDblClick === "function") {
            this.config.tableDblClick(row);
          } else if (typeof this.config.tableDblClick === "object") {
            this.$router.push(this.config.tableDblClick);
          }
          // let query = {};
          // let keyValue = this.config.tableDblClick.query;
          // for (var key in keyValue) {
          //   query[key] = row[keyValue[key]];
          // }
        }
      }
    }
  };
</script>
