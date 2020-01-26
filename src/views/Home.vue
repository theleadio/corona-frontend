<template>
  <div>
    <div class="container">
      <Search class="mt-4 mb-8" />
      <div class="flex flex-wrap -mx-2">
        <div class="w-full md:w-2/3 px-2">
          <Card title="Trending News"> </Card>


          <div class="flex flex-wrap -mx-2">
            <div
              v-for="(article, index) in articles"
              :key="article.id"
              class="px-2"
              :class="
                index === 0 ? 'w-full' : 'w-full md:w-1/2 '
              "
            >
              <News :article="article" />
            </div>
          </div>
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
import News from "../components/News";
import NotifyCard from "../components/NotifyCard";
import RecentNews from "../components/RecentNews";
import Search from "../components/Search";

import axios, { getData } from "../lib/axios";

export default {
  components: {
    Card,
    News,
    NotifyCard,
    RecentNews,
    Search
  },
  data: () => ({
    articles: []
  }),
  created() {
    axios
      .get("/news")
      .then(res => {
        this.articles = getData(res);
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  }
};
</script>
