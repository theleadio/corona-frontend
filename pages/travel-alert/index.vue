<template>
  <main class="container mb-64">
    <h1 class="mb-8 text-lg font-bold">Travel Alert Information</h1>

    <div class="w-full h-full md:w-1/3 align-middle relative">
      <button class="bg-gray-200 text-left font-bold py-2 px-4 rounded w-full flex"
              @click="toggleOptions" v-on-clickaway="closeOptions">
        <div>Select Country</div>

        <div class="self-center ml-auto">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
          </svg>
        </div>
      </button>

      <ul class="absolute text-gray-700 pt-1 z-1 w-full" v-if="optionsShowed">
        <li v-for="country in countries" :key="country.code">
          <a class="cursor-pointer bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
             :href="'#' + country.code">
            <Flag :country-code="country.code"></Flag>
            <span class="ml-2">{{ country.name }}</span>
          </a>
        </li>
      </ul>
    </div>

    <div
      v-for="ta in travelAlerts"
      class="block mt-8 bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
      role="alert"
    >
      <div class="mb-5 flex font-bold rounded-t">
        <div>
          <Flag :country-code="ta.countryCode"></Flag>
          {{ ta.countryName }}
          <a :name="ta.countryCode" class="anchor"></a>
        </div>
        <div class="ml-auto">{{ ta.publishedDateFormatted }}</div>
      </div>

      <p v-for="message in ta.alertMessages" class="mb-2 text-md">
        {{ message }}
      </p>
    </div>
  </main>
</template>
<script>
  import Flag from '~/components/Flag';
  import { directive as onClickaway } from 'vue-clickaway';
  import moment from 'moment';

  const countries = [
    { code: 'AU', name: 'Australia' },
    { code: 'SG', name: 'Singapore' },
    { code: 'PH', name: 'Philippines' },
    { code: 'ID', name: 'Indonesia' },
    { code: 'NZ', name: 'New Zealand' },
    { code: 'IN', name: 'India' },
    { code: 'SA', name: 'Saudi Arabia' },
    { code: 'HK', name: 'Hong Kong' },
    { code: 'TW', name: 'Taiwan' },
    { code: 'US', name: 'United States of America' },
    { code: 'CA', name: 'Canada' },
    { code: 'JP', name: 'Japan' },
    { code: 'KR', name: 'South Korea' },
    { code: 'VN', name: 'Vietnam' },
    { code: 'IL', name: 'Israel' },
    { code: 'ET', name: 'Ethiopia' },
    { code: 'KH', name: 'Cambodia' },
    { code: 'RU', name: 'Russia' },
    { code: 'IT', name: 'Italy' },
    { code: 'CN', name: 'China' },
    { code: 'TH', name: 'Thailand' },
    { code: 'MY', name: 'Malaysia' },
    { code: 'MM', name: 'Myanmar' },
    { code: 'UK', name: 'United Kingdom' },
    { code: 'MO', name: 'Macau' },
    { code: 'BH', name: 'Bahrain' },
    { code: 'KW', name: 'Kuwait' },
    { code: 'OM', name: 'Oman' },
    { code: 'FR', name: 'France' },
    { code: 'KP', name: 'North Korea' },
    { code: 'DE', name: 'Germany' },
    { code: 'IE', name: 'Ireland' },
    { code: 'TR', name: 'Turkey' },
    { code: 'HU', name: 'Hungary' },
    { code: 'AE', name: 'United Arab Emirates' },
    { code: 'KE', name: 'Kenya' },
    { code: 'AO', name: 'Angola' },
    { code: 'BW', name: 'Botswana' },
    { code: 'CI', name: 'Ivory Coast' },
    { code: 'NG', name: 'Nigeria' },
    { code: 'MZ', name: 'Mozambique' },
    { code: 'ZA', name: 'South Africa' },
    { code: 'CM', name: 'Cameroon' },
    { code: 'VE', name: 'Venezuela' },
    { code: 'MX', name: 'Mexico' },
    { code: 'BR', name: 'Brazil' },
    { code: 'EG', name: 'Egypt' },
    { code: 'FI', name: 'Finland' },
    { code: 'MN', name: 'Mongolia' },
    { code: 'MA', name: 'Morocco' },
    { code: 'NL', name: 'Netherlands' },
    { code: 'PK', name: 'Pakistan' },
    { code: 'QA', name: 'Qatar' },
    { code: 'RW', name: 'Rwanda' },
    { code: 'ES', name: 'Spain' },
    { code: 'TZ', name: 'Tanzania' },
  ];

  export default {
    name: 'TravelBan',
    directives: {
      onClickaway: onClickaway,
    },
    components: {
      Flag,
    },
    data() {
      return {
        travelAlerts: [],
        countries: [],
        optionsShowed: false,
      };
    },
    methods: {
      async loadData() {
        const data = await this.$api.travelAlert.getTravelAlert();
        this.travelAlerts = data.map(a => {
          const country = countries.find(c => c.code === a.countryCode);
          if (country) {
            a.countryName = country.name;
          }

          a.alertMessages = a.alertMessage.split('|');

          a.publishedDateFormatted = moment(a.publishedDate).format('DD MMM YYYY');

          return a;
        });

        const sortedCountries = countries
          .filter(country => {
            return data.find(a => a.countryCode === country.code);
          })
          .sort((a, b) => {
            if (a.name === b.name) { return 0; }
            return a.name > b.name ? 1 : -1;
          });
        console.log("sortedCountries:", sortedCountries.map(a => a.name));

        this.countries = sortedCountries;
      },
      showOptions() {
        this.optionsShowed = true;
      },
      closeOptions() {
        this.optionsShowed = false;
      },
      toggleOptions() {
        this.optionsShowed = !this.optionsShowed;
      },
    },
    created() {
      this.loadData();
    },
  }
</script>
<style>
a.anchor {
  display: block;
  position: relative;
  top: -120px;
  visibility: hidden;
}
</style>