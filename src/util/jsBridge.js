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
        alert('调用课程分享失败:')
        //console.error('调用课程分享失败:', err.message)
    }
}

export {
    courseShareBridge
}