<template>
  <div class="container clearfix" style="max-width: 900px;">
    <h1 class="text-2xl font-extrabold">
      {{ $t("global_covid_stats_today") }}
    </h1>
    <h3>{{ currentDate }}</h3>

    <div class="flex flex-row lg:flex-row pt-5 pb-6 text-center">
      <div class="flex-1">
        <p class="text-2xl font-bold text-red-600">
          {{ confirmed | formatNumber }}
        </p>
        <p class="text-sm font-bold text-red-600">
          {{ $t("total_confirmed") }}
        </p>
      </div>

      <div class="flex-1">
        <p class="text-2xl font-bold text-green-600">
          {{ recovered | formatNumber }}
        </p>
        <p class="text-sm font-bold text-green-600">
          {{ $t("total_recovered") }}
        </p>
      </div>

      <div class="flex-1">
        <p class="text-2xl font-bold text-gray-600">
          {{ deaths | formatNumber }}
        </p>
        <p class="text-sm font-bold text-gray-600">
          {{ $t("total_deaths") }}
        </p>
      </div>
    </div>

    <TopStats
      class="pb-5"
      :limit="10"
      :show-footer="false"
      :show-hint="false"
      :show-source="false"
      :show-title="false"
      :used-in-share-page="true"
      :country-stats="countryStats"
    />

    <logo class="lg:flex mb-4 float-right h-8" />
  </div>
</template>
<script>
import Logo from "~/components/Logo"
import TopStats from "~/components/TopStats"
import moment from "moment"

export default {
  name: "ShareGlobalStatsToday",
  layout: "blank",
  components: {
    Logo,
    TopStats
  },
  data: function() {
    return {
      currentDate: null,
      confirmed: 0,
      deaths: 0,
      recovered: 0,
      outbreakTrendData: [],
      topCountryWithDailyNewStatsData: [],
      affectedCountryData: [],
      countryStats: []
    }
  },
  mounted() {
    this.currentDate = moment().format("Do MMM YYYY, h:mm a (ZZ)")
    this.loadStats()
    this.fetchCountryStats()
  },
  methods: {
    async loadStats() {
      await this.$api.stats.getGlobalStats().then(data => {
        this.confirmed = data.totalConfirmed
        this.deaths = data.totalDeaths
        this.recovered = data.totalRecovered
      })
    },
    async fetchCountryStats() {
      try {
        const limit = 10
        this.countryStats = await this.$api.stats.getTopNCountryStats(limit)
      } catch (ex) {
        console.log("[fetchCountryStats] Error:", ex)
      }
    }
  }
}
</script>
<style scoped></style>
