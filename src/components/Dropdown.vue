<template>
    <div>
        <button class="bg-gray-200 text-left font-bold py-2 px-4 rounded flex" @click="showOptions = !showOptions">
            <div v-if="selectedOption">
            {{selectedOption[displaykey]}}
            </div>
            <div v-else>{{unselected}}</div>
            <div class="self-center float">
            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">            
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
            </div>
        </button>

        <ul class="absolute text-gray-700 pt-1 z-50" v-if="showOptions">
            <li v-for="option in options" v-bind:key="option[valuekey]">
            <a class="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" @click="selectOption(option)">
                {{option[displaykey]}}
            </a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  name: "Dropdown",
  props:{
      options: Array,
      valuekey: String,
      displaykey: String,
      unselected: {
          type: String,
          default: "Select"
      }
  },
  data: function() {
    return {
      selectedOption: null,
      showOptions: false
    };
  },
  methods: {
    selectOption(option) {
      this.selectedOption = option;
      this.showOptions = !this.showOptions;
      this.$emit("input", option[this.valuekey]);
    }
  }
};
</script>

<style scoped>
</style>
