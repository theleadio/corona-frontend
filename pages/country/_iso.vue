<template>
  <div class="flex flex-wrap">
    <div class="w-full px-5 pt-2">
        <div class="flex flex-wrap">
          <div class="w-full lg:w-1/2 px-2">
            <Overview :info="overviewInfo"></Overview>
          </div>
          <div class="w-full lg:w-1/2 px-2">
            <div class="flex flex-wrap">
              <div class="w-full lg:w-1/2">
                <p>Fatality Rate Component Placeholder</p>
              </div>
              <div class="w-full lg:w-1/2">
                <p>Positive Rate Component Placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import Overview from '~/components/Country/Overview'
export default {
  components: {
    Overview
   },

  mounted () {
    // Method calls should use route params to get the data
    // ISO country code: this.$route.params.iso
    this.loadDiffStats()
  },

  data () {
    return {
      overviewInfo: {
        confirmed: 0,
        diffConfirmed: 0,
        deaths: 0,
        diffDeaths: 0,
        recovered: 0,
        diffRecovered: 0,
      }
    }
  },

  metaInfo: {
    title: 'Country Specific Analytics',
  },

  methods: {

    // Ideally this method and underlying API call should receive "ISO code" of the country to route params
    // and URL to access this page for Singapore could be https://coronatracker.com/country/sg
    // Needs little refactoring after we have diff stats API in place filtered by the country
    loadDiffStats(countryCode = "Singapore"){
      this.$api.stats.getDiffStatsCountry(countryCode)
      .then(data => {
        // This is a workaround. Current api returns data for all countries
        // without the country ISO code in the results
        const info = data.find(m => m.countryName == countryCode)
        this.overviewInfo.confirmed = info.todayConfirmed
        this.overviewInfo.recovered = info.todayRecover
        this.overviewInfo.deaths = info.todayDeath
        this.overviewInfo.diffConfirmed = info.diffConfirmed
        this.overviewInfo.diffRecovered = info.diffRecover
        this.overviewInfo.diffDeaths = info.diffDeath
      })
    },
  }
}
</script>
