<template>
  <div class="info-page">
    <tmp-info :config="config"></tmp-info>
  </div>
</template>
<script>
import {
  conSwitch
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
            txt:'是否开关',
            el: conSwitch,
            config:{
              change(e){
                $c.log(e)
              }
            }
          },
          txt: {
            txt:'是否开关',
            el: conSwitch,
            config:{
              change(e){
                $c.log(e)
              }
            }
          },
        },
      }
    }
  }
};
</script>
