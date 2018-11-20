/**
 * 获取APP版本
 * @param string 默认为lxyd
 * @return string
 * 备注：版本的格式会有: lxyd/2.9 或 lxyd/2.9.3 或 lxyd-dev/2.9.1(build12)
 */
export function getAppVersionFromUserAgent(appName = "lxyd") {
  let ua = navigator.userAgent
  let startIndex = ua.indexOf(appName)
  if (startIndex == -1) { return undefined }
  let endIndex = ua.indexOf(" ", startIndex)
  let lxydUa = ""
  if (endIndex > -1) {
    lxydUa = ua.substr(startIndex, endIndex - startIndex)
  } else {
    lxydUa = ua.substr(startIndex)
  }
  //现阶段lxyUa可能的值为lxyd-dev/2.9.1(build12)或lxyd-dev/2.9.1或lxyd/2.9.1
  startIndex = lxydUa.indexOf('/')
  endIndex = lxydUa.indexOf('(')
  let lxyd_version = ''
  if (endIndex > -1) {
    lxyd_version = lxydUa.substr(startIndex + 1, endIndex - startIndex - 1)
  } else {
    lxyd_version = lxydUa.substr(startIndex + 1)
  }
  return String(lxyd_version)
}


/**
 * 对比APP版本大小
 * 判断versionA是否大于versionB
 * @param {string} versionA
 * @param {string} versionB
 * @return boolean
 */
export function compareAppVersion(versionA, versionB) {
  let versionA_Arr = versionA.split('.')
  let versionB_Arr = versionB.split('.')
  let _arr = Math.max(versionA_Arr.length, versionB_Arr.length)
  let flag
  for (let i = 0; i < _arr; i++) {
    let left = versionA_Arr[i] ? versionA_Arr[i] : 0
    let right = versionB_Arr[i] ? versionB_Arr[i] : 0
    flag = parseInt(left) - parseInt(right)
    if (flag != 0) break
  }
  return flag >= 0
}

/**
 *
 * 获取系统类型
 * @export
 * @returns
 */
export function getPlatform() {
  const ua = navigator.userAgent
  const isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1; //android终端
  const isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if (isAndroid) {
    return 'android'
  } else if (isiOS) {
    return 'ios'
  }
  return ''
}

/**
 * 页面分享
 *
 * @export
 * @param object shareData
 * @example
 * shareData={
 *    title: `xxx`, // 分享标题
 *    link: `xxx`, // 分享链接
 *    imgUrl: `xxx`, // 分享图标
 *    desc: `xxx`,//分享描述
 * }
 * @param int shareType   //分享类型 0 不显示分享 1.分享链接  2.分享截图
 * @param array shareMenu   //分享菜单：1.微信朋友圈 2.微信好友 3.分享到QQ 4.分享到微博 5.分享到QQ空间
 */
export function shareData(shareData, shareType = 1, shareMenu = [1, 2, 3]) {

  try {
    local_obj.setShareType(shareType)
    shareMenu.map((data, index) => {
      switch (data) {
        case 1:
          local_obj.onMenuShareTimeline(JSON.stringify(shareData))
          break;
        case 2:
          local_obj.onMenuShareAppMessage(JSON.stringify(shareData))
          break;
        case 3:
          local_obj.onMenuShareQQ(JSON.stringify(shareData))
          break;
        case 4:
          local_obj.onMenuShareWeibo(JSON.stringify(shareData))
          break;
        case 5:
          local_obj.onMenuShareQZone(JSON.stringify(shareData))
          break;
      }
    })

  } catch (e) {
    console.warn(e)
  }
}

/**
 * 页面分享成功的回调
 *
 * @export
 * @param int channel  //回调频道：1.微信朋友圈 2.微信好友 3.分享到QQ 4.分享到微博 5.分享到QQ空间
 * @param function callback   //回调返回的函数
 * @date  2017-06-16
 * @author LuoJW
 */
export function shareSuccessCallBack(callback) {
  window.shareSuccess = function (channel) {
    console.log("分享成功：", channel)
    callback.call(this, channel);
  }
}

/**
 *  设置导航栏
 * @param Object config //菜单栏配置
 * @param function successCallBack   //成功回调
 * @param function falseCallBack   //失败回调
 * @date  2017-06-16
 * @author LuoJW
 **/
export function setNavigationBarConfig(config, successCallBack, falseCallBack) {
  try {
    window.LSJavascriptBridge.callHandler("setNavigationBarConfig", config, function responseCallback(responseData) {
      if (responseData.code == 1) {
        if (typeof successCallBack === "function") {
          successCallBack.call(this, responseData)
        }
      } else {
        if (typeof falseCallBack === "function") {
          falseCallBack.call(this, responseData)
        }
      }
    })
  } catch (e) {
  }
}
export function setAppNavTitle(title) {
  document.title = title
  if (!title) {
    throw new Error('The title is empty!')
  }
  if (window.navigationBarControl) {
    try {
      alert('..'+title)
      window.navigationBarControl.setNavigationBarTitle(title)
    } catch (e) {
      console.warn(e)
    }
  }
}


//设置分享按钮
export function setNavigationBarButton (data){
  const btnConfig = {
    title: data.title,
    imageUrl: data.imageUrl,
    buttonId: data.buttonId,
    callbackFunctionName: data.callbackFunctionName
  }
  try {
    window.navigationBarControl.setNavigationBarButton(JSON.stringify(btnConfig))
  } catch (e) {
    console.warn(e)
  }
}
/**
 * 唤起APP链接分享功能 (APP v3.2以上版本支持)
 * @param {{title:String,url:String,imgUrl:String,desc:String}} param
 * title:分享标题，url:分享链接,imgUrl:分享图标,desc:分享描述
 * @param {Function} callback 事件调用成功失败回调
 */
export function callShareUrl(param,callback) {
  try {
    LSJavascriptBridge.callHandler("shareUrl", param,function responseCallback(responseData) {
      if (responseData.code == 1) {
        console.log("调用APP分享链接功能成功")
        callback.call(responseData)
      } else {
        console.log("调用APP分享链接功能失败",responseData.errMessage)
      }
    })
  } catch(e) {}
}



//通知app注册回调函数
export function LSJavascriptBridgeInit(callback) {
  try {
    if (window.LSJavascriptBridge) {
      callback()
    } else {
      window.LSJavascriptBridgeDidSetUp = (bridge) => {
        callback()
      }
    }
  } catch(error) {
    console.error(error)
  }
}
export default {
  setAppNavTitle,
  LSJavascriptBridgeInit,
  getAppVersionFromUserAgent,
  compareAppVersion,
  getPlatform,
  shareData,
  callShareUrl,
  shareSuccessCallBack,
  setNavigationBarConfig,
  setNavigationBarButton
}
