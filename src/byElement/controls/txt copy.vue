<template>
  <span v-loading="load" class="el-txt" v-html="showTxt"></span>
</template>
<script>
import control from "../mixins/control";
export default {
  mixins: [control],
  data() {
    return {
      load: false,
    };
  },
  computed: {
    returnValue() {
      return this.val;
    },
    showTxt: {
      set(val) {
        this.val = val;
      },
      get() {
        return this.getMap(this.val);
      },
    },
  },
  methods: {
    byDao(txt) {
      this.load = true;
      this.config.dao().then((r) => {
        let tmp = [];
        for (let row of r) {
          if (
            txt &&
            typeof txt === "object" &&
            typeof txt.length !== "undefined"
          ) {
            for (let v of txt) {
              if (row.key + "" === v + "") {
                tmp.push(row.txt);
              }
            }
          } else {
            if (row.key + "" === txt + "") {
              tmp.push(row.txt);
              break;
            }
          }
        }
        this.load = false;
        this.config.dao = null;
        this.showTxt = tmp.join(",");
      });
    },
    getMap(val) {
      let txt = val;
      if (this.config.dao) {
        this.byDao(val);
      } else if (this.config.map) {
        txt = this.config.map[txt];
      } else if (!txt && typeof txt !== "number") {
        txt = "-";
      }
      return txt;
    },
  },
};
</script>
