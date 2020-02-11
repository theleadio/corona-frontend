<template>
  <div>
    <Card title="Recent News"> </Card>
    <Loading :ajax="ajax">
      <template v-if="recentNews && recentNews.length">
        <a
            v-for="news in recentNews" :key="news.id"
            :href="news.url"
            target="_blank"
            rel="noopener"
            class="bg-gray-100 p-3 text-sm block"
        >
          <p class="leading-normal"><span class="font-bold">{{ news.title }}</span> - {{ news.description }}</p>
          <p class="text-right font-semibold"><!--{{ news.publishedAt | moment('from') }}--></p>
        </a>
      </template>
      <template v-else>
        <div class="my-8 mx-auto text-center">No result</div>
      </template>
    </Loading>
  </div>
</template>

<script>
import Card from "../components/Card";
import Loading from '../components/Loading';
import { getRecentNews } from "../api/news";

export default {
  name: "RecentNews",
  components: {
    Card,
    Loading
  },
  props: {
    country: [Object],
    default: () => {},
  },
  data() {
    return {
      recentNews: [],
      ajax: null
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
      this.ajax = this.$api.news.getRecentNews({ country: this.country.name })
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
