<template>
  <main class="container">
    <div class="w-full h-screen">
      <h1 class="text-2xl font-bold mb-4">{{ $t('What is COVID-19?') }}</h1>

      <iframe style="width:100%;height:500px;" src="https://www.youtube.com/embed/OZcRD9fV7jo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      <iframe style="width:100%;height:100%" src="https://www.cdc.gov/coronavirus/2019-ncov/about/index.html"></iframe>
    </div>
  </main>
</template>

<script>
export default {
  head() {
    const title = this.$t('What is COVID-19 and its causes?');
    const description = this.$t('Causes released by WHO (World Health Organization) related to COVID-19.');

    return {
      title,
      meta: [
        { hid: 'title', name: 'title', content: title },
        { hid: 'description', name: 'description', content: description },
        { hid: 'og-title', property: 'og:title', content: title },
        { hid: 'og-description', property: 'og:title', content: description },
        { hid: 'twitter-title', property: 'twitter:title', content: title },
        { hid: 'twitter-description', property: 'twitter:title', content: description },
      ],
    };
  },
}
</script>