<template>
  <main class="container" style="padding-bottom: 96px;">
    <div class="flex flex-wrap -mx-2">

      <div class="w-full md:w-2/3 px-2">
        <stats-overview
          v-model="country"
          :is-loading="isLoadingOverviewStats"
          :stats="stats"
        />
        <Survey class="my-4"
                :desktop-image="surveyConfig.desktopImage"
                :mobile-image="surveyConfig.mobileImage"
                :link="surveyConfig.link"
                :expires-on="surveyConfig.expiresOn" />
        <div class="w-full block md:hidden mt-4 mb-8">
          <TopStats
            :is-loading="isLoadingCountryStats"
            :country-stats="countryStats"
          />
          <div
            class="mt-2 text-center underline text-blue-500 font-semibold"
          >
            <nuxt-link :to="localePath('analytics')">{{ $t('Full list here') }}</nuxt-link>
          </div>
        </div>

        <Search class="mt-4 mb-8" />
        <TrendingNews :country="country" />
      </div>

      <div class="w-full md:w-1/3 px-2">
        <div class="hidden md:block">
          <TopStats
            :is-loading="isLoadingCountryStats"
            :country-stats="countryStats"
          />
          <div
            class="mt-2 text-center underline text-blue-500 font-semibold"
          >
            <nuxt-link :to="localePath('analytics')">{{ $t('Full list here') }}</nuxt-link>
          </div>
        </div>

        <div class="my-4">
          <LearnPrevention />
        </div>

        <div class="my-4">
          <BuyMeACoffee />
          <!--<div
            class="mt-4 p-1 block justify-center text-sm rounded border border-gray-400"
          >
            <div
              class="font-bold text-center text-primary "
              style="display:flex; flex-direction: row; justify-content:center; align-items: center "
            >
              <div class="text-3xl mr-4">
                <i class=" fab fa-google-play"></i>
              </div>
              <a
                target="_blank"
                rel="noopener"
                href="https://play.google.com/store/apps/details?id=com.coronatracker.corona_flutter&hl=en"
              >
                <div class="text-left">{{ $t('GET IT ON') }}</div>
                <span class="font-bold text-xl">Google Play</span>
              </a>
            </div>
          </div>-->
        </div>

        <!-- hide for now
        <NotifyCard />
        -->
      </div>
    </div>
  </main>
</template>
<script>
  // import NotifyCard from "../components/NotifyCard";
  import BuyMeACoffee from '~/components/BuyMeACoffee';
  import LearnPrevention from '~/components/LearnPrevention';
  import Search from '~/components/Search';
  import StatsOverview from '~/components/StatsOverview';
  import Survey from '~/components/Survey'
  import TopStats from '~/components/TopStats';
  import TrendingNews from '~/components/TrendingNews';
  import surveyImageDesktop from '~/assets/image/survey_desktop.png';
  import surveyImageMobile from '~/assets/image/survey_mobile.png';

  export default {
    head() {
      const title = this.$t('COVID-19 Corona Tracker');
      const description = this.$t('COVID-19 Corona Tracker: The only independent World Health Organization (WHO) recognized one stop platform for verified data and news.');
      const imageUrl = `${process.env.API_BASE_URL}/sharing/globalStatsToday?t=${Date.now()}`;

      return {
        title,
        titleTemplate: '%s',
        meta: [
          { hid: 'title', name: 'title', content: title },
          { hid: 'description', name: 'description', content: description },
          { hid: 'og-title', property: 'og:title', content: title },
          { hid: 'og-description', property: 'og:description', content: description },
          { hid: 'og-image', property: 'og:image', content: imageUrl },
          { hid: 'og-image-width', property: 'og:image:width', content: '1337' },
          { hid: 'og-image-height', property: 'og:image:height', content: '700' },
          { hid: 'twitter-card', property: 'twitter:card', content: 'summary_large_image' },
          { hid: 'twitter-title', property: 'twitter:title', content: title },
          { hid: 'twitter-description', property: 'twitter:description', content: description },
          { hid: 'twitter-image', property: 'twitter:image', content: imageUrl },
        ],
      };
    },
    components: {
      // NotifyCard,
      Survey,
      Search,
      TrendingNews,
      StatsOverview,
      TopStats,
      LearnPrevention,
      BuyMeACoffee,
    },
    data: function() {
      return {
        isLoadingOverviewStats: false,
        stats: {},
        isLoadingCountryStats: false,
        countryStats: [],
        country: {},
        surveyConfig: {
          desktopImage: surveyImageDesktop,
          mobileImage: surveyImageMobile,
          link: "https://tinyurl.com/CoronaTrackerSurvey",
          expiresOn: "2020-04-01"
        }
      };
    },
    methods: {
      async fetchOverviewStats() {
        this.isLoadingOverviewStats = true;
        const selectedCountryCode = !this.country || this.country.code === 'global' ?
          '' :
          this.country.code;

        try {
          if (!selectedCountryCode) {
            const data = await this.$api.stats.getGlobalStats();
            this.stats = {
              deaths: data.totalDeaths,
              confirmed: data.totalConfirmed,
              recovered: data.totalRecovered,
              lastUpdated: data.created,
            };
            return;
          }

          const data = await this.$api.stats.getCountrySpecificStats(selectedCountryCode);
          const countryData = data[0];

          if (!countryData) {
            this.stats = {
              deaths: '?',
              confirmed: '?',
              recovered: '?',
              lastUpdated: '?',
            };
            return;
          }

          this.stats = {
            deaths: countryData.totalDeaths,
            confirmed: countryData.totalConfirmed,
            recovered: countryData.totalRecovered,
            lastUpdated: countryData.lastUpdated,
          };
        } catch (ex) {
          this.deaths = '?';
          this.confirmed = '?';
          this.recovered = '?';
          this.lastUpdated = '?';
          console.log('[loadStats] Error:', ex);
        } finally {
          this.isLoadingOverviewStats = false;
        }
      },
      async fetchCountryStats() {
        this.isLoadingCountryStats = true;
        try {
          const limit = 15;
          this.countryStats = await this.$api.stats.getTopNCountryStats(limit);
        } catch (ex) {
          console.log('[fetchCountryStats] Error:', ex);
        } finally {
          this.isLoadingCountryStats = false;
        }
      },
    },
    watch: {
      country(newVal, oldVal) {
        if (newVal && oldVal && newVal.code !== oldVal.code) {
          this.fetchOverviewStats();
        }
      },
    },
    mounted() {

    },
    created() {
      this.fetchOverviewStats();
      this.fetchCountryStats();
    },
  };
</script>
