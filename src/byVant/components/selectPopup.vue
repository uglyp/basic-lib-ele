<template>
  <van-popup
    class="select-prop"
    v-if="config"
    v-model="show"
    position="bottom"
    get-container="body"
  >
    <van-picker
      v-if="!multiple"
      show-toolbar
      :columns="columns"
      v-model="val"
      @confirm="onConfirm"
      @cancel="show = false"
    />
    <template v-else>
      <div class="top">
        <span class="cancel" @click="show = false">取消</span>
        <strong v-text="config.txt"></strong>
        <span class="submit" @click="submit">确认</span>
      </div>
      <van-checkbox-group v-model="val">
        <van-checkbox :name="c.v" v-for="c in columns" :disabled="isDisabled(c.d)" :key="c.v">{{
          c.n
        }}</van-checkbox>
      </van-checkbox-group>
    </template>
  </van-popup>
</template>
<script>
export default {
  props: { config: Object },
  data() {
    return {
      val: [],
      show: false
    };
  },
  computed: {
    columns() {
      // let list = [];
      // for (let k in this.config.list) {
      //   list.push(this.config.list[k]);
      // }
      // $c.log(list);
      return this.config.list;
      // return list;
    },
    multiple() {
      return this.config.multiple;
    }
  },
  methods: {
    isDisabled(num) {
      return Boolean(num);
    },
    open() {
      // $c.log(333, this.item, this.list);
      // let txts = [];
      // if (this.c.multiple) {
      //   for (let key of this.item.val) {
      //     $c.log(11, key);
      //     txts.push(this.list[key]);
      //   }
      // } else {
      // }
      // this.txt =
      $c.log(this.config.val, this.val, "open");
      if (this.multiple) {
        if (this.val.length) {
          this.val = this.val || [];
        } else {
          this.val = this.config.val || this.val || [];
        }
      } else {
        this.val = this.config.val;
      }
      this.show = true;
    },
    submit() {
      $c.log(this.val, "********");
      // this.onConfirm(this.val || "", this.val || ""); //数组
      this.onConfirm(this.val.join(), this.val.join()); //字符串
    },
    onConfirm(t, v) {
      $c.log(t, v, this.val, "select");
      // $c.log(22, t, v);
      this.$emit("onConfirm", t, v);
      this.show = false;
    }
  }
};
</script>
