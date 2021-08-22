/* eslint-disable */
<template>
  <div class="mapTest">
    <div>map test</div>
    <mapbox
      access-token="pk.eyJ1Ijoicm9zZWJ1ZDEzIiwiYSI6ImNrMnpwang1MzAwNnozY215ZHRyOWJ4ZGoifQ.vIxcuz8s18oM4zoIeWnGuA"
      :map-options="{
        style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location, showing streets
        center: [11.974374, 57.708581], // starting position Gothenburg
        zoom: 12, // initial zoom
      }"
    />
    <!-- the access-token is generated from my Mapbox account --Kaijie -->
  </div>
</template>

<script>
import Mapbox from 'mapbox-gl-vue'
/* more map functions will be added later */
import Paho from '../paho-mqtt.js'
export default {
  data() {
    return {
      client: new Paho.MQTT.Client('localhost', 8001, ''),
      topic: 'requests'
    }
  },
  methods: {
    onConnectedLost: function (responseObject) {
      // eslint-disable-next-line no-console
      console.log('onConnectionLost:' + responseObject.errorMessage)
    },
    onMessageArrived: function (message) {
      // eslint-disable-next-line no-console
      console.log('onMessageArrived:' + message.payloadString)
    },
    onConnect: function onConnect() {
      // Once a connection has been made, make a subscription and send a message.
      // eslint-disable-next-line no-console
      console.log('onConnect')
      this.client.subscribe(this.topic)
      // const message = new Paho.MQTT.Message('Hello')
      // message.destinationName = 'World'
      // this.client.send(message)
    }
  },
  created: function () {
    this.client.connect({
      onSuccess: this.onConnect,
      userName: 'user',
      password: 'pass'
    })
    this.client.onConnectedLost = this.onConnectedLost
    this.client.onMessageArrived = this.onMessageArrived
  },

  components: {
    Mapbox
  }
}
</script>

<style>
#map {
  width: 100%;
  height: 600px;
}
</style>
