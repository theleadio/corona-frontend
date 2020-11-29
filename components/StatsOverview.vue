<template>
  <div class="bg-white rounded border border-gray-400 p-4">
    <div class="flex flex-wrap md:flex-no-wrap md:flex-row">
      <div class="w-full md:w-2/5 h-full mr-2 align-middle relative">
        <div
          class="mt-2 mb-2 text-sm font-semibold flex justify-between items-center"
        >
          <span class="text-red-600 uppercase"
            ><i class="far fa-dot-circle blink" /> {{ $t("live") }}</span
          >
          <Share :url="shareUrl" />
          <!-- <span v-if="numLastUpdated">[Last Update: {{new Date(numLastUpdated).toDateString()}}]</span> -->
        </div>
        <label class="block text-s font-bold mb-2">{{
          $t("stats_overview")
        }}</label>
        <button
          class="bg-gray-200 text-left font-bold py-2 px-4 rounded w-full flex focus:outline-none rounded-b-none"
          @click="toggleOptions"
        >
          <div class="flex">
            <template v-if="selectedCountry">
              <Flag
                :country-code="selectedCountry.code"
                class="text-center flex-none"
                style="width: 21px;"
              />
              <span class="ml-2 leading-none">{{ selectedCountry.name }}</span>
            </template>
            <template v-else>
              {{ $t("select_country") }}
            </template>
          </div>

          <div class="self-center ml-auto">
            <svg
              class="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
              />
            </svg>
          </div>
        </button>

        <div v-if="optionsShowed" class="">
          <input
            v-model="search"
            v-on-clickaway="closeOptions"
            type="text"
            class="absolute py-1 pl-4 leading-loose w-full focus:outline-none border border-gray-200"
            placeholder="Search country"
          />
        </div>
        <ul
          v-if="optionsShowed"
          class="absolute shadow text-gray-700 mt-10 w-full "
          style="max-height: 36.3rem; z-index:1; overflow-y: auto; overflow-x:hidden"
        >
          <li
            v-for="country in filteredCountries"
            :key="country.code"
            class="first:border-t-0"
          >
            <a
              class="cursor-pointer bg-gray-200 hover:bg-gray-400 py-2 px-4 block flex"
              @click="selectCountry(country)"
            >
              <Flag
                :country-code="country.code"
                class="text-center flex-none"
                style="width:21px"
              />
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

    <div
      class="block text-center md:text-right mt-6 text-blue-500 font-semibold"
    >
      <nuxt-link
        v-if="selectedCountry && selectedCountry.code !== 'global'"
        :to="`/country/${selectedCountry.code.toLowerCase()}`"
      >
        {{ $t("more_details") }}
      </nuxt-link>
      <nuxt-link v-else :to="localePath('analytics')">
        {{ $t("more_details") }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import Flag from "~/components/Flag"
import Stats from "~/components/Analytics/Stats"
import Share from "~/components/Share"
import { directive as onClickaway } from "vue-clickaway"

export default {
  name: "StatsOverview",
  directives: {
    onClickaway: onClickaway
  },
  components: {
    Flag,
    Stats,
    Share
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    stats: {
      type: Object,
      default: () => {}
    }
  },
  data: function() {
    return {
      countries: [],
      global: {
        code: "global",
        name: this.$t("global")
      },
      selectedCountry: null,
      optionsShowed: false,
      search: ""
    }
  },

  computed: {
    filteredCountries() {
      const reg = new RegExp(this.search, "i")
      return this.countries.filter(m => reg.test(m.name))
    },
    statsConfirmed() {
      if (!this.stats || typeof this.stats.confirmed === "undefined") {
        return "?"
      }

      return this.stats.confirmed
    },
    statsRecovered() {
      if (!this.stats || typeof this.stats.recovered === "undefined") {
        return "?"
      }

      return this.stats.recovered
    },
    statsDeaths() {
      if (!this.stats || typeof this.stats.deaths === "undefined") {
        return "?"
      }

      return this.stats.deaths
    },
    baseShareUrl() {
      if (process.browser) {
        let split = window.location.href.split("/")
        return split[0] + "//" + split[2]
      } else {
        return "https://www.coronatracker.com"
      }
    },
    shareUrl() {
      return this.selectedCountry.code === "global"
        ? this.baseShareUrl
        : this.baseShareUrl +
            "/country/" +
            this.selectedCountry.code.toLowerCase()
    }
  },
  created() {
    this.checkForPresetCountryCode()
    this.loadAffectedCountry()
  },
  methods: {
    selectCountry(country) {
      this.selectedCountry = country
      this.toggleOptions()
      this.$emit("input", country && country.code === "global" ? {} : country)
      this.updateCountryCodeParam(country)
      this.search = ""
    },
    showOptions() {
      this.optionsShowed = true
    },
    closeOptions() {
      this.optionsShowed = false
    },
    toggleOptions() {
      this.optionsShowed = !this.optionsShowed
      this.search = ""
    },
    updateCountryCodeParam(country) {
      const query =
        country && country.code !== "global"
          ? {
              country_code: country.code
            }
          : null

      this.$router.push(
        this.localePath({
          path: "/",
          query
        })
      )
    },
    checkForPresetCountryCode() {
      const { country_code: countryCode } = this.$route.query
      const country = this.countries.find(
        country => country.code === countryCode
      )

      this.selectCountry(country || this.global)
      this.closeOptions()
    },
    loadAffectedCountry() {
      // Hardcoded for performance reason.
      const countries = [
        {
          code: "US",
          name: "USA"
        },
        {
          code: "IN",
          name: "India"
        },
        {
          code: "BR",
          name: "Brazil"
        },
        {
          code: "RU",
          name: "Russia"
        },
        {
          code: "FR",
          name: "France"
        },
        {
          code: "ES",
          name: "Spain"
        },
        {
          code: "GB",
          name: "UK"
        },
        {
          code: "IT",
          name: "Italy"
        },
        {
          code: "AR",
          name: "Argentina"
        },
        {
          code: "CO",
          name: "Colombia"
        },
        {
          code: "MX",
          name: "Mexico"
        },
        {
          code: "DE",
          name: "Germany"
        },
        {
          code: "PL",
          name: "Poland"
        },
        {
          code: "PE",
          name: "Peru"
        },
        {
          code: "IR",
          name: "Iran"
        },
        {
          code: "ZA",
          name: "South Africa"
        },
        {
          code: "UA",
          name: "Ukraine"
        },
        {
          code: "TR",
          name: "Turkey"
        },
        {
          code: "BE",
          name: "Belgium"
        },
        {
          code: "CL",
          name: "Chile"
        },
        {
          code: "IQ",
          name: "Iraq"
        },
        {
          code: "ID",
          name: "Indonesia"
        },
        {
          code: "CZ",
          name: "Czechia"
        },
        {
          code: "NL",
          name: "Netherlands"
        },
        {
          code: "RO",
          name: "Romania"
        },
        {
          code: "BD",
          name: "Bangladesh"
        },
        {
          code: "PH",
          name: "Philippines"
        },
        {
          code: "PK",
          name: "Pakistan"
        },
        {
          code: "CA",
          name: "Canada"
        },
        {
          code: "SA",
          name: "Saudi Arabia"
        },
        {
          code: "MA",
          name: "Morocco"
        },
        {
          code: "IL",
          name: "Israel"
        },
        {
          code: "CH",
          name: "Switzerland"
        },
        {
          code: "PT",
          name: "Portugal"
        },
        {
          code: "AT",
          name: "Austria"
        },
        {
          code: "SE",
          name: "Sweden"
        },
        {
          code: "NP",
          name: "Nepal"
        },
        {
          code: "JO",
          name: "Jordan"
        },
        {
          code: "HU",
          name: "Hungary"
        },
        {
          code: "EC",
          name: "Ecuador"
        },
        {
          code: "AE",
          name: "UAE"
        },
        {
          code: "PA",
          name: "Panama"
        },
        {
          code: "RS",
          name: "Serbia"
        },
        {
          code: "BO",
          name: "Bolivia"
        },
        {
          code: "DO",
          name: "Dominican Republic"
        },
        {
          code: "KW",
          name: "Kuwait"
        },
        {
          code: "JP",
          name: "Japan"
        },
        {
          code: "BG",
          name: "Bulgaria"
        },
        {
          code: "QA",
          name: "Qatar"
        },
        {
          code: "CR",
          name: "Costa Rica"
        },
        {
          code: "AM",
          name: "Armenia"
        },
        {
          code: "BY",
          name: "Belarus"
        },
        {
          code: "KZ",
          name: "Kazakhstan"
        },
        {
          code: "GE",
          name: "Georgia"
        },
        {
          code: "LB",
          name: "Lebanon"
        },
        {
          code: "HR",
          name: "Croatia"
        },
        {
          code: "OM",
          name: "Oman"
        },
        {
          code: "GT",
          name: "Guatemala"
        },
        {
          code: "EG",
          name: "Egypt"
        },
        {
          code: "AZ",
          name: "Azerbaijan"
        },
        {
          code: "ET",
          name: "Ethiopia"
        },
        {
          code: "HN",
          name: "Honduras"
        },
        {
          code: "MD",
          name: "Moldova"
        },
        {
          code: "SK",
          name: "Slovakia"
        },
        {
          code: "GR",
          name: "Greece"
        },
        {
          code: "VE",
          name: "Venezuela"
        },
        {
          code: "TN",
          name: "Tunisia"
        },
        {
          code: "MM",
          name: "Myanmar"
        },
        {
          code: "BA",
          name: "Bosnia and Herzegovina"
        },
        {
          code: "BH",
          name: "Bahrain"
        },
        {
          code: "CN",
          name: "China"
        },
        {
          code: "KE",
          name: "Kenya"
        },
        {
          code: "PS",
          name: "Palestine"
        },
        {
          code: "LY",
          name: "Libya"
        },
        {
          code: "DZ",
          name: "Algeria"
        },
        {
          code: "PY",
          name: "Paraguay"
        },
        {
          code: "DK",
          name: "Denmark"
        },
        {
          code: "SI",
          name: "Slovenia"
        },
        {
          code: "UZ",
          name: "Uzbekistan"
        },
        {
          code: "KG",
          name: "Kyrgyzstan"
        },
        {
          code: "IE",
          name: "Ireland"
        },
        {
          code: "NG",
          name: "Nigeria"
        },
        {
          code: "MY",
          name: "Malaysia"
        },
        {
          code: "MK",
          name: "North Macedonia"
        },
        {
          code: "LT",
          name: "Lithuania"
        },
        {
          code: "SG",
          name: "Singapore"
        },
        {
          code: "GH",
          name: "Ghana"
        },
        {
          code: "AF",
          name: "Afghanistan"
        },
        {
          code: "SV",
          name: "El Salvador"
        },
        {
          code: "AL",
          name: "Albania"
        },
        {
          code: "NO",
          name: "Norway"
        },
        {
          code: "ME",
          name: "Montenegro"
        },
        {
          code: "LU",
          name: "Luxembourg"
        },
        {
          code: "KR",
          name: "S. Korea"
        },
        {
          code: "AU",
          name: "Australia"
        },
        {
          code: "FI",
          name: "Finland"
        },
        {
          code: "CM",
          name: "Cameroon"
        },
        {
          code: "LK",
          name: "Sri Lanka"
        },
        {
          code: "CI",
          name: "Ivory Coast"
        },
        {
          code: "UG",
          name: "Uganda"
        },
        {
          code: "ZM",
          name: "Zambia"
        },
        {
          code: "SD",
          name: "Sudan"
        },
        {
          code: "MG",
          name: "Madagascar"
        },
        {
          code: "LV",
          name: "Latvia"
        },
        {
          code: "SN",
          name: "Senegal"
        },
        {
          code: "MZ",
          name: "Mozambique"
        },
        {
          code: "AO",
          name: "Angola"
        },
        {
          code: "NA",
          name: "Namibia"
        },
        {
          code: "PF",
          name: "French Polynesia"
        },
        {
          code: "GN",
          name: "Guinea"
        },
        {
          code: "MV",
          name: "Maldives"
        },
        {
          code: "CD",
          name: "DRC"
        },
        {
          code: "TJ",
          name: "Tajikistan"
        },
        {
          code: "EE",
          name: "Estonia"
        },
        {
          code: "GF",
          name: "French Guiana"
        },
        {
          code: "CV",
          name: "Cabo Verde"
        },
        {
          code: "JM",
          name: "Jamaica"
        },
        {
          code: "BW",
          name: "Botswana"
        },
        {
          code: "CY",
          name: "Cyprus"
        },
        {
          code: "ZW",
          name: "Zimbabwe"
        },
        {
          code: "MT",
          name: "Malta"
        },
        {
          code: "HT",
          name: "Haiti"
        },
        {
          code: "GA",
          name: "Gabon"
        },
        {
          code: "MR",
          name: "Mauritania"
        },
        {
          code: "GP",
          name: "Guadeloupe"
        },
        {
          code: "CU",
          name: "Cuba"
        },
        {
          code: "RE",
          name: "Réunion"
        },
        {
          code: "SY",
          name: "Syria"
        },
        {
          code: "BS",
          name: "Bahamas"
        },
        {
          code: "TT",
          name: "Trinidad and Tobago"
        },
        {
          code: "AD",
          name: "Andorra"
        },
        {
          code: "SZ",
          name: "Eswatini"
        },
        {
          code: "HK",
          name: "Hong Kong"
        },
        {
          code: "MW",
          name: "Malawi"
        },
        {
          code: "RW",
          name: "Rwanda"
        },
        {
          code: "NI",
          name: "Nicaragua"
        },
        {
          code: "DJ",
          name: "Djibouti"
        },
        {
          code: "BZ",
          name: "Belize"
        },
        {
          code: "UY",
          name: "Uruguay"
        },
        {
          code: "MQ",
          name: "Martinique"
        },
        {
          code: "IS",
          name: "Iceland"
        },
        {
          code: "GY",
          name: "Guyana"
        },
        {
          code: "SR",
          name: "Suriname"
        },
        {
          code: "YT",
          name: "Mayotte"
        },
        {
          code: "GQ",
          name: "Equatorial Guinea"
        },
        {
          code: "CF",
          name: "CAR"
        },
        {
          code: "AW",
          name: "Aruba"
        },
        {
          code: "ML",
          name: "Mali"
        },
        {
          code: "SO",
          name: "Somalia"
        },
        {
          code: "TH",
          name: "Thailand"
        },
        {
          code: "GM",
          name: "Gambia"
        },
        {
          code: null,
          name: "South Sudan"
        },
        {
          code: "BJ",
          name: "Benin"
        },
        {
          code: "TG",
          name: "Togo"
        },
        {
          code: "BF",
          name: "Burkina Faso"
        },
        {
          code: "GW",
          name: "Guinea-Bissau"
        },
        {
          code: "SL",
          name: "Sierra Leone"
        },
        {
          code: "CW",
          name: "Curaçao"
        },
        {
          code: "YE",
          name: "Yemen"
        },
        {
          code: "LS",
          name: "Lesotho"
        },
        {
          code: "NZ",
          name: "New Zealand"
        },
        {
          code: "TD",
          name: "Chad"
        },
        {
          code: "LR",
          name: "Liberia"
        },
        {
          code: "SM",
          name: "San Marino"
        },
        {
          code: "NE",
          name: "Niger"
        },
        {
          code: "VN",
          name: "Vietnam"
        },
        {
          code: "LI",
          name: "Liechtenstein"
        },
        {
          code: "",
          name: "Channel Islands"
        },
        {
          code: "GI",
          name: "Gibraltar"
        },
        {
          code: "ST",
          name: "Sao Tome and Principe"
        },
        {
          code: "MN",
          name: "Mongolia"
        },
        {
          code: "TC",
          name: "Turks and Caicos"
        },
        {
          code: "MF",
          name: "Saint Martin"
        },
        {
          code: "BI",
          name: "Burundi"
        },
        {
          code: "TW",
          name: "Taiwan"
        },
        {
          code: "PG",
          name: "Papua New Guinea"
        },
        {
          code: "KM",
          name: "Comoros"
        },
        {
          code: "MC",
          name: "Monaco"
        },
        {
          code: "ER",
          name: "Eritrea"
        },
        {
          code: "TZ",
          name: "Tanzania"
        },
        {
          code: "FO",
          name: "Faeroe Islands"
        },
        {
          code: "MU",
          name: "Mauritius"
        },
        {
          code: "BT",
          name: "Bhutan"
        },
        {
          code: "IM",
          name: "Isle of Man"
        },
        {
          code: "KH",
          name: "Cambodia"
        },
        {
          code: "KY",
          name: "Cayman Islands"
        },
        {
          code: "BB",
          name: "Barbados"
        },
        {
          code: "LC",
          name: "Saint Lucia"
        },
        {
          code: "BM",
          name: "Bermuda"
        },
        {
          code: "SC",
          name: "Seychelles"
        },
        {
          code: null,
          name: "Caribbean Netherlands"
        },
        {
          code: null,
          name: "Brunei "
        },
        {
          code: "BN",
          name: "Brunei"
        },
        {
          code: "AG",
          name: "Antigua and Barbuda"
        },
        {
          code: null,
          name: "United Arab Emirates"
        },
        {
          code: "BL",
          name: "St. Barth"
        },
        {
          code: "VC",
          name: "St. Vincent Grenadines"
        },
        {
          code: "DM",
          name: "Dominica"
        },
        {
          code: "VG",
          name: "British Virgin Islands"
        },
        {
          code: "MO",
          name: "Macao"
        },
        {
          code: "GD",
          name: "Grenada"
        },
        {
          code: "LA",
          name: "Laos"
        },
        {
          code: "PR",
          name: "Puerto Rico"
        },
        {
          code: "FJ",
          name: "Fiji"
        },
        {
          code: "NC",
          name: "New Caledonia"
        },
        {
          code: "GU",
          name: "Guam"
        },
        {
          code: "TL",
          name: "Timor-Leste"
        },
        {
          code: "VA",
          name: "Vatican City"
        },
        {
          code: "KN",
          name: "Saint Kitts and Nevis"
        },
        {
          code: "GL",
          name: "Greenland"
        },
        {
          code: "SB",
          name: "Solomon Islands"
        },
        {
          code: "VI",
          name: "U.S. Virgin Islands"
        },
        {
          code: null,
          name: "Falkland Islands"
        },
        {
          code: null,
          name: "Saint Pierre Miquelon"
        },
        {
          code: "MS",
          name: "Montserrat"
        },
        {
          code: "EH",
          name: "Western Sahara"
        },
        {
          code: "CI",
          name: "Côte d'Ivoire"
        },
        {
          code: null,
          name: "MS Zaandam"
        },
        {
          code: "AI",
          name: "Anguilla"
        },
        {
          code: "MH",
          name: "Marshall Islands"
        },
        {
          code: "WF",
          name: "Wallis and Futuna"
        },
        {
          code: null,
          name: "Central African Republic"
        },
        {
          code: "XK",
          name: "Kosovo"
        },
        {
          code: "WS",
          name: "Samoa"
        },
        {
          code: "FO",
          name: "Faroe Islands"
        },
        {
          code: "VU",
          name: "Vanuatu"
        },
        {
          code: "VC",
          name: "Saint Vincent and the Grenadines"
        },
        {
          code: "JE",
          name: "Jersey"
        },
        {
          code: "GG",
          name: "Guernsey"
        }
      ]
      this.countries = [{ code: "global", name: "Global" }, ...countries]
      // this.$api.analytics.fetchAffectedCountry().then(data => {
      //   const mappedInfo = data
      //     .map(m => {
      //       return {
      //         code: m.countryCode,
      //         name: m.countryName
      //       }
      //     })
      //     .filter(m => m.code != "OT")
      // })
    }
  }
}
</script>

<style scoped></style>
