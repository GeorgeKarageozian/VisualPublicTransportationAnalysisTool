import Vue from 'vue'
import App from './App.vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import GmapCluster from "vue2-google-maps/dist/components/cluster"
import router from './router'


Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCg80WJncapk4UKupxE8W_FICQGEweeiac'
  }
})
Vue.config.productionTip = false

Vue.component('GmapCluster', GmapCluster)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
