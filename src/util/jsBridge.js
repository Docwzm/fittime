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
 * 回到根控制器，销毁webview
 * @param {*} callback 
 */
const popToRootControllerBridge = (callback) => {
    try {
        window.LSJavascriptBridge.callHandler("popToRootViewController", (responseData) => {
            callback && callback(responseData)
        })
    } catch (err) {
        console.error('跳出当前webview失败:', err.message)
    }
}


/**
 * 配置导航栏
 * @param {*} params 
 * @param {*} callback 
 */
const navTitleBridge = (params = {}, callback) => {
    try {
        window.LSJavascriptBridge.callHandler("setNavigationBarConfig", params, (responseData) => {
            callback && callback(responseData)
        })
    } catch (err) {
        console.error('配置导航栏失败:', err.message)
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
                //注册按钮的点击回调
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

/**
 * 获取系统网络环境
 * @param {Function} callbackName 传给app调用的方法 实时监听网络环境变化
 * @param {Function} resCallback 事件调用成功失败回调
 */
const getNetworkState = (callbackName, resCallback) => {
    try {
        window.LSJavascriptBridge.callHandler("getNetworkState", callbackName, (responseData) => {
            resCallback && resCallback(responseData)
        })
    } catch (err) {
        console.error('获取系统网络环境失败:', err.message)
    }
}

/**
 * 注册回调函数
 * @param {*} registerName 
 * @param {*} callback 
 */
const registerCallbackHandler = (registerName, callback) => {
    try {
        LSJavascriptBridge.registerHandler(registerName, (responseData) => {
            callback && callback(responseData)
        });
    } catch (e) {
        console.error('注册回调函数失败:', err.message)
    }
}


/**
 * 退出当前WebView控制器
 * @param {Function} resCallback 事件调用成功失败回调
 */
const cancelWebview = (resCallback) => {
    try {
        window.LSJavascriptBridge.callHandler("popViewController", callbackName, (responseData) => {
            resCallback && resCallback(responseData)
        })
    } catch (err) {
        console.error('退出当前WebView控制器失败:', err.message)
    }
}



/**
 * 监听webview返回事件
 * @param {Function} callbackName 传给app调用的方法 监听返回事件
 * @param {Function} resCallback 事件调用成功失败回调
 */
const setBackbuttonCallBack = (callbackName, resCallback) => {
    try {
        window.LSJavascriptBridge.callHandler("setBackbuttonCallBack", callbackName, (responseData) => {
            resCallback && resCallback(responseData)
        })
    } catch (err) {
        console.error('退出当前WebView控制器失败:', err.message)
    }
}


export {
    LSJavascriptBridgeInit,
    courseShareBridge,
    navTitleBridge,
    navigationButtonsBridge,
    shareUrlBridge,
    getNetworkState,
    cancelWebview,
    setBackbuttonCallBack,
    popToRootControllerBridge,
    registerCallbackHandler
}