<template>
  <div class="bg-white rounded border border-gray-400 p-4">
    <div class="flex flex-wrap md:flex-no-wrap md:flex-row">
      <div class="w-full md:w-2/5 h-full mr-2 align-middle relative">
        <p class="mt-2 mb-2 text-sm font-semibold">
          <span class="text-red-600 uppercase"><i class="far fa-dot-circle blink"></i> {{ $t('Live') }}</span>
          <!-- <span v-if="numLastUpdated">[Last Update: {{new Date(numLastUpdated).toDateString()}}]</span> -->
        </p>
        <label class="block text-s font-bold mb-2">{{ $t('Stats Overview') }}</label>
        <button class="bg-gray-200 text-left font-bold py-2 px-4 rounded w-full flex focus:outline-none rounded-b-none"
                @click="toggleOptions">
          <div class="flex">
             <template v-if="selectedCountry">
              <Flag :country-code="selectedCountry.code" class="text-center flex-none" style="width: 21px;" />
              <span class="ml-2 leading-none">{{ selectedCountry.name }}</span>
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

        <div class="" v-if="optionsShowed">
          <input
            type="text"
            class="absolute py-1 pl-4 leading-loose w-full focus:outline-none border border-gray-200"
            placeholder="Search country"
            v-model="search"
            v-on-clickaway="closeOptions"
            />
        </div>
        <ul class="absolute shadow text-gray-700 mt-10 w-full " v-if="optionsShowed" style="max-height: 36.3rem; z-index:1; overflow-y: auto; overflow-x:hidden">
          <li v-for="country in filteredCountries" :key="country.code" class="first:border-t-0">
            <a class="cursor-pointer bg-gray-200 hover:bg-gray-400 py-2 px-4 block flex"
               @click="selectCountry(country)">
              <Flag :country-code="country.code" class="text-center flex-none" style="width:21px" />
              <span class="ml-2 leading-none">{{ country.name }}</span>
            </a>
          </li>
        </ul>
      </div>

      <stats
        class="flex justify-center w-full md:justify-end mt-5 md:mt-0"
        :confirmed="statsConfirmed"
        :recovered="statsRecovered"
        :deaths="statsDeaths"
        :is-loading="isLoading"
      />

    </div>

    <div class="block text-center md:text-right mt-6 underline text-blue-500 font-semibold">
      <nuxt-link v-if="selectedCountry && selectedCountry.code !== 'global'" :to="`/country/${selectedCountry.code.toLowerCase()}`">{{ $t('more details') }}</nuxt-link>
      <nuxt-link v-else :to="localePath('analytics')">{{ $t('more details') }}</nuxt-link>
    </div>
  </div>
</template>

<script>
import Flag from '~/components/Flag';
import Stats from '~/components/Analytics/Stats';
import { directive as onClickaway } from 'vue-clickaway';

export default {
  name: "StatsOverview",
  directives: {
    onClickaway: onClickaway,
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    stats: {
      type: Object,
      default: () => {},
    }
  },
  components: {
    Flag,
    Stats
  },
  data: function() {

    return {
      countries: [],
      global: {
        code: 'global',
        name: this.$t('Global'),
      },
      selectedCountry: null,
      optionsShowed: false,
      search: ''
    };
  },

  computed: {
    filteredCountries() {
      const reg = new RegExp(this.search, "i")
      return this.countries.filter(m => reg.test(m.name))
    },
    statsConfirmed() {
      if (!this.stats || typeof this.stats.confirmed === 'undefined') {
        return '?';
      }

      return this.stats.confirmed;
    },
    statsRecovered() {
      if (!this.stats || typeof this.stats.recovered === 'undefined') {
        return '?';
      }

      return this.stats.recovered;
    },
    statsDeaths() {
      if (!this.stats || typeof this.stats.deaths === 'undefined') {
        return '?';
      }

      return this.stats.deaths;
    },
  },
  methods: {
    selectCountry(country) {
      this.selectedCountry = country;
      this.toggleOptions();
      this.$emit('input', country && country.code === 'global' ? {} : country);
      this.updateCountryCodeParam(country);
      this.search = ""
    },
    showOptions(){
      this.optionsShowed = true;
    },
    closeOptions(){
      this.optionsShowed = false;
    },
    toggleOptions() {
      this.optionsShowed = !this.optionsShowed;
      this.search = ""
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
    loadAffectedCountry () {
      this.$api.analytics.fetchAffectedCountry()
        .then(data => {
          const mappedInfo = data.map(m => {
              return {
                code: m.countryCode,
                name: m.countryName
              }
          }).filter(m => m.code != "OT")

          this.countries = [{ code: 'global', name: 'Global'}, ...mappedInfo]
        })
    },
  },
  created() {
    this.checkForPresetCountryCode();
    this.loadAffectedCountry()
  },
};
</script>

<style scoped>
</style>
