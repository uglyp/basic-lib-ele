<template>
  <div class="info-page">
    <tmp-info :config="config"></tmp-info>
  </div>
</template>
<script>
import {
  conCheckbox
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
          dateRange: {
            txt:'复选框',
            el:conCheckbox,
            config:{
              disabled:false,
              whether:"djsalfdk"
            }
          },
        afdaf: {
            txt:'复选框',
            el:conCheckbox,
            value:true,
            config:{
              disabled:true,
              whether:"djsalfdk"
            }
          },
        },
      }
    }
  }
};
</script>
