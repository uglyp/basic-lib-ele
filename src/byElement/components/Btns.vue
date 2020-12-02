<template>
  <ul class="btns" :class="{ block: block }">
    <slot name="first-btn"></slot>
    <template v-for="(btn, key) in btnList">
      <li v-if="checkHide(btn)" :key="key" :class="btn.inMore ? 'btnNone' : 'btn'">
        <uld-foc v-if="btn.type == 'upload'" :config='btn.config' :daos="btn.dataRun" @outdata="outdata1" @getFile="getFile" @startLoad="startLoad"></uld-foc>
        <el-tooltip effect="dark" :content="btn.tip" :placement="placement" v-else-if="btn.icon && !btn.txt">
          <el-button
            :loading="loading"
            :type="btn.type || type"
            :icon="btn.icon"
            @click="btnClick(btn, key)"
            :size="size"
            :disabled="checkDisabled(btn)"
            :circle="circle"
          ></el-button>
        </el-tooltip>
        <el-button
          v-else
          :loading="loading"
          :type="btn.type || type || 'primary'"
          :icon="btn.icon"
          :plain="plain"
          @click="btnClick(btn, key)"
          :size="size"
          :circle="circle"
          :disabled="checkDisabled(btn)"
          >{{ btn.txt }}</el-button
        >
      </li>
    </template>
    <li class="btn moreBtn" v-if="btnsLength">
      <el-dropdown placement="top">
        <el-button type="primary" :size="size" :plain="plain">
          更多
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(btn, key) in btns" :key="key" class="btn">
            <template v-if="btn.inMore && checkHide(btn)">
              <el-button :type="'text'" :icon="btn.icon" @click="btnClick(btn)" :size="size" :disabled="checkDisabled(btn)">{{ btn.txt }}</el-button>
            </template>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </li>
  </ul>
</template>
<script>
import uldFoc from "../controls/uploadForCmposite";
import { Button } from "element-ui";
export default {
  components: {
    elButton: Button,
    uldFoc: uldFoc
  },
  data() {
    return {
      btnsLength: false,
      loading: false
    };
  },
  props: {
    btns: Object,
    block: Boolean,
    type: String,
    page: Object,
    table: Object,
    item: [Object, Array],
    tabValue: [String, Number],
    reload: Function,
    reSelect: Function,
    setConfig: Function,
    plain: Boolean,
    align: String,
    size: {
      type: String,
      default: "mini"
    },
    circle: Boolean,
    tableData: Array
  },
  created() {
    if (this.btns) {
      for (let key in this.btns) {
        this.$set(this.btns[key], "loading", false);
        if (this.btns[key].inMore) {
          this.btnsLength = true;
        }
      }
    }
  },
  computed: {
    btnList() {
      return this.btns;
    },
    placement() {
      if (this.block) {
        return "right";
      } else {
        return "top";
      }
    },
    eventData() {
      return {
        page: this.page,
        item: this.item,
        table: this.table,
        reload: this.reload,
        tabValue: this.tabValue,
        reSelect: this.reSelect,
        setConfig: this.setConfig,
        btnLoad: this.btnLoad,
        tableData: this.tableData
      };
    }
  },
  methods: {
    getFile(v) {
      this.$emit("getFile", true);
    },
    startLoad(){
      this.$emit('startLoad',true)
    },
    outdata1(v) {
      this.$emit("outdata2", v);
    },
    btnLoad(b = true) {
      this.loading = b;
    },

    btnClick(btn) {
      let e = this.eventData;
      e.btn = btn;
      btn.click(e);
    },
    checkDisabled(btn) {
      if (typeof btn.disabled === "undefined") {
        return false;
      } else if (typeof btn.disabled === "function") {
        return btn.disabled(this.eventData);
      }
    },
    checkHide(btn) {
      let isShow;
      if (btn.hidden) {
        if (typeof btn.hidden === "function") {
          isShow = !btn.hidden(this.eventData);
        } else {
          isShow = false;
        }
      } else {
        return true;
      }
      return isShow;
    },
    add(cb) {
      const key = new Date().getTime() + "";
      this.$set(this.btns, key, {
        key,
        txt: "按钮"
      });
      cb(key);
    }
  }
};
</script>
<style lang="scss">
// 按钮组件
.btns {
  list-style: none;
  padding: 0;
  margin: 0 0 1rem 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  .btn {
    padding: 0 1rem 0 0;

    .el-button {
      &.is-disabled {
        border: 1px solid #e3e3e3;
        background-color: #e3e3e3;
        border-color: #e3e3e3;
      }
    }

    &:last-of-type {
      padding: 0;
    }
  }

  &.block {
    display: block;

    li {
      margin: 1rem 0 0 0;
    }
  }
}
</style>
