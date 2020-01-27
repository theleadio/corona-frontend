<template>
  <div>
    <Card title="Healthcare Instituitions"> </Card>
    <dropdown v-model="region" :options="filteredRegions" displaykey="name" valuekey="name" unselected="Select Region" class="mt-3 mb-3"/>
    <div v-for="location in locations" :key="location.name" class="bg-gray-100 p-3 text-sm block">
      <p class="leading-normal font-bold capitalize"><i class="fas fa-map-marker-alt"></i> {{location.name}}</p>
      <p class="text-xs">{{location.address}}</p>
      <p class="text-right font-semibold"><i class="fas fa-phone"></i> {{location.telno}}</p>
    </div>
  </div>
</template>

<script>
import Card from "../components/Card";
import Dropdown from "../components/Dropdown";
//import { locations } from "../api/locations";

export default {
  name: "HealthcareInstituitions",
  components: {
    Card,
    Dropdown
  },
  props:{
    country: {
      type:String,
      default:""
    }
  },
  data() {
    return {
      region: "",
      locations: [
        {name:"Hospital Sultanah Bahiyah, Alor Setar", address:"Km 6, Jalan Langgar, Bandar Alor Setar, 05460 Alor Setar, Kedah, Malaysia", telno:"+60 4-740 6233", city:"ALOR SETAR", country:"my"}
      ],
      states: [
        {name:"SINGAPORE", country:"SG"},
        {name:"PERLIS", country:"MY"},
        {name:"KEDAH", country:"MY"},
        {name:"PULAU PINANG", country:"MY"},
        {name:"PERAK", country:"MY"},
        {name:"SELANGOR", country:"MY"},
        {name:"WP KL/ PUTRAJAYA", country:"MY"},
        {name:"NEGERI SEMBILAN", country:"MY"},
        {name:"MELAKA", country:"MY"},
        {name:"JOHOR", country:"MY"},
        {name:"PAHANG", country:"MY"},
        {name:"TERENGGANU", country:"MY"},
        {name:"KELANTAN", country:"MY"},
        {name:"SABAH", country:"MY"},
        {name:"SARAWAK", country:"MY"}
      ]
    };
  },
  watch: {
    region: function(){
      //Call sheety to get locations where region === this.region
      //Assign loations = api result
    }
  },
  computed:{
    filteredRegions: function(){
      if (this.country)
        return this.states.filter(state => state.country.toUpperCase() === this.country.toUpperCase());
      else
        return this.states;
    }
  },
  created() {
    //STATES = Select distinct regions,country from the google sheet
    //LOCATIONS = Select from google sheet WHERE country === country prop
  }
}
</script>

<style scoped>
</style>
