<template>
  <div class="bg-white rounded border-solid border-2 border-primary p-6 flex flex-wrap">
    <div class="w-full md:w-1/2">
      <label class="block tracking-wide text-gray-700 text-s font-bold mb-2" for="select-country">
        I am from...
      </label>
      <div class="relative">
        <button class="bg-gray-200 text-left font-bold py-2 px-4 rounded w-full md:w-1/2 flex" @click="toggleOptions" v-on-clickaway="closeOptions">
          <div v-if="currentCountry && currentCountry.code === 'global'">
            <i class="fas fa-globe"></i>
            {{currentCountry.name}}
          </div>
          <div v-else-if="currentCountry">
<!--            <span :class="'cursor-pointer flag-icon flag-icon-'+currentCountry.code"></span>-->
            <flag :iso="currentCountry.code" class="cursor-pointer" :squared="false" />
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
<!--              <span :class="'flag-icon flag-icon-'+country.code"></span>-->
              <flag :iso="country.code" :squared="false" />
              <span class="ml-2">{{country.name}}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>

     <div class="flex justify-center w-full md:justify-end md:w-1/2 mt-5 md:mt-0">
      <div class="text-center pl-2 pr-2 md:pl-5 md:pr-5">
        <div class="text-primary text-3xl md:text-5xl">
          <template v-if="typeof numConfirm === 'number'">
            <animated-number :value="numConfirm" :round="1" :duration="300" />
          </template>
          <template v-else>
            {{ numConfirm }}
          </template>
        </div>
        <div class="text-sm uppercase text-grey tracking-wide">Confirmed</div>
      </div>
       <div class="text-center pl-2 pr-2 md:pl-5 md:pr-5">
         <div class="text-primary text-3xl md:text-5xl">
           <template v-if="typeof numHeal === 'number'">
             <animated-number :value="numHeal" :round="1" :duration="300" />
           </template>
           <template v-else>
             {{ numHeal }}
           </template>
         </div>
         <div class="text-sm uppercase text-grey tracking-wide">Recovered</div>
       </div>
      <div class="text-center pl-2 pr-2 md:pl-5 md:pr-5">
        <div class="text-primary text-3xl md:text-5xl">
          <template v-if="typeof numDeath === 'number'">
            <animated-number :value="numDeath" :round="1" :duration="300" />
          </template>
          <template v-else>
            {{ numDeath }}
          </template>
        </div>
        <div class="text-sm uppercase text-grey tracking-wide">Death</div>
      </div>
    </div>
  </div>
</template>

<script>
import AnimatedNumber from "animated-number-vue";
import { directive as onClickaway } from 'vue-clickaway';

export default {
  name: "LocationSelector",
  directives: {
    onClickaway: onClickaway,
  },
  components: {
    AnimatedNumber,
  },
  data: function() {
    return {
      currentCountry: null,
      optionsShowed: false,
      global: {code: "global", name: "Global"},
      countries: [
        { code: "cn", name: "China" },
        { code: "id", name: "Indonesia" },
        { code: "jp", name: "Japan" },
        { code: "kr", name: "South Korea" },
        { code: "my", name: "Malaysia" },
        { code: "ph", name: "Philippines" },
        { code: "sg", name: "Singapore" },
        { code: "th", name: "Thailand" },
        { code: "vn", name: "Vietnam" },
      ],
      numDeath: '',
      numConfirm: '',
      numHeal: '',
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
