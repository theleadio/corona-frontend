<template>
  <div
    class="flex flex-col items-center search "
    v-on-clickaway="onClickAwaySearch"
  >
    <div
      class="flex w-full items-center rounded border border-gray-400 focus:bg-white"
    >
      <input
        v-on:input="typedSearch"
        v-on:focus="onFocusSearch"
        v-model="term"
        type="text"
        style="border:none"
        class="appearance-none block w-full text-gray-700 border py-3 px-4 leading-tight outline-none focus:bg-white "
        placeholder="Search..."
      />
      <button
        class="h-12 w-12 flex items-center justify-center"
        aria-label="search"
        v-on:click="search"
      >
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
          class="text-primary"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>
    </div>
    <div
      v-if="state === 'done' && results.length > 0"
      class="flex flex-col w-full overflow-auto bg-white text-black shadow-md list"
    >
      <a
        v-for="result in results"
        :key="result.nid"
        :href="result.url"
        target="_blank"
        rel="noopener"
        class="w-full result-link"
      >
        <v-clamp autoresize :max-lines="2" class="p-4">
          {{ result.title }}
        </v-clamp>
      </a>
    </div>
    <div
      v-else-if="state === 'done' && !results.length"
      class="flex flex-col w-full overflow-auto bg-white text-black shadow-md list p-4"
    >
      Sorry. No search results found.
    </div>
    <div
      v-else-if="state === 'loading'"
      class="flex flex-col w-full overflow-auto bg-white text-black shadow-md list p-4"
    >
      Searching...
    </div>
    <div
      v-else-if="state == 'error'"
      class="flex flex-col w-full overflow-auto bg-white text-black shadow-md list p-4"
    >
      Could not perform search request.
    </div>
  </div>
</template>

<script>
  import { directive as onClickaway } from 'vue-clickaway';
  import VClamp from 'vue-clamp'

  export default {
    name: 'Search',
    directives: {
      onClickaway: onClickaway
    },
    components: {
      VClamp,
    },
    data: function() {
      return {
        term: '',
        timeoutID: null,
        results: [],
        state: 'idle',
        focusCounter: 0,
        focusTimeoutId: null
      };
    },
    methods: {
      performSearch: function() {
        this.state = 'loading';

        this.$api.news
          .searchNews(this.term)
          .then((value) => {
            this.results = value;
            this.state = 'done';
          })
          .catch((err) => {
            // eslint-disable-next-line no-console
            console.log(err);
            this.state = 'error';
          });

        this.$ga.event({
          eventCategory: 'News',
          eventAction: 'search',
          eventLabel: this.term,
        });
      },
      typedSearch: function() {
        this.state = 'idle';

        clearTimeout(this.timeoutID);

        this.timeoutID = setTimeout(() => {
          this.results = [];
          this.performSearch();
        }, 250);
      },
      search: function() {
        this.performSearch();
      },
      onFocusSearch: function() {
        if (this.results && this.results.length) {
          this.state = 'done';
        } else {
          this.performSearch();
        }
      },
      onClickAwaySearch: function() {
        this.state = 'idle';
      }
    }
  };
</script>

<style scoped>
  button:focus {
    outline: none;
  }

  .search {
    position: relative;
  }

  .list {
    position: absolute;
    top: 50px;
    max-height: 300px;
    z-index: 99;
  }

  .result-link {
    transition: background-color 0.25s ease-in-out;
  }

  .result-link + .result-link {
    border-top: 1px solid #e2e8f0;
  }

  .result-link:hover {
    background-color: #e4e4e4;
  }
</style>
