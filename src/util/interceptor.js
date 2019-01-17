import Vue from 'vue'
import VueResource from 'vue-resource'
import uuid from 'node-uuid'
Vue.use(VueResource)
import {
  staticHostApiHost
} from './env'
const httpLockArr = {} //请求锁，避免同一条请求重复发送

Vue.http.interceptors.push(function (request, next) {
  let _url = request.url
  request.url = staticHostApiHost() + request.url + `&appType=${6}&requestId=${uuid.v1().replace(/-/g,'')}`
  alert(request.url)
  let lastRequest = httpLockArr[_url]
  if (lastRequest) {
    return false
  }
  request.xhr = { withCredentials: true }
  request.credentials = true;
  httpLockArr[request.url] = _url
  //请求头设置
  //request.headers.set('Content-Type', 'application/json;charset=utf-8')
  
  // Vue.$vux.loading.show({
  //   text: '加载中...'
  // })
  next(function (response) {
    httpLockArr[request.url] = null
    if (response.ok) {
      let data = response.data
      if (data.code == 200) {
        response.data = data.data
      } else if (data.code == 304) {
        console.log('页面重定向')
      } else if (data.code == '401') {
        console.log('用户未登录')
      } else {
        Vue.$vux.toast.text(data.msg, 'center')
        response.ok = false
      }
      return response
    } else {
      console.log('接口异常')
    }
  })
})