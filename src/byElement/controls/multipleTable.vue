<template>
  <div class="multipleTable" :class="config.class">
    <el-table
      :data="multipleConfig.data"
      ref="multipleTable"
      :row-key="config.key"
      v-loading="loading"
      :tree-props="treeProps"
    >
      <el-table-column :label="config.title">
        <el-table-column :width="checkW" type=" ">
          <template slot-scope="scope">
            <div v-if="scope.row.ITEMS">
              <el-checkbox
                v-model="scope.row.CHK"
                :indeterminate="scope.row.IDM"
                :disabled="disabled(scope.row)"
                @change="checked=>allChange(checked, scope)"
              ></el-checkbox>
            </div>
            <el-checkbox
              v-else
              @change="checked=>handleChange(checked, scope)"
              v-model="scope.row.CHK"
              :disabled="disabled(scope.row)"
            ></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column :prop="config.label">
          <template v-slot="{row}">
            <span style="font-size:12px;" v-text="row[config.label]"></span>
            <el-button
              v-for="(item,index) of multipleConfig.rowBtns"
              v-show="item.hidden(row)"
              type="primary"
              size="mini"
              @click="item.click(row)"
              :key="index"
              class="powerBtn"
            >{{item.txt}}</el-button>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column v-if="multipleConfig.colBtns" label="操作" :width="btnWidth">
        <template v-slot="{row}">
          <div class="btnsBox">
            <el-button
              v-for="(item,index) of multipleConfig.colBtns"
              v-show="item.hidden(row)"
              type="primary"
              size="mini"
              @click="item.click(row)"
              :key="index"
            >{{item.txt}}</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "conMultiple",
  props: {
    multipleConfig: Object
  },
  data() {
    return {
      title: "",
      config: Object,
      orgData: [],
      pushArr: [],
      btnWidth: 1000,
      loading: true
    };
  },
  created() {
    this.config = this.multipleConfig.config;
    this.orgData = this.multipleConfig.data.toString();
  },
  mounted() {
    this.$nextTick(() => {
      this.setBtnColWidth();
    });
    setTimeout(() => {
      this.setBtnColWidth();
      this.loading = false;
    }, 1000);
  },
  computed: {
    treeProps() {
      if (typeof this.config.treeProps == "undefined") {
        return { children: "ITEMS", hasChildren: "hasChildren" };
      } else {
        return this.config.treeProps;
      }
    },
    checkW() {
      if (typeof this.multipleConfig.colBtns == "undefined") {
        return 6;
      } else {
        return 50;
      }
    }
  },
  methods: {
    findOffset(arr, val, chk, position) {
      let original = arr;
      function _findAll(arr, val, chk, position) {
        // var res = "";
        function _find(arr, val, chk, position) {
          var temp = "";
          arr.forEach((item, index) => {
            let l = 0;
            let idm = 0;
            temp = position ? position + "," + index : index;
            if (item["ID"] === val) {
              // res = temp;
              for (let i of item.ITEMS) {
                if (i.CHK) {
                  l++;
                } else if (i.IDM) {
                  idm++;
                }
              }
              item.CHK = l === item.ITEMS.length;
              item.IDM =
                (l > 0 && l < item.ITEMS.length) || idm > 0 ? true : false;
              if (item.BASE_ID) {
                _findAll(original, item.BASE_ID, chk, original);
              }
              return;
            } else if (item["ITEMS"] instanceof Array) {
              temp = _find(item["ITEMS"], val, chk, temp, original);
            }
          });
        }
        _find(arr, val, chk, position, original);
      }
      _findAll(arr, val, chk, position, original);
    },
    chkAll(chr, val) {
      function _chk(chr, val) {
        for (let i of chr) {
          i.CHK = val;
          if (i.ITEMS) {
            _chk(i.ITEMS, val);
          }
        }
      }
      _chk(chr, val);
    },
    allChange(val, scope) {
      const row = scope.row,
        data = this.multipleConfig.data;
      row.IDM = false;
      this.findOffset(data, row.BASE_ID, val);
      this.chkAll(row.ITEMS, val);
    },
    handleChange(val, scope) {
      const row = scope.row,
        data = this.multipleConfig.data;
      if (row.BASE_ID) {
        this.findOffset(data, row.BASE_ID, val);
      } else {
        row.CHK = val;
      }
    },
    handleData(data) {
      const that = this;
      function _reset(data) {
        for (let i of data) {
          if (i.IDM) {
            i.CHK = true;
            if (i.CHK) {
              that.pushArr.push(i.ID);
            }
          } else if (i.CHK) {
            that.pushArr.push(i.ID);
          }
          if (i.ITEMS) {
            _reset(i.ITEMS);
          }
        }
      }
      _reset(data);
    },
    pushData() {
      let res = [];
      const data = this.multipleConfig.data.toString();
      this.handleData(this.multipleConfig.data);
      if (data != this.orgData) {
        res = this.pushArr;
      }
      this.pushArr = [];
      return res;
    },
    disabled(r) {
      if (typeof this.config.disabled == "undefined") {
        return false;
      } else {
        return this.config.disabled(r);
      }
    },
    /**
     * 计算按钮列宽度
     */
    setBtnColWidth() {
      let btns = document.getElementsByClassName("btnsBox");
      let w = 0,
        tmp;
      for (let $el of btns) {
        tmp = 0;
        for (let c of $el.children) {
          if ($el.children.length > 1) {
            tmp += c.offsetWidth + 12;
          } else {
            tmp += c.offsetWidth + 15;
          }
        }
        tmp > w ? (w = tmp) : 0;
      }
      w = w || 100;
      this.btnWidth = w;
      this.$nextTick(() => {
        if (this.$refs["multipleTable"]) {
          this.$refs["multipleTable"].columns[
            this.$refs["multipleTable"].columns.length - 1
          ].width = w + 8;
          this.$refs["multipleTable"].doLayout();
        }
      });
    }
  }
};
</script>