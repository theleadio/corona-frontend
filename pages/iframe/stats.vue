<template>
  <div class="container">
    <a href="/" target="_blank">
      <logo class="lg:flex mb-4" style="pointer-events:none;" />
    </a>

    <TopStats
      :is-loading="isLoadingCountryStats"
      :country-stats="countryStats"
      :show-title="false"
    />
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
    data() {
      return {
        isLoadingCountryStats: false,
        countryStats: [],
      }
    },
    methods: {
      async fetchCountryStats() {
        this.isLoadingCountryStats = true;
        try {
          this.countryStats = await this.$api.stats.getTopNCountryStats();
        }
        catch (ex) {
          console.log('[fetchCountryStats] Error:', ex);
        }
        finally {
          this.isLoadingCountryStats = false;
        }
      }
    },
    created() {
      this.fetchCountryStats();
    },
  };
</script>
<style scoped>
</style>