<template>
  <div :class="wrapperClass">
    <a
      class="twitter-timeline"
      :href="src"
      :data-height="dataHeight"
      :data-theme="isDark ? 'dark' : 'light'"
      :data-link-color="dataLinkColor"
    />
  </div>
</template>

<script>
export default {
  props: {
    wrapperClass: {
      type: String,
      default: "bg-white rounded border border-gray-400 h-full"
    },
    twitterHandle: {
      type: String,
      required: true
    },
    isDark: {
      type: Boolean,
      default: false
    },
    dataLinkColor: {
      type: String,
      default: "#2B7BB9"
    },
    dataHeight: {
      type: String,
      default: "100%"
    }
  },
  computed: {
    src() {
      return `https://twitter.com/${this.twitterHandle}?ref_src=twsrc%5Etfw`
    }
  },
  created() {
    let twitterFeed = document.createElement("script")
    twitterFeed.setAttribute("src", "https://platform.twitter.com/widgets.js")
    document.head.appendChild(twitterFeed)
  }
}
</script>

<style scoped></style>
