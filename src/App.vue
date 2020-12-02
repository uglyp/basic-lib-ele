<template>
  <tmp-app :config="{menu}" test />
</template>
<script>
import tmpApp from "./byElement/tmp/app";
import menu from "./menu";
export default {
  components: {
    tmpApp,
  },
  data() {
    return {
      menu,
    };
  },
  created() {
    window.$app = this;
  },
};
</script>
