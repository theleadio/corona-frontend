<template>
  <div class="container">
    <div class="w-full h-full md:w-1/3 align-middle relative">
      <button class="bg-gray-200 text-left font-bold py-2 px-4 rounded w-full flex"
              @click="toggleOptions" v-on-clickaway="closeOptions">
        <div>
          <template v-if="selectedCountry">
            <Flag :country-code="selectedCountry.code"></Flag>
            <span class="ml-2">{{ selectedCountry.name }}</span>
          </template>
          <template v-else>
            Select Country
          </template>
        </div>

        <div class="self-center ml-auto">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
          </svg>
        </div>
      </button>

      <ul class="absolute text-gray-700 pt-1 z-50 w-full" v-if="optionsShowed">
        <li v-for="country in countries" :key="country.code">
          <a class="cursor-pointer bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
             @click="selectCountry(country)">
            <Flag :country-code="country.code"></Flag>
            <span class="ml-2">{{ country.name }}</span>
          </a>
        </li>
      </ul>
    </div>

    <pre style="display: none;
    position: absolute;
    right: 10px;
    bottom: 10px;
    background: #b1d7ff;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 8px 8px #000;">{{ JSON.stringify(selectedTravelBanInfo, null, 2) }}</pre>

    <template v-if="selectedTravelBanInfo">
      <div v-if="selectedTravelBanInfo.visaInvalid === 1">
        Previously issued Visa invalid
      </div>
      <div v-if="selectedTravelBanInfo.flightSus === 1">
        Flights affected
      </div>
      <div v-if="banInMessage">
        {{ banInMessage }}
      </div>
      <div v-if="selectedTravelBanInfo.aggBanOut === 1">
        Advise against travelling to China
      </div>
      <div v-if="selectedTravelBanInfo.aggBanOut === 2">
        Ban travelling to China
      </div>
      <div v-if="selectedTravelBanInfo.specialNote">
        {{ selectedTravelBanInfo.specialNote }}
      </div>
    </template>
  </div>
</template>
<script>
  import Flag from '~/components/Flag';
  import { directive as onClickaway } from 'vue-clickaway';

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

  const banKeyMap = {
    'FOR_CN_14': 'Foreigners been to China in past 2 weeks',
    'FOR_TRAN_14': 'Foreigners transited in China in past 2 weeks',
    'NAT': 'Nationals',
    'NAT_STU': 'Nationals (Students)',
    'PR':	'Permanent Residents',
    'FOR': 'Foreigners',
    'FAM': 'Families of Nationals',
    'HB': 'Travelling from Hubei',
    'CHI': 'Nationals of China',
  };

  export default {
    name: 'TravelBan',
    directives: {
      onClickaway: onClickaway,
    },
    components: {
      Flag,
    },
    data() {
      // {
      //   'ban_in': '1',
      //   'ban_out': '1',
      //   'soft_ban_out': '0',
      //   'visa_invalid': '1',
      //   'flight_sus': '1',
      //   'evac_flag': '0',
      //   'ban_in_key': 'CN,TRAN',
      //   'ban_out_key': '',
      // }

      return {
        travelBanInfos: [],
        // countries: [{ code: 'global', name: 'Global'}, ...countries],
        countries: [],
        global: {
          code: 'global',
          name: 'Global',
        },
        selectedCountry: null,
        optionsShowed: false,
      };
    },
    computed: {
      selectedTravelBanInfo() {
        const countryCode = this.selectedCountry && this.selectedCountry.code;
        return this.travelBanInfos.find(a => a.countryCode === countryCode);
      },
      banInMessage() {
        if (!this.selectedTravelBanInfo) {
          return '';
        }

        if (this.selectedTravelBanInfo.banIn !== 1) {
          return '';
        }

        if (!this.selectedTravelBanInfo.banInKey) {
          return 'Travelling ban incoming from China';
        }

        const banInKeys = this.selectedTravelBanInfo.banInKey.split('+').map(a => a.trim());

        const banText = banInKeys.map(key => {
          const text = banKeyMap[key];
          if (text) {
            return text;
          }

          const country = countries.find(a => a.code === key);
          if (country && country.name) {
            return 'Nationals of ' + country.name
          }

          return '';
        }).filter(a => a).join(', ');

        if (!banText) {
          return '';
        }

        return 'Travelling ban incoming for ' + banText;
      }
    },
    methods: {
      async loadData() {
        const data = await this.$api.travelBan.getTravelBan();
        this.travelBanInfos = data.summary;

        this.countries = countries.filter(country => {
          const travelBanInfo = data.summary.find(a => a.countryCode === country.code);
          return travelBanInfo ? !this.isTravelBanInfoEmpty(travelBanInfo) : false;
        })
      },
      selectCountry(country) {
        this.selectedCountry = country;
        this.toggleOptions();
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
      isTravelBanInfoEmpty({ banIn, visaInvalid, flightSus, evacFlag, specialNote, aggBanOut }) {
        return !banIn && !visaInvalid && !flightSus && !evacFlag && !specialNote && !aggBanOut;
      },
    },
    created() {
      this.loadData();
    },
  }
</script>
<style>

</style>