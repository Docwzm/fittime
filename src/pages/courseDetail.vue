<template>
  <div>
    
    <div class="top-img">
      <img src="" />
    </div>

    <div class="base-info">
      <p class="title">马甲线塑造课程</p>
      <div>
        <span class="tag">小器械 · 增肌 · 腰部</span>
        <span class="hot-count">234253</span>
      </div>
    </div>

    <tab>
      <tab-item @on-item-click="tabClick">介绍</tab-item>
      <tab-item @on-item-click="tabClick">课程（3）</tab-item>
    </tab>
<p class="vux-1px-b" @click="go">课程详情</p>

    <div class="content">
      <!-- 介绍 -->
      <div class="intro">
        <img src="" />
      </div>
      <!-- 课程 -->
      <div class="course-list">
        <ul>
          <li>
            <p class="mess">
              <span class="name">训练1</span>
              <span class="time">12分钟,已完成训练</span>
            </p>
            <p class="btn">免费试看</p>
            <p class="lock"></p>
          </li>
        </ul>
      </div>
    </div>

    <div class="buy-tip">
      <p>购买须知</p>
      <div>调整身体状态，尽快进入活动提高肌肉温度，防止肌肉损调整身体状态，尽快进入活动提高肌肉温度，防止肌肉损伤伤温度，防止肌肉损调整身体状态，尽快进入活动提高</div>
    </div>

    <div class="repay-tip">
      <p class="title">课程已购买</p>
      <p class="endtime">有效期至2019年11月30日</p>
      <p class="repay-btn">>>前往续费</p>
    </div>


    <div class="footer">
      <div class="buy-wrap">
        <p class="concat">客服</p>
        <div class="buy-btn">
          <span>购买课程</span>
          <b>(￥9.99)</b>
        </div>
      </div>

      <div class="add-wrap">
        <button>加入课程</button>
      </div>

      <div class="play-wrap">
        <button>开始训练</button>
      </div>
    </div>

    

    <actionsheet
      v-model="showMenu"
      :menus="menus"
      @on-click-menu="menuClick"
      show-cancel></actionsheet>
  </div>
</template>

<script>

import { Tab, TabItem, Actionsheet } from 'vux'
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
      showMenu:false, //已添加课程显示删除弹出框标识
      isAdd: true,  //是否为已添加课程
      menus:{
        delMenu:'删除'
      }//导航栏按钮触发弹出框
    };
  },
  components:{
    Actionsheet,
    Tab,
    TabItem
  },
  created() {
    this.setNavigationBarButtons();
  },
  methods: {
    go(){
      this.$router.push('/video-player')
    },
    showToast(){
      this.$vux.toast.text('请购买课程后再查看内容', 'middle')
    },
    menuClick(key,item){
      if(key=='delMenu'){
        this.isAdd = false;
        this.setNavigationBarButtons()
      }
    },
    // 调用app方法设置
    setNavigationBarButtons() {
      let buttons = [];
      if (this.isAdd) {
        buttons = [
          {
            title: "...", // 按钮title
            buttonId: "id1", // 按钮唯一Id
            callbackHandlerName: "showMenuCall", // 事件回调函数名
            callback: this.showNavigationMenu
          }
        ];
      }
      buttons.push({
        title: "分享", // 按钮title
        buttonId: "id2", // 按钮唯一Id
        callbackHandlerName: "shareCall", // 事件回调函数名
        callback: this.shareApp
      });

      navigationButtonsBridge(buttons);
    },
    // 显示菜单
    showNavigationMenu() {
      // let menuItemArray = [
      //   {
      //     title: "删除", // menu title
      //     imageUrl: "", // 图片Url
      //     callback: this.deleteCourse
      //   }
      // ];
      // let menu = {
      //   menuId: "xxxx", //唯一Id
      //   menuItems: menuItemArray, // 菜单列表
      //   callbackHandlerName: "MenuCallBack" // 事件回调函数名
      // };

      // navigationBarMenuBridge(menu);
      this.showMenu = true;
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