<template>
  <main class="container">
    <div class="flex flex-wrap -mx-2">
      <div class="w-full md:w-2/3 px-2">
        <LocationSelector v-model="country"/>
        <Search class="mt-4 mb-8"/>
        <TrendingNews :country="country" />
      </div>

      <div class="w-full md:w-1/3 px-2">
        <div class="">
          <TopStats/>
          <div class="mt-2 text-center underline text-blue-500 font-semibold">
            <nuxt-link to="analytics">Full list here</nuxt-link>
          </div>
        </div>

        <div class="my-4">
          <LearnPrevention/>
        </div>

        <div class="my-4">
          <HealthcareInstitutions :country="country.code" />

          <div class="mt-4 p-3 block justify-center bg-gray-300 text-sm">
            <p class="font-bold text-center text-primary text-lg">
              <a
                target="_blank"
                rel="noopener"
                href="https://www.facebook.com/coronatracker/"
              >
                <i class="fab fa-facebook"></i> Follow our Facebook page
              </a>
            </p>
          </div>

          <div class="mt-4 p-3 block justify-center bg-gray-300 text-sm">
            <p class="font-bold text-center text-primary text-lg">
              <a
                target="_blank"
                rel="noopener"
                href="https://play.google.com/store/apps/details?id=com.coronatracker.corona_flutter&hl=en"
              >
                <i class="fab fa-google-play"></i> Download app from Google
                Store
              </a>
            </p>
          </div>
        </div>

        <div class="my-4">
          <!-- <RecentNews :country="country" /> -->
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
  //import RecentNews from "../components/RecentNews";
  import Search from '~/components/Search';
  import TrendingNews from '~/components/TrendingNews';
  import LocationSelector from '~/components/LocationSelector';
  import TopStats from '~/components/TopStats';
  import LearnPrevention from '~/components/LearnPrevention';
  import HealthcareInstitutions from '~/components/HealthcareInstitutions';

  export default {
    metaInfo: {
      title: 'Home',
    },
    components: {
      // NotifyCard,
      // RecentNews,
      Search,
      TrendingNews,
      LocationSelector,
      TopStats,
      LearnPrevention,
      HealthcareInstitutions
    },
    mounted() {

    },
    data: function() {
      return {
        country: {},
      }
    },
  };
</script>
