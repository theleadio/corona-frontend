<template>
  <div class="container">
    TODO
  </div>
</template>
<script>
  import Flag from '~/components/Flag';
  import Logo from '~/components/Logo';
  import Stats from '~/components/Analytics/Stats';

  export default {
    name: "ShareGlobalStatsToday",
    layout: "blank",
    components: {
      Flag,
      Logo,
      Stats
    },
    data: function() {
      return {};
    },
    methods: {
      loadStats() {
        //
      },
    },
    created() {
      this.loadStats();
    },
  };
</script>
<style scoped>
</style>
