<template>
  <a
    :href="article.url"
    target="_blank"
    class="article flex w-full relative mb-4"
  >
    <div v-lazy:background-image="article.urlToImage" class="image bg-cover bg-center bg-no-repeat"></div>
    <div class="content w-full text-black">
      <h2>{{ article.title | title(titleLength) }}</h2>
      <p>{{ article.description | summary(summaryLength) }}</p>
      <div class="source-date lg:mt-3"><!--{{ article.publishedAt | moment('from') }}--></div>
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
.article {
  padding: 20px 24px;
  border: 1px solid #E2E2E2;
  border-radius: 4px;
}

.image {
  margin-right: 24px;
  width: 96px;
  height: 96px;
  flex: 0 0 96px;
  border-radius: 6px;
}

.content {
  /*background: rgba(196, 196, 196, 0.7);*/
}

h2 {
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
}

p {
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
}

.source-date {
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  text-align: right;
  color: #108885;
}

.article:hover .content {
  /*background: rgba(196, 196, 196, 1);*/
}
</style>
