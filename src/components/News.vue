<template>
  <a
    :href="article.url"
    target="_blank"
    class="article block bg-cover bg-center bg-no-repeat h-64 w-full relative mb-4"
    :style="{ backgroundImage: `url(${article.imageUrl})` }"
  >
    <div class="content  absolute bottom-0 w-full px-2 py-4 text-black">
      <h2 class="font-bold text-xl mb-2 leading-tight">{{ article.title }}</h2>
      <p>{{ article.description | summary }}</p>
    </div>
  </a>
</template>

<script>
export default {
  name: "News",
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  filters: {
    summary(description) {
      description = description || '';

      return description.substring(0, 80) + "....";
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
