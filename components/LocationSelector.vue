<template>
  <div class="bg-white rounded border border-gray-400 p-4">
    <div class="flex flex-wrap md:flex-no-wrap md:flex-row">
      <div class="w-full md:w-2/5 h-full mr-2 align-middle relative">
        <p class="mt-2 mb-2 text-sm font-semibold">
          <span class="text-red-600 uppercase"><i class="far fa-dot-circle blink"></i> {{ $t('Live') }}</span>
          <!-- <span v-if="numLastUpdated">[Last Update: {{new Date(numLastUpdated).toDateString()}}]</span> -->
        </p>
        <label class="block text-s font-bold mb-2">{{ $t('Stats Overview') }}</label>
        <button class="bg-gray-200 text-left font-bold py-2 px-4 rounded w-full flex"
                @click="toggleOptions" v-on-clickaway="closeOptions">
          <div>
            <template v-if="selectedCountry">
              <Flag :country-code="selectedCountry.code" class="text-center" style="width: 21px;" />
              <span class="ml-2">{{ selectedCountry.name }}</span>
            </template>
            <template v-else>
              {{ $t('Select Country') }}
            </template>
          </div>

          <div class="self-center ml-auto">
            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
          </div>
        </button>

        <ul class="absolute shadow text-gray-700 mt-1 z-50 w-full" v-if="optionsShowed">
          <li v-for="country in countries" :key="country.code">
            <a class="cursor-pointer bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
               @click="selectCountry(country)">
              <Flag :country-code="country.code" class="text-center" style="width: 21px;" />
              <span class="ml-2">{{ country.name }}</span>
            </a>
          </li>
        </ul>
      </div>

      <stats
        class="flex justify-center w-full md:justify-end mt-5 md:mt-0"
        :confirmed="confirmed"
        :recovered="recovered"
        :deaths="deaths"
      />

    </div>

    <div class="block text-center md:text-right mt-6 underline text-blue-500 font-semibold">
      <nuxt-link :to="localePath('analytics')">{{ $t('more details') }}</nuxt-link>
    </div>
  </div>
</template>

<script>
import Flag from '~/components/Flag';
import Stats from '~/components/Analytics/Stats';
import AnimatedNumber from "animated-number-vue";
import { directive as onClickaway } from 'vue-clickaway';

export default {
  name: "LocationSelector",
  directives: {
    onClickaway: onClickaway,
  },
  components: {
    AnimatedNumber,
    Flag,
    Stats
  },
  data: function() {
    const countries = [
      { code: 'CN', name: 'China' },
      { code: 'HK', name: 'Hong Kong' },
      { code: 'ID', name: 'Indonesia' },
      { code: 'JP', name: 'Japan' },
      { code: 'KR', name: 'South Korea' },
      { code: 'MY', name: 'Malaysia' },
      { code: 'PH', name: 'Philippines' },
      { code: 'SG', name: 'Singapore' },
      { code: 'TW', name: 'Taiwan' },
      { code: 'TH', name: 'Thailand' },
      { code: 'VN', name: 'Vietnam' },
    ];

    return {
      countries: [{ code: 'global', name: 'Global'}, ...countries],
      global: {
        code: 'global',
        name: this.$t('Global'),
      },
      selectedCountry: null,
      optionsShowed: false,
      deaths: 0,
      confirmed: 0,
      recovered: 0,
      numLastUpdated: null,
    };
  },
  methods: {
    selectCountry(country) {
      this.selectedCountry = country;
      this.toggleOptions();
      this.$emit('input', country && country.code === 'global' ? {} : country);
      this.updateCountryCodeParam(country);
      this.loadStats();
    },
    showOptions(){
      this.optionsShowed = true;
    },
    closeOptions(){
      this.optionsShowed = false;
    },
    toggleOptions() {
      this.optionsShowed = !this.optionsShowed;
    },
    updateCountryCodeParam(country) {
      const query = country && country.code !== 'global' ? {
        country_code: country.code,
      } : null;

      this.$router.push(this.localePath({
        path: '/',
        query,
      }));
    },
    checkForPresetCountryCode() {
      const { country_code: countryCode } = this.$route.query;
      const country = this.countries.find(country => country.code === countryCode);

      this.selectCountry(country || this.global);
      this.closeOptions();
    },
    loadStats() {
      const selectedCountryCode = !this.selectedCountry || this.selectedCountry.code === 'global' ? '' : this.selectedCountry.code;

      if (selectedCountryCode === '') {
        this.$api.stats.getGlobalStats()
          .then(data => {
            this.deaths = data.totalDeaths;
            this.confirmed = data.totalConfirmed;
            this.recovered = data.totalRecovered;
            this.numLastUpdated = data.created;
          });
      } else {
        this.$api.stats.getCountrySpecificStats(selectedCountryCode)
          .then(data => {
            this.deaths = data[0].totalDeaths;
            this.confirmed = data[0].totalConfirmed;
            this.recovered = data[0].totalRecovered;
            this.numLastUpdated = data[0].lastUpdated;
          });
      }

    },
  },
  created() {
    this.checkForPresetCountryCode();
    this.loadStats();
  },
};
</script>

<style scoped>
</style>