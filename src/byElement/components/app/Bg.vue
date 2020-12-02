<template>
  <div class="bg" :style="{backgroundImage:`url(${bg})`}">
    <slot />
  </div>
</template>
<script>
export default {
  data() {
    const { app } = this.$store.getters;
    // $c.log(33, app);
    return {
      bg: app.bg,
    };
  },
};
</script>
