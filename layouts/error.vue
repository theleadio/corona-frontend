<template>
  <div
    class="text-center"
    style="min-height: 50vh; margin-top: 32px;margin-bottom: 32px; background-color: #fff;"
  >
    <h1 class="text-center">
      Oops! Something went wrong.
    </h1>
    <div style="margin-top: 16px;">
      <a
        href="/"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Go Back to Home
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Error",
  props: ["error"],
  layout: "default",
  mounted() {
    console.log("[layout/error] error:", this.error)
  }, // you can set a custom layout for the error page,
  methods: {}
}
</script>

<style scoped>
h1 {
  margin-bottom: 32px;
}
</style>
