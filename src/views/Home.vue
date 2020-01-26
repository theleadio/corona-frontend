<template>
  <div>
    <div class="container">
      <Search class="mt-4 mb-8" />
      <div class="flex flex-wrap -mx-2">
        
        <div class="w-full md:w-2/3 px-2">
          <Card title="Trending News"> </Card>
  
          <TrendingNews></TrendingNews>

        </div>
        <div class="w-full md:w-1/3 px-2">
          <div class="mb-4">
            <RecentNews />
          </div>

          <NotifyCard />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Card from "../components/Card";
import NotifyCard from "../components/NotifyCard";
import RecentNews from "../components/RecentNews";
import Search from "../components/Search";
import TrendingNews from './Home/TrendingNews';

export default {
  components: {
    Card,
    NotifyCard,
    RecentNews,
    Search,
    TrendingNews
  },
  mounted() {

  },
};
</script>
