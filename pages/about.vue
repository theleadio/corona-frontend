<template>
  <main class="container">
    <div class="w-full bg-gray-300 rounded p-4">
      <h1 class="text-2xl font-bold text-center">
        {{ $t("about_coronatracker") }}
      </h1>
      <p class="pt-4">
        {{ $t("whats_coronatracker") }}
      </p>

      <p class="pt-4">
        {{ $t("whats_coronatracker_2") }}
      </p>

      <p class="pt-4">
        {{ $t("whats_coronatracker_3") }}
      </p>

      <p class="pt-4">
        {{ $t("whats_coronatracker_4") }}
      </p>

      <p class="pt-4">
        {{ $t("whats_coronatracker_5") }}
      </p>

      <p class="pt-4 pb-4">
        {{ $t("whats_coronatracker_6") }}
      </p>

      <em class="pt-4">
        {{ $t("whats_coronatracker_7") }}
      </em>
    </div>
    <div class="flex flex-wrap -mx-2 my-4">
      <div class="w-full px-2">
        <h1 class="text-2xl font-bold mb-4 text-center text-primary">
          {{ $t("sources") }}
        </h1>
        <div>
          {{ $t("sources_handpicked") }}
        </div>

        <table class="table-auto mt-4 mb-4">
          <thead>
            <tr>
              <th class="px-4 py-2 w-1/3">
                {{ $t("title") }}
              </th>
              <th class="px-4 py-2 w-1/2">
                {{ $t("description") }}
              </th>
              <th class="px-4 py-2">
                {{ $t("source") }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border px-4 py-2">
                <a
                  class="hover:underline"
                  target="_blank"
                  rel="noopener"
                  href="https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(20)30185-9/fulltext"
                  >{{ $t("report_1_title") }}</a
                >
              </td>
              <td class="border px-4 py-2">
                {{ $t("report_1_description") }}
              </td>
              <td class="border px-4 py-2">
                The Lancet
              </td>
            </tr>
            <tr class="bg-gray-100">
              <td class="border px-4 py-2">
                <a
                  class="hover:underline"
                  target="_blank"
                  rel="noopener"
                  href="https://www.nejm.org/doi/full/10.1056/NEJMe2001126"
                  >{{ $t("report_2_title") }}</a
                >
              </td>
              <td class="border px-4 py-2">
                {{ $t("report_2_description") }}
              </td>
              <td class="border px-4 py-2">
                The New England Journal of Medicine
              </td>
            </tr>
            <tr>
              <td class="border px-4 py-2">
                <a
                  class="hover:underline"
                  target="_blank"
                  rel="noopener"
                  href="https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6"
                  >{{ $t("report_3_title") }}</a
                >
              </td>
              <td class="border px-4 py-2">
                {{ $t("report_3_description") }}
              </td>
              <td class="border px-4 py-2">
                John Hopkins University
              </td>
            </tr>
          </tbody>
        </table>
        <div class="mt-8">
          {{ $t("report_inaccuracies") }}
          <a
            class="underline"
            href="https://docs.google.com/forms/d/1A5Sw_gdJ6tsHA74Bz2_2uVMKqf9k_APRMQIAEoSXSNY/viewform?edit_requested=true"
            >{{ $t("form") }}</a
          >.
        </div>
      </div>
    </div>

    <div class="w-full ">
      <div class="mt-5 p-5 team">
        <h1 class="text-2xl font-bold mb-4 text-center text-primary">
          {{ $t("heroes_behind") }} <span class="text-black">Corona</span
          ><span class="text-red-600">Tracker</span>
        </h1>
        <div class="w-full mb-4">
          <div class="hero">
            <div class="hero-info" style="border:none">
              <img
                src="~assets/image/lau_cher_han.jpg"
                alt="Dr. Lau Cher Han"
              />
              <h2 class="mt-4 font-bold text-orange-600">
                {{ $t("project_lead") }}
              </h2>
              <div>Dr. Lau Cher Han</div>
              <div style="color:#273E4A">
                (<a
                  class="underline"
                  href="https://www.linkedin.com/in/drhanlau/"
                  target="_blank"
                  rel="noopener"
                  >LinkedIn</a
                >)
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-wrap -mb-4">
          <div class="w-full md:w-1/3 mb-4 hero ">
            <div class="hero-info p-2">
              <img src="~assets/image/hafeez_nazri.jpg" alt="Hafeez Nazri" />
              <div class="mt-4 font-bold text-blue-600">
                {{ $t("lead_data_scientist") }}
              </div>
              <div class="">
                Hafeez Nazri
              </div>
              <div style="color:#273E4A">
                (<a
                  class="underline"
                  href="https://www.linkedin.com/in/hafeeznazri/"
                  target="_blank"
                  rel="noopener"
                  >LinkedIn</a
                >)
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/3 mb-4 hero">
            <div class="hero-info p-2">
              <img src="~assets/image/tan_wei_seng.png" alt="Tan Wei Seng" />
              <div class="mt-4 font-bold text-blue-600">
                {{ $t("lead_full_stack_engineer") }}
              </div>
              <div>Tan Wei Seng</div>
              <div style="color:#273E4A">
                (<a
                  class="underline"
                  href="https://www.linkedin.com/in/wei-seng-tan-304ba78a/"
                  target="_blank"
                  rel="noopener"
                  >LinkedIn</a
                >)
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/3 mb-4 hero">
            <div class="hero-info p-2">
              <img src="~assets/image/shian.jpg" alt="Shian Poon" />
              <div class="mt-4 font-bold text-blue-600">
                {{ $t("lead_mobile_developer") }}
              </div>
              <div>Poon Chee Him/Shian</div>
              <div style="color:#273E4A">
                (<a
                  class="underline"
                  href="https://www.linkedin.com/in/poon-cheehim/"
                  target="_blank"
                  rel="noopener"
                  >LinkedIn</a
                >)
              </div>
            </div>
          </div>

          <div class="w-full md:w-1/3 mb-4 hero">
            <div class="hero-info p-2">
              <img src="~assets/image/dominic.jpeg" alt="Dominic Ligot" />
              <div class="mt-4 font-bold text-blue-600">
                {{ $t("lead_analyst") }}
              </div>
              <div>Dominic Ligot</div>
              <div style="color:#273E4A">
                (<a
                  class="underline"
                  href="https://www.linkedin.com/in/docligot/"
                  target="_blank"
                  rel="noopener"
                  >LinkedIn</a
                >)
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/3 mb-4 hero">
            <div class="hero-info p-2">
              <img src="~assets/image/ummi.jpg" alt="Ummi Hasanah Zaidon" />
              <div class="mt-4 font-bold text-blue-600">
                {{ $t("head_public_relation") }}
              </div>
              <div>Ummi Hasanah Zaidon</div>
              <div style="color:#273E4A">
                (<a
                  class="underline"
                  href="https://www.linkedin.com/in/ummi-hasanah-zaidon-32148280/"
                  target="_blank"
                  rel="noopener"
                  >LinkedIn</a
                >)
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/3 mb-4 hero">
            <div class="hero-info p-2">
              <img src="~assets/image/marcus.png" alt="Marcus Chia" />
              <div class="mt-4 font-bold text-blue-600">
                {{ $t("head_product") }}
              </div>
              <div>Marcus Chia</div>
              <div style="color:#273E4A">
                (<a
                  class="underline"
                  href="https://www.linkedin.com/in/marcuschiam5/"
                  target="_blank"
                  rel="noopener"
                  >LinkedIn</a
                >)
              </div>
            </div>
          </div>

          <div class="w-full md:w-1/3 mb-4 hero">
            <div class="hero-info p-2">
              <img
                src="~assets/image/fairoza.png"
                alt="Dr. Fairoza Amira Binti Hamzah"
              />
              <div class="mt-4 font-bold text-blue-600">
                {{ $t("lead_researcher") }}
              </div>
              <div class="text-center">
                Assistant Professor Dr. Fairoza Amira<br />Binti Hamzah
              </div>
              <div style="color:#273E4A">
                (<a
                  class="underline"
                  href="https://www.linkedin.com/in/fairoza-amira-binti-hamzah/"
                  target="_blank"
                  rel="noopener"
                  >LinkedIn</a
                >)
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-wrap mt-4 ">
          <div class="w-full md:w-1/4 member mb-4">
            <h2 class="text-xl font-bold text-center">
              {{ $t("team_analytics") }}
            </h2>
            <ul>
              <li>
                <a
                  href="https://www.linkedin.com/in/ongchinhwee"
                  target="_blank"
                  rel="noopener"
                  >Chin Hwee Ong</a
                >
              </li>
              <li>
                <a href="#" rel="noopener">Roland Salunga</a>
              </li>
            </ul>
          </div>
          <div class="w-full md:w-1/4 member mb-4">
            <h2 class="text-xl font-bold text-center">
              {{ $t("team_research") }}
            </h2>
            <ul>
              <li>
                <a
                  href="https://www.linkedin.com/in/yiranjing/"
                  target="_blank"
                  rel="noopener"
                  >Yiran Jing</a
                >
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/kennykcy/"
                  target="_blank"
                  rel="noopener"
                  >Kenny Kang</a
                >
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/khursan"
                  target="_blank"
                  rel="noopener"
                  >Sani</a
                >
              </li>
              <li>
                <a
                  href="http://linkedin.com/in/debbie-huang-b034a789"
                  target="_blank"
                  rel="noopener"
                  >Debbie</a
                >
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/david-lee-guanhua/"
                  target="_blank"
                  rel="noopener"
                  >Guanhua Lee</a
                >
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/nikkingyh"
                  target="_blank"
                  rel="noopener"
                  >Nikki</a
                >
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/sypang/"
                  target="_blank"
                  rel="noopener"
                  >Pang Shi Yong</a
                >
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/ongchinhwee"
                  target="_blank"
                  rel="noopener"
                  >Chin Hwee Ong</a
                >
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/liang-chen-95577012a"
                  target="_blank"
                  rel="noopener"
                  >Tan Chen Liang</a
                >
              </li>
              <li>
                <a href="#" rel="noopener"
                  >Associate Professor Dr. Adina Binti Abdullah</a
                >
              </li>
              <li>
                <a href="#" rel="noopener">Nathaniel Lee</a>
              </li>
              <li>
                <a href="#" rel="noopener">Chew PY</a>
              </li>
            </ul>
          </div>
          <div class="w-full md:w-1/4 member mb-4">
            <h2 class="text-xl font-bold text-center">
              {{ $t("team_engineering") }}
            </h2>
            <ul>
              <li>
                <a
                  href="https://www.linkedin.com/in/gibsontang/"
                  target="_blank"
                  rel="noopener"
                  >Gibson Tang</a
                >
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/samueljklee/"
                  target="_blank"
                  rel="noopener"
                  >Samuel Lee</a
                >
              </li>
              <li>
                <a href="#" rel="noopener">Kedai</a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/qi-xiang/"
                  target="_blank"
                  rel="noopener"
                  >Qi Xiang</a
                >
              </li>
              <li>
                <a href="https://www.linkedin.com/in/almondheng/" rel="noopener"
                  >Almond Heng</a
                >
              </li>
              <li>
                <a href="#" rel="noopener">Joshua Hui</a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/renyikhor/" rel="noopener"
                  >Renyi Khor</a
                >
              </li>
              <li>
                <a href="#" rel="noopener">Deojeff Lai</a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/zi-qing-a-809828150/"
                  target="_blank"
                  rel="noopener"
                  >Ang Zi Qing</a
                >
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/poon-cheehim/"
                  target="_blank"
                  rel="noopener"
                  >Poon Chee Him/Shian</a
                >
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/ryantanzh/"
                  target="_blank"
                  rel="noopener"
                  >Ryan Tan</a
                >
              </li>
              <li>
                <a href="#" rel="noopener">Roland Salunga</a>
              </li>
            </ul>
          </div>
          <div class="w-full md:w-1/4 member mb-4">
            <h2 class="text-xl font-bold text-center">
              {{ $t("team_design") }}
            </h2>
            <ul>
              <li>
                <a href="#" rel="noopener">Hazi</a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/vu-hai-dang-6157081a1/"
                  target="_blank"
                  rel="noopener"
                  >Tjjone98</a
                >
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/daniellowjh"
                  target="_blank"
                  rel="noopener"
                  >Daniel Low</a
                >
              </li>
              <li>
                <a href="#" rel="noopener">Guanhua Lee</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="w-full md:w-1/4 member mb-4">
          <h2 class="text-xl font-bold text-center">
            {{ $t("team_public_relations") }}
          </h2>
          <ul>
            <li>
              <a
                href="https://www.linkedin.com/in/richardmoh/"
                target="_blank"
                rel="noopener"
                >Richard Moh</a
              >
            </li>
          </ul>
        </div>
        <div>
          <a
            class="my-6 mx-auto text-center block text-2xl underline"
            href="https://docs.google.com/spreadsheets/d/1cG1UmEa-0IUetdKzYsMKXpypGFWoO88eTzadvN4NS5Y"
            target="_blank"
            rel="noopener"
          >
            {{ $t("view_more") }}
          </a>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
export default {
  head() {
    const title = this.$t("about_coronatracker")
    const description = this.$t("about_coronatracker_meta_description")

    return {
      title,
      meta: [
        { hid: "title", name: "title", content: title },
        { hid: "description", name: "description", content: description },
        { hid: "og-title", property: "og:title", content: title },
        { hid: "og-description", property: "og:title", content: description },
        { hid: "twitter-title", property: "twitter:title", content: title },
        {
          hid: "twitter-description",
          property: "twitter:title",
          content: description
        }
      ]
    }
  }
}
</script>
<style scoped>
li a:hover {
  color: #38a169;
}

.hero {
  display: flex;
  justify-content: center;
}

.hero img {
  border-radius: 50%;
  display: block;
  height: 100px;
  width: 100px;
  margin: 0 auto;
}

.hero .hero-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.member {
  text-align: center;
}
</style>
