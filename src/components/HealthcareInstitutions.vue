<template>
  <div>
    <Card title="Healthcare Instituitions"> </Card>
    <div
      v-for="location in locations" :key="location.name"
      class="bg-gray-100 p-3 text-sm block"
    >
      <p class="leading-normal font-bold">{{location.name }}</p>
      <p>{{location.address}}</p>
      <p class="text-right font-semibold">{{location.telno}}</p>
    </div>
  </div>
</template>

<script>
import Card from "../components/Card";
//import { locations } from "../api/locations";

export default {
  name: "HealthcareInstituitions",
  components: {
    Card,
  },
  data() {
    return {
      locations: [
        {name:"Hospital Sultanah Bahiyah, Alor Setar", address:"Km 6, Jalan Langgar, Bandar Alor Setar, 05460 Alor Setar, Kedah, Malaysia", telno:"+60 4-740 6233"}
      ],
    };
  },
  created() {
    // getLocations()
    //   .then(data => {
    //     this.locations = data;
    //   })
    //   .catch(err => {
    //     // eslint-disable-next-line no-console
    //     console.log(err);
    //   });
  }
}
</script>

<style scoped>
</style>
