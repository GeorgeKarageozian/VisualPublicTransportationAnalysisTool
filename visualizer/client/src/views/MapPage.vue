/* eslint-disable */
<template>
  <div id="map-page">
    <div class="left-panel">
      <dashboard
        @toggleMode="toggleMode"
        v-bind:counter="counter"
        v-bind:suburbCounter="suburbCounter"
      >
      </dashboard>
    </div>
    <div class="right-panel">
      <div class="map-wrapper">
        <div v-if="mode">
          <data-driven-mode v-bind:markers="markers"></data-driven-mode>
        </div>
        <div v-else>
          <select v-model="purpose" v-on:change="updateMap">
            <option v-bind:value="0">All</option>
            <option v-for="(purpose, index) in purposeArray" :key="index">
              <p>{{ purposeArray[index] }}</p>
              <!--go through the purposeArray to make purposes display on the option menu-->
            </option>
          </select>
          <!--add option menu on interactive mode, when a request comes in with a new purpose, will update the option menu.
          This menu is connected to function updateMap, which will be called every time the menu is clicked-->
          <interactive-mode
            v-bind:selectedMarkers="selectedMarkers"
          ></interactive-mode>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Paho from '../paho-mqtt.js'
import Dashboard from '../components/Dashboard.vue'
import DataDrivenMode from '../components/DataDrivenMode.vue'
import InteractiveMode from '../components/InteractiveMode.vue'
import inputTopic from 'raw-loader!../../topic.txt'
import inputIp from 'raw-loader!../../ip.txt'
import inputPort from 'raw-loader!../../port.txt'

export default {
  name: 'mapPage',
  components: {
    Dashboard,
    DataDrivenMode,
    InteractiveMode
  },
  data() {
    return {
      text: 'messages received',
      client: new Paho.MQTT.Client(inputIp, parseInt(inputPort), ''),
      topicRequests: inputTopic,
      requests: [],
      purpose: 0,
      markers: [],
      selectedMarkers: [],
      mode: true,
      counter: 0,
      suburbCounter: [{ suburb: 'uncategorised', number: 0 }],
      messageArray: [],
      purposeArray: []
    }
  },
  mounted() {},
  methods: {
    toggleMode(isInDataDrivenMode) {
      this.mode = isInDataDrivenMode
    },

    sortPurpose(message) {
      //check if the purposes of requests is new, if so, save in purposeArray
      var myJson = JSON.parse(message.payloadString)
      console.log('inside sorting ' + myJson.purpose)
      if (!this.purposeArray.includes(myJson.purpose)) {
        this.purposeArray.push(myJson.purpose)
      }
    },

    updateMap: function() {
      this.selectedMarkers = []

      if (this.purpose === 0) {
        for (var counter in this.messageArray) {
          this.makeRequestMarker(this.messageArray[counter]) //make markers for all requests
        }
      }

      for (var counter in this.messageArray) {
        //check if the purposes of the messages equal to the purpose user selects on the menu, if so, make markers for these requests
        var theMessage = JSON.parse(this.messageArray[counter].payloadString)
        if (theMessage.purpose == this.purpose) {
          this.makeRequestMarker(this.messageArray[counter])
        }
      }
    },

    onMessageArrived: function(message) {
      // once receiving a message, will display the message
      if (message.topic === this.topicDayRequests) {
        console.log('in day topic')
        var dayRequestsMessage = JSON.parse(message.payloadString)
        this.makeDayRequestMarker(message)
      } else if (message.topic === this.topicRequests) {
        console.log('in requests topic')
        this.messageArray.push(message) //save messages(requests) received in an array
        this.sortPurpose(message)
        this.makeRequestMarker(message)
        this.countRequest()
      } else {
        //this.makeBusMarker(message)
      }
    },

    countRequest() {
      this.counter = this.counter + 1 //calculate coming requests
    },

    createMarker(latitude, longitude, colour) {
      var marker = {
        position: {
          lat: latitude,
          lng: longitude
        },
        icon: {
          url: 'http://maps.google.com/mapfiles/ms/icons/' + colour + '-dot.png'
        }
      }
      return marker
    },

    makeRequestMarker(message) {
      console.log('inside makeRequestMarker')
      console.log(message.payloadString)
      var myJson = JSON.parse(message.payloadString)
      this.requests.push(myJson)

      if (myJson.purpose == this.purpose || this.purpose === 0) {
        //check if the coming requests' purposes equal to the purpose user selects on the menu, if so make markers for them
        var originMarker = this.createMarker(
          myJson.origin.latitude,
          myJson.origin.longitude,
          'green'
        )

        // console.log('suburb ' + myJson.origin.suburb)
        // for (var i in this.suburbCounter) {
        //   console.log(this.suburbCounter[i].suburb)
        //   if (this.suburbCounter[i].suburb === myJson.origin.suburb) {
        //     this.suburbCounter[i].number++
        //   }
        // }

        this.markers.push(originMarker)
        this.selectedMarkers.push(originMarker)

        var destinationMarker = this.createMarker(
          myJson.destination.latitude,
          myJson.destination.longitude,
          'blue'
        )

        this.markers.push(destinationMarker)
        this.selectedMarkers.push(destinationMarker)
        //console.log(this.markers)
      }
    },

    onConnect() {
      // Once a connection has been made, make a subscription
      console.log('onConnect')
      this.client.subscribe(this.topicRequests, { qos: 2 })
    },

    onConnectedLost: function(responseObject) {
      // when connecting fails, will display error message
      console.log('onConnectionLost:' + responseObject.errorMessage)
    }
  },
  created: function() {
    // when the webpage is loaded, will go into this function
    console.log({ inputTopic })
    console.log({ inputPort })
    console.log({ inputIp })
    console.log('inside created') // add to see this function will happen before onConnect()
    this.client.connect({
      onSuccess: this.onConnect // go into onConnect()
    })
    this.client.onConnectedLost = this.onConnectedLost
    this.client.onMessageArrived = this.onMessageArrived
  }
}
</script>

<style>
.left-panel {
  float: left;
  width: 25%;
}
.right-panel {
  float: right;
  width: 75%;
  overflow: scroll;
}
</style>
