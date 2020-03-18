<template>
  <main class="container">
    <div class="w-full h-screen">
      <div class="mb-4">
        {{ $t('We will update this page with resources related to nCov prevention, here is a quick guide from') }} <a class="hover:underline" href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public">{{ $t('WHO') }}</a>.
      </div>

      <iframe style="width:100%;height:100%" src="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public"></iframe>
    </div>
  </main>
</template>
<script>
export default {
  metaInfo: {
    title: 'Prevention',
  },
}
</script>