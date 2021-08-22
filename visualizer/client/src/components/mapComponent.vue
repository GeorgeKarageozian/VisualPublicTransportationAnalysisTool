<template>
  <!-- <p>this is the map component</p> -->
  <gmap-map v-bind:center="center" v-bind:zoom="12" style="height: 700px">
    <gmap-marker
      v-bind:key="index"
      v-for="(m, index) in markers"
      v-bind:position="m.position"
      v-bind:icon="m.icon"
      v-bind:clickable="true"
    >
    </gmap-marker>
  </gmap-map>
</template>


<script>


//Vue.component('ToggleButton', ToggleButton)
export default {
  name:  'map-component',
    components: {
  
  },
  data() {
    return {
      
      center: { lat: 57.6999589659618, lng: 11.954453844576335 },
      
    }
  },
  mounted() {
    
  },
  methods: {


  }


}
</script>
