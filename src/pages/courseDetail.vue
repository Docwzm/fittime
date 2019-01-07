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
    callApp(){

        // 展示菜单示例代码
    //注册一个回调函数，供APP调用
    LSJavascriptBridge.registerHandler("MenuCallBack", function(data, responseCallback) {
         console.log("回调" + data.selectedIndex + "" + "data.menuId")
    });
    
    let menuItem1 = {
        title: 'xxx', // menu title
        imageUrl: 'xxx', // 图片Url
    }
    
    let menuItemArray = new Array(menuItem1, menuItem1, menuItem1)
    
    let menu = {
        menuId: 'xxxx', //唯一Id
        menuItems: menuItemArray, // 菜单列表
        callbackHandlerName: 'MenuCallBack', // 事件回调函数名
    }
    LSJavascriptBridge.callHandler("showNavigationBarMenu", menu, function responseCallback(responseData) {
        if (responseData.code == 1) {
            console.log("设置成功")
        } else {
            console.log(responseData.errMessage)
        }
    })


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