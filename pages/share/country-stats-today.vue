<template>
  <div class="container clearfix">
    <h1 class="text-2xl font-extrabold">
      {{ country.name }} {{ $t("covid_stats_today") }}
      <Flag :country-code="country.code" />
    </h1>
    <h3>{{ currentDate }}</h3>

    <div class="flex flex-row lg:flex-row pt-5 pb-6 text-center">
      <div class="flex-1">
        <p class="text-2xl font-bold text-red-600">
          {{ overviewInfo.confirmed | formatNumber }}
        </p>
        <p class="text-sm font-bold text-red-600">
          {{ $t("total_confirmed") }}
        </p>
        <p class="text-xs font-bold text-red-600">
          {{
            $t("increase_new_cases", {
              number: $options.filters.formatNumber(overviewInfo.diffConfirmed)
            })
          }}
        </p>
      </div>

      <div class="flex-1">
        <p class="text-2xl font-bold text-green-600">
          {{ overviewInfo.recovered | formatNumber }}
        </p>
        <p class="text-sm font-bold text-green-600">
          {{ $t("total_recovered") }}
        </p>
      </div>

      <div class="flex-1">
        <p class="text-2xl font-bold text-gray-600">
          {{ overviewInfo.deaths | formatNumber }}
        </p>
        <p class="text-sm font-bold text-gray-600">
          {{ $t("total_deaths") }}
        </p>
        <p class="text-xs font-bold text-gray-600">
          {{
            $t("increase_new_deaths", {
              number: $options.filters.formatNumber(overviewInfo.diffDeaths)
            })
          }}
        </p>
      </div>
    </div>

    <div class="flex flex-row lg:flex-row pt-5 pb-8 pl-8">
      <div class="flex-1">
        <p class="text-xs font-extrabold">
          {{ $t("critical_cases_icu") }}
        </p>
        <p class="text-xl font-bold">
          {{ criticalCases.totalCount | formatNumber }}
        </p>
        <p class="text-xs">
          <span class="text-red-600">{{ criticalCases.inICUCount }}%</span>
          {{ $t("of_total_cases") }}
        </p>
      </div>

      <div class="flex-1">
        <p class="text-xs font-extrabold">
          {{ $t("daily_cases_receiving_treatment") }}
        </p>
        <p class="text-xl font-bold">
          {{ activeCases.totalCount | formatNumber }}
        </p>
        <p class="text-xs">
          <span class="text-red-600">{{ activeCases.percentage }}%</span>
          {{ $t("of_total_cases") }}
        </p>
      </div>

      <div class="flex-1">
        <p class="text-xs font-extrabold">
          {{ $t("daily_confirmed_cases") }}
        </p>
        <p class="text-xl font-bold">
          {{ perMillionConfirmedCases.totalCount | formatNumber }}
        </p>
        <p class="text-xs">
          {{ $t("per_million_population") }}
        </p>
      </div>
    </div>

    <logo class="lg:flex mb-4 float-right h-8" />
  </div>
</template>
<script>
import Flag from "~/components/Flag"
import Logo from "~/components/Logo"
import { COUNTRIES } from "~/utils/constants"
import moment from "moment"

export default {
  name: "ShareCountryStatsToday",
  layout: "blank",
  components: {
    Flag,
    Logo
  },
  data() {
    const PAGE_STATES = {
      LOADING: "LOADING",
      HAS_FETCHED: "HAS_FETCHED",
      HAS_ERROR: "HAS_ERROR"
    }

    return {
      currentDate: null,
      PAGE_STATES,
      pageState: PAGE_STATES.LOADING,
      overviewInfo: {
        confirmed: 0,
        diffConfirmed: 0,
        recovered: 0,
        diffRecovered: 0,
        deaths: 0,
        diffDeaths: 0
      },
      fatalityRate: {
        days: 0,
        data: []
      },
      positiveRate: {
        days: 0,
        data: []
      },
      criticalCases: {
        totalCount: 0,
        inICUCount: 0
      },
      activeCases: {
        totalCount: 0,
        percentage: 0
      },
      perMillionConfirmedCases: {
        totalCount: 0
      }
    }
  },
  computed: {
    country() {
      const countryToFind = this.$route.query.country
      const countryEntry = COUNTRIES.find(country =>
        country.urlAliases.includes(countryToFind)
      )
      return countryEntry || {}
    },
    countryCode() {
      const countryToFind = this.$route.query.country
      const countryEntry = COUNTRIES.find(country =>
        country.urlAliases.includes(countryToFind)
      )
      return countryEntry?.code
    }
  },
  mounted() {
    this.currentDate = moment().format("Do MMM YYYY, h:mm a (ZZ)")
    this.loadInformation(this.countryCode)
  },
  methods: {
    async loadInformation(countryCode) {
      let totalCases

      try {
        totalCases = (
          await this.$api.stats.getCountrySpecificStats(countryCode)
        )?.[0]
      } catch (err) {
        this.pageState = this.PAGE_STATES.HAS_ERROR
        this.error = err.data?.message ?? "Something went wrong."
        return
      }

      this.pageState = this.PAGE_STATES.HAS_FETCHED

      // Total cases information
      this.overviewInfo.confirmed = totalCases.totalConfirmed
      this.overviewInfo.recovered = totalCases.totalRecovered
      this.overviewInfo.deaths = totalCases.totalDeaths

      // Daily change information
      this.overviewInfo.diffConfirmed = totalCases.dailyConfirmed
      this.overviewInfo.diffDeaths = totalCases.dailyDeaths

      // Fatality Rate & Positive Rate
      // Data prep for FR and PR components
      const FRU = Number(totalCases.FR).toFixed(1)
      const PRU = Number(totalCases.PR).toFixed(1)
      const FRL = 100 - FRU
      const PRL = 100 - PRU

      // Fatality Rate
      this.fatalityRate.days = 10
      this.fatalityRate.data = [Number(FRL), Number(FRU)]

      // Positive Rate
      this.positiveRate.days = 10
      this.positiveRate.data = [Number(PRL), Number(PRU)]

      // Critical Cases
      this.criticalCases.totalCount = totalCases.totalCritical
      this.criticalCases.inICUCount = (
        (totalCases.totalCritical / totalCases.totalConfirmed) *
        100
      )?.toFixed(1)

      // Active Cases
      this.activeCases.totalCount = totalCases.activeCases
      this.activeCases.percentage = (
        (totalCases.activeCases / totalCases.totalConfirmed) *
        100
      )?.toFixed(1)

      this.perMillionConfirmedCases.totalCount =
        totalCases.totalConfirmedPerMillionPopulation
    }
  }
}
</script>
<style scoped></style>
