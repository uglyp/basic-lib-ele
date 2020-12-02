<template>
  <div class="select-box-parent" :class="{'is-focus':isFocus}" @keydown="keyDown">
    <el-autocomplete
      v-if="config.down&&config.down.dataSource"
      class="select-box"
      v-model="txt"
      :disabled="lastConfig.disabled"
      :placeholder="lastConfig.placeholder||'请选择'"
      :fetch-suggestions="query"
      popper-class="auto-table"
      ref="complete"
      @focus="focus"
      @blur="blur"
      @select="select"
    >
      <el-button
        v-if="lastConfig.showBox"
        :disabled="lastConfig.disabled"
        type="text"
        slot="suffix"
        icon="el-icon-more"
        @click="showDialog"
      ></el-button>
      <template slot-scope="{item}">
        <div>
          <el-table
            ref="downTable"
            class="select-box-table"
            v-if="lastConfig.down"
            :data="pack(item)"
            fit
            highlight-current-row
            size="mini"
            @row-click="rowClick"
            @current-change="curChange"
            style="width: 700px"
          >
            <el-table-column
              v-for="(col, index) in lastConfig.down.cols"
              :key="col.colName"
              :data-id="index"
              :prop="col.colName"
              :label="col.viewName"
            >
              <template v-slot="scope">
                <span v-html="matchKeyWord(scope.row[col.colName])"></span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </template>
    </el-autocomplete>
    <el-input
      v-else
      class="select-box"
      v-model="val"
      :disabled="lastConfig.disabled"
      :placeholder="lastConfig.placeholder||'请选择'"
      :fetch-suggestions="query"
      @focus="focus"
      @blur="blur"
      ref="complete"
    >
      <el-button
        v-if="lastConfig.showBox"
        :disabled="lastConfig.disabled"
        type="text"
        slot="suffix"
        icon="el-icon-more"
        @click="showDialog"
      ></el-button>
    </el-input>
    <el-dialog
      :visible.sync="show"
      title="请选择"
      @opened="open"
      append-to-body
      class="dxh-dialog__select-box"
    >
      <component
        v-if="show"
        :is="config.dialogEl"
        :config="lastConfig.config"
        ref="dialogTable"
        :form="form"
      ></component>
      <div slot="footer">
        <el-button type="primary" @click="check" size="small">选择</el-button>
        <el-button @click="close" size="small" plain>关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import control from "../mixins/control";
export default {
  mixins: [control],
  name: "selectBox",
  data() {
    return {
      show: false,
      oldVal: "",
      rowId: -1,
      isFocus: false,
      tmpTxt: "",
      curId: -1,
      row: null
    };
  },
  created() {
    if (this.value === null || typeof this.value === "undefined") {
      this.val = "";
    } else {
      this.val = this.value;
    }
    this.oldVal = this.val;
    this.txt = this.val;
    if (!this.lastConfig.dialogEl) {
      this.$message.error("selectBox 控件没有接收到参数config.dialogEl");
    }
  },
  computed: {
    txt: {
      get() {
        return this.lastConfig.canEdit ? this.val : this.tmpTxt;
      },
      set(val) {
        if (this.lastConfig.canEdit) {
          this.val = val;
        } else {
          this.tmpTxt = val;
        }
      }
    },
    /**返回值处理 */
    returnValue() {
      return this.val;
    },
    /**配置文件处理, 加默认值 */
    lastConfig() {
      const config = this.config || {};
      if (config.config) {
        config.config.check = true;
      }
      return {
        showBox: typeof config.showBox === "undefined" || config.showBox,
        canEdit: typeof config.canEdit === "undefined" || config.canEdit,
        down: config.down,
        disabled: config.disabled,
        dialogEl: config.dialogEl,
        config: config.config,
        readOnly: config.readOnly || false,
        placeholder: config.placeholder || "",
        on: config.on || {}
      };
    }
  },
  watch: {
    val(val) {
      this.txt = val;
    }
  },
  methods: {
    curChange(row) {
      this.row = row;
    },
    keyDown(e) {
      const $dt = this.$refs.downTable;
      if ($dt && e.keyCode === 40) {
        if (this.curId < $dt.data.length - 1) {
          this.curId++;
        }
        $dt.setCurrentRow($dt.data[this.curId]);
      } else if ($dt && e.keyCode === 38) {
        if (this.curId > 0) {
          this.curId--;
        }
        $dt.setCurrentRow($dt.data[this.curId]);
      } else if (this.row && e.keyCode === 13) {
        this.curId = -1;
        this.select(null, this.row);
      }
    },
    focus() {
      let input = this.$refs.complete.$el.getElementsByTagName("INPUT");
      input[0] && input[0].select();
      this.isFocus = true;
    },
    blur() {
      this.curId = -1;
      this.txt = this.val;
      setTimeout(() => {
        this.isFocus = false;
      }, 500);
    },
    /**弹窗已加载完毕事件 */
    open() {
      this.$refs.dialogTable && this.$refs.dialogTable.refresh();
    },
    /**关闭弹窗 */
    close() {
      this.$refs.dialogTable.empty();
      this.show = false;
    },
    /**弹窗展示备选数据列表 */
    showDialog() {
      const downTable = document.getElementsByClassName(
        "el-autocomplete-suggestion"
      );
      for (let d of downTable) {
        d.style.display = "none";
      }
      if (this.lastConfig.dialogEl) {
        this.show = true;
      } else {
        this.$message.warning("这个控件的弹窗内容没有配置");
      }
    },
    /**选中 */
    check() {
      this.$refs.dialogTable.getSelectedValue(list => {
        if (list && list.length) {
          // 根据 key 拼接字符串  key1,key2,...keyN 这个格式
          const getStr = key => {
            if (!key) {
              this.$message.error("您没有选择拼接的key");
              return;
            }
            let str = "";
            for (let row of list) {
              str += row[key] + ",";
            }
            if (str.length) {
              return str.substring(0, str.length - 1);
            } else {
              return str;
            }
          };
          if (this.lastConfig.on.checked) {
            this.lastConfig.on.checked(list, getStr);
            this.close();
          } else if (this.lastConfig.on.getValue) {
            this.val = this.lastConfig.on.getValue(list, getStr);
            this.txt = this.val;
            this.close();
          } else {
            this.$message.warning("这个组件选中后没做任何处理");
          }
        } else {
          this.$message.error("没有选中行");
        }
      });
    },
    /** 下拉列表绑定 */
    async query(txt, cb) {
      if ((this.config.down && !txt) || txt.length < 4) {
        cb([]);
      } else {
        if (!this.config.down) return;
        let downKey = this.config.down.downKey || this.config.down.key || "";
        const search = Object.create(null);
        if (!downKey) {
          throw new Error(`down 选项没有提供key值`);
        }
        search[downKey] = txt;
        const source = this.config.down.dataSource;
        if (!source) {
          throw new Error(`down 选项没有提供dataSource接口源`);
        }

        if (!this.config.down.cols) {
          throw new Error(`down 选项没有提供cols表格信息`);
        }
        let data = await source(search);
        let autoData = [{ key: data }];
        cb(autoData);
      }
    },
    select(res, row) {
      const currentRow = row || res.key.filter(row => row.id === this.rowId)[0];
      if (currentRow) {
        const ev = {
          $el: this,
          $td: this.scope
        };
        if (this.lastConfig.on.selected) {
          this.lastConfig.on.selected(
            currentRow,
            val => {
              this.val = val;
              this.oldVal = val;
            },
            () => {
              this.val = this.oldVal;
            },
            ev
          );
        } else {
          const val =
            currentRow[this.lastConfig.down.key] ||
            currentRow[this.lastConfig.down.key.toLowerCase()];
          // this.val = (this.val || "") + `${val},`;
          this.val = val;
          this.oldVal = this.val;
        }
      }
    },
    pack(item) {
      if (Array.isArray(item.key)) {
        return item.key;
      }
      return [];
    },
    /** 下拉表格中选中某一行 */
    rowClick(rows) {
      this.rowId = rows.id;
    },
    matchKeyWord(data) {
      let val = this.txt ? this.txt.replace(",", "") : "";
      let colList;
      if (data) {
        colList = data.split(val);
      } else {
        colList = [];
      }
      return colList.length > 1
        ? colList.join(`<span style="color:red">${val}</span>`)
        : colList.pop();
    }
  }
};
</script>
<style lang="scss">
.select-box-parent {
  width: 100%;
  line-height: 1;
  .el-input {
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    .el-input__inner {
      padding: 0 15px;
    }
    .el-input-group__append {
      padding: 0;
      width: auto;
      display: block;
      position: initial;
      border: none;
      background-color: transparent;
      .el-button {
        margin: 0 0 0 -18px;
      }
    }
    .el-input__suffix {
      top: 0 !important;
      .el-input__suffix-inner {
        .el-button {
          width: 25px;
          min-width: 25px;
          height: 32px;
        }
      }
    }
  }
  .select-box {
    width: 100%;
  }
}
.auto-table {
  width: auto !important;
  min-width: 75px;
  .el-autocomplete-suggestion__list {
    li {
      padding: 0 5px;
      .down-row {
        padding: 0;
        display: flex;
        li {
          span {
            padding-right: 2px;
          }
          strong {
            padding-right: 5px;
          }
        }
      }
    }
  }
}
.select-box-table {
  tr {
    font-weight: 700;
    &:hover {
      .cell > span {
        color: #1989fa;
      }
    }
  }
}
</style>
