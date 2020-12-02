<template>
  <div class="info-page">
    <tmp-info :config="config"></tmp-info>
  </div>
</template>
<script>
import { testForm, conLink } from "../../../element/";
import tmpInfo from "../../byElement/tmp/info";
export default {
  components: {
    comForm: testForm,
    tmpInfo,
    conLink,
  },
  data() {
    return {
      config: {
        form: {
          dateRange: {
            txt: "超链接",
            value: "KJ-10",
            el: conLink,
            config: {
              clickEvent() {
                $$.to("/switch/");
              },
            },
          },
          adfjl: {
            txt: "超链接",
            value: "百度一下",
            el: conLink,
            config: {
              clickEvent() {
                window.open("https://www.baidu.com/", "_blank");
              },
            },
          },
        },
      },
    };
  },
};
</script>