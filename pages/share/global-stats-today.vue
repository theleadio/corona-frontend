<template>
  <div class="container clearfix">

    <h1 class="text-2xl font-extrabold">{{ $t('Global COVID-19 Stats Today') }}</h1>
    <h3>{{ currentDate }}</h3>

    <div class="flex flex-row lg:flex-row pt-5 pb-6 text-center">
      <div class="flex-1">
        <p class="text-2xl font-bold text-red-600">{{ confirmed | formatNumber }}</p>
        <p class="text-sm font-bold text-red-600">{{ $t('Total Confirmed') }}</p>
      </div>

      <div class="flex-1">
        <p class="text-2xl font-bold text-green-600">{{ recovered | formatNumber }}</p>
        <p class="text-sm font-bold text-green-600">{{ $t('Total Recovered') }}</p>
      </div>

      <div class="flex-1">
        <p class="text-2xl font-bold text-gray-600">{{ deaths | formatNumber }}</p>
        <p class="text-sm font-bold text-gray-600">{{ $t('Total Deaths') }}</p>
      </div>
    </div>

    <TopStats :limit="10" :show-title="false" :show-source="false" :show-footer="false" :country-stats="countryStats" class="pb-5" />

    <logo class="lg:flex mb-4 float-right h-8" />

  </div>
</template>
<script>
  import Flag from '~/components/Flag';
  import Logo from '~/components/Logo';
  import TopStats from '~/components/TopStats';
  import moment from "moment";

  export default {
    name: "ShareGlobalStatsToday",
    layout: "blank",
    components: {
      Flag,
      Logo,
      TopStats
    },
    //TODO: just for testing
    head() {
      const title = this.$t('COVID-19 Corona Tracker');
      const description = this.$t('COVID-19 Corona Tracker: The only independent World Health Organization (WHO) recognized one stop platform for verified data and news.');

      return {
        title,
        titleTemplate: '%s',
        meta: [
          { hid: 'title', name: 'title', content: title },
          { hid: 'description', name: 'description', content: description },
          { hid: 'og-title', property: 'og:title', content: title },
          { hid: 'og-description', property: 'og:description', content: description },
          { hid: 'twitter-title', property: 'twitter:title', content: title },
          { hid: 'twitter-description', property: 'twitter:title', content: description },
          { hid: 'og-url', name: 'og:url', content: 'https://www.coronatracker.com/share/global-stats-today' },
          {
            hid: 'og-image',
            property: 'og:image',
            content: this.$route.params.referrer === 'recent' ? 'https://www.coronatracker.com/_nuxt/img/a219938.png' :
                    'https://www.coronatracker.com/_nuxt/img/262cfac.png'
          },
          {
            hid: 'twitter-image',
            property: 'twitter-image',
            content: this.$route.params.referrer === 'recent' ? 'https://www.coronatracker.com/_nuxt/img/a219938.png' :
                    'https://www.coronatracker.com/_nuxt/img/262cfac.png'
          }
        ],
      };
    },
    data: function() {
      return {
        currentDate: moment().format('Do MMM YYYY, h:mm a (ZZ)'),
        confirmed: 0,
        deaths: 0,
        recovered: 0,
        outbreakTrendData: [],
        topCountryWithDailyNewStatsData: [],
        affectedCountryData: [],
        countryStats: []
      }
    },
    methods: {
      async loadStats () {
        await this.$api.stats.getGlobalStats()
                .then(data => {
                  this.confirmed = data.totalConfirmed;
                  this.deaths = data.totalDeaths;
                  this.recovered = data.totalRecovered;
                });
      },
      async fetchCountryStats() {
        try {
          const limit = 10;
          this.countryStats = await this.$api.stats.getTopNCountryStats(limit);
        }
        catch (ex) {
          console.log('[fetchCountryStats] Error:', ex);
        }
      }
    },
    created() {
      this.loadStats();
      this.fetchCountryStats();
    },
  };
</script>
<style scoped>
</style>
