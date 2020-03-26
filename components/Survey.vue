<template>
  <div class="w-full rounded border border-gray-400" v-if="shouldShowSurvey">
    <a :href="link" target="_blank" rel="noopener">
      <img :src="imageName" alt="Survey">
    </a>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    imageName: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    },
    expiresOn: {
      type: String,
      required: true
    }
  },
  computed: {
    shouldShowSurvey() {
      return moment().isBefore(moment(this.expiresOn))
    }
  }
}
</script>

<style scoped>
</style>
