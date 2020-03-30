<template>
  <div class="absolute top-0 right-0 clearfix border border-gray-400 rounded px-3 py-1">
    <span class="text-s float-left pr-1">{{ $t('Share') }}:</span>
    <social-sharing :url="url" inline-template class="float-left">
      <div>
        <network network="facebook">
          <i class="fab fa-fw fa-facebook-f"></i>
        </network>
        <network network="twitter">
          <i class="fab fa-fw fa-twitter"></i>
        </network>
      </div>
    </social-sharing>
  </div>
</template>

<script>

  export default {
    name: 'Share',
    props: {
      url: {
        type: String,
        default: ''
      }
    },
    data() {
      return { };
    }
  }
</script>

<style scoped>
</style>
