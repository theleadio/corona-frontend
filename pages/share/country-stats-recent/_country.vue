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
    name: "ShareCountryStatsRecent",
    layout: "blank",
    components: {
      Flag,
      Logo,
      Stats
    },
    data: function() {
      return {};
    },
    computed: {
      country() {
        const countryToFind = this.$route.params.country;
        const countryEntry = COUNTRIES.find(country => country.urlAliases.includes(countryToFind));
        return countryEntry || {}
      },
      countryCode() {
        const countryToFind = this.$route.params.country;
        const countryEntry = COUNTRIES.find(country => country.urlAliases.includes(countryToFind));
        return countryEntry?.code
      }
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
