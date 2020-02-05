<template>
    <div>
        <button :class="btnclass" @click="showOptions" v-on-clickaway="closeOptions">
            <div v-if="value">
                {{value}}
            </div>
            <div v-else>{{unselected}}</div>
            <div class="self-center ml-auto">
            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
            </div>
        </button>

        <ul class="absolute text-gray-700 pt-1 z-50" v-if="optionsShowed">
            <li v-for="option in options" v-bind:key="option[valuekey]">
            <a class="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" @click="selectOption(option)">
                {{option[displaykey]}}
            </a>
            </li>
        </ul>
    </div>
</template>

<script>
import { directive as onClickaway } from 'vue-clickaway';

export default {
  name: "Dropdown",
    directives: {
    onClickaway: onClickaway,
  },
  props:{
      value: String,
      options: Array,
      valuekey: String,
      displaykey: String,
      unselected: {
          type: String,
          default: "Select"
      },
      btnclass:{
          type: Object,
          default: function(){
              return{
                    "bg-gray-200": true,
                    "text-left": true,
                    "font-bold":true,
                    "py-2":true,
                    "px-4": true,
                    "rounded":true,
                    "flex":true,
                    "w-full":true
              }
          }
      }
  },
  data: function() {
    return {
      optionsShowed: false
    };
  },
  methods: {
    selectOption(option) {
      this.optionsShowed = !this.optionsShowed;
      this.$emit("input", option[this.valuekey]);
    },
    showOptions(){
        this.optionsShowed = this.optionsShowed ? false : true;
    },
    closeOptions(){
        this.optionsShowed = false;
    }
  }
};
</script>

<style scoped>
</style>
