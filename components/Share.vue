<template>
  <div class="flex py-1">
    <span class="text-s">{{ $t('Share') }}:</span>
    <client-only>
      <social-sharing :url="url" inline-template>
        <div class="flex justify-between">
          <network network="facebook">
            <i class="fab fa-fw fa-facebook-f" style="color: #3b5998;"></i>
          </network>
          <network network="twitter">
            <i class="fab fa-fw fa-twitter" style="color: #55acee;"></i>
          </network>
        </div>
      </social-sharing>
    </client-only>
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
