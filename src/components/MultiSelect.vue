<template>
  <div>
    <div class="px-3 py-1 flex flex-wrap">
      <div class="w-full md:w-5/6">
        <span v-for="option in options" :key="option[valueKey]">
          <button
            v-if="itemSelected(option[valueKey])"
            class="inline-block mt-2 border-solid border bg-primary rounded-full px-3 py-1 text-sm text-white mr-2"
            @click="unselectItem(option[valueKey])"
          >
            {{option[displayKey]}} <i class="fas fa-times"></i>
          </button>
          <button
            v-else
            class="inline-block mt-2 text-primary border-solid border border-primary rounded-full px-3 py-1 text-sm mr-2"
            @click="selectItem(option[valueKey])"
          >
            {{option[displayKey]}} <i class="fas fa-plus"></i>
          </button>
        </span>
      </div>
      <div class="w-full md:w-1/6 flex justify-end">
        <button class="text-gray-600 underline px-3 py-1 text-sm" @click="clearSelection()">
          Clear All
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
