<template>
  <div class="detail-wrap">

    <div class="top-img">
      <img src="../../assets/images/poster.png" />
    </div>

    <div class="base-info">
      <p class="title">马甲线塑造课程</p>
      <div class="line-wrap">
        <span class="tag">小器械 · 增肌 · 腰部</span>
        <span class="hot-count">2222</span>
      </div>
    </div>

    <div class="tab-bar vux-1px-b">
      <p :class="slectedTab==1?'active':''" @click="slectedTab=1"><span>介绍</span></p>
      <p :class="slectedTab==2?'active':''" @click="slectedTab=2"><span>课程(3)<b>试看</b></span></p>
    </div>

    <div class="content">
      <!-- 介绍 -->
      <div class="intro" v-show="slectedTab==1">
        <img src="../../assets/images/poster.png"/>
      </div>
      <!-- 课程 -->
      <div class="course-list" v-show="slectedTab==2">
        <ul>
          <li v-for="(item,index) in courseList" :key="index" :class="'vux-1px-b'+((shouldPay&&!isBuy&&!item.free)?' lock':'')"
            @click="gotoPlay(item)">
            <p class="mess">
              <span class="name">{{item.name}}</span>
              <span class="time" v-if="item.over">{{ item.time }}分钟,已完成训练</span>
              <span class="time" v-if="!item.over">{{ item.time }}分钟</span>
            </p>
            <p class="btn" v-if="shouldPay&&!isBuy&&item.free">免费试看</p>
          </li>
        </ul>
      </div>
    </div>

    <div class="buy-tip">
      <p>购买须知</p>
      <div>调整身体状态，尽快进入活动提高肌肉温度，防止肌肉损调整身体状态，尽快进入活动提高肌肉温度，防止肌肉损伤伤温度，防止肌肉损调整身体状态，尽快进入活动提高</div>
    </div>

    <div class="repay-tip" v-if="shouldPay&&isBuy">
      <p class="title">课程已购买</p>
      <p class="endtime">有效期至2019年11月30日</p>
      <div @click="gotoPay" class="repay-btn">>>前往续费</div>
    </div>

    <div class="footer">
      <div class="buy-wrap" v-if="shouldPay&&!isBuy">
        <div @click="gotoService" class="concat"><span>客服</span></div>
        <div @click="gotoPay" class="buy-btn">
          <span>购买课程</span>
          <b>(￥9.99)</b>
        </div>
      </div>

      <div class="add-wrap" v-else-if="!isAdd" @click="joinCourse">
        加入课程
      </div>

      <div @click="gotoPlay" class="play-wrap" v-else="isAdd">
        开始训练
      </div>
    </div>

    <actionsheet v-model="showMenu" :menus="menus" @on-click-menu="menuClick" show-cancel></actionsheet>
  </div>
</template>

<script>
import { Actionsheet } from "vux";//底部弹出框组件
import {
  LSJavascriptBridgeInit,
  navigationButtonsBridge,
  shareUrlBridge,
  navTitleBridge
} from "@/util/jsBridge";
import { getCourseDetail } from '@/api'

export default {
  name: "courseDetail",
  data() {
    return {
      isShare:false,//是否为分享页面
      courseId:'',//课程ID
      slectedTab: 1, //选中的tab 1:介绍 2:课程
      showMenu: false, //已添加课程显示删除弹出框标识
      shouldPay: true, //是否为付费课程
      isAdd: true, //是否为已添加课程
      isBuy: true, //是否已购买了
      menus: {
        delMenu: "结束课程"
      }, //导航栏按钮触发底层弹出框
      course:null,
      courseList: [
        {
          name: "训练1",
          time: 12,
          over: true,
          free: true
        },
        {
          name: "训练2",
          time: 12
        }
      ]
    };
  },
  components: {
    Actionsheet
  },
  created() {
    this.isShare = this.$route.query.isShare?this.$route.query.isShare:false;
    
    LSJavascriptBridgeInit(() => {
      let title = this.$route.meta && this.$route.meta.title?this.$route.meta.title:'';
      navTitleBridge({
        title,
        autoResetToDefaultConfigWhtenOpenLink: true,
        tintColorType: 1,
        backButtonType: 1,
        topPadding: 0,
        barLineHidden: true,
        color: { red: 255, green: 255, blue: 255, alpha: 0 }
      });
      this.setNavigationBarButtons();
    });

    // this.getCourseDetail()
  },
  methods: {
    //获取视频详情
    getCourseDetail(){
      getCourseDetail({
        courseId
      }).then(res => {
        this.course = res.data;
      })
    },
    gotoService(){
      if(this.isShare){
        return 
      }
      this.$router.push('/system-service')
    },
    gotoPay(){
      if(this.isShare){
        return ;
      }
      this.$router.push('/course-payment')
    },
    //前往视频播放页面
    gotoPlay(data) {
      if(this.isShare){
        return ;
      }
      if (this.shouldPay) {
        //付费视频 判断以下情况  购买  未购买：1、可试看 2、不可试看
        if (this.isBuy) {
          //已经购买了的
          this.$router.push("/video-player");
        } else {
          if (data.free) {
            //试看
            this.$router.push("/video-player");
          } else {
            //不可试看
            this.$vux.toast.text("请购买课程后再查看内容", "middle");
          }
        }
      } else {
        // 免费视频
        this.$router.push("/video-player");
      }
    },
    //加入课程
    joinCourse() {
      this.isAdd = true;
      this.setNavigationBarButtons();//重置顶部导航栏
    },
    //删除已加入课程
    menuClick(key, item) {
      if (key == "delMenu") {
        this.isAdd = false;
        this.setNavigationBarButtons();//重置顶部导航栏
      }
    },
    // 调用app方法设置顶部导航栏
    setNavigationBarButtons() {
      let buttons = [];
      if (this.isAdd) {
        //已加入的课程 需要显示结束课程的导航按钮
        buttons = [
          {
            imageUrl:
              window.location.protocol +
              "//" +
              window.location.host +
              "/static/images/ic_more_black@3x.png",
            buttonId: "moreBtn", // 按钮唯一Id
            callbackHandlerName: "showMenuCall", // 事件回调函数名
            callback: this.showNavigationMenu//按钮的点击事件
          }
        ];
      }
      //分享导航按钮
      buttons.push({
        imageUrl:
          window.location.protocol +
          "//" +
          window.location.host +
          "/static/images/ic_share@3x.png",
        buttonId: "shareBtn", // 按钮唯一Id
        callbackHandlerName: "shareCall", // 事件回调函数名
        callback: this.shareApp
      });

      navigationButtonsBridge(buttons);
    },
    // 显示底部结束课程弹出框
    showNavigationMenu() {
      this.showMenu = true;
    },
    //唤起app分享弹框
    shareApp() {
      // _czc.push(["_trackEvent", "课程详情", "点击", "分享按钮"]);
      shareUrlBridge({
        title: "课程详情",
        url: location.origin + "/fittime/#/course-detail?isShare=true",
        imgUrl: "https://files.lifesense.com/other/20181029/c2b8c1bfd33140069d4cc3bc19b0f402.png",
        desc: "课程详情描述"
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/styles/mixin";
.detail-wrap {
  padding-bottom: 110px;
}
.top-img {
  height: 430px;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.base-info {
  background: #fff;
  padding: 40px 24px 57px 27px;
  .title {
    font-size: 40px;
    color: rgba(65, 65, 65, 1);
    line-height: 40px;
  }
  .line-wrap {
    margin-top: 6px;
    overflow: hidden;
    span {
      display: block;
      float: left;
      font-size: 24px;
      color: rgba(182, 182, 182, 1);
      line-height: 33px;
    }
    .hot-count {
      display: block;
      float: right;
      &::before {
        content: "";
        display: inline-block;
        width: 24px;
        height: 24px;
        .bg("icons/hot_gray");
        margin-right: 6px;
      }
    }
  }
}
.tab-bar {
  display: flex;
  padding-bottom: 6px;
  p {
    position: relative;
    flex: 1;
    text-align: center;
    line-height: 40px;
    padding: 13px 0;
    &.active {
      color: rgba(74, 144, 226, 1);
      &::before {
        content: "";
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
        width: 40px;
        height: 4px;
        background: rgba(74, 144, 226, 1);
        border-radius: 2px;
      }
    }
  }
  span {
    position: relative;
    font-size: 28px;
    color: rgba(65, 65, 65, 1);
    b {
      position: absolute;
      right: 20px;
      top: 0;
      transform: translate(100%, -50%);
      display: block;
      width: 52px;
      height: 28px;
      line-height: 28px;
      background: rgba(208, 2, 27, 1);
      border-radius: 15px;
      border: 1px solid rgba(255, 255, 255, 1);
      font-size: 18px;
      color: rgba(255, 255, 255, 1);
    }
  }
}
.content {
  .intro {
    img {
      max-width: 100%;
      height: auto;
    }
  }
  .course-list {
    li {
      padding: 27px 30px;
      overflow: hidden;
      &.lock {
        &:before {
          content: "";
          display: block;
          margin-top: 17px;
          float: right;
          width: 40px;
          height: 40px;
          .bg("icons/lock");
        }
      }
    }
    .mess {
      float: left;
      span {
        display: block;
        line-height: 32px;
      }
      .name {
        font-size: 32px;
        color: rgba(65, 65, 65, 1);
      }
      .time {
        font-size: 24px;
        color: rgba(182, 182, 182, 1);
        margin-top: 10px;
      }
    }
    .btn {
      margin-top: 11px;
      float: right;
      // width: 128px;
      padding: 0 20px;
      height: 46px;
      line-height: 46px;
      text-align: center;
      border-radius: 29px;
      border: 1px solid rgba(74, 144, 226, 1);
      font-size: 22px;
      color: rgba(74, 144, 226, 1);
    }
  }
}
.buy-tip {
  margin: 60px 40px 70px;
  p {
    text-align: center;
    font-size: 28px;
    color: rgba(65, 65, 65, 1);
    line-height: 36px;
    margin-bottom: 30px;
  }
  div {
    font-size: 24px;
    color: rgba(155, 155, 155, 1);
    line-height: 36px;
    text-align: justify;
  }
}
.repay-tip {
  padding: 0 0 70px;
  p,
  .repay-btn {
    display: block;
    line-height: 36px;
    text-align: center;
  }
  .title {
    font-size: 28px;
    color: rgba(65, 65, 65, 1);
    margin-bottom: 30px;
  }
  .endtime {
    font-size: 24px;
    color: rgba(155, 155, 155, 1);
  }
  .repay-btn {
    margin-top: 12px;
    font-size: 24px;
    color: rgba(74, 144, 226, 1);
  }
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  border-top: 2px solid #d9d9d9;
  // height:110px;
  background: #fff;
  padding: 15px 0;
  .buy-wrap {
    padding-left: 50px;
    display: flex;
    .buy-btn {
      width: 582px;
      height: 80px;
      line-height: 80px;
      background: linear-gradient(
        316deg,
        rgba(36, 121, 255, 1) 0%,
        rgba(46, 175, 255, 1) 100%
      );
      border-radius: 100px;
      text-align: center;
      span {
        display: inline-block;
        font-size: 32px;
        color: rgba(255, 255, 255, 1);
      }
      b {
        display: inline-block;
        margin-left: 10px;
        font-size: 26px;
        color: rgba(255, 255, 255, 1);
      }
    }
    .concat {
      margin-right: 48px;
      &::before {
        content: "";
        display: block;
        width: 40px;
        height: 40px;
        margin: 0 auto;
        .bg("icons/service");
        margin-bottom: 11px;
      }
      span {
        display: block;
        font-size: 20px;
        color: rgba(65, 65, 65, 1);
        line-height: 28px;
      }
    }
  }
  .add-wrap,
  .play-wrap {
    display: block;
    width: 640px;
    height: 80px;
    line-height: 80px;
    text-align: center;
    background: linear-gradient(
      316deg,
      rgba(36, 121, 255, 1) 0%,
      rgba(46, 175, 255, 1) 100%
    );
    border-radius: 100px;
    margin: 0 auto;
    font-size: 32px;
    color: rgba(255, 255, 255, 1);
  }
}
</style>