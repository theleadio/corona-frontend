<template>
  <div>
    <div class="py-4 flex flex-wrap">
      <div class="w-full md:w-5/6">
        <span v-for="option in options" :key="option[valueKey]">
          <button
            v-if="itemSelected(option[valueKey])"
            class="inline-block mt-2 mr-2 border-solid border-2 border-primary bg-primary rounded-full px-5 py-2 text-sm text-white font-semibold"
            @click="unselectItem(option[valueKey])"
          >
            {{option[displayKey]}} <i class="fas fa-times ml-1"></i>
          </button>
          <button
            v-else
            class="inline-block mt-2 mr-2 border-solid border-2 border-primary rounded-full px-5 py-2 text-sm text-primary font-semibold"
            @click="selectItem(option[valueKey])"
          >
            {{option[displayKey]}}
          </button>
        </span>
      </div>
      <div class="w-full md:w-1/6 flex justify-end">
        <button class="text-gray-600 underline px-3 py-1 text-base font-semibold" @click="clearSelection()">
          {{ $t('Clear All') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MultiSelect",
    props: {
      options: Array,
      valueKey: String,
      displayKey: String,
      value: {
        type: Array,
        default: () => []
      },
    },
    methods: {
      itemSelected(value) {
        return this.value.includes(value);
      },
      selectItem(selectedValue) {
        this.$emit('input', [...this.value, selectedValue]);
      },
      unselectItem(selectedValue) {
        this.$emit('input', this.value.filter(item => item !== selectedValue));
      },
      clearSelection() {
        this.$emit('input', []);
      },
    },
  }
</script>

<style scoped>
</style>
