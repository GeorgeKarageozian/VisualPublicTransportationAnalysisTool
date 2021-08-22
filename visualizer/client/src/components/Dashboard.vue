<template>
  <div class="dashboard">
    <div class="dashboard-wrapper">
      <toggle-button
        :value="false"
        :labels="{ unchecked: 'Data driven mode', checked: 'Interactive mode' }"
        :width="250"
        :height="50"
        :font-size="20"
        @change="changeMode()"
      />
      <div v-show="isInDataDrivenMode">
        <span>Click to activate Interactive Mode</span>
        <div class="info-display">
          <span :style="{ color: markerColour.data.origin }">Origin</span>
          <span> - </span>
          <span :style="{ color: markerColour.data.destination }"
            >Destination</span
          >
        </div>
        <div class="data-display">
          <p>Amount of requests: {{ counter }}</p>
        </div>
      </div>
      <div v-show="!isInDataDrivenMode">
        <span>Interactive Mode Activated</span>
        <div class="info-display">
          <span :style="{ color: markerColour.data.origin }">Origin</span>
          <span> - </span>
          <span :style="{ color: markerColour.data.destination }"
            >Destination</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ToggleButton } from 'vue-js-toggle-button'

export default {
  name: 'dashboard',
  components: {
    ToggleButton
  },
  data() {
    return {
      isInDataDrivenMode: true,
      markerColour: {
        data: { origin: 'green', destination: 'blue' }
      }
    }
  },
  props: {
    counter: {
      type: Number
    },
    groupingTestData: Array
  },
  methods: {
    // updates the view, to allow the user to switch between interactive and data driven mode
    changeMode() {
      this.isInDataDrivenMode = !this.isInDataDrivenMode
      this.$emit('toggleMode', this.isInDataDrivenMode)
    }
  },
  mounted() {}
}
</script>

<style>
.dashboard {
  display: inline;
}
.dashboard-wrapper {
  height: 100%;
  width: 300px;
  position: absolute;
  top: 40px;
  left: 0px;
}
.info-display {
  margin-top: 10px;
}
</style>
