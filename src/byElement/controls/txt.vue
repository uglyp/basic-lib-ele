<template>
  <span v-if="!element" v-loading="load" class="el-txt" v-html="view"></span>
  <component v-else :is="element" :config="cfg" ref="con" />
</template>
<script>
import control from "../mixins/control";
import { conUploadImg, conUpload2, conUpload, conTable } from "../../../element/";
// import noImg from "../../assets/img/no-img.png";
export default {
  mixins: [control],
  data() {
    return {
      load: false,
      map: null,
      daoVal: null,
      element: null,
      tmpConfig: null
    };
  },
  created() {
    if (typeof this.value === "undefined") {
      this.val = null;
    } else {
      this.val = this.value;
    }
  },
  computed: {
    returnValue() {
      return this.val;
    },
    cfg: {
      get() {
        return this.tmpConfig;
      },
      set(conf) {
        this.tmpConfig = conf;
      }
    },
    view() {
      // let h = this.$createElement;
      this.cfg = this.config;
      // $c.log(123, this.val);
      if (typeof this.val !== "number" && !this.val) {
        return "-";
      } else if (this.el === conUploadImg || (this.el === conUpload && this.cfg.isImg)) {
        let imgs = this.val.map(r => {
          return `<div class="img"><img src="${r.FILE_URL}"></div>`;
        });
        return imgs.join("");
      } else if (this.el === conUpload2 || (this.el === conUpload && !this.cfg.isImg)) {
        let imgs = this.val.map(r => {
          return `<a class="link target="_blank" href="${r.FILE_URL}?rna=${r.FILE_NM}&dl=1">${r.FILE_NM}</a>`;
        });
        return imgs.join("");
      } else if (this.el === conTable) {
        this.element = conTable;
        this.cfg = this.config;
        this.cfg.edit = false;
        this.$nextTick(() => {
          this.$refs.con.setValue(this.val);
        });
      } else if (this.config.map) {
        return this.config.map[this.val];
      } else if (this.config.dao) {
        // $c.log(this.val, typeof this.val !== "number" && !this.val);
        let { val } = this;
        this.byDao(val);
        return this.daoVal;
      } else {
        return this.val;
      }
    }
  },
  methods: {
    byDao() {
      this.load = true;
      this.config
        .dao()
        .then(r => {
          this.load = false;
          let item = r.filter(r => {
            return String(r.key) === String(this.val);
          })[0];
          if (item) {
            this.daoVal = item.txt;
          } else {
            // $$.msg.error("dao匹配失败");
            // $c.error(r, this);
          }
        })
        .catch(() => (this.load = false));
    }
  }
};
</script>
