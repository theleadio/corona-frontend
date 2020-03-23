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
          <Overview :info="overviewInfo" :country="country"></Overview>
        </div>
        <div class="w-1/2 lg:w-1/4 p-2">
          <FatalityRate :days="fatalityRate.days" :series="fatalityRate.data"/>
        </div>
        <div class="w-1/2 lg:w-1/4 p-2">
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
            :title="$t('Critical Cases treated in ICU')"
            :subtitleRed="`${criticalCases.inICUCount}%`"
            :subtitle="$t('of total cases')"
            :number="criticalCases.totalCount"
          />
        </div>
        <div class="w-full md:w-1/2 lg:w-1/3 p-2">
          <line-chart-number
            :height="180"
            :data="[0, 10, 20, 10, 40, 20, 50, 60]"
            :title="$t('Daily Cases Receiving Treatment')"
            :subtitleRed="`${activeCases.percentage}%`"
            :subtitle="$t('of total cases')"
            :number="activeCases.totalCount"
          />
        </div>
        <div class="w-full md:w-1/2 lg:w-1/3 p-2">
          <line-chart-number
            :height="180"
            :data="[0, 10, 20, 10, 40, 20, 50, 60]"
            :title="$t('Daily Confirmed Cases')"
            :number="perMillionConfirmedCases.totalCount"
            :subtitle = "$t('Per Million Population')"
          />
        </div>
      </div>
      <div class="flex flex-wrap">
        <div class="w-full md:w-3/4 p-2">
            <PastDaysChart
              :height="360"
              :trendData="countryTrend.trendData"
              :trendDates="countryTrend.trendDates"
              :title="$t('Past 30 Days Chart')"
              style="margin-bottom: 12px;"
            />
            <TrendingNews :country="country" />
        </div>

        <div class="w-full md:w-1/4 p-2">
          <client-only>
            <TwitterFeed :twitter-handle="handle"/>
          </client-only>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FatalityRate from '~/components/Analytics/FatalityRate'
import LineChartNumber from '~/components/Country/LineChartNumber'
import PastDaysChart from '~/components/Country/PastDaysChart'
import Overview from '~/components/Country/Overview'
import PositiveRate from '~/components/Analytics/PositiveRate'
import TwitterFeed from '~/components/TwitterFeed'
import TrendingNews from '~/components/TrendingNews';
import GrowthRate from '~/components/Country/GrowthRate';
import {COUNTRIES, twitterHandles} from "~/utils/constants";

export default {
  head() {
    const country = this.country && this.country.name;
    const title = this.$t('COVID-19 {country} Corona Tracker', { country });
    const description = this.$t('{country} COVID-19 Corona Tracker: The only independent World Health Organization (WHO) recognized one stop platform for verified data and news.', {
      country,
    });

    return {
      title,
      titleTemplate: '%s',
      meta: [
        { hid: 'title', name: 'title', content: title },
        { hid: 'description', name: 'description', content: description },
        { hid: 'og-title', property: 'og:title', content: title },
        { hid: 'og-description', property: 'og:title', content: description },
        { hid: 'twitter-title', property: 'twitter:title', content: title },
        { hid: 'twitter-description', property: 'twitter:title', content: description },
      ],
    };
  },

  components: {
    GrowthRate,
    FatalityRate,
    LineChartNumber,
    PastDaysChart,
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
      const countryToFind = this.$route.params.country
      const countryEntry = COUNTRIES.find(country => country.urlAliases.includes(countryToFind));
      return countryEntry || {}
    },
    countryCode() {
      const countryToFind = this.$route.params.country
      const countryEntry = COUNTRIES.find(country => country.urlAliases.includes(countryToFind));
      console.log("countryEntry:", countryEntry);

      return countryEntry?.code
    },
    handle(){
      const countryEntry = twitterHandles.find(country => this.countryCode == country.code)
      return countryEntry?.account || "WHO"
    }
  },

  metaInfo: {
    title: 'Country Specific Analytics',
  },

  methods: {

    async loadInformation(countryCode) {
      let totalCases;
      let countryTrendRaw;

      try {
        totalCases = (await this.$api.stats.getCountrySpecificStats(countryCode))?.[0]
        countryTrendRaw = await this.$api.stats.getTrendByCountry(
          countryCode,
          new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
          new Date().toISOString().slice(0, 10)
        );
      }
      catch (err) {
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
      const FRU =  Number(totalCases.FR).toFixed(1)
      const PRU =  Number(totalCases.PR).toFixed(1)
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
      this.criticalCases.inICUCount = ((totalCases.totalCritical / totalCases.totalConfirmed) * 100)?.toFixed(1)

      // Active Cases
      this.activeCases.totalCount = totalCases.activeCases
      this.activeCases.percentage = ((totalCases.activeCases / totalCases.totalConfirmed)*100)?.toFixed(1)

      this.perMillionConfirmedCases.totalCount = totalCases.totalConfirmedPerMillionPopulation

      // Country Trend
      let countryTrendConfirmed = []
      let countryTrendRecovered = []
      let countryTrendDeath = []
      let confirmedLastMax = 0
      let recoveredLastMax = 0
      let deadLastMax = 0

      countryTrendRaw.forEach(country => {
        confirmedLastMax = Math.max(country["confirmed"], confirmedLastMax)
        recoveredLastMax = Math.max(country["recovered"], recoveredLastMax)
        deadLastMax = Math.max(country["dead"], deadLastMax)

        countryTrendConfirmed.push(confirmedLastMax)
        countryTrendRecovered.push(recoveredLastMax)
        countryTrendDeath.push(deadLastMax)

        this.countryTrend.trendDates.push(country["date_posted"])
      });
      this.countryTrend.trendData = [{
        "name": "confirmed",
        "data": countryTrendConfirmed
      },{
        "name": "recovered",
        "data": countryTrendRecovered
      },{
        "name": "death",
        "data": countryTrendDeath
      }]
    },
  }
}
</script>
