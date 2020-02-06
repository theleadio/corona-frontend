<template>
  <a
    :href="article.url"
    target="_blank"
    class="p-4 border-gray-400 border border-solid rounded flex w-full relative mb-4"
  >
    <div v-lazy:background-image="article.urlToImage"
         class="image bg-cover bg-center bg-no-repeat"></div>
    <div class="content w-full text-black">
      <v-clamp autoresize :max-lines="3"
               class="text-base font-semibold leading-normal break-normal lg:text-xl mb-1">
        {{ article.title }}
      </v-clamp>
      <v-clamp autoresize :max-lines="2"
               class="text-sm leading-snug break-normal text-gray-700 lg:text-base">
        {{ article.description }}
      </v-clamp>
      <div class="source-date lg:mt-3"><!--{{ article.publishedAt | moment('from') }}--></div>
    </div>
  </a>
</template>

<script>
  import VClamp from 'vue-clamp'

  export default {
    name: "News",
    components: {
      VClamp
    },
    props: {
      article: {
        type: Object,
        required: true
      }
    },
  };
</script>

<style scoped>
  .image {
    margin-right: 20px;
    width: 96px;
    height: 96px;
    flex: 0 0 96px;
    border-radius: 6px;
  }

  .source-date {
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    text-align: right;
    color: #108885;
  }
</style>
