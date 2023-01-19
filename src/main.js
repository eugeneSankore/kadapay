import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter   from "vue-router";
import device from 'vue-device-detector-js'
import store from "@/store";

Vue.use(VueAxios, axios)
Vue.use(VueRouter)
Vue.use(device)

Vue.config.productionTip = true

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
