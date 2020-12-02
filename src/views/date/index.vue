<template>
  <div class="info-page">
    <tmp-info :config="config"></tmp-info>
  </div>
</template>
<script>
import {
  conDate
} from "../../../element/";
import tmpInfo from "../../byElement/tmp/info";
export default {
  components: {
    tmpInfo,
  },
  data() {
    return {
      config: {
        form: {
          a: 1,
          b: 2,
          dateRange: {
            txt: "发布时间",
            el: conDate,
            config:{
              type:"datetime"
            }
          },
        },
      }
    }
  }
};
</script>
