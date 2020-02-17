import Vue from 'vue'
import App from './App'
import router from './router'
import '@/util'
import {checkEnv} from '@/util/tool'
import VConsole from 'vconsole'
import { ToastPlugin, LoadingPlugin } from 'vux'
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)

import FastClick from 'fastclick'
FastClick.attach(document.body)

import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad)

Vue.config.productionTip = false
if(checkEnv()!=='online'){
  var vconsole = new VConsole()
}
// router.beforeEach((to, from, next) => {
//   if (to.name == 'courseDetail') {
//     to.meta.keepAlive = true;
//     if(from.name == 'courseList'){
//       to.meta.keepAlive = false;
//     }
//   }
//   next();
// })

new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')