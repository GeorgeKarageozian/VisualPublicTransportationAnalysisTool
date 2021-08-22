<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" height="100px" />
    <div>DIT355 Client</div>
    <h1>City Traffic Helper</h1>
    <p>Travel Your Way. Today.</p>
    <clock :blink="true"></clock>
    <h4>
      The clock above is a placeholder-like component just for padding this
      homepage :)
    </h4>
    <div id="messagaes"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import Clock from '@/components/Clock.vue'
import Paho from '../paho-mqtt.js'
// code of Line 36-45, 49-77 is from "https://www.jianshu.com/p/682f73fb43fd"
export default {
  name: 'home',
  data() {
    return {
      client: new Paho.MQTT.Client('localhost', 8001, ''),
      topic: 'test'
    }
  },
  components: {
    Clock
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
      // this.client.subscribe(this.topic);
      // message = new Paho.MQTT.Message("Hello");
      // message.destinationName = "World";
      // client.send(message);
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
  }
}
</script>

