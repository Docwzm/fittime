<template>
  <div>
    课程详情
  </div>
</template>

<script>
import {
  LSJavascriptBridgeInit,
  navigationButtonsBridge,
  shareUrlBridge,
  navigationBarMenuBridge
} from "@/util/jsBridge";

export default {
  name: "courseDetail",
  data() {
    return {
      isAdd:true
    };
  },
  mounted() {
    this.setNavigationBarButtons();
  },
  methods: {
    // 调用app方法设置
    setNavigationBarButtons() {
      let buttons = [];
      if(this.isAdd){
        buttons = [
            {
            title: "...", // 按钮title
            buttonId: "id1", // 按钮唯一Id
            callbackHandlerName: "showMenuCall", // 事件回调函数名
            callback: this.showNavigationMenu
          }
        ]
      }
      buttons.push(
        {
          title: "分享", // 按钮title
          buttonId: "id2", // 按钮唯一Id
          callbackHandlerName: "shareCall", // 事件回调函数名
          callback: this.shareApp
        }
      );

      navigationButtonsBridge(buttons);
    },
    // 显示菜单
    showNavigationMenu() {
      let menuItemArray = [
        {
          title: "删除", // menu title
          imageUrl: '', // 图片Url
          callback: this.deleteCourse
        }
      ];
      let menu = {
        menuId: "xxxx", //唯一Id
        menuItems: menuItemArray, // 菜单列表
        callbackHandlerName: "MenuCallBack" // 事件回调函数名
      };

      navigationBarMenuBridge(menu);
    },
    // 点击删除菜单 删除已添加的课程
    deleteCourse(data) {
      this.isAdd = false;
      this.setNavigationBarButtons();
    },
    //点击分享
    shareApp() {
      _czc.push(["_trackEvent", "课程详情", "点击", "分享按钮"]);
      shareUrlBridge({
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