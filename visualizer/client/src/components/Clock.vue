<template>
  <div id="clock">
    <!-- Inspired by https://github.com/eddyerburgh/vue-digital-clock -->
    <!-- Modified by Kaijie on Nov 7 2019 -->
    <time class="time">
      <span class="clock__hour">{{ hours }}</span>
      <span
        class="clock__colon"
        :style="{
          visibility: !blink || seconds % 2 === 0 ? 'visible' : 'hidden'
        }"
        >:</span>
      <span class="clock__minutes">{{ minutes }}</span>
      <span
        class="clock__colon"
        v-if="displaySeconds"
        :style="{
          visibility: !blink || seconds % 2 === 0 ? 'visible' : 'hidden'
        }"
        >:</span>
      <span v-if="displaySeconds" class="clock__seconds">{{ seconds }}</span>
      <span v-if="twelveHour" class="clock__ampm">{{ amPm }}</span>
    </time>
    <div class="greetings">
      <p>{{ year }}-{{ month }}-{{ today }} {{ weekDay }}</p>
      <p>It's really nice to meet you here.</p>
    </div>
  </div>
</template>

<script>
function padZero(number) {
  if (number < 10) {
    return '0' + number
  }
  return number
}
const getDate = () => new Date()
const getSeconds = () => padZero(getDate().getSeconds())
const getMinutes = () => padZero(getDate().getMinutes())
const getHour = twelveHour => {
  let hours = getDate().getHours()
  if (twelveHour && hours > 12) {
    hours = hours - 12
  }
  return padZero(hours)
}
const getAmPm = () => (getDate().getHours() > 12 ? 'PM' : 'AM')

var week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saterday']
const getYear = () => padZero(getDate().getFullYear())
const getMonth = () => padZero(getDate().getMonth() + 1)
const getDay = () => padZero(getDate().getDate())
const getWeek = () => week[getDate().getDay()]

export default {
  name: 'Clock',
  props: ['blink', 'displaySeconds', 'twelveHour'],
  data() {
    return {
      ticker: null,
      minutes: getMinutes(),
      hours: getHour(this.twelveHour),
      seconds: getSeconds(),
      amPm: getAmPm(),
      year: getYear(),
      month: getMonth(),
      today: getDay(),
      weekDay: getWeek()
    }
  },
  created() {
    this.ticker = setInterval(() => {
      this.minutes = getMinutes()
      this.hours = getHour(this.twelveHour)
      this.seconds = getSeconds()
      this.today = getDay()
      this.weekDay = getWeek()
    }, 1000)
  },
  destroyed() {
    clearInterval(this.ticker)
  }
}
</script>

<style>
#clock{
  text-align: center;
  margin-top: 100px;
}
.time {
  color: black;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  color: black;
  text-shadow: 0 0 20px #0aafe6, 0 0 20px rgba(10, 175, 230, 0);
  font-size: 40px;
  letter-spacing: 0.2em;
}
.greetings {
  margin-top: 20px;
}
.greetings p {
  margin: 5px;
}
</style>
