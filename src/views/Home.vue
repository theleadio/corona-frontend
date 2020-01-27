<template>
  <div>
    <div class="container">
      <LocationSelector v-model="country" />
      
      <div class="flex flex-wrap -mx-2">
        <div class="w-full md:w-2/3 px-2">
          <Search class="mt-4 mb-8" />
          <TrendingNews :country="country.code"></TrendingNews>
        </div>
        <div class="w-full md:w-1/3 px-2">
          <div class="mt-4 mb-4">
            <HealthcareInstitutions :country="country"/>
          </div>

          <div class="mt-4 mb-4">
            <RecentNews :country="country" />
          </div>

          <!-- hide for now
          <NotifyCard />
          -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import NotifyCard from "../components/NotifyCard";
import RecentNews from "../components/RecentNews";
import Search from "../components/Search";
import TrendingNews from './Home/TrendingNews';
import LocationSelector from '../components/LocationSelector';
import HealthcareInstitutions from "../components/HealthcareInstitutions"

export default {
  components: {
    // NotifyCard,
    RecentNews,
    Search,
    TrendingNews,
    LocationSelector,
    HealthcareInstitutions
  },
  mounted() {

  },
  data: function(){
    return {
      country: "",
    }
  },
};
</script>
