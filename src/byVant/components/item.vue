<template>
  <div v-if="list.length">
    <div class="item" v-for="t in list" :key="t.SN">
      <span
        :class="{ checked: t === checkedItem }"
        :style="{ paddingLeft: `${lv}rem` }"
        class="txt"
        @click="change(t)"
      >
        <i
          :class="['jt', { empty: !t.ITEMS || !t.ITEMS.length, open: t.SN === openID }]"
          class="jt"
        />
        <span v-text="t.NM"></span>
      </span>
      <item
        :class="['children', { on: t.SN === openID }]"
        :list="t.ITEMS"
        :parent="`${parent || ''}/${t.NM}`"
        @check="check"
        :lv="lv + 1"
        :props="props"
        ref="item"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: "item",
  props: {
    parent: String,
    props: {
      type: Object,
      default(v) {
        return v || {};
      }
    },
    list: Array,
    lv: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      p: "",
      openID: null,
      checkedItem: null
    };
  },
  // computed:{
  //   checkItems(){
  //     return function(i){

  //     }
  //   }
  // },
  methods: {
    open(ids = []) {
      $c.log("item中的open", this.list);
      if (ids.length) {
        const item = this.list.filter(r => {
          return r.SN === ids[0];
        })[0];
        if (ids.length > 1) {
          // let $t = this.$refs.item.filter((r) => {
          //   return r.list.filter((r) => {
          //     return ids.includes(r.SN);
          //   })[0];
          // })[0];
          if (item) {
            // this.change(item);
            let p = `${this.parent ? this.parent + "/" : ""}${item.NM || ""}`;
            this.p = p;
            // this.check(item, p);
          }
          if (ids.length === 1) {
            // $c.log(112233);
            let id = ids[0];
            let $t = this.$refs.item.filter(r => {
              return r.list.filter(r => {
                return id === r.SN;
              })[0];
            })[0];
            if ($t) {
              let has = $t.open(
                ids.filter((r, i) => {
                  return i > 0;
                })
              );
              // $c.log(123, !!has);
              return !!has;
            }
          }
        }
      } else {
        return false;
      }
    },
    clear() {
      this.openID = null;
      this.checkedItem = null;
      if (this.$refs.item) {
        for (let $item of this.$refs.item) {
          $item.clear();
        }
      }
    },
    check(t, p) {
      this.$emit("check", t, p || this.p);
    },
    change(t) {
      // if (this.openID === t.SN) {
      //   this.openID = null;
      // } else {
      //   this.openID = t.SN;
      // }
      $c.log(t,'tttttttt')
      t.SN === this.openID ? (this.openID = null) : (this.openID = t.SN);
      let p = `${this.parent ? this.parent + "/" : ""}${t.NM || ""}`;
      this.p = p;
      if (t === this.checkedItem) {
        this.clear();
        this.checkedItem = null;
      } else {
        this.checkedItem = t;
      }
      this.check(t, p);
    }
  }
};
</script>
