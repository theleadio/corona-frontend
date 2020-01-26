<template>
  <div class="bg-white rounded border-solid border-2 border-primary p-4 flex items-center">

    <div>
      <label
        class="block tracking-wide text-gray-700 text-s font-bold mb-2"
        for="select-country">I am from...</label>
      <div>
        <select class="block w-auto appearance-none bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="select-country">
          <option>Malaysia</option>
          <option>Singapore</option>
          <option>Vietnam</option>
          <option>Thailand</option>
        </select>
      </div>
    </div>

    <div class="flex">
        <div class="text-center pl-3 pr-3">
            <div class="text-primary">
              <span class="text-5xl">4</span>
            </div>
            <div class="text-sm uppercase text-grey tracking-wide">
              Confirmed
            </div>
        </div>
        <div class="text-center pl-3 pr-3">
            <div class="text-primary">
              <span class="text-5xl">4</span>
            </div>
            <div class="text-sm uppercase text-grey tracking-wide">
              Confirmed
            </div>
        </div>
        <div class="text-center pl-3 pr-3">
            <div class="text-primary">
              <span class="text-5xl">4</span>
            </div>
            <div class="text-sm uppercase text-grey tracking-wide">
              Confirmed
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
