<template>
  <main class="container">
    <div class="w-full h-screen">
      <div class="mb-4">
        {{ $t('update_resources') }} <a class="hover:underline" href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public">{{ $t('WHO') }}</a>.
      </div>

      <iframe style="width:100%;height:100%" src="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public"></iframe>
    </div>
  </main>
</template>
<script>
export default {
  head() {
    const title = this.$t('prevention_meta_title');
    const description = this.$t('prevention_meta_description');

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
