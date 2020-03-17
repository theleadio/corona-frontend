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
        <div class="w-full md:w-1/2 lg:w-1/4 p-2">
          <line-chart-number
            :height="180"
            :data="[0, 10, 20, 10, 40, 20, 50, 60]"
            title="Serious Cases"
            subtitleRed="12"
            subtitle="in ICU"
            number="148"
          />
        </div>
        <div class="w-full md:w-1/2 lg:w-1/4 p-2">
          <line-chart-number
            :height="180"
            :data="[0, 10, 20, 10, 40, 20, 50, 60]"
            title="Case Currently In Hospital"
            subtitleRed="40%"
            subtitle="of total cases"
            number="82"
          />
        </div>
        <div class="w-full md:w-1/2 lg:w-1/4 p-2">
          <line-chart-number
            :height="180"
            :data="[0, 10, 20, 10, 40, 20, 50, 60]"
            title="Cases Discharged"
            subtitleBlue="10%"
            subtitle="of total cases"
            number="10"
          />
        </div>
      </div>
      <div class="flex flex-wrap">
        <div class="w-full md:w-3/4 p-2"></div>
        <div class="w-full md:w-1/4 p-2">
          <client-only>
            <TwitterFeed twitter-handle="thewuhanvirus"/>
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

export default {
  components: {
    FatalityRate,
    LineChartNumber,
    Overview,
    PositiveRate,
    TwitterFeed,
  },

  mounted () {
    this.loadDiffStats(this.$route.params.iso)
  },

  data () {
    return {
      overviewInfo: {
        confirmed: 0,
        diffConfirmed: 0,
        deaths: 0,
        diffDeaths: 0,
        recovered: 0,
        diffRecovered: 0
      },
      fatalityRate: {
        days: 0,
        data:[]
      },
      positiveRate: {
        days: 0,
        data:[]
      },
    }
  },

  metaInfo: {
    title: 'Country Specific Analytics',
  },

  methods: {

    loadDiffStats(countryCode){
      this.$api.stats.getDiffStatsCountry(countryCode)
      .then(info => {
        this.overviewInfo.confirmed = info.todayConfirmed
        this.overviewInfo.recovered = info.todayRecovered
        this.overviewInfo.deaths = info.todayDeaths
        this.overviewInfo.diffConfirmed = info.diffConfirmed
        this.overviewInfo.diffRecovered = info.diffRecovered
        this.overviewInfo.diffDeaths = info.diffDeaths

        // Data prep for FR and PR components
        const FRU = info.tdyFR.toFixed(1)
        const PRU = info.tdyPR.toFixed(1)
        const FRL = 100-FRU
        const PRL = 100-PRU

        // Days information is hard-coded for now
        this.fatalityRate.days = 10
        this.fatalityRate.data = [Number(FRL),Number(FRU)]
        // Days information is hard-coded for now
        this.positiveRate.days = 10
        this.positiveRate.data = [Number(PRL), Number(PRU)]
      })
    },
  }
}
</script>
