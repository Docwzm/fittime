/**
 * jsBridge初始化对象LSJavascriptBridge
 * @param {*} callback 
 */
const LSJavascriptBridgeInit = callback => {
    try {
        if (window.LSJavascriptBridge) {
            callback()
        } else {
            window.LSJavascriptBridgeDidSetUp = (bridge) => {
                callback()
            }
        }
    } catch (error) {
        console.error(error)
    }
}
/**
 * 课程分享
 * @param {*} params 
 * @param {*} callback 
 */
const courseShareBridge = (params = {}, callback) => {
    try {
        window.LSJavascriptBridge.callHandler("shareLSClass", params, (responseData) => {
            callback && callback(responseData)
        })
    } catch (err) {
        console.error('调用课程分享失败:', err.message)
    }
}


/**
 * 标题设置
 * @param {*} params 
 * @param {*} callback 
 */
const navTitleBridge = (params = {}, callback) => {
    try {
        window.LSJavascriptBridge.callHandler("setNavigationBarConfig", params, (responseData) => {
            callback && callback(responseData)
        })
    } catch (err) {
        console.error('标题设置失败:', err.message)
    }
}
/**
 * 导航栏按钮设置
 * @param {*} buttons 
 * @param {*} callback 
 */
const navigationButtonsBridge = (buttons = [], callback) => {
    try {
        let ButtonCallBackArr = [];
        for (let x in buttons) {
            if (ButtonCallBackArr.findIndex(item => item == buttons[x].callbackHandlerName) < 0) {
                ButtonCallBackArr.push(buttons[x].callbackHandlerName);
                window.LSJavascriptBridge.registerHandler(buttons[x].callbackHandlerName, (buttonId, responseCallback) => {
                    buttons[x].callback && buttons[x].callback(buttonId)
                });
            }
        }
        window.LSJavascriptBridge.callHandler("setNavigationBarButtons", buttons, (responseData) => {
            callback && callback(responseData)
        })
    } catch (err) {
        console.error('导航栏设置失败:', err.message)
    }
}


/**
 * 唤起APP链接分享功能 (APP v3.2以上版本支持)
 * @param {{title:String,url:String,imgUrl:String,desc:String}} param
 * title:分享标题，url:分享链接,imgUrl:分享图标,desc:分享描述
 * @param {Function} callback 事件调用成功失败回调
 */
const shareUrlBridge = (param, callback) => {
    try {
        window.LSJavascriptBridge.callHandler("shareUrl", param, (responseData) => {
            callback && callback(responseData)
        })
    } catch (err) {
        console.error('唤起app分享失败:', err.message)
    }
}

export {
    LSJavascriptBridgeInit,
    courseShareBridge,
    navTitleBridge,
    navigationButtonsBridge,
    shareUrlBridge
}