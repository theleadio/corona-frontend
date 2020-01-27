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
      <p class="text-right font-semibold">{{ news.publishedAt | moment('from') }}</p>
    </a>
  </div>
</template>

<script>
import Card from "../components/Card";
import { getRecentNews } from "../api/news";

export default {
  name: "RecentNews",
  components: {
    Card,
  },
  props: {
    country: [Object],
    default: () => {},
  },
  data() {
    return {
      recentNews: [],
    };
  },
  watch: {
    country() {
      this.loadData();
    }
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      getRecentNews({ country: this.country.name })
        .then(data => {
          this.recentNews = data;
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
    },
  },
}
</script>

<style scoped>
a {
  transition: background-color .4s;
}

a:hover {
 background-color: #eaeaea;
}

a + a {
  border-top: 1px solid #108885;
}
</style>
