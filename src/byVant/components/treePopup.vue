<template>
  <van-popup
    class="select-tree"
    v-model="show"
    position="bottom"
    get-container="body"
    @close="close"
  >
    <ul class="logs" v-if="!c.noLog && logs.length">
      <li v-for="(t, k) in logs" :key="k" v-text="t"></li>
    </ul>
    <div class="p">
      <div class="top">
        <span class="cancel" @click="show = false">取消</span>
        <strong v-text="c.txt"></strong>
        <span class="submit" @click="submit">确认</span>
      </div>
      <div class="btm">
        <div class="left">
          <item ref="item" :list="c.map" :props="c.props" @check="check" />
        </div>
        <div class="right">
          
            
          <template v-if="items && items.length">
            <van-checkbox-group v-model="checked" @change="change" :class="{active:!c.radio}">
              <van-checkbox
                v-for="t in items"
                :key="t.id"
                
                icon-size="1.4rem"
                :shape="c.radio ? 'round' : 'square'"
                :name="t.id"
                >{{ t.txt }}</van-checkbox
              >
            </van-checkbox-group>
            <van-checkbox
                key="qx"
                v-model="qx"
                :class="{active:!c.radio}"
                icon-size="1.4rem"
                :shape="c.radio ? 'round' : 'square'"
                name="qx"
                v-show="!c.radio"
                @click="chans"
                >全选</van-checkbox
              >
          </template>
          <van-empty v-else image="search" description="没有子项" />
        </div>
      </div>
    </div>
  </van-popup>
</template>
<script>
import item from "./item";
export default {
  components: { item },
  props: {
    config: Object
  },
  data() {
    return {
      items: [],
      checked: [],
      old: [],
      logs: [],
      names: [],
      show: false,
      parent: null,
      all: true,
      checking: false,
      qx: false
    };
  },
  watch: {
    checking() {
      this.changeCheck();
    }
  },
  computed: {
    c: {
      set(c) {
        this.config = c;
      },
      get() {
        return this.config || {};
      }
    }
  },
  methods: {
    changeCheck() {
      this.all = true;
      if (this.checked.length == 0) {
        this.all = false;
      }
      for (let v of this.checked) {
        // if((!(this.items.map(s=>s.id)).includes(v+'')&&v!='qx')||(this.checked.length==1&&this.checked[0]=='qx')){
        for (let e of this.items.map(k => k.id)) {
          // $c.log(this.checked.includes(e))
          if (!this.checked.includes(e)) {
            this.all = false;
          }
        }
        // }
      }
      if (this.all) {
        this.qx = true;
      } else {
        this.qx = false;
      }
    },
    chans(e) {
      if (this.qx) {
        for (let i of this.items.map(v => v.id)) {
          if (!this.checked.includes(i)) {
            this.checked.push(i);
          }
        }
      } else {
        for (let i of this.items.map(v => v.id)) {
          if (this.checked.includes(i)) {
            this.checked.splice(this.checked.indexOf(i), 1);
          }
        }
      }
    },
    setValue(v) {
      this.checked = v.keys;
      this.old = JSON.parse(JSON.stringify(this.checked));
      this.checking = !this.checking
    },
    clear() {
      this.items = [];
      this.checked = [];
      this.$refs.item && this.$refs.item.clear();
      this.checking = !this.checking
    },
    open() {
      this.show = true;
      this.$nextTick(() => {
        this.setLogs(this.checked);
      });
    },
    close() {
      this.checked = JSON.parse(JSON.stringify(this.old));
      this.checking = !this.checking;
    },
    submit() {
      this.old = JSON.parse(JSON.stringify(this.checked));
      $c.log(this.checked,this.names,this.c)
      this.$emit("change", {
        keys: this.checked,
        vals: this.names,
        config: this.c
      });
      this.show = false;
    },
    change(list) {
      this.setLogs(list);
      if (this.c.radio) {
        if (list.length > 1) {
          this.checked.splice(0, 1);
        }
      }
      this.checking = !this.checking;
    },
    check(t, parent) {
      this.parent = parent;
      let { c } = this.c.props || {};
      // $c.log(322, t);
      // $c.log(2232323, c);
      if (c) {
        if (t[c]) {
          this.items = t[c].map(r => {
            return {
              id: r.SN,
              txt: r.NM
            };
          });
        } else {
          this.items = [];
        }
      } else {
        //右侧数据只拿到没有子项的那部分
        // this.items = t.ITEMS.filter(r => {
        //   return !r.ITEMS || !r.ITEMS.length;
        // }).map(r => {
        //   return {
        //     id: r.SN,
        //     txt: r.NM
        //   };
        // });
        //右侧拿到点击左侧项显示该项所有的子项
        this.items = t.ITEMS.map(r => {
          return {
            id: r.SN,
            txt: r.NM
          };
        });
      }
      this.checking = !this.checking;
      // this.setLogs(this.checked);
    },
    setLogs(list) {
      // $c.log(333)
      let logs = [];
      let logSN = [];
      let names = [];
      const setMap = (map = [], p = []) => {
        let user;
        for (let m of map) {
          for (let u of list) {
            user = m.ITEMS.filter(r => {
              return r.SN === u;
            })[0];
            if (user) {
              user = m.ITEMS.filter(r => {
                return r.SN === u;
              })[0];
            } else {
              user = m.ITEMS_U.filter(r => {
                return r.SN === u;
              })[0];
            }
            if (user && !logSN.includes(user.SN)) {
              // $c.log(123, logs, user);
              logSN.push(user.SN);
              names.push(user.NM);
              logs.push(
                [...p, m, user]
                  .map(r => {
                    return r.NM;
                  })
                  .join("/")
              );
              this.$refs.item.open(
                [...p, m].map(r => {
                  return r.SN;
                })
              );
            }
          }
          setMap(m.ITEMS, [...p, m]);
        }
      };
      setMap(this.c.map);
      this.logs = logs;
      this.names = names;
    }
  }
};
</script>
