<template>
  <div class="container">
    <a href="/" target="_blank">
      <logo class="lg:flex mb-4" style="pointer-events:none;" />
    </a>

    <div class="flex flex-wrap md:flex-no-wrap md:flex-row">
      <div class="w-full md:w-2/5 h-full mr-2 align-middle relative">
        <label class="block text-s font-bold mb-2">
          Live stats provided by CoronaTracker.com
        </label>

        <button
          v-on-clickaway="closeOptions"
          class="bg-gray-200 text-left font-bold py-2 px-4 rounded w-full flex"
          @click="toggleOptions"
        >
          <div>
            <template v-if="selectedCountry">
              <Flag
                :country-code="selectedCountry.code"
                class="text-center"
                style="width: 21px;"
              />
              <span class="ml-2">{{ selectedCountry.name }}</span>
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

        <ul
          v-if="optionsShowed"
          class="absolute shadow text-gray-700 mt-1 z-50 w-full"
        >
          <li v-for="country in countries" :key="country.code">
            <a
              class="cursor-pointer bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
              @click="selectCountry(country)"
            >
              <Flag
                :country-code="country.code"
                class="text-center"
                style="width: 21px;"
              />
              <span class="ml-2">{{ country.name }}</span>
            </a>
          </li>
        </ul>
      </div>

      <stats
        class="flex justify-center w-full md:justify-end mt-2 md:mt-0"
        :is-loading="isLoading"
        :confirmed="confirmed"
        :recovered="recovered"
        :deaths="deaths"
      />
    </div>

    <div
      class="block text-center md:text-right mt-6 underline text-blue-500 font-semibold"
    >
      <a href="/" target="_blank">{{ $t("more_details") }}</a>
    </div>
  </div>
</template>
<script>
import Flag from "~/components/Flag"
import Logo from "~/components/Logo"
import Stats from "~/components/Analytics/Stats"
import { directive as onClickaway } from "vue-clickaway"
import { COUNTRIES } from "~/utils/constants"

export default {
  name: "IframeLiveStats",
  layout: "blank",
  directives: {
    onClickaway: onClickaway
  },
  components: {
    Flag,
    Logo,
    Stats
  },
  data: function() {
    // const countries = [
    // { code: 'CN', name: 'China' },
    // { code: 'HK', name: 'Hong Kong' },
    // { code: 'ID', name: 'Indonesia' },
    // { code: 'JP', name: 'Japan' },
    // { code: 'KR', name: 'South Korea' },
    // { code: "MY", name: "Malaysia" }
    // { code: 'PH', name: 'Philippines' },
    // { code: 'SG', name: 'Singapore' },
    // { code: 'TW', name: 'Taiwan' },
    // { code: 'TH', name: 'Thailand' },
    // { code: 'VN', name: 'Vietnam' },
    // ]

    const countryToFind = this.$route.query.country || "my"
    const selectedCountry = COUNTRIES.find(country =>
      country.urlAliases.includes(countryToFind)
    )

    return {
      // countries: [{ code: "global", name: "Global" }, ...countries],
      countries: [
        {
          code: "global",
          name: "Global"
        },
        {
          code: selectedCountry && selectedCountry.code,
          name: selectedCountry && selectedCountry.name
        }
      ],
      global: {
        code: "global",
        name: this.$t("global")
      },
      selectedCountry,
      optionsShowed: false,
      deaths: 0,
      confirmed: 0,
      recovered: 0,
      lastUpdated: null,
      isLoading: false
    }
  },
  created() {
    this.loadStats()
  },
  methods: {
    selectCountry(country) {
      this.selectedCountry = country
      this.toggleOptions()
      // this.$emit('input', country && country.code === 'global' ? {} : country);
      // this.updateCountryCodeParam(country);
      this.loadStats()
    },
    showOptions() {
      this.optionsShowed = true
    },
    closeOptions() {
      this.optionsShowed = false
    },
    toggleOptions() {
      this.optionsShowed = !this.optionsShowed
    },
    async loadStats() {
      this.isLoading = true
      const selectedCountryCode =
        !this.selectedCountry || this.selectedCountry.code === "global"
          ? ""
          : this.selectedCountry.code

      try {
        if (!selectedCountryCode) {
          const data = await this.$api.stats.getGlobalStats()
          this.deaths = data.totalDeaths
          this.confirmed = data.totalConfirmed
          this.recovered = data.totalRecovered
          this.lastUpdated = data.created
          return
        }

        const data = await this.$api.stats.getCountrySpecificStats(
          selectedCountryCode
        )
        const countryData = data && data[0]

        if (!countryData) {
          this.deaths = "?"
          this.confirmed = "?"
          this.recovered = "?"
          this.lastUpdated = "?"
          return
        }

        this.deaths = countryData.totalDeaths
        this.confirmed = countryData.totalConfirmed
        this.recovered = countryData.totalRecovered
        this.lastUpdated = countryData.lastUpdated
      } catch (ex) {
        this.deaths = "?"
        this.confirmed = "?"
        this.recovered = "?"
        this.lastUpdated = "?"
        console.log("[IframeLiveStats] Error:", ex)
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>
<style scoped></style>
