<template>
  <el-submenu :index="u||id+''" v-if="show &&c && c.length">
    <template slot="title">
      <el-tooltip v-if="tip" effect="dark" :content="tip" placement="right">
        <span>
          <i :class="['icon',ic]" v-html="i"></i>
          <span class="txt" v-text="t"></span>
        </span>
      </el-tooltip>
      <span class="el-tooltip" v-else>
        <i :class="['icon',ic]" v-html="i"></i>
        <span class="txt" v-text="t"></span>
      </span>
    </template>
    <el-menu-item-group>
      <menu-item
        v-for="m in c"
        :key="m.id"
        :u="m.u"
        :t="m.t"
        :c="m.c"
        :i="m.i"
        :ic="m.ic"
        :h="m.h"
        :tip="m.tip"
        :code="m.code"
        :codeArr="codeArr"
      ></menu-item>
    </el-menu-item-group>
  </el-submenu>
  <el-menu-item v-else-if="show" :index="u||id+''">
    <template slot="title">
      <el-tooltip v-if="tip" effect="dark" :content="tip" placement="right">
        <i :class="['icon',ic]" v-html="i"></i>
        <span class="txt" v-text="t"></span>
      </el-tooltip>
      <span class="el-tooltip" v-else>
        <i :class="['icon',ic]" v-html="i"></i>
        <span class="txt" v-text="t"></span>
      </span>
    </template>
  </el-menu-item>
</template>
<script>
import { Submenu, Tooltip, MenuItem, MenuItemGroup } from "element-ui";
export default {
  name: "menuItem",
  components: {
    elSubmenu: Submenu,
    elTooltip: Tooltip,
    elMenuItem: MenuItem,
    elMenuItemGroup: MenuItemGroup,
  },
  computed: {
    show() {
      return !this.code || !this.codeArr || this.codeArr.includes(this.code);
    },
  },
  props: {
    c: Array,
    u: String,
    i: String,
    ic: String,
    t: String,
    id: [String, Number],
    tip: String,
    code: String,
    codeArr: Array,
  },
};
</script>
