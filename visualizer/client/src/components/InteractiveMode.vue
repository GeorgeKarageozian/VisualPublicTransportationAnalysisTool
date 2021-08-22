<template>
  <div class="interactive-mode">
    <gmap-map
      v-bind:center="{ lat: 57.708581, lng: 11.974374 }"
      v-bind:zoom="11"
      style="height: 750px"
      :options="{
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: true,
        fullscreenControl: true,
        disableDefaultUi: false,
        draggable: true
      }"
    >
      <gmap-marker
        v-bind:key="index"
        v-for="(m, index) in selectedMarkers"
        v-bind:position="m.position"
        v-bind:icon="m.icon"
        v-bind:clickable="true"
      >
      </gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
export default {
  name: 'interactiveMode',
  props: {
    selectedMarkers: Array
  }
}
</script>

<style>

</style>
