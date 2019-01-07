<template>
  <div>
    课程详情
  </div>
</template>

<script>
import mixin from "@/util/mixin";
import {
  LSJavascriptBridgeInit,
  setNavigationBarButton,
  callShareUrl
} from "@/util/appApi";

export default {
  name: "courseDetail",
  data() {
    return {};
  },
  mixins: [mixin],
  created() {
    window.appCb = this.shareApp;
  },
  methods: {
    // 调用app方法设置
    callApp() {
      // LSJavascriptBridge.registerHandler("ButtonCallBack", function(buttonId, responseCallback) {
      //     console.log("回调" + buttonId)
      // });

      // let button1 = {
      //     title: 'xxx1', // 按钮title
      //     buttonId: 'id1', // 按钮唯一Id
      //     callbackHandlerName: 'ButtonCallBack', // 事件回调函数名
      // }
      // let button2 = {
      //     title: 'xxx1', // 按钮title
      //     buttonId: 'id2', // 按钮唯一Id
      //     callbackHandlerName: 'ButtonCallBack', // 事件回调函数名
      // }

      // let buttons = new Array(button1, button2)

      // LSJavascriptBridge.callHandler("setNavigationBarButtons", buttons , function responseCallback(responseData) {
      //     if (responseData.code == 1) {
      //         console.log("设置成功")
      //     } else {
      //         console.log(responseData.errMessage)
      //     }
      // })

      var button1 = {
        title: "xxx1", // 按钮title
        buttonId: "id1", // 按钮唯一Id
        callbackHandlerName: "ButtonCallBack" // 事件回调函数名
      };
      var button2 = {
        imageUrl: "http://chuantu.biz/t5/82/1494381971x2728329077.png", // 按钮title
        buttonId: "id2", // 按钮唯一Id
        callbackHandlerName: "ButtonCallBack" // 事件回调函数名
      };

      var buttons = new Array(button1, button2);
      
      LSJavascriptBridge.callHandler(
        "setNavigationBarButtons",
        buttons,
        function responseCallback(responseData) {
          if (responseData.code == 1) {
            console.log("设置成功");
          } else {
            console.log(responseData.errMessage);
          }
        }
      );

      // setNavigationBarButton({
      //     title: "分享",
      //     imageUrl:
      //     "https://files.lifesense.com/other/20181029/c2b8c1bfd33140069d4cc3bc19b0f402.png",
      //     buttonId: "shareBtn",
      //     callbackFunctionName: "appCb"
      // });
    },
    shareApp() {
      _czc.push(["_trackEvent", "课程详情", "点击", "分享按钮"]);
      callShareUrl({
        title: "课程详情",
        url: location.origin + "/fittime/#/course-detail",
        imgUrl:
          "https://files.lifesense.com/other/20181029/c2b8c1bfd33140069d4cc3bc19b0f402.png",
        desc: "课程详情描述"
      });
    }
  }
};
</script>

<style lang="less">
</style>