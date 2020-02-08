<template>
  <main class="container">
    <div class="flex flex-wrap -mx-2">
      <div class="w-full px-2">
        <div>Here you can find a list of sources handpicked by the team.</div>

        <table class="table-auto m-4">
          <thead>
            <tr>
              <th class="px-4 py-2 w-1/3">Title</th>
              <th class="px-4 py-2 w-1/2">Description</th>
              <th class="px-4 py-2">Source</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border px-4 py-2"><a class="hover:underline" target="_blank" href="https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(20)30185-9/fulltext">Discovery of a novel coronavirus associated with the recent pneumonia outbreak in humans and its potential bat origin</a></td>
              <td class="border px-4 py-2">A report by Jasper Fuk-Woo Chan and colleagues, documented infections in health-care workers caring for patients with 2019-nCoV indicate human-to-human transmission and thus the risk of much wider spread of the disease.</td>
              <td class="border px-4 py-2">The Lancet</td>
            </tr>
            <tr class="bg-gray-100">
              <td class="border px-4 py-2"><a class="hover:underline" target="_blank" href="https://www.nejm.org/doi/full/10.1056/NEJMe2001126">Another year, another coronavirus</a></td>
              <td class="border px-4 py-2">For the third time in as many decades, a zoonotic coronavirus has crossed species to infect human populations. This virus, provisionally called 2019-nCoV, was first identified in Wuhan, China, in persons exposed to a seafood or wet market. </td>
              <td class="border px-4 py-2">The New England Journal of Medcine</td>
            </tr>
            <tr>
              <td class="border px-4 py-2"><a class="hover:underline" target="_blank" href="https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6">Wuhan Coronavirus (2019-nCoV) Global Cases (by JHU CSSE)</a></td>
              <td class="border px-4 py-2">An online dashboard to visualize and track the reported cases on a daily timescale</td>
              <td class="border px-4 py-2">John Hopkins University</td>
            </tr>
          </tbody>
        </table>
        <div>If you believe any of the source information above is inaccurate, please lodge a report using the following <a class="underline" href="https://docs.google.com/forms/d/1A5Sw_gdJ6tsHA74Bz2_2uVMKqf9k_APRMQIAEoSXSNY/viewform?edit_requested=true">form</a>.</div>
      </div>
    </div>
  </main>
</template>
<script>
export default {
  metaInfo: {
    title: 'Sources',
  },
};
</script>