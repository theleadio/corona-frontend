<template>
  <div class="container clearfix">
    <h1 class="text-2xl font-extrabold">
      {{ country.name }} {{ $t("covid_cases_past_2_weeks") }}
      <Flag :country-code="country.code" />
    </h1>
    <h3>{{ startDate }} - {{ endDate }}</h3>

    <PastDaysChart
      v-if="pageState === PAGE_STATES.HAS_FETCHED"
      :height="360"
      :trend-data="countryTrend.trendData"
      :trend-dates="countryTrend.trendDates"
      :title="$t('past_2_weeks_chart')"
      :show-header="false"
      :show-selector="false"
      :enable-animation="false"
      :enable-tooltip="false"
      class="pb-5"
    />

    <logo class="lg:flex mb-4 float-right h-8" />
  </div>
</template>
<script>
import Flag from "~/components/Flag"
import Logo from "~/components/Logo"
import PastDaysChart from "~/components/Country/PastDaysChart"
import { COUNTRIES } from "~/utils/constants"
import moment from "moment"

export default {
  name: "ShareCountryStatsRecent",
  layout: "blank",
  components: {
    Flag,
    Logo,
    PastDaysChart
  },
  data() {
    const PAGE_STATES = {
      LOADING: "LOADING",
      HAS_FETCHED: "HAS_FETCHED",
      HAS_ERROR: "HAS_ERROR"
    }

    return {
      startDate: null,
      endDate: null,
      PAGE_STATES,
      pageState: PAGE_STATES.LOADING,
      countryTrend: {
        trendData: [],
        trendDates: []
      }
    }
  },
  computed: {
    country() {
      const countryToFind = this.$route.params.country
      const countryEntry = COUNTRIES.find(country =>
        country.urlAliases.includes(countryToFind)
      )
      return countryEntry || {}
    },
    countryCode() {
      const countryToFind = this.$route.params.country
      const countryEntry = COUNTRIES.find(country =>
        country.urlAliases.includes(countryToFind)
      )
      return countryEntry?.code
    }
  },
  mounted() {
    this.loadCountryTrendData(this.countryCode)
  },
  methods: {
    async loadCountryTrendData(countryCode) {
      let countryTrendRaw

      try {
        countryTrendRaw = await this.$api.stats.getTrendByCountryDate(
          countryCode,
          new Date(Date.now() - 13 * 24 * 60 * 60 * 1000)
            .toISOString()
            .slice(0, 10),
          new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
            .toISOString()
            .slice(0, 10)
        )
      } catch (err) {
        this.pageState = this.PAGE_STATES.HAS_ERROR
        this.error = err.data?.message ?? "Something went wrong."
        return
      }

      // Country Trend
      let countryTrendConfirmed = []
      let countryTrendRecovered = []
      let countryTrendDeath = []
      let confirmedLastMax = 0
      let recoveredLastMax = 0
      let deadLastMax = 0

      countryTrendRaw.forEach(country => {
        confirmedLastMax = Math.max(
          country["total_confirmed"],
          confirmedLastMax
        )
        recoveredLastMax = Math.max(
          country["total_recovered"],
          recoveredLastMax
        )
        deadLastMax = Math.max(country["total_deaths"], deadLastMax)

        countryTrendConfirmed.push(confirmedLastMax)
        countryTrendRecovered.push(recoveredLastMax)
        countryTrendDeath.push(deadLastMax)

        this.countryTrend.trendDates.push(country["last_updated"].slice(0, 10))
      })

      this.countryTrend.trendData = [
        {
          name: "confirmed",
          data: countryTrendConfirmed
        },
        {
          name: "recovered",
          data: countryTrendRecovered
        },
        {
          name: "death",
          data: countryTrendDeath
        }
      ]

      this.startDate = moment(this.countryTrend.trendDates[0]).format(
        "Do MMM YYYY"
      )
      this.endDate = moment(
        this.countryTrend.trendDates[this.countryTrend.trendDates.length - 1]
      ).format("Do MMM YYYY")

      this.pageState = this.PAGE_STATES.HAS_FETCHED
    }
  }
}
</script>
<style scoped></style>
