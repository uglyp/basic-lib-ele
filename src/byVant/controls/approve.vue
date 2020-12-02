<template>
  <ul class="qh-approve">
    <li v-for="(t,k) in formValue" :key="k">
      <strong class="status" v-text="t.REMARK"></strong>
      <div class="r">
        <span class="name" v-text="`${t.OPERATORDEPT?t.OPERATORDEPT+'/':''}${t.OPERATORNAME}`"></span>
        <span class="dt" v-text="`${t.OPERATEDATE} ${t.OPERATETIME}`"></span>
        <!-- <span class="msg" v-text="t.REMARK"></span> -->
      </div>
    </li>
  </ul>
</template>
<script>
export default {
  name: "conApprove",
  data() {
    return {
      formValue: null
    };
  },
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
  created() {
    this.formValue = this.value;
  },
  methods: {}
};
</script>