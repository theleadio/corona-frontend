<template>
  <div class="container">

    <div class="flex flex-wrap -mx-2">
      <div class="w-full md:w-2/3 px-2">
        <LocationSelector v-model="country"/>
        <Search class="mt-4 mb-8"/>
        <TrendingNews :country="country" />
      </div>

      <div class="w-full md:w-1/3 px-2">
        <div class="">
          <TopStats/>
        </div>

        <div class="my-4">
          <LearnPrevention/>
        </div>

        <div class="my-4">
          <HealthcareInstitutions :country="country.code" />
        </div>

        <div class="my-4">
          <!-- <RecentNews :country="country" /> -->
        </div>

        <!-- hide for now
        <NotifyCard />
        -->
      </div>
    </div>
  </div>
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
