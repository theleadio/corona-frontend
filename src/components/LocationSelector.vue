<template>
  <div class="bg-white rounded border-solid border-2 border-primary p-6 flex flex-wrap">
    <div class="w-full md:w-1/2">
      <label class="block tracking-wide text-gray-700 text-s font-bold mb-2" for="select-country">
        I am from...
      </label>
      <div>
        <button class="bg-gray-200 text-left font-bold py-2 px-4 rounded w-full md:w-1/2 flex" @click="showOptions = !showOptions">
          <div v-if="currentCountry && currentCountry.code === 'global'">
            <i class="fas fa-globe"></i>
            {{currentCountry.name}}
          </div>
          <div v-else-if="currentCountry">
            <span :class="'flag-icon flag-icon-'+currentCountry.code"></span>
            {{currentCountry.name}}
          </div>
          <div v-else>Select Country</div>
          <div class="self-center float">
            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">            
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </button>

        <ul class="absolute text-gray-700 pt-1 z-50" v-if="showOptions">
          <li>
            <a class="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" @click="selectCountry(global)">
              <i class="fas fa-globe"></i>
              Global
            </a>
          </li>
          <li v-for="country in countries" v-bind:key="country.code">
            <a class="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" @click="selectCountry(country)">
              <span :class="'flag-icon flag-icon-'+country.code"></span>
              {{country.name}}
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="flex justify-center w-full md:justify-end md:w-1/2 mt-5 md:mt-0">
      <div class="text-center pl-2 pr-2 md:pl-5 md:pr-5">
        <div class="text-primary text-3xl md:text-5xl">4</div>
        <div class="text-sm uppercase text-grey tracking-wide">Confirmed</div>
      </div>
      <div class="text-center pl-2 pr-2 md:pl-5 md:pr-5">
        <div class="text-primary text-3xl md:text-5xl">42</div>
        <div class="text-sm uppercase text-grey tracking-wide">Suspected</div>
      </div>
      <div class="text-center pl-2 pr-2 md:pl-5 md:pr-5">
        <div class="text-primary text-3xl md:text-5xl">46</div>
        <div class="text-sm uppercase text-grey tracking-wide">Negative</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LocationSelector",
  data: function() {
    return {
      currentCountry: null,
      showOptions: false,
      global: {code: "global", name: "Global"},
      countries: [
        { code: "my", name: "Malaysia" },
        { code: "sg", name: "Singapore" },
        { code: "th", name: "Thailand" },
        { code: "vn", name: "Vietnam" }
      ]
    };
  },
  methods: {
    selectCountry(country) {
      this.currentCountry = country;
      this.showOptions = !this.showOptions;
      this.$emit('input', country && country.code === 'global' ? {} : country);
    }
  }
};
</script>

<style scoped>
</style>
