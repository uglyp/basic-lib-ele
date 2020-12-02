<template>
  <el-aside :width="width" :class="['left-menu', { open }]" v-loading="!menu">
    <el-menu
      class="main-menu"
      :default-active="curRoute"
      router
      ref="menu"
      collapse-transition
      @select="collapse"
      unique-opened
    >
      <menu-item
        v-for="m in menu"
        ref="menuleng"
        :key="m.id"
        :id="m.id"
        :c="m.c"
        :t="m.t"
        :u="m.u"
        :i="m.i"
        :ic="m.ic"
        :tip="m.tip"
        :code="m.code"
        :codeArr="config.code"
      ></menu-item>
    </el-menu>
    <el-button
      class="open-btn"
      type="text"
      :icon="!open ? 'el-icon-arrow-right' : 'el-icon-arrow-left'"
      @click="open = !open"
    ></el-button>
    <span class="drag el-icon-rank" @mousedown="beginDrag"></span>
  </el-aside>
</template>
<script>
import menuItem from "./MenuItem";
import { Menu, Aside, Button } from "element-ui";
export default {
  mounted(){
    if(this.config.code.length==0){
      window.$$.msg.error('暂无权限，请联系系统管理员')
      $$.rto("/noAccess");
    }else{
      this.thisds = this.config.code.reverse()[0]
      this.eacs(this.menu)
    }
  },
  components: {
    menuItem,
    elMenu: Menu,
    elAside: Aside,
    elButton: Button
  },
  props: {
    config: {
      menu: {
        type: Array,
        default: null
      },
      code: {
        type: Array,
        default: null
      }
    },
    min: {
      type: Number,
      default: 40
    },
    max: {
      type: Number,
      default: 300
    }
  },
  data() {
    return {
      thisds:null,
      open: false,
      begin: false,
      target: null,
      w: 140,
      exist: false,
      show: true,
      path: null
    };
  },
  computed: {
    menu() {
      // $c.log(this.config.menu);
      // $c.log(123, this.config.menu);
      if (this.config.menu) {
        return this.config.menu.filter(r => {
          return !!r;
        });
      }
    },
    pathList() {
      let list = [];
      let { menu } = this.config;
      if (menu) {
        const addPath = menu => {
          if (menu) {
            for (let m of menu.filter(r => !!r)) {
              list.push(m.u);
              addPath(m.c);
            }
          }
        };
        addPath(menu);
        return list;
      }
    },
    // 宽度
    width() {
      return this.w + "px";
    },
    // 当前路由
    curRoute() {
      this.show = true;
      window.$r = this.$route;
      if ($r) {
        let { matched, params } = window.$r;
        let path;
        for (let i = matched.length - 1; i >= 0; i--) {
          path = matched[i].path;
          for (let k in params) {
            path = path.replace(`:${k}`, `${[params[k]]}`);
          }
          path += "/";
          if (!this.pathList || this.pathList.includes(path)) {
            break;
          } else {
            path = "";
          }
        }
        if (!matched.length || path) {
          return path;
        } else {
          $$.rto("/noAccess");
        }
      }
    }
  },
  created() {
    window.addEventListener("mousemove", this.moveDrag);
    window.addEventListener("mouseup", () => (this.begin = false));
  },
  methods: {
    eacs(items){
      for(let v of items){
        // $c.log(v.code , this.thisds)
        if(v.code == this.thisds){
          this.incode(v)
        }
        if(v.c&&v.c.length!=0){
          this.eacs(v.c)
        }
      }
    },
    incode(items){
      if(items.c&&items.c.length>1){
        this.incode(items.c)
      }else{
        //$to(items[0].u)
      }
        
      
    },
    collapse(route, path) {
      sessionStorage.setItem("page", 1);
      for (let menuItem of this.$refs.menu.$children) {
        if (menuItem.u !== path[0]) {
          this.$refs.menu.close(menuItem.u);
        }
      }
    },
    // 开始拖动
    beginDrag(e) {
      this.begin = e.button === 0;
      this.target = e.target;
    },
    // 拖动计算
    moveDrag(e) {
      if (this.begin) {
        let w = e.clientX + this.target.offsetWidth / 2;
        if (w < this.min) {
          w = this.min;
        } else if (w > this.max) {
          w = this.max;
        }
        this.w = w;
      }
    }
  }
};
</script>
