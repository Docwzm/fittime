// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import FastClick from 'fastclick'
import router from './router'
import './util'
import './styles/reset.less'

import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad)

/*全局引入*/
import {
  ToastPlugin,
  LoadingPlugin,
  Loading,
  TransferDom
} from 'vux'
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.directive('transfer-dom', TransferDom)
Vue.component('xLoading', Loading)

import {setAppNavTitle,LSJavascriptBridgeInit} from './util/appApi'

FastClick.attach(document.body)

Vue.config.productionTip = false

Vue.prototype.base_url = process.env.BUILD_URL

let u = navigator.userAgent;
if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1){
  Vue.prototype.systemType = 'android'
}else if(!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
  Vue.prototype.systemType = 'ios'
}else{
  Vue.prototype.systemType = 'web'
}

function setApp(title){
  LSJavascriptBridgeInit(() => {
    setAppNavTitle(title)
  })
}

router.beforeEach((to, from, next) => {
  setApp(to.meta.title)
  next()
})

router.afterEach((to, from, next) => {
})

window.bus = new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')