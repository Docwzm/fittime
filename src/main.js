import Vue from 'vue'
import App from './App'
import FastClick from 'fastclick'
import router from './router'
import '@/util'
import '@/assets/styles/reset.less'
import { navTitleBridge, LSJavascriptBridgeInit } from "@/util/jsBridge";

import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad)

FastClick.attach(document.body)

Vue.config.productionTip = false

router.beforeEach((to,from,next) => {
  LSJavascriptBridgeInit(() => {
    navTitleBridge({
      title:to.meta.title,
      autoResetToDefaultConfigWhtenOpenLink:false,
      // barLineHidden:true,
      // topPadding:50,
      // backButtonType:1,
      // tintColorType:2,
      // color:'green',
      // subTitle:'test'
    })
    next()
  })
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')