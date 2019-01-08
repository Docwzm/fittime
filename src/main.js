import Vue from 'vue'
import App from './App'
import FastClick from 'fastclick'
import router from './router'
import '@/util'
import '@/assets/styles/reset.less'
import { navTitleBridge, LSJavascriptBridgeInit,navigationButtonsBridge } from "@/util/jsBridge";

import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad)

FastClick.attach(document.body)

Vue.config.productionTip = false

router.beforeEach((to,from,next) => {
  LSJavascriptBridgeInit(() => {
    navigationButtonsBridge([])//清除导航栏设置
    navTitleBridge({
      title:to.meta.title,
      autoResetToDefaultConfigWhtenOpenLink:false//经测试，安卓必须设置为false 否则失效
    })
    next()
  })
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')