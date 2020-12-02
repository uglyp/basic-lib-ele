<template>
  <div class="info-page">
    <tmp-info :config="config"></tmp-info>
  </div>
</template>
<script>
import tmpInfo from "../../byElement/tmp/info";
const required = true;
export default {
  components: {
    tmpInfo,
  },
  data() {
    return {
      config: {
        form: {
          dateRange: {
            txt:'是否开关',
            rule: { required },
            config:{
              type:"textarea",
            },
            classname:""
          },
        },
      }
    }
  }
};
</script>
