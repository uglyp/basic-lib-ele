<template>
  <div class="qh-date-range">
    <van-field
      readonly
      clickable
      label
      placeholder="开始时间"
      @click="show[0] = true"
      :value="formValue[0]"
      icon-prefix="my-icon"
      right-icon="iconriqi"
    />
    <span class="l">至</span>
    <van-field
      readonly
      clickable
      label
      placeholder="结束时间"
      @click="show[1] = true"
      :value="formValue[1]"
      icon-prefix="my-icon"
      right-icon="iconriqi"
    />
    <van-popup v-model="show[0]" position="bottom" get-container="body">
      <van-datetime-picker
        v-model="b"
        @confirm="v => onConfirm(v, 0)"
        @cancel="show[0] = false"
        :max-date="fw[1]"
      />
    </van-popup>
    <van-popup v-model="show[1]" position="bottom" get-container="body">
      <van-datetime-picker
        v-model="e"
        @confirm="v => onConfirm(v, 1)"
        @cancel="show[1] = false"
        :min-date="fw[0]"
      />
    </van-popup>
  </div>
</template>
<script>
import { uDate } from "../../../element/";
export default {
  name: "conDateRange",
  props: {
    value: {
      type: Array,
      default(c) {
        return c || [];
      }
    },
    c: {
      type: Object,
      default(c) {
        return c || {};
      }
    }
  },
  data() {
    return {
      show: { 0: false, 1: false },
      formValue: [],
      b: new Date(),
      e: new Date(),
      children: [1, 2],
      fw: [new Date(), undefined]
    };
  },
  methods: {
    onConfirm(v, i) {
      this.value[i] = uDate(v, "yyyy-MM-dd hh:mm:ss");
      this.formValue[i] = this.value[i];
      this.show[i] = false;
      this.fw[i] = v;
    }
  }
};
</script>
