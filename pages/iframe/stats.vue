<template>
  <div class="container">
    <a href="/" target="_blank">
      <logo class="lg:flex mb-4" style="pointer-events:none;" />
    </a>

    <TopStats :limit="999" :show-title="false" />
  </div>
</template>
<script>
  import Logo from '~/components/Logo';
  import TopStats from '~/components/TopStats';

  export default {
    layout: "blank",
    components: {
      Logo,
      TopStats,
    },
  };
</script>
<style scoped>
</style>