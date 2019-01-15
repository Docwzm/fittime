import Vue from 'vue'
import App from './App'
import FastClick from 'fastclick'
import router from './router'
import '@/util'
FastClick.attach(document.body)

import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad)

import  { ToastPlugin,LoadingPlugin,Actionsheet } from 'vux'
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.component('actionsheet', Actionsheet)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')