<template>
  <div class="flex flex-wrap" style="padding-bottom: 96px;">
    <div class="w-full px-5 pt-2">
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
        <div class="w-full md:w-1/2 lg:w-1/3 p-2">
          <line-chart-number
            :height="180"
            :data="[0, 10, 20, 10, 40, 20, 50, 60]"
            title="Critical Cases"
            :subtitleRed="criticalCases.inICUCount"
            subtitle="in ICU"
            :number="criticalCases.totalCount"
          />
        </div>
        <div class="w-full md:w-1/2 lg:w-1/3 p-2">
          <line-chart-number
            :height="180"
            :data="[0, 10, 20, 10, 40, 20, 50, 60]"
            title="Case Currently In Hospital"
            :subtitleRed="`${activeCases.percentage}%`"
            subtitle="of total cases"
            :number="activeCases.totalCount"
          />
        </div>
        <div class="w-full md:w-1/2 lg:w-1/3 p-2">
          <line-chart-number
            :height="180"
            :data="[0, 10, 20, 10, 40, 20, 50, 60]"
            title="Cases Recovered"
            :subtitleBlue="`${recoveredCases.percentage}%`"
            subtitle="of total cases"
            :number="recoveredCases.totalCount"
          />
        </div>
      </div>
      <div class="flex flex-wrap">
        <div class="w-full md:w-3/4 p-2">
            <LocationSelector v-model="country" />
            <Search class="mt-4 mb-8" />
            <TrendingNews :country="country" />
        </div>
        <div class="w-full md:w-1/4 p-2">
          <client-only>
            <TwitterFeed twitter-handle="WHO" data-height="1750"/>
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

export default {
  components: {
    FatalityRate,
    LineChartNumber,
    Overview,
    PositiveRate,
    TwitterFeed,
    TrendingNews
  },

  mounted () {
    this.loadInformation(this.$route.params.iso)
  },

  data () {
    return {
      country: {},
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

  metaInfo: {
    title: 'Country Specific Analytics',
  },

  methods: {

    async loadInformation(countryCode){
      const totalCases = await this.$api.stats.getTotalCasesByCountry(countryCode)
      const dailyCases = await this.$api.stats.getDailyCasesByCountry(countryCode)


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
      const FRL = 100-FRU
      const PRL = 100-PRU

      this.fatalityRate.days = 10
      this.fatalityRate.data = [Number(FRL),Number(FRU)]

      this.positiveRate.days = 10
      this.positiveRate.data = [Number(PRL), Number(PRU)]

      // Critical Cases
      this.criticalCases.totalCount = totalCases.serious
      this.criticalCases.inICUCount = totalCases.critical

      // Active Cases
      this.activeCases.totalCount = totalCases.activeCases
      this.activeCases.percentage = ((totalCases.activeCases/totalCases.confirmed)*100).toFixed(1)

      // Recovered Cases
      this.recoveredCases.totalCount = dailyCases.diffDailyRecovered
      this.recoveredCases.percentage = ((dailyCases.diffDailyRecovered/totalCases.recovered) * 100).toFixed(1)
    },
  }
}
</script>
