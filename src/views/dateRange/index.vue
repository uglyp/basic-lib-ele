<template>
  <div class="info-page">
    <tmp-info :config="config"></tmp-info>
  </div>
</template>
<script>
import {
  conDateRange
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
            txt: "时间范围",
            el: conDateRange,
            className:"big",
          },
        },
      }
    }
  }
};
</script>
