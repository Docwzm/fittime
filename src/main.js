import Vue from 'vue'
import App from './App'
import FastClick from 'fastclick'
import router from './router'
import '@/util'
import { navTitleBridge, LSJavascriptBridgeInit,navigationButtonsBridge } from "@/util/jsBridge";

FastClick.attach(document.body)

import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad)

import  { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)

Vue.config.productionTip = false

// router.beforeEach((to,from,next) => {
//   LSJavascriptBridgeInit(() => {
//     navigationButtonsBridge([])//清除导航栏设置
//     let title = '';
//     if(to.meta && to.meta.title){
//       title = to.meta.title
//     }
//     if(to.meta.fullScreen){
//       navTitleBridge({
//         title,
//         autoResetToDefaultConfigWhtenOpenLink:true,//经测试，安卓必须设置为false 否则失效
//         topPadding:0,
//         barLineHidden:true,
//         color:{ red: 255, green: 255, blue: 255, alpha: 0 }
//       })
//     }else{
//       navTitleBridge({
//         title,
//         autoResetToDefaultConfigWhtenOpenLink:false,
//         // autoResetToDefaultConfigWhtenOpenLink:false,
//         // topPadding:60,
//         // barLineHidden:false,
//         // color:{ red: 255, green: 255, blue: 255, alpha: 1 }
//       })
//     }
//     next()
//   })
// })


new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')