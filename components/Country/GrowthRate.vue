<template>
  <div class="border border-gray-400 p-4 rounded relative ">
    <div class="text-gray-900 font-bold text-xl mb-2">{{ $t('Growth Rate') }}</div>
    <div class="text-gray-900 font-bold text-4xl mb-2">{{growth}}%</div>
    <p class="text-gray-700 text-base">
      <span class="text-red-600">{{growth}}</span>
      {{$t('among 100 person')}}
    </p>
  </div>
</template>

<script>
export default {
  name: 'growth-rate',
  props: {
    confirmed: {type: Number, default: 0},
    ytdConfirmed: {type: Number, default: 0},
  },
  computed: {
    growth() {
      return (this.ytdConfirmed / this.confirmed * 100).toFixed()
    }
  }
}
</script>
