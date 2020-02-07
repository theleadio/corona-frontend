<template>
  <div class="flex flex-row justify-center">
    <div class="w-1/3 rounded overflow-hidden shadow text-center text-red-600">
      <div class="px-6 py-1 pt-6 bg-red-100 text-xl lg:text-3xl font-bold font-sans">
        <template v-if="typeof confirmed === 'number'">
            <animated-number :value=confirmed :round="1" :duration="300" />
          </template>
          <template v-else>
            {{ confirmed }}
          </template>
      </div>
      <div class="py-1 w-full h-full bg-red-200 text-sm lg:text-base font-semibold font-sans">
        <span class="mx-2">Confirmed</span>
      </div>
    </div>
    <div class="w-1/3 mx-2 rounded overflow-hidden shadow text-center text-green-600">
      <div class="px-6 py-1 pt-6 bg-green-100 text-xl lg:text-3xl font-bold font-sans">
        <template v-if="typeof recovered === 'number'">
            <animated-number :value=recovered :round="1" :duration="300" />
          </template>
          <template v-else>
            {{ recovered }}
          </template>
      </div>
      <div class="py-1 w-full h-full bg-green-200 text-sm lg:text-base font-semibold font-sans">
        <span class="mx-2">Recovered</span>
      </div>
    </div>
    <div class="w-1/3 rounded overflow-hidden shadow text-center text-gray-600">
      <div class="px-6 py-1 pt-6 bg-gray-200 text-xl lg:text-3xl font-bold font-sans">
        <template v-if="typeof deaths === 'number'">
            <animated-number :value=deaths :round="1" :duration="300" />
          </template>
          <template v-else>
            {{ deaths }}
          </template>
      </div>
      <div class="py-1 w-full h-full bg-gray-300 text-sm lg:text-base font-semibold font-sans">
        <span class="mx-2">Deaths</span>
      </div>
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