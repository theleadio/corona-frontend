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

    <TopStats :limit="10" :show-title="false" :show-source="false" :show-footer="false" class="pb-5" />

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
    data: function() {
      return {
        currentDate: moment().format('Do MMM YYYY, h:mm a'),
        confirmed: 0,
        deaths: 0,
        recovered: 0,
        outbreakTrendData: [],
        topCountryWithDailyNewStatsData: [],
        affectedCountryData: [],
      }
    },
    methods: {
      loadStats () {
        this.$api.stats.getGlobalStats()
                .then(data => {
                  this.confirmed = data.totalConfirmed;
                  this.deaths = data.totalDeaths;
                  this.recovered = data.totalRecovered;
                });
      }
    },
    created() {
      this.loadStats();
    },
  };
</script>
<style scoped>
</style>
