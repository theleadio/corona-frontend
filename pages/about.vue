<template>
  <main class="container">
    <div class="w-full bg-gray-300 rounded p-4">
      <h1 class="text-2xl font-bold text-center">
        About CoronaTracker
      </h1>
      <p class="pt-4">
        CORONATRACKER.com is a community-based project powered by over
        460 volunteers from across the globe, ranging from data
        scientists, medical professionals, UI/UX designers, fullstack
        developers, to the general public.
      </p>

      <p class="pt-4">
        It acts as a portal for the public to keep track of the latest
        news development about the COVID-19, alongside collecting
        data for further analysis. All the contents are handpicked,
        filtered, and curated by volunteers to our best extent to
        ensure that sources are reliable with minimal hoaxes and fake
        news, in the best benefit of the public. Natural Language
        Processing (NLP) is used to analyze trending content and
        identify meaningful topics over various news sources and
        social media platforms prior to being verified by our team.
      </p>

      <p class="pt-4">
        CORONATRACKER.com also aims to gather data for in-depth
        analysis (e.g. time series to monitor the growth, spread of
        the virus) and localized news (e.g. news related to Malaysia,
        or KL only).The platform is vital for information
        consolidation, and all gathered information is open to use for
        the public.This is a 100% open source project, all information
        and publishable data are available on Github as well. Everyone
        is welcomed to contribute through our telegram channel.
      </p>

      <p class="pt-4">
        Our team of data scientists use OSEMN framework to collect,
        clean, explore, model, and run their own analysis. For ease of
        public understanding, it is presented using graphic
        visualizations and dashboards. Through the data obtained, we
        hope to build machine learning models very soon.
      </p>

      <p class="pt-4">
        We were inspired by the Coronavirus Outbreak Map by John
        Hopkins University that was very informative. We also
        recognised the difficulty to gather data for in-depth analysis
        through various other sources of scattered data on different
        news portals as well as in different languages.
      </p>

      <p class="pt-4 pb-4">
        Works started on the 25th of January, the first day of the
        Lunar New Year. Our team has been working relentlessly to make
        this a success, and launched officially on the 27th of
        January.
      </p>

      <em class="pt-4"
      >We aim to use technology and make information more
        accessible, gather talented people all around the world to win
        the fight!</em
      >
    </div>
    <div class="flex flex-wrap -mx-2 my-4">
      <div class="w-full px-2">
        <h1 class="text-2xl font-bold mb-4 text-center text-primary">
          Sources
        </h1>
        <div>
          Here you can find a list of sources handpicked by the team.
        </div>

        <table class="table-auto mt-4 mb-4">
          <thead>
          <tr>
            <th class="px-4 py-2 w-1/3">Title</th>
            <th class="px-4 py-2 w-1/2">Description</th>
            <th class="px-4 py-2">Source</th>
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
              >Discovery of a novel coronavirus associated with
                the recent pneumonia outbreak in humans and its
                potential bat origin</a
              >
            </td>
            <td class="border px-4 py-2">
              A report by Jasper Fuk-Woo Chan and colleagues,
              documented infections in health-care workers caring
              for patients with COVID-19 indicate human-to-human
              transmission and thus the risk of much wider spread of
              the disease.
            </td>
            <td class="border px-4 py-2">The Lancet</td>
          </tr>
          <tr class="bg-gray-100">
            <td class="border px-4 py-2">
              <a
                class="hover:underline"
                target="_blank"
                rel="noopener"
                href="https://www.nejm.org/doi/full/10.1056/NEJMe2001126"
              >Another year, another coronavirus</a
              >
            </td>
            <td class="border px-4 py-2">
              For the third time in as many decades, a zoonotic
              coronavirus has crossed species to infect human
              populations. This virus, provisionally called
              COVID-19, was first identified in Wuhan, China, in
              persons exposed to a seafood or wet market.
            </td>
            <td class="border px-4 py-2">
              The New England Journal of Medcine
            </td>
          </tr>
          <tr>
            <td class="border px-4 py-2">
              <a
                class="hover:underline"
                target="_blank"
                rel="noopener"
                href="https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6"
              >Wuhan Coronavirus (COVID-19) Global Cases (by JHU
                CSSE)</a
              >
            </td>
            <td class="border px-4 py-2">
              An online dashboard to visualize and track the
              reported cases on a daily timescale
            </td>
            <td class="border px-4 py-2">
              John Hopkins University
            </td>
          </tr>
          </tbody>
        </table>
        <div class="mt-8">
          If you believe any of the source information above is
          inaccurate, please lodge a report using the following
          <a
            class="underline"
            href="https://docs.google.com/forms/d/1A5Sw_gdJ6tsHA74Bz2_2uVMKqf9k_APRMQIAEoSXSNY/viewform?edit_requested=true"
          >form</a
          >.
        </div>
      </div>
    </div>

    <div class="w-full ">
      <div class="mt-5 p-5 team">
        <h1 class="text-2xl font-bold mb-4 text-center text-primary">
          Heroes behind <span class="text-black">Corona</span
        ><span class="text-red-600">Tracker</span>
        </h1>
        <div class="w-full mb-4">
          <div class="hero">
            <div class="hero-info" style="border:none">
              <img
                src="../assets/image/lau_cher_han.jpg"
                alt="Dr. Lau Cher Han"
              />
              <h2 class="mt-4 font-bold text-orange-600">
                Project lead
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
              <img
                src="../assets/image/hafeez_nazri.jpg"
                alt="Hafeez Nazri"
              />
              <div class="mt-4 font-bold text-blue-600">
                Lead data scientist
              </div>
              <div class="">Hafeez Nazri</div>
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
              <img
                src="../assets/image/tan_wei_seng.png"
                alt="Tan Wei Seng"
              />
              <div class="mt-4 font-bold text-blue-600">
                Lead full stack engineer
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
              <img src="../assets/image/shian.jpg" alt="Shian Poon"/>
              <div class="mt-4 font-bold text-blue-600">
                Lead mobile developer
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
              <img
                src="../assets/image/dominic.jpeg"
                alt="Dominic Ligot"
              />
              <div class="mt-4 font-bold text-blue-600">
                Lead analyst
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
              <img
                src="../assets/image/ummi.jpg"
                alt="Ummi Hasanah Zaidon"
              />
              <div class="mt-4 font-bold text-blue-600">
                Head of Public Relation
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
              <img
                src="../assets/image/marcus.png"
                alt="Marcus Chia"
              />
              <div class="mt-4 font-bold text-blue-600">
                Head of Product
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
                src="../assets/image/fairoza.png"
                alt="Dr. Fairoza Amira Binti Hamzah"
              />
              <div class="mt-4 font-bold text-blue-600">
                Lead Researcher
              </div>
              <div class="text-center">Assistant Professor Dr. Fairoza Amira<br>Binti Hamzah</div>
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
              Team Analytics
            </h2>
            <ul>
              <li>
                <a href="https://www.linkedin.com/in/ongchinhwee" target="_blank" rel="noopener">Chin Hwee Ong</a>
              </li>
              <li>
                <a href="#" rel="noopener">Roland Salunga</a>
              </li>
            </ul>
          </div>
          <div class="w-full md:w-1/4 member mb-4">
            <h2 class="text-xl font-bold text-center">
              Team Research
            </h2>
            <ul>
              <li>
                <a href="https://www.linkedin.com/in/yiranjing/" target="_blank" rel="noopener">Yiran Jing</a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/kennykcy/" target="_blank" rel="noopener">Kenny Kang</a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/khursan" target="_blank" rel="noopener">Sani</a>
              </li>
              <li>
                <a href="http://linkedin.com/in/debbie-huang-b034a789" target="_blank" rel="noopener">Debbie</a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/david-lee-guanhua/" target="_blank" rel="noopener">Guanhua Lee</a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/nikkingyh" target="_blank" rel="noopener">Nikki</a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/sypang/" target="_blank" rel="noopener">Pang Shi Yong</a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/ongchinhwee" target="_blank" rel="noopener">Chin Hwee Ong</a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/liang-chen-95577012a" target="_blank" rel="noopener">Tan Chen Liang</a>
              </li>
              <li>
                <a href="#" rel="noopener">Associate Professor Dr. Adina Binti Abdullah</a>
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
              Team Engineering
            </h2>
            <ul>
              <li>
                <a href="https://www.linkedin.com/in/qi-xiang/" target="_blank" rel="noopener">Gibson Tang</a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/samueljklee/" target="_blank" rel="noopener">Samuel Lee</a>
              </li>
              <li>
                <a href="#" rel="noopener">Kedai</a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/qi-xiang/" target="_blank" rel="noopener">Qi Xiang</a>
              </li>
              <li>
                <a href="#" rel="noopener">Almond Heng</a>
              </li>
              <li>
                <a href="#" rel="noopener">Joshua Hui</a>
              </li>
              <li>
                <a href="#" rel="noopener">Renyi Khor</a>
              </li>
              <li>
                <a href="#" rel="noopener">Deojeff Lai</a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/zi-qing-a-809828150/" target="_blank" rel="noopener">Ang Zi Qing</a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/poon-cheehim/" target="_blank" rel="noopener">Poon Chee Him/Shian</a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/ryantanzh/" target="_blank" rel="noopener">Ryan Tan</a>
              </li>
              <li>
                <a href="#" rel="noopener">Roland Salunga</a>
              </li>
            </ul>
          </div>
          <div class="w-full md:w-1/4 member mb-4">
            <h2 class="text-xl font-bold text-center">
              Team Design
            </h2>
            <ul>
              <li>
                <a href="#" rel="noopener">Hazi</a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/vu-hai-dang-6157081a1/" target="_blank" rel="noopener">Tjjone98</a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/daniellowjh" target="_blank" rel="noopener">Daniel Low</a>
              </li>
              <li>
                <a href="#" rel="noopener">Guanhua Lee</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="w-full md:w-1/4 member mb-4">
          <h2 class="text-xl font-bold text-center">
            Team Public Relation
          </h2>
          <ul>
            <li>
              <a href="https://www.linkedin.com/in/richardmoh/" target="_blank" rel="noopener">Richard Moh</a>
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
            View more
          </a>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
  export default {
    metaInfo: {
      title: 'About'
    }
  };
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
