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
  metaInfo: {
    title: 'Causes',
  },
}
</script>