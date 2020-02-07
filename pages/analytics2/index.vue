<template>
  <div class="flex flex-wrap">
    <SidebarNav></SidebarNav>

    <div class="w-full lg:w-5/6 px-5 pt-2 bg-gray-200">
      <div class="pl-2">
        <p class="text-2xl font-bold">2019-nCoV Overview</p>
      </div>

      <div class="flex flex-wrap">
        <div class="w-full lg:w-1/2 px-2">
          <div class="max-w-full rounded shadow-md bg-white p-3 mb-5">
            <div class="flex flex-col lg:flex-row">
              <div class="px-5">
                <p class="text-sm font-bold text-red-600">Total Confirmed</p>
                <p class="text-4xl font-bold text-red-600">{{ totalConfirmed.toLocaleString() }}</p>
              </div>

              <div class="px-5">
                <p class="text-sm font-bold text-green-600">Total Recovered</p>
                <p class="text-4xl font-bold text-green-600">{{ totalRecovered.toLocaleString() }}</p>
              </div>

              <div class="px-5">
                <p class="text-sm font-bold text-gray-600">Total Deaths</p>
                <p class="text-4xl font-bold text-gray-600">{{ totalMortality.toLocaleString() }}</p>
              </div>
            </div>
          </div>

          <div class="max-w-full rounded shadow-md bg-white p-3 mb-5">
            <OutbreakTrendChart :data="outbreakTrendData"></OutbreakTrendChart>
          </div>

          <div class="max-w-full rounded shadow-md bg-white p-3 mb-5">
            <AffectedRegion :data="affectedRegionData"></AffectedRegion>
          </div>
        </div>

        <div class="w-full lg:w-1/2 px-2">
          <div class="max-w-full rounded shadow-md bg-white p-3 mb-5">
            <AffectedCountry :data="affectedCountryData"></AffectedCountry>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SidebarNav from '~/components/Analytics/SidebarNav'
import OutbreakTrendChart from '~/components/Analytics/OutbreakTrend'
import AffectedRegion from '~/components/Analytics/AffectedRegion'
import AffectedCountry from '~/components/Analytics/AffectedCountry'

export default {
  components: { SidebarNav, OutbreakTrendChart, AffectedRegion, AffectedCountry },
  
  mounted () {
    this.loadStats()
    this.loadOutbreakTrend()
    this.loadAffectedRegion()
    this.loadAffectedCountry()
  },

  data () {
    return {
      currentDate: new Date,
      totalConfirmed: 0,
      totalMortality: 0,
      totalRecovered: 0,
      outbreakTrendData: [],
      affectedRegionData: [],
      affectedCountryData: [],
    }
  },

  metaInfo: {
    title: 'Analytics',
  },

  methods: {
    loadStats () {
      this.$api.stats.getStats('')
        .then(data => {
          this.totalConfirmed = data.num_confirm
          this.totalMortality = data.num_dead
          this.totalRecovered = data.num_heal
        })
    },

    loadOutbreakTrend () {
      this.$api.analytics.fetchTrendByDate('2020-01-27', this.currentDate.toISOString().slice(0, 10))
        .then(data => {
          this.outbreakTrendData = data
        })
    },

    loadAffectedRegion () {
      this.$api.analytics.fetchAffectedRegion()
        .then(data => {
          this.affectedRegionData = data
        })
    },

    loadAffectedCountry () {
      this.$api.analytics.fetchAffectedCountry()
        .then(data => {
          this.affectedCountryData = data
        })
    },
  }
}
</script>
