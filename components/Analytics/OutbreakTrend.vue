<template>
  <div>
    <p class="2xl font-bold">Outbreak trend multi-line chart here</p>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: null,
    }
  },

  data () {
    return {
      chart: null,
    }
  },

  methods: {
    renderChart () {
      //
    }
  }
}
</script>
