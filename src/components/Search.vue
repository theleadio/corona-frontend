<template>
  <div class="flex flex-col items-center">
    <div class="flex w-full items-center">
      <input v-on:input="typedSearch" v-model="term" type="text" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200  py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-300" />
      <button class="bg-primary h-12 w-12 flex items-center justify-center" v-on:click="search">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="23"
          height="23"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="text-white"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>
    </div>
    <div v-if="state == 'done' && results.length > 0" class="flex flex-col w-full overflow-auto bg-white text-black shadow-md list">
      <a v-for="result in results" :key="result.nid" :href="result.url" class="w-full result-link" v-on:click="linkClick">
        <p class="p-4">
          {{result.title.substring(0, 100) + "..."}}
        </p>
      </a>
    </div>
    <div v-else-if="state == 'done' && results.length == 0" class="flex flex-col w-full overflow-auto bg-white text-black shadow-md list p-4">
      We could not found anything
    </div>
    <div v-else-if="state == 'loading'" class="flex flex-col w-full overflow-auto bg-white text-black shadow-md list p-4">
      Searching...
    </div>
    <div v-else-if="state == 'error'" class="flex flex-col w-full overflow-auto bg-white text-black shadow-md list p-4">
      Could not perform search request
    </div>
  </div>
</template>

<script>
import axios from "../lib/axios";

export default {
  name: "Search",
  data: function () {
    return {
      term: "",
      timeoutID: null,
      results: [],
      state: "idle",
      focusCounter: 0,
      focusTimeoutId: null,
    }
  },
  methods: {
    performSearch: function () {
      this.state = "searching";
      
      axios.get("/news?q=" + this.term).then(value => {
        this.results = value.data;
        this.state = "done";

      }).catch(err => {
        // eslint-disable-next-line no-console
        console.log(err);
        this.state = "error";
      });
    },
    typedSearch: function () {
      this.state = "idle";

      clearTimeout(this.timeoutID);
      
      this.timeoutID = setTimeout(() => {
        this.results = [];
        this.performSearch();
      }, 250);
    },
    search: function () {
      this.performSearch();
    },
    linkClick: function () {
      this.state = "idle";
    }
  }
};
</script>

<style scoped>
  .list {
    max-height: 300px;
  }

  .result-link {
    transition: background-color 0.25s ease-in-out;
  }

  .result-link:hover {
    background-color: #ccc;
  }
</style>
