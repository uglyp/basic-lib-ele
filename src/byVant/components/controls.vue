<template>
  <component :is="t.el" :c="t" :ref="k"></component>
</template>
<script>
export default {
  props: {
    k: String,
    t: Object
  }
};
</script>
