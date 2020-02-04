<template>
  <div class="flex flex-row justify-center">
    <div class="max-w-sm w-3/4 rounded overflow-hidden shadow-lg text-center text-red-600">
      <div class="px-6 py-1 pt-6 bg-red-100 text-xl lg:text-4xl font-bold font-sans">
        <template v-if="typeof confirmed === 'number'">
            <animated-number :value=confirmed :round="1" :duration="300" />
          </template>
          <template v-else>
            {{ confirmed }}
          </template>
      </div>
      <div class="px-6 py-1 w-full bg-red-200 lg:text-xl font-semibold font-sans">Confirmed</div>
    </div>
    <div class="max-w-sm w-3/4 mx-2 rounded overflow-hidden shadow-lg text-center text-green-600">
      <div class="px-6 py-1 pt-6 bg-green-100 text-xl lg:text-4xl font-bold font-sans">
        <template v-if="typeof recovered === 'number'">
            <animated-number :value=recovered :round="1" :duration="300" />
          </template>
          <template v-else>
            {{ recovered }}
          </template>
      </div>
      <div class="px-6 py-1 w-full bg-green-200 lg:text-xl font-semibold font-sans">Recovered</div>
    </div>
    <div class="max-w-sm w-3/4 rounded overflow-hidden shadow-lg text-center text-gray-600">
      <div class="px-6 py-1 pt-6 bg-gray-200 text-xl lg:text-4xl font-bold font-sans">
        <template v-if="typeof deaths === 'number'">
            <animated-number :value=deaths :round="1" :duration="300" />
          </template>
          <template v-else>
            {{ deaths }}
          </template>
      </div>
      <div class="px-6 py-1 w-full bg-gray-300 lg:text-xl font-semibold font-sans">Deaths</div>
    </div>
  </div>
</template>

<script>
import AnimatedNumber from "animated-number-vue";

export default {
  props: {
    confirmed: Number,
    recovered: Number,
    deaths: Number
  },
  components: {
    AnimatedNumber
  }
}
</script>