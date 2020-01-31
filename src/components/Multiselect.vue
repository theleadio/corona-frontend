<template>
  <div>
    <div class="px-3 py-1 flex flex-wrap">
      <div class="w-full md:w-5/6">
        <span v-for="option in options" :key="option[valuekey]">
          <button
            v-if="itemSelected(option[valuekey])"
            class="inline-block mt-2 border-solid border bg-primary rounded-full px-3 py-1 text-sm text-white mr-2"
            @click="unselectItem(option[valuekey])"
          >
            {{option[displaykey]}} <i class="fas fa-times"></i>
          </button>
          <button
            v-else
            class="inline-block mt-2 text-primary border-solid border border-primary rounded-full px-3 py-1 text-sm mr-2"
            @click="selectItem(option[valuekey])"
          >
            {{option[displaykey]}} <i class="fas fa-plus"></i>
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
    name: "Multiselect",
    props: {
      options: Array,
      valuekey: String,
      displaykey: String,
      selectedValues: {
        type: Array,
        default: () => []
      },
    },
    data: function() {
      return {
        values: []
      }
    },
    watch: {
      selectedValues() {
        this.values = this.selectedValues;
      },
      values() {
        this.$emit('input', this.values);
      }
    },
    methods: {
      itemSelected(value) {
        return this.values.includes(value);
      },
      selectItem(value) {
        this.values.push(value);
      },
      unselectItem(value) {
        this.values = this.values.filter(item => item !== value);
      },
      clearSelection() {
        this.values = [];
      }
    },
    created() {
      this.values = this.selectedValues;
    },
  }
</script>

<style scoped>
</style>
