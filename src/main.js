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

let u = navigator.userAgent;
if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1){
  Vue.prototype.systemType = 'android'
}else if(!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
  Vue.prototype.systemType = 'ios'
}else{
  Vue.prototype.systemType = 'web'
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')