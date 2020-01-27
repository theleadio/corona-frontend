<template>
  <div class="bg-white rounded border-solid border-2 border-primary p-6 flex flex-wrap">

    <div class="w-full md:w-1/2">
      <label
        class="block tracking-wide text-gray-700 text-s font-bold mb-2"
        for="select-country">I am from...</label>
      <div>
        <select class="block w-full md:w-1/2 appearance-none bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="select-country">
          <option><span class="flag-icon flag-icon-gr"></span> Malaysia</option>
          <option>Singapore</option>
          <option>Vietnam</option>
          <option>Thailand</option>
        </select>
      </div>
    </div>

    <div class="flex justify-center w-full md:justify-end md:w-1/2 mt-5 md:mt-0">
        <div class="text-center pl-2 pr-2 md:pl-5 md:pr-5">
            <div class="text-primary text-3xl md:text-5xl">
              4
            </div>
            <div class="text-sm uppercase text-grey tracking-wide">
              Confirmed
            </div>
        </div>
        <div class="text-center pl-2 pr-2 md:pl-5 md:pr-5">
            <div class="text-primary text-3xl md:text-5xl">
              42
            </div>
            <div class="text-sm uppercase text-grey tracking-wide">
              Pending
            </div>
        </div>
        <div class="text-center pl-2 pr-2 md:pl-5 md:pr-5">
            <div class="text-primary text-3xl md:text-5xl">
              46
            </div>
            <div class="text-sm uppercase text-grey tracking-wide">
              Negative
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LocationSelector"
};
</script>

<style scoped>
</style>
