<template>
  <div class="qh-checkbox">
    <span class="label" v-text="c.txt"></span>
    <van-icon class="btn" color="#417dee" class-prefix="my-icon" name="xuanren" @click="open"></van-icon>
    <div class="checked">
      <span
        v-for="(t,k) in checkList"
        :class="{'readonly':t.readonly}"
        :key="k"
        v-text="t.LASTNAME"
        @click="remove(t)"
      ></span>
    </div>
    <van-dialog
      class="checkboxDialog"
      v-model="show"
      :title="c.txt"
      show-cancel-button
      get-container=".main"
      :showCancelButton="false"
    >
      <van-checkbox-group v-if="c.map &&c.map.length" v-model="checkList">
        <van-checkbox v-for="(t) in c.map" :key="t.ID" :name="t" shape="square">{{t.LASTNAME}}</van-checkbox>
      </van-checkbox-group>
      <span v-else>暂无数据</span>
    </van-dialog>
  </div>
</template>
<script>
export default {
  name: "conCheckbox",
  props: {
    k: String,
    value: {
      type: Array,
      default(c) {
        return c || [];
      },
    },
    c: {
      type: Object,
      default(c) {
        return c || {};
      },
    },
  },
  data() {
    return {
      checkList: [],
      show: false,
      checks: [],
    };
  },
  computed: {
    formValue: {
      set(v) {
        this.checkList = v.map((r) => {
          r.readonly = true;
          return r;
        });
      },
      get() {
        if (!this.checkList) {
          return [];
        }
        let list = this.checkList.map((r) => {
          return r.ID + "";
        });
        return list;
      },
    },
  },
  watch: {
    checkList: {
      deep: true,
      handler(v) {
        window.$people = window.$people || {};
        window.$people[this.k] = v;
      },
    },
  },
  created() {
    this.formValue = this.value;
    this.getData();
  },
  methods: {
    setList(list) {
      return list.filter((p) => {
        let b = true;
        for (let k in window.$people) {
          b = !window.$people[k].filter((r) => {
            return p.ID === r.ID;
          }).length;
          if (!b) {
            return b;
          }
        }
        return b;
      });
    },
    open() {
      this.c.map = this.setList(this.c.map);
      this.$nextTick(() => {
        this.show = true;
      });
    },
    getData() {
      if (this.c.dao) {
        this.c.dao().then((r) => {
          this.c.map = r;
        });
      }
    },
    remove(t) {
      if (t.readonly) {
        return;
      }
      this.checkList = this.checkList.filter((r) => {
        return r !== t;
      });
    },
  },
};
</script>