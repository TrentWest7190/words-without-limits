// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vueSocket from './plugins/vue-socket'

Vue.config.productionTip = false

Vue.use(vueSocket, {
  HOST: process.env.HOST,
  PORT: process.env.PORT
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
