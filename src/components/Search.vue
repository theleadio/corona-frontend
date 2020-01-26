<template>
  <div class="flex items-center">
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
</template>

<script>


export default {
  name: "Search",
  data: function () {
    return {
      term: "",
      timeoutID: null,

    }
  },
  methods: {
    performSearch: function () {
      // eslint-disable-next-line no-console
      console.log(this.term);
    },
    typedSearch: function () {
      clearTimeout(this.timeoutID);
      
      this.timeoutID = setTimeout(() => {
        this.performSearch();
      }, 250);
    },
    search: function () {
      this.performSearch();
    }
  }
};
</script>

<style scoped></style>
