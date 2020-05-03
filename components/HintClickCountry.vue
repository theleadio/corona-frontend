<template>
  <div>
    <div
      v-if="showHint"
      class="my-2 font-bold text-xs text-blue-600 leading-tight"
    >
      <i class="fas fa-info-circle" /> {{ $t("hint") }}:
      {{ $t("click_country_hint_info") }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showHint: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped></style>
