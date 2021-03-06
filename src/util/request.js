import Vue from 'vue'
import axios from 'axios'
import uuid from 'node-uuid'
import {
  staticHostApiHost
} from './env'

let pending = []; //声明一个数组用于存储每个ajax请求的取消函数和ajax标识
let cancelToken = axios.CancelToken;
let removePending = (config) => {
  for (let p in pending) {
    if (pending[p].u === config.url + '&' + config.method) { //当当前请求在数组中存在时执行函数体
      pending[p].f(); //执行取消操作
      pending.splice(p, 1); //把这条记录从数组中移除
    }
  }
}

const service = axios.create({
  baseURL: staticHostApiHost(), // api 的 base_url
  // timeout: 5000 // request timeout
  withCredentials: true,
  params: {}
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (!config.params.noPending) {
      removePending(config); //在一个ajax发送前执行一下取消操作
    }
    config.cancelToken = new cancelToken((c)=>{
        // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
        pending.push({ u: config.url + '&' + config.method, f: c });  
    });
    config.params['requestId'] = `${uuid.v1().replace(/-/g,'')}`
    config.params['appType'] = 6
    // config.params['accessToken'] = 'qwert'
    return config
  },
  error => {
    Promise.reject(error)
  }
)


service.interceptors.response.use(
  response => {
    if (!response.config.params.noPending) {
      removePending(response.config);
    }
    let res = response.data;
    if (res.code == 200) {
      return res
    } else {
      Vue.$vux.toast.show({
        text: JSON.stringify(response.data.msg),
        type: 'text'
      });
      return Promise.reject('error')
    }
  },
  error => {
    Vue.$vux.toast.show({
      text: JSON.stringify(error),
      type: 'text'
    });
    return Promise.reject(error)
  }
)

export default service