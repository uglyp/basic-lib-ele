<template>
  <div class="info-page">
    <com-form :form="config" ref="configForm"></com-form>
  </div>
</template>
<script>
import { comForm, conPassword } from "../../../element/";
export default {
  components: {
    comForm,
    conPassword,
  },
  data() {
    return {
      config: {
        PWD: {
          el: conPassword,
          rule: { required: true }, // 密码组件为为必填项
          className: "form-item-pwd", // 必带
          config: {
            org: "Leedada123456789", //原密码
          },
        },
      },
    };
  },
};
</script>
