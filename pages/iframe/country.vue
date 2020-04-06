<template>
  <div class="container">
    <a href="/" target="_blank">
      <div class="flex items-center mb-2 flex-col sm:flex-row">
        <logo class="lg:flex mr-4" style="pointer-events:none;" />
        <label class="block text-s font-bold mt-1">Live stats provided by CoronaTracker.com </label>
      </div>
    </a>
    <div class="flex flex-wrap -mx-2">
      <div class="px-5 text-center" v-if="pageState === PAGE_STATES.LOADING">
        Loading...
      </div>
      <div class="px-5 text-center" v-else-if="pageState === PAGE_STATES.HAS_ERROR">
        {{error}}
      </div>
      <div class="w-full " v-else-if="pageState === PAGE_STATES.HAS_FETCHED">
        <template v-if="!withExtraInfo || isGlobal">
          <div class="flex flex-wrap -mt-2">
            <div class="hidden md:flex md:w-1/4 p-2">
              <div class="bg-teal-100 w-full rounded"></div>
            </div>
            <div class="w-full p-2 md:w-2/4">
              <Overview :info="overviewInfo" :country="country"></Overview>
            </div>
            <div class="hidden md:flex md:w-1/4 p-2">
              <div class="bg-teal-100 w-full rounded"></div>
            </div>

          </div>
        </template>

        <template v-if="withExtraInfo && !isGlobal">
          <div class="flex flex-wrap -mt-2">
            <div class="w-full lg:w-1/2 p-2">
              <Overview :info="overviewInfo" :country="country"></Overview>
            </div>
            <div class="w-1/2 lg:w-1/4 p-2">
              <FatalityRate :days="fatalityRate.days" :series="fatalityRate.data" />
            </div>
            <div class="w-1/2 lg:w-1/4 p-2">
              <PositiveRate :days="positiveRate.days" :series="positiveRate.data" />
            </div>
          </div>

          <div class="flex flex-wrap">
            <div class="w-full md:w-1/2 lg:w-1/3 p-2">
              <line-chart-number
                :height="180"
                :data="[0, 10, 20, 10, 40, 20, 50, 60]"
                :title="$t('critical_cases_icu')"
                :subtitleRed="`${criticalCases.inICUCount}%`"
                :subtitle="$t('of total cases')"
                :number="criticalCases.totalCount"
              />
            </div>
            <div class="w-full md:w-1/2 lg:w-1/3 p-2">
              <line-chart-number
                :height="180"
                :data="[0, 10, 20, 10, 40, 20, 50, 60]"
                :title="$t('daily_cases_receiving_treatment')"
                :subtitleRed="`${activeCases.percentage}%`"
                :subtitle="$t('of total cases')"
                :number="activeCases.totalCount"
              />
            </div>
            <div class="w-full md:w-1/2 lg:w-1/3 p-2">
              <line-chart-number
                :height="180"
                :data="[0, 10, 20, 10, 40, 20, 50, 60]"
                :title="$t('daily_confirmed_cases')"
                :number="perMillionConfirmedCases.totalCount"
                :subtitle="$t('per_million_population')"
              />
            </div>
          </div>

          <div class="flex flex-wrap">
            <div class="w-full p-2">
              <PastDaysChart
                :height="360"
                :trendData="countryTrend.trendData"
                :trendDates="countryTrend.trendDates"
                :title="$t('past_2_weeks_chart')"
                style="margin-bottom: 12px;"
              />
            </div>
          </div>
          <div
            class="block text-center md:text-right underline text-blue-500 font-semibold px-2 -mt-2">
            <a href="/" target="_blank">{{ $t('more_details') }}</a>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import Logo from '~/components/Logo';
  import Stats from '~/components/Analytics/Stats';
  import { directive as onClickaway } from 'vue-clickaway';

  import FatalityRate from '~/components/Analytics/FatalityRate'
  import LineChartNumber from '~/components/Country/LineChartNumber'
  import PastDaysChart from '~/components/Country/PastDaysChart'
  import Overview from '~/components/Country/Overview'
  import PositiveRate from '~/components/Analytics/PositiveRate'
  import GrowthRate from '~/components/Country/GrowthRate';
  import { COUNTRIES } from "~/utils/constants";

  export default {
    name: "IframeAllCountryStats",
    layout: "blank",
    components: {
      GrowthRate,
      FatalityRate,
      LineChartNumber,
      PastDaysChart,
      Overview,
      PositiveRate,
      Logo,
    },

    mounted() {
      this.loadInformation(this.countryCode)
      !this.isGlobal ? this.loadCountryTrendData(this.countryCode) : null

    },

    data() {
      const PAGE_STATES = {
        LOADING: 'LOADING',
        HAS_FETCHED: 'HAS_FETCHED',
        HAS_ERROR: 'HAS_ERROR',
      };

      return {
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
        },
        countryTrend: {
          trendData: [],
          trendDates: []
        }
      }
    },

    computed: {
      country() {
        const countryToFind = this.$route.query.country
        const countryEntry = COUNTRIES.find(country => country.urlAliases.includes(countryToFind));
        return countryEntry || {}
      },
      countryCode() {
        return this.country?.code
      },
      withExtraInfo() {
        return this.$route.query.charts === 'true' || this.$route.query.charts === true
      },
      isGlobal() {
        return this.$route.query.country === 'global' || this.$route.query.country === 'GLOBAL'
      }
    },

    methods: {

      async loadInformation(countryCode) {
        let totalCases;

        try {
          totalCases = (await this.$api.stats.getCountrySpecificStats(countryCode))?.[0]
        } catch (err) {
          this.pageState = this.PAGE_STATES.HAS_ERROR
          this.error = err.data?.message ?? 'Something went wrong.'
          return;
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
        this.criticalCases.inICUCount =
          ((totalCases.totalCritical / totalCases.totalConfirmed) * 100)?.toFixed(1)

        // Active Cases
        this.activeCases.totalCount = totalCases.activeCases
        this.activeCases.percentage =
          ((totalCases.activeCases / totalCases.totalConfirmed) * 100)?.toFixed(1)

        this.perMillionConfirmedCases.totalCount = totalCases.totalConfirmedPerMillionPopulation
      },

      async loadCountryTrendData(countryCode) {
        let countryTrendRaw;

        try {
          countryTrendRaw = await this.$api.stats.getTrendByCountryDate(
            countryCode,
            new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
            new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
          );
        } catch (err) {
          this.pageState = this.PAGE_STATES.HAS_ERROR
          this.error = err.data?.message ?? 'Something went wrong.'
          return;
        }

        // Country Trend
        let countryTrendConfirmed = []
        let countryTrendRecovered = []
        let countryTrendDeath = []
        let confirmedLastMax = 0
        let recoveredLastMax = 0
        let deadLastMax = 0

        countryTrendRaw.forEach(country => {
          confirmedLastMax = Math.max(country["total_confirmed"], confirmedLastMax)
          recoveredLastMax = Math.max(country["total_recovered"], recoveredLastMax)
          deadLastMax = Math.max(country["total_deaths"], deadLastMax)

          countryTrendConfirmed.push(confirmedLastMax)
          countryTrendRecovered.push(recoveredLastMax)
          countryTrendDeath.push(deadLastMax)

          this.countryTrend.trendDates.push(country["last_updated"].slice(0, 10))
        });
        this.countryTrend.trendData = [
          {
            "name": "confirmed",
            "data": countryTrendConfirmed
          }, {
            "name": "recovered",
            "data": countryTrendRecovered
          }, {
            "name": "death",
            "data": countryTrendDeath
          }
        ]
      },
    }
  }
</script>
