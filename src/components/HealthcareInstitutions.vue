<template>
  <div>
    <Card title="Healthcare Instituitions"> </Card>
    {{regions}}
    <dropdown v-model="region" :options="filteredRegions" displaykey="name" valuekey="name" unselected="Select Region" class="mt-3 mb-3"/>
    <div v-for="location in locations" :key="location.name" class="bg-gray-100 p-3 text-sm block">
      <p class="leading-normal font-bold capitalize"><i class="fas fa-map-marker-alt"></i> {{location.name}}</p>
      <p class="text-xs">{{location.address}}</p>
      <p class="text-right font-semibold"><i class="fas fa-phone"></i> {{location.telNo}}</p>
    </div>
  </div>
</template>

<script>
import Card from "../components/Card";
import Dropdown from "../components/Dropdown";
import {getHealthcareInstitutions} from "../api/healthcareinstitutions";

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
      locations: [],
    };
  },
  computed:{
    filteredRegions: function(){
      if (this.country)
        return this.regions.filter(region => region.country.toUpperCase() === this.country.toUpperCase());
      else
        return this.regions;
    },
    regions: function(){
      var regionsarray = [];

      this.locations.forEach(location => {
        var region = {name: location.state.toUpperCase(), country: location.country.toUpperCase()}
        
        if(!regionsarray.some(reg => reg.name === region.name)){
          regionsarray.push(region);
        }
      });

      return regionsarray;
    }
  },
  created() {
    getHealthcareInstitutions().then(data => {
      this.locations = data.hospitalsAndHealthcareProviders;
    })
  }
}
</script>

<style scoped>
</style>
