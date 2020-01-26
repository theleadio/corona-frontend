<template>
  <div
    class="bg-cover bg-center bg-no-repeat h-64 w-full relative mb-4"
    :style="{ backgroundImage: `url(${article.imageUrl})` }"
  >
    <div class="content  absolute bottom-0 w-full px-2 py-4 text-black">
      <h2 class="font-bold text-xl mb-2 leading-tight">{{ article.title }}</h2>
      <p>{{ summary }}</p>
    </div>
  </div>
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
  computed: {
    summary() {
      if(!this.article) return '';
      return this.article.description.substring(0,80) + "....";
    }
  }
};
</script>

<style scoped>
.content {
  background: rgba(196, 196, 196, 0.7);
}
</style>
