// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import FastClick from 'fastclick'
import router from './router'
import VueResource from 'vue-resource'
import './util'
import './styles/reset.less'
/*全局引入*/
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'//这里注意具体看使用的版本是否需要引入样式，以及具体位置。
Vue.use(VueAwesomeSwiper, /* { default global options } */)
import  { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)
import {setAppNavTitle,LSJavascriptBridgeInit,shareData,callShareUrl,setNavigationBarButton} from './util/appApi'

import {
  LoadingPlugin,
  XImg,
} from 'vux'
Vue.use(LoadingPlugin)
Vue.component('XImg', XImg)
Vue.use(VueResource)

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
console.log(Vue.prototype.systemType)

LSJavascriptBridgeInit(function(){
  setApp()
})
function setApp(){
  // window.bus.$root.$emit('APP-CB')
  setAppNavTitle('万圣节の冒险狂欢')
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
  setNavigationBarButton({
    title: '分享',
    imageUrl: Vue.prototype.systemType == 'ios' ? require('./assets/ic_share.png') :'',
    buttonId: 'shareBtn',
    callbackFunctionName: 'appCb'
  })
}
window.appCb = ()=>{
  _czc.push(['_trackEvent', '万圣节', '点击', '分享按钮'])
  window.shareSuccess()
  callShareUrl({
    title:'万圣节狂欢，砸南瓜，丰富壕礼免费领！',
    url:location.origin+'/activities/181101/#/other?id=39&from=fx',
    imgUrl:'https://files.lifesense.com/other/20181029/c2b8c1bfd33140069d4cc3bc19b0f402.png',
    desc:'登录乐心运动，每天都有机会抢千元壕礼，立即参与'
  })
}
//分享回调
window.shareSuccess = (channel) => {
  let _d ={
    eventId:39,         //活动的ID, 本次活动ID=39
    increaseReason:2,  //增加原因，1标识进入活动页，2标识分享成功
  }
  
  Vue.http.post('/marketing_service/halloween/increasePrizeCount',_d).then(res=>{
    window.bus.$root.$emit('CHANGE-COUNT',res)
  })
}


//
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  // Vue.$vux.loading.show({
  //   text: '加载中...'
  // })
  next()
})
router.afterEach((to, from, next) => {
  setTimeout(()=>{
    // Vue.$vux.loading.hide();
    setApp()
  },200)
})


window.bus = new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')