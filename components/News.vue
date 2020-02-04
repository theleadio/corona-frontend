<template>
  <a
    :href="article.url"
    target="_blank"
    class="article block bg-cover bg-center bg-no-repeat h-64 w-full relative mb-4"
    v-lazy:background-image="article.urlToImage"
  >
    <div class="content  absolute bottom-0 w-full px-2 py-4 text-black">
      <h2 class="font-bold text-xl mb-2 leading-tight">{{ article.title | title(titleLength) }}</h2>
      <p>{{ article.description | summary(summaryLength) }}</p>
      <p class="lg:mt-3 text-right font-semibold"><!--{{ article.publishedAt | moment('from') }}--></p>
    </div>
  </a>
</template>

<script>
export default {
  name: "News",
  props: {
    titleLength: {
      type: Number,
    },
    summaryLength: {
      type: Number,
    },
    article: {
      type: Object,
      required: true
    }
  },
  filters: {
    title(title, length) {
      title = title || '';
      length = length || 40;

      return title.substring(0, length) + "....";
    },
    summary(summary, length) {
      summary = summary || '';
      length = length || 80;

      return summary.substring(0, length) + "....";
    }
  }
};
</script>

<style scoped>
.content {
  background: rgba(196, 196, 196, 0.7);
}

.article:hover .content {
  background: rgba(196, 196, 196, 1);
}
</style>
