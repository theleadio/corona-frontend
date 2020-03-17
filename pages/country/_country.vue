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
          <FatalityRate :days="11" :series="[46.5,53.5]"/>
        </div>
        <div class="w-full lg:w-1/4 p-2">
          <PositiveRate :days="10" :series="[46.1,53.9]"/>
        </div>
      </div>
      <div class="flex flex-wrap">
        <div class="w-full md:w-1/2 lg:w-1/4 p-2">
          <growth-rate :confirmed="overviewInfo.confirmed"
                       :ytdConfirmed="overviewInfo.diffConfirmed"/>
        </div>
        <div class="w-full md:w-1/2 lg:w-1/4 p-2">
          <line-chart-number
            :height="180"
            :data="[0, 10, 20, 10, 40, 20, 50, 60]"
            :title="$t('Serious Cases')"
            subtitleRed="12"
            :subtitle="$t('in ICU')"
            number="148"
          />
        </div>
        <div class="w-full md:w-1/2 lg:w-1/4 p-2">
          <line-chart-number
            :height="180"
            :data="[0, 10, 20, 10, 40, 20, 50, 60]"
            :title="$t('Case Currently In Hospital')"
            subtitleRed="40%"
            :subtitle="$t('of total cases')"
            number="82"
          />
        </div>
        <div class="w-full md:w-1/2 lg:w-1/4 p-2">
          <line-chart-number
            :height="180"
            :data="[0, 10, 20, 10, 40, 20, 50, 60]"
            :title="$t('Cases Discharged')"
            subtitleBlue="10%"
            :subtitle="$t('of total cases')"
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
  },

  mounted () {
    // Method calls should use route params to get the data
    // ISO country code: this.$route.params.iso
    return this.loadDiffStats(this.countryName)
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
        deaths: 0,
        diffDeaths: 0,
        recovered: 0,
        diffRecovered: 0,
      }
    }
  },

  computed: {
    countryName() {
      const countryToFind = this.$route.params.country
      const countryEntry = COUNTRIES.find(country => country.urlAliases.includes(countryToFind));
      return countryEntry?.name
    }
  },

  metaInfo: {
    title: 'Country Specific Analytics',
  },

  methods: {

    // Ideally this method and underlying API call should receive "ISO code" of the country to route params
    // and URL to access this page for Singapore could be https://coronatracker.com/country/sg
    // Needs little refactoring after we have diff stats API in place filtered by the country
    loadDiffStats(countryCode) {
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
        this.$nextTick(() => this.pageState = this.PAGE_STATES.HAS_FETCHED)
      })
      .catch(err => {
        this.pageState = this.PAGE_STATES.HAS_ERROR
        this.error = err.data?.message ?? 'Something went wrong.'
      })
    },
  }
}
</script>
