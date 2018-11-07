// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import FastClick from 'fastclick'
import router from './router'
import './util'
import './styles/reset.less'

import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
  preLoad: 1.3,
  loading: require('./assets/icon_hot.png'),
  attempt: 1
})

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

LSJavascriptBridgeInit(function(){
  setApp()
})
function setApp(title=''){
  // window.bus.$root.$emit('APP-CB')
  setAppNavTitle(title)
  console.log(title)
  //分享2.0
  // shareData(
  //   {
  //     title:'万圣节狂欢，砸南瓜，丰富壕礼免费领！',
  //     link:location.origin+'/activities/181101/#/other?id=39&from=fx',
  //     imgUrl:'https://files.lifesense.com/other/20181029/c2b8c1bfd33140069d4cc3bc19b0f402.png',
  //     desc:'登录乐心运动，每天都有机会抢千元壕礼，立即参与'
  //   }
  // )
  //分享 3.0
  // setNavigationBarButton({
  //   title: '分享',
  //   imageUrl: Vue.prototype.systemType == 'ios' ? require('./assets/ic_share.png') :'',
  //   buttonId: 'shareBtn',
  //   callbackFunctionName: 'appCb'
  // })
}
// window.appCb = ()=>{
//   _czc.push(['_trackEvent', '万圣节', '点击', '分享按钮'])
//   window.shareSuccess()
//   callShareUrl({
//     title:'万圣节狂欢，砸南瓜，丰富壕礼免费领！',
//     url:location.origin+'/activities/181101/#/other?id=39&from=fx',
//     imgUrl:'https://files.lifesense.com/other/20181029/c2b8c1bfd33140069d4cc3bc19b0f402.png',
//     desc:'登录乐心运动，每天都有机会抢千元壕礼，立即参与'
//   })
// }
//分享回调
// window.shareSuccess = (channel) => {
//   let _d ={
//     eventId:39,         //活动的ID, 本次活动ID=39
//     increaseReason:2,  //增加原因，1标识进入活动页，2标识分享成功
//   }
  
//   Vue.http.post('/marketing_service/halloween/increasePrizeCount',_d).then(res=>{
//     window.bus.$root.$emit('CHANGE-COUNT',res)
//   })
// }


//
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next()
})
router.afterEach((to, from, next) => {
  setTimeout(()=>{
    setApp(to.meta.title)
  },200)
})


window.bus = new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')