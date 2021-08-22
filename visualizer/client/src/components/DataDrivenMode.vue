<template>
  <div class="data-driven-mode">
    <gmap-map
      v-bind:center="{ lat: 57.708581, lng: 11.974374 }"
      v-bind:zoom="9"
      style="height: 750px"
      :options="{
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
        disableDefaultUi: false,
        draggable: false
      }"
    >
      <gmap-cluster>
        <gmap-marker
          v-bind:key="index"
          v-for="(m, index) in markers"
          v-bind:position="m.position"
          v-bind:icon="m.icon"
          v-bind:clickable="true"
        >
        </gmap-marker>
      </gmap-cluster>
    </gmap-map>
  </div>
</template>

<script>
export default {
  name: 'dataDrivenMode',
  props: {
    markers: {
      type: Array
    }
  }
}
</script>

<style>

</style>
