<template>
  <div class="flex flex-wrap" style="padding-bottom: 96px;">
    <div class="px-5 text-center" v-if="pageState === PAGE_STATES.LOADING">
      Loading...
    </div>
    <div class="px-5 text-center" v-else-if="pageState === PAGE_STATES.HAS_ERROR">
      {{error}}
    </div>
    <div class="w-full px-5 pt-2" v-else-if="pageState === PAGE_STATES.HAS_FETCHED">
      <div class="flex flex-wrap">
        <div class="w-full lg:w-1/2 p-2">
          <Overview :info="overviewInfo"></Overview>
        </div>
        <div class="w-full lg:w-1/4 p-2">
          <FatalityRate :days="fatalityRate.days" :series="fatalityRate.data"/>
        </div>
        <div class="w-full lg:w-1/4 p-2">
          <PositiveRate :days="positiveRate.days" :series="positiveRate.data"/>
        </div>
      </div>
      <div class="flex flex-wrap">
<!--        <div class="w-full md:w-1/2 lg:w-1/4 p-2">-->
<!--          <growth-rate :confirmed="overviewInfo.confirmed"-->
<!--                       :ytdConfirmed="overviewInfo.diffConfirmed"/>-->
<!--        </div>-->
        <div class="w-full md:w-1/2 lg:w-1/3 p-2">
          <line-chart-number
            :height="180"
            :data="[0, 10, 20, 10, 40, 20, 50, 60]"
            :title="$t('Critical Cases')"
            :subtitleRed="criticalCases.inICUCount"
            :subtitle="$t('in ICU')"
            :number="criticalCases.totalCount"
          />
        </div>
        <div class="w-full md:w-1/2 lg:w-1/3 p-2">
          <line-chart-number
            :height="180"
            :data="[0, 10, 20, 10, 40, 20, 50, 60]"
            :title="$t('Case Currently In Hospital')"
            :subtitleRed="`${activeCases.percentage}%`"
            :subtitle="$t('of total cases')"
            :number="activeCases.totalCount"
          />
        </div>
        <div class="w-full md:w-1/2 lg:w-1/3 p-2">
          <line-chart-number
            :height="180"
            :data="[0, 10, 20, 10, 40, 20, 50, 60]"
            :title="$t('Cases Recovered')"
            :subtitleBlue="`${recoveredCases.percentage}%`"
            :subtitle="$t('of total cases')"
            :number="recoveredCases.totalCount"
          />
        </div>
      </div>
      <div class="flex flex-wrap">
        <div class="w-full md:w-3/4 p-2">
          <TrendingNews :country="country" />
        </div>
        <div class="w-full md:w-1/4 p-2">
          <client-only>
            <TwitterFeed twitter-handle="WHO" :data-height="1750"/>
          </client-only>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FatalityRate from '../../components/Analytics/FatalityRate'
import LineChartNumber from '~/components/Country/LineChartNumber'
import Overview from '~/components/Country/Overview'
import PositiveRate from '../../components/Analytics/PositiveRate'
import TwitterFeed from '~/components/TwitterFeed'
import TrendingNews from '~/components/TrendingNews';
import GrowthRate from '~/components/Country/GrowthRate';
import {COUNTRIES} from "../../utils/constants";

export default {
  components: {
    GrowthRate,
    FatalityRate,
    LineChartNumber,
    Overview,
    PositiveRate,
    TwitterFeed,
    TrendingNews
  },

  mounted () {
    this.loadInformation(this.countryCode)
  },

  data () {
    const PAGE_STATES = {
      LOADING: 'LOADING',
      HAS_FETCHED: 'HAS_FETCHED',
      HAS_ERROR: 'HAS_ERROR',
    };

    return {
      country: {},
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
        data:[]
      },
      positiveRate: {
        days: 0,
        data:[]
      },
      criticalCases: {
        totalCount: 0,
        inICUCount: 0
      },

      activeCases: {
        totalCount: 0,
        percentage: 0
      },

      recoveredCases: {
        totalCount: 0,
        percentage: 0
      }
    }
  },

  computed: {
    countryCode() {
      const countryToFind = this.$route.params.country
      const countryEntry = COUNTRIES.find(country => country.urlAliases.includes(countryToFind));
      console.log("countryEntry:", countryEntry);

      return countryEntry?.code
    }
  },

  metaInfo: {
    title: 'Country Specific Analytics',
  },

  methods: {

    async loadInformation(countryCode) {
      let totalCases;
      let dailyCases;

      try {
        totalCases = await this.$api.stats.getTotalCasesByCountry(countryCode)
        dailyCases = await this.$api.stats.getDailyCasesByCountry(countryCode)
      }
      catch (err) {
        this.pageState = this.PAGE_STATES.HAS_ERROR
        this.error = err.data?.message ?? 'Something went wrong.'
        return;
      }

      this.pageState = this.PAGE_STATES.HAS_FETCHED

      // Total cases information
      this.overviewInfo.confirmed = totalCases.confirmed
      this.overviewInfo.recovered = totalCases.recovered
      this.overviewInfo.deaths = totalCases.deaths

      // Daily change information
      this.overviewInfo.diffConfirmed = dailyCases.diffDailyConfirmed
      this.overviewInfo.diffRecovered = dailyCases.diffDailyRecovered
      this.overviewInfo.diffDeaths = dailyCases.diffDailyDeaths

      // Fatality Rate & Positive Rate
      // Data prep for FR and PR components
      const FRU = dailyCases.tdyFR.toFixed(1)
      const PRU = dailyCases.tdyPR.toFixed(1)
      const FRL = 100 - FRU
      const PRL = 100 - PRU

      this.fatalityRate.days = 10
      this.fatalityRate.data = [Number(FRL), Number(FRU)]

      this.positiveRate.days = 10
      this.positiveRate.data = [Number(PRL), Number(PRU)]

      // Critical Cases
      this.criticalCases.totalCount = totalCases.serious
      this.criticalCases.inICUCount = totalCases.critical

      // Active Cases
      this.activeCases.totalCount = totalCases.activeCases
      this.activeCases.percentage =
        ((totalCases.activeCases / totalCases.confirmed) * 100).toFixed(1)

      // Recovered Cases
      this.recoveredCases.totalCount = dailyCases.diffDailyRecovered
      this.recoveredCases.percentage =
        ((dailyCases.diffDailyRecovered / totalCases.recovered) * 100).toFixed(1)
    },
  }
}
</script>
