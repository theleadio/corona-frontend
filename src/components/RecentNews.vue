<template>
  <div>
    <Card title="Recent News"> </Card>
    <a
      v-for="news in recentNews" :key="news.id"
      :href="news.url"
      target="_blank"
      class="bg-gray-100 p-3 text-sm block"
    >
      <p class="leading-normal"><span class="font-bold">{{ news.title }}</span> - {{ news.description }}</p>
      <p class="text-right font-semibold">{{ news.published | moment('from') }}</p>
    </a>
  </div>
</template>

<script>
import Card from "../components/Card";
import axios, {getData} from "../lib/axios";

export default {
  name: "RecentNews",
  components: {
    Card,
  },
  data() {
    return {
      recentNews: [],
    };
  },
  created() {
    const sort = '-publishedAt'
    const limit = 4;

    axios
      .get(`/news?sort=${sort}&limit=${limit}`)
      .then(res => {
        this.recentNews = getData(res);
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  }
}
</script>

<style scoped>
a {
  transition: background-color .4s;
}

a:hover {
 background-color: #eaeaea;
}
</style>
