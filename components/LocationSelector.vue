<template>
  <div class="bg-white rounded border border-gray-400 p-4">
    <div class="flex flex-wrap md:flex-no-wrap md:flex-row">
      <div class="w-full h-full md:w-5/6 align-middle">
        <p class="mt-2 mb-2 text-sm font-semibold">
            <span class="text-red-600"><i class="far fa-dot-circle blink"></i> LIVE </span>
            <!-- <span v-if="numLastUpdated">[Last Update: {{new Date(numLastUpdated).toDateString()}}]</span> -->
          </p>
          <label class="block text-s font-bold mb-2" for="select-country">Stats Overview</label>
          <button class="bg-gray-200 text-left font-bold py-2 px-4 rounded w-full md:w-3/4 flex" @click="toggleOptions" v-on-clickaway="closeOptions">
            <div v-if="currentCountry && currentCountry.code === 'global'">
              <i class="fas fa-globe"></i>
              {{currentCountry.name}}
            </div>
            <div v-else-if="currentCountry">
              <span :class="'cursor-pointer flag-icon flag-icon-'+currentCountry.code"></span>
              {{currentCountry.name}}
            </div>
            <div v-else>Select Country</div>
            <div class="self-center ml-auto">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </button>

          <ul class="absolute text-gray-700 pt-1 z-50 w-full md:w-1/2" v-if="optionsShowed">
            <li>
              <a class="cursor-pointer bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" @click="selectCountry(global)">
                <i class="fas fa-globe"></i>
                <span class="ml-2">Global</span>
              </a>
            </li>
            <li v-for="country in countries" v-bind:key="country.code">
              <a class="cursor-pointer bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" @click="selectCountry(country)">
                <span :class="'flag-icon flag-icon-' + country.code"></span>
                <span class="ml-2">{{country.name}}</span>
              </a>
            </li>
          </ul>
      </div>

      <stats class="flex justify-center w-full md:justify-end mt-5 md:mt-0" :confirmed=numConfirm :recovered=numHeal :deaths=numDeath />

    </div>

    <nuxt-link class="block text-right mt-6 underline text-blue-500 font-semibold" to="analytics">more details</nuxt-link>
  </div>
</template>

<script>
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
    Stats
  },
  data: function() {
    return {
      currentCountry: null,
      optionsShowed: false,
      global: {code: "global", name: "Global"},
      countries: [
        { code: "cn", name: "China" },
        { code: "hk", name: "Hong Kong" },
        { code: "id", name: "Indonesia" },
        { code: "jp", name: "Japan" },
        { code: "kr", name: "South Korea" },
        { code: "my", name: "Malaysia" },
        { code: "ph", name: "Philippines" },
        { code: "sg", name: "Singapore" },
        { code: "tw", name: "Taiwan" },
        { code: "th", name: "Thailand" },
        { code: "vn", name: "Vietnam" },
      ],
      numDeath: 0,
      numConfirm: 0,
      numHeal: 0,
      numLastUpdated: null,
    };
  },
  methods: {
    selectCountry(country) {
      this.currentCountry = country;
      this.optionsShowed = !this.optionsShowed;
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

      this.$router.push({
        path: '/',
        query,
      });
    },
    checkForPresetCountryCode() {
      const { country_code: countryCode } = this.$route.query;
      const country = this.countries.find(country => country.code === countryCode);

      this.selectCountry(country || this.global);
      this.closeOptions();
    },
    loadStats() {
      const selectedCountry = !this.currentCountry || this.currentCountry.code === 'global' ? '' : this.currentCountry.name;

      this.$api.stats.getStats(selectedCountry)
        .then(data => {
          this.numDeath = data.num_dead;
          this.numConfirm = data.num_confirm;
          this.numHeal = data.num_heal;
          this.numLastUpdated = data.agg_date;
        });
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
