import Vue from 'vue'
import App from './App'
import FastClick from 'fastclick'
import router from './router'
import '@/util'
import '@/assets/styles/reset.less'

import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad)

FastClick.attach(document.body)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')