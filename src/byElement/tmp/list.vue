<template>
  <el-container class="list-page" v-if="config">
    <slot name="left"></slot>
    <el-main class="f-c-g">
      <el-header :class="['settings', { open: isOpen }]" ref="head">
        <com-form class="search-form" size="mini" ref="form" :form="config.searchItem" inline :disabled="load">
          <template slot="last-item">
            <com-btns
              v-if="table"
              :btns="config.pageBtns"
              :page="page"
              :table="table"
              :item="table.selection"
              :reload="search"
              :setConfig="setConfig"
              :reSelect="table.setCurrentRow"
            >
              <li slot="first-btn" class="btn" v-if="config.searchItem">
                <el-button type="primary" @click="search">搜索</el-button>
                <el-button type="primary" @click="clear">重置</el-button>
              </li>
            </com-btns>
          </template>
        </com-form>
        <el-button
          class="other"
          v-if="showOther"
          :icon="isOpen ? 'el-icon-arrow-left' : 'el-icon-arrow-down'"
          size="mini"
          type="text"
          @click="open"
        ></el-button>
      </el-header>
      <el-main class="list-table">
        <con-table v-if="searchList && show" :config="config" :on="on" :searchList="searchList" :otherSearch="otherSearch" ref="table"></con-table>
      </el-main>
      <slot></slot>
    </el-main>
  </el-container>
  <el-alert v-else title="list模板缺少config配置" type="error"></el-alert>
</template>
<script>
import { Container, Header, Main, Button, Alert } from "element-ui";
import { testTable, comForm, comBtns } from "../../../element/";
export default {
  components: {
    conTable: testTable,
    comForm,
    comBtns,
    elContainer: Container,
    elHeader: Header,
    elMain: Main,
    elButton: Button,
    elAlert: Alert
  },
  props: {
    config: Object
  },
  data() {
    const more = window.config.more;
    return {
      searchList: null,
      otherSearch: null,
      table: null,
      page: this,
      load: false,
      show: true,
      showOther: false,
      isOpen: !more || false,
      more
    };
  },
  computed: {
    on() {
      let on = this.config.on || {};
      on.over = () => {
        this.load = false;
      };
      return on;
    },
    conTable() {
      return this.$refs.table;
    }
  },
  mounted() {
    if (this.$refs.form) {
      this.searchList = this.$refs.form.getDatas();
      this.$nextTick(() => {
        this.table = this.$refs.table;
      });
      this.showOther = this.more && this.$refs.form.$el.scrollHeight > this.$refs.head.$el.offsetHeight;
    }
  },
  methods: {
    toLoad() {
      this.load = true;
      this.$refs.table.load = true;
    },
    open() {
      this.isOpen = !this.isOpen;
    },
    reDraw() {
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    setConfig(cb) {
      if (cb) {
        cb(this.config, this.reDraw);
      }
    },
    search() {
      this.load = true;
      this.searchList = this.$refs.form.getDatas();
      this.$nextTick(() => this.$refs.table.getData(1));
    },
    searchOther(other) {
      this.load = true;
      this.otherSearch = other;
      this.$nextTick(() => this.$refs.table.getData(1));
    },
    clear() {
      this.load = true;
      for (let key in this.searchList) {
        this.searchList[key] = "";
      }
      this.$refs.form.setDatas(this.searchList);
      this.$refs.table.getData(1);
    },
    getData(isClear) {
      this.load = true;
      if (isClear) {
        this.clear();
      }
      this.$refs.table.getData();
    }
  }
};
</script>
