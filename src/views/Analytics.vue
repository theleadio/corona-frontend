<template>
  <div class="container">
    <lazy-component tag="div" @show="handler" class='w-full h-screen' >
      <iframe width="100%" height="800" src="https://datastudio.google.com/embed/reporting/c0771868-a928-4308-bf5d-e3af39567379/page/1M" frameborder="0" style="border:0" allowfullscreen></iframe>
    </lazy-component>
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: 'Analytics',
  },
  methods: {
    handler () {
     console.log('iframe loaded')
    }
  }
}
</script>
<style scoped>
  iframe {
    background-image: url("../../public/lazy-load-spinner.gif");   
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center center;
  }
</style>