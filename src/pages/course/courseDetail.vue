<template>
  <div class="detail-wrap" v-if="course">
    <!-- 课程封面 -->
    <div class="top-img" ref="topImg">
      <img :src="course.coverImg" />
    </div>
    <!-- 课程信息 -->
    <div class="base-info">
      <p class="title">{{course.title}}</p>
      <div class="line-wrap">
        <span class="tag">{{ course.label }}</span>
        <span class="hot-count">{{ course.heat }}</span>
      </div>
    </div>

    <!-- 课程介绍与视频 -->
    <div class="tab-bar vux-1px-b">
      <p :class="slectedTab==1?'active':''" @click="slectedTab=1"><span>介绍</span></p>
      <p :class="slectedTab==2?'active':''" @click="slectedTab=2"><span>课程{{
          courseList.length?'('+courseList.length+')':'' }}<b v-if="course.type==1&&!isBuy&&haveTrySee">试看</b></span></p>
    </div>
    <div class="main-content">
      <div class="content-wrap">
        <!-- 介绍 -->
        <div class="intro" v-show="slectedTab==1">
          <p class="title" v-html="course.contentTitle"></p>
          <p class="content" v-html="course.content"></p>
          <div class="wrap-img" v-if="course.contentImg">
            <img :src="course.contentImg" />
            <div class="img-wrap">
              <p class="img-title">{{ course.imgContent[0] }}</p>
              <div v-for="(item,index) in course.imgContent" :key="index">
                <p class="mess" v-if="index!=0">{{ item }}</p>
              </div>
            </div>
          </div>
        </div>
        <!-- 课程 -->
        <div class="course-list" v-show="slectedTab==2">
          <ul>
            <li v-for="(item,index) in courseList" :key="index" :class="'vux-1px-b'+((course.type==1&&(!isBuy||course.lapse==1)&&!item.trySee)?' lock':'')"
              @click="gotoPlay(item)">
              <p class="mess">
                <span class="name">{{item.title}}</span>
                <span class="time" v-if="item.over">{{ item.videoTime }}分钟,已完成训练</span>
                <span class="time" v-if="!item.over">{{ item.videoTime }}分钟</span>
              </p>
              <p class="btn" v-if="course.type==1&&(!isBuy||course.lapse==1)&&item.trySee">免费试看</p>
            </li>
          </ul>
        </div>

        <div class="buy-tip" v-if="course.type==1&&!isBuy">
          <p>购买须知</p>
          <div>· 课程购买后在有效期内可无限次观看；由于此课程属于虚拟商品，一经购买后无法退款。</div>
          <div>· 如有相关疑问，请至微信公众号「乐心运动」发送“人工客服”进行咨询</div>
        </div>

        <div class="repay-tip" v-if="course.type==1&&isBuy">
          <p class="title">课程{{ course.lapse==1?'已过期':'已购买'}}</p>
          <p class="endtime">有效期至{{course.deadline | dateFilter}}</p>
          <div @click="gotoPay" class="repay-btn" v-if="course.lapse==1||course.isexpire==1">>>前往续费</div>
        </div>
      </div>
    </div>

    <!-- 底部操作按钮 -->
    <div :class="'footer'+(from=='share'?' share-footer':'')">
      <!-- 付费 -->
      <div v-if="course.type==1">
        <!-- 未购买 -->
        <div class="buy-wrap" v-if="!isBuy">
          <div class="not-buy">
            <div @click="gotoService" class="concat"><span>客服</span></div>
            <div @click="gotoPay" class="buy-btn">
              <span>购买课程</span>
              <b>(￥{{course.price}})</b>
            </div>
          </div>
        </div>
        <!-- 已购买 且过期 -->
        <div class="buy-wrap" v-else-if="course.lapse==1">
          <div class="lapse">
            已过期，请购买续费
          </div>
        </div>
        <!-- 已购买 未过期 未加入 -->
        <div class="add-wrap" v-else-if="!isAdd">
          <button @click="joinCourse">加入课程</button>
        </div>
        <!-- 已购买 未过期 已加入 -->
        <div class="play-wrap" v-else>
          <button @click="gotoPlay">开始训练</button>
        </div>
      </div>
      <div v-else>
        <!-- 免费 未加入 -->
        <div class="add-wrap" v-if="!isAdd">
          <button @click="joinCourse">加入课程</button>
        </div>
        <!-- 免费 已加入 -->
        <div class="play-wrap" v-else>
          <button @click="gotoPlay">开始训练</button>
        </div>
      </div>
    </div>

    <!-- 下载APP  仅供分享出去的页面 -->
    <div :class="'download-wrap'+(from=='share'?' share-download':'')">
      <div class="wrap">
        <img src="https://files.lifesense.com/other/20181029/c2b8c1bfd33140069d4cc3bc19b0f402.png">
        <div class="mess">
          <p class="title">乐心运动</p>
          <p>每一步都很重要</p>
        </div>
        <a href="http://a.app.qq.com/o/simple.jsp?pkgname=gz.lifesense.weidong">
          <p>下载APP</p>
          <span>动起来</span>
        </a>
      </div>
    </div>

    <div v-transfer-dom>
      <actionsheet v-model="showMenu" :menus="menus" @on-click-menu="menuClick" show-cancel></actionsheet>
    </div>
  </div>
</template>

<script>
import busEvent from "@/util/busEvent";
import { Actionsheet, TransferDom } from "vux"; //底部弹出框组件
import {
  LSJavascriptBridgeInit,
  navigationButtonsBridge,
  shareUrlBridge,
  navTitleBridge
} from "@/util/jsBridge";
import { getCourseDetail, joinCourse, delCourse } from "@/api/detail.js";
import { dateFormat } from "@/util/tool";

export default {
  name: "courseDetail",
  data() {
    return {
      from: "", // 页面来源 分享:share
      noAuth: true, //鉴权否 分享页面不许鉴权 且不可操作
      slectedTab: 1, //选中的tab 1:介绍 2:课程
      showMenu: false, //已添加课程显示删除弹出框标识
      menus: {
        delMenu: "结束课程" //导航栏按钮触发底层弹出框
      },
      courseId: "", //课程ID
      course: null, //课程详情数据
      haveTrySee: false, //是否有试看视频
      isAdd: false, //是否为已添加课程
      isBuy: false, //是否购买了
      courseList: [], //课程视频列表
      nextPlayId: "", //开始训练的视频Id
      nextPlayKey: "" //视频key
    };
  },
  components: {
    Actionsheet
  },
  directives: {
    TransferDom
  },
  filters: {
    dateFilter: value => {
      return dateFormat(value * 1000, "YYYY年MM月DD日");
    }
  },
  deactivated() {
    window.onscroll = null;
  },
  created() {
    this.courseId = this.$route.params.id;
    this.from = this.$route.query.from == "share" ? "share" : "app";
    if (!this.$route.meta.flush) {
      this.getCourseDetail(); //用户从app页面运动-健身tab直接进入
    }

    //播放完成后触发课程视频状态更新
    busEvent.$on("playDone", id => {
      this.courseList.map((item, index) => {
        if (item.id == id) {
          item.over = true;
        }
      });
    });

    // busEvent.$on("payDone", id => {
    //   if (id == this.courseId) {
    //     this.isBuy = true;
    //     this.slectedTab = 2;
    //   }
    // });
  },
  beforeRouteEnter(to, from, next) {
    to.meta.from = from.name;
    //因为当前页面用户路由缓存  需要判断从列表页进来和支付页面进来时刷新
    if (
      from.name == "courseList" ||
      from.name == "courseSpecial" ||
      from.name == "coursePayment"
    ) {
      to.meta.flush = true;
    } else {
      to.meta.flush = false;
    }
    next();
  },
  activated() {
    this.init();
    let from = this.$route.meta.from;

    //页面返回时不触发埋点事件
    if (
      from != "coursePayment" &&
      from != "videoPlayer" &&
      from != "systemService"
    ) {
      umTrigger(
        "newclass_class",
        "进入",
        "课程详情页_courseId_" + this.courseId
      );
    }
    if (this.from == "share") {
      //分享页面进入
      umTrigger(
        "newclass_share_class",
        "进入",
        "分享课程详情页_courseId_" + this.courseId
      );
    }

    if (this.$route.meta.flush) {
      this.getCourseDetail();
    }
  },
  methods: {
    init() {
      window.onscroll = () => {
        //滚动设置标题栏背景色
        let el = document.body || document.documentElement;
        if (el.scrollTop <= 240) {
          this.setNavigationBar({
            red: 38,
            green: 38,
            blue: 38,
            alpha: el.scrollTop
          });
        }
      };

      LSJavascriptBridgeInit(() => {
        this.noAuth = false; //app进入标识
        this.setNavigationBar({ red: 38, green: 38, blue: 38, alpha: 0 });
      });
    },
    setNavigationBar(color) {
      let title =
        this.$route.meta && this.$route.meta.title
          ? this.$route.meta.title
          : "";
      navTitleBridge({
        title,
        autoResetToDefaultConfigWhtenOpenLink: true,
        tintColorType: 1,
        backButtonType: 1,
        topPadding: 0,
        barLineHidden: true,
        color
      });
      this.setNavigationBarButtons();
    },
    //获取视频详情
    getCourseDetail() {
      let noAuth = this.from == "share" ? true : false;
      //根据页面来源 不同接口调用（鉴权与非鉴权）
      getCourseDetail({
        noAuth,
        curriculumId: this.courseId
      }).then(res => {
        let data = res.data;
        data.drillDtoList.sort((a, b) => {
          return a.indexes - b.indexes;
        }); //排序
        this.courseList = data.drillDtoList;
        this.courseList.map(item => {
          if (item.trySee == 1) {
            this.haveTrySee = true; //是否有试看视频
          }
        });

        let nextPlayIndex =
          data.userCurriculumDto && data.userCurriculumDto.doneNum
            ? data.userCurriculumDto.doneNum >= data.drillDtoList.length
              ? 0
              : data.userCurriculumDto.doneNum
            : 0; //下次播放的视频Index

        let finishIdArr = []; //已经播放完成的视频id
        if (data.userCurriculumDto && data.userCurriculumDto.accomplishDrill) {
          finishIdArr = data.userCurriculumDto.accomplishDrill.split(",");
        }
        this.courseList.map((item, index) => {
          finishIdArr.map(id => {
            if (id == item.id) {
              item.over = true; //已经播放完成的视频id over状态置为true
            }
          });
        });

        this.nextPlayId = this.courseList[nextPlayIndex].id; //下次播放的视频ID
        this.nextPlayKey = this.courseList[nextPlayIndex].videoKey; //下次播放的视频key
        let label = data.label.split(",").join(" . ");
        this.isBuy =
          data.userCurriculumDto && data.userCurriculumDto.type == 1
            ? true
            : false; //是否已经购买了
        this.isAdd =
          data.userCurriculumDto && data.userCurriculumDto.plan == 1
            ? true
            : false; //是否已经添加了
        this.slectedTab = this.isAdd ? 2 : 1; // 添加了默认选择课程tab
        this.course = {
          lapse: data.lapse, //0-未过期 1-过期
          isexpire: data.isexpire, //0-未快过期 1-快过期
          type: data.type, //0-免费 1-购买
          id: data.id,
          title: data.title, //课程标题
          price: data.price, //课程价格
          deadline: data.deadline, //课程期限
          label, //课程标签
          heat: data.heat, //课程热度
          coverImg: data.coverImg, //课程封面图
          contentTitle: data.contentTitle.replace(/(\n|\r)/g, "<br/>"), //课程介绍标题
          content: data.content.replace(/(\n|\r)/g, "<br/>"), //课程介绍正文
          contentImg: data.contentImg, //课程介绍图片
          imgContent: data.imgConten.replace(/(\n|\r)/g, "$").split("$") //课程介绍图片内容
        };
        this.setNavigationBarButtons(); //重新设置导航栏 因为导航栏有个按钮需要根据是否添加了该课程做判断
      });
    },
    //客服
    gotoService() {
      if (this.noAuth) {
        return;
      }
      this.$router.push("/system-service");
    },
    //支付
    gotoPay() {
      if (this.noAuth) {
        return;
      }
      this.$router.push("/course-payment/" + this.courseId);
    },
    //前往视频播放页面
    gotoPlay(data) {
      if (this.noAuth) {
        return;
      }
      let isAdd = this.isAdd ? 1 : 0;
      if (data.id) {
        //点击课程tab下的视频
        if (this.course.type == 1) {
          //付费课程 判断以下情况  购买  未购买：1、可试看 2、不可试看
          if (this.isBuy) {
            //已经购买了的
            this.$router.push(
              "/video-player/" +
                this.courseId +
                "/" +
                data.id +
                "?key=" +
                data.videoKey +
                "&isAdd=" +
                isAdd
            );
          } else {
            if (data.trySee) {
              //试看
              this.$router.push(
                "/video-player/" +
                  this.courseId +
                  "/" +
                  data.id +
                  "?key=" +
                  data.videoKey +
                  "&isAdd=" +
                  isAdd
              );
            } else {
              //不可试看
              this.$vux.toast.text("请购买课程后再查看内容", "middle");
            }
          }
        } else {
          // 免费课程
          this.$router.push(
            "/video-player/" +
              this.courseId +
              "/" +
              data.id +
              "?key=" +
              data.videoKey +
              "&isAdd=" +
              isAdd
          );
        }
      } else {
        //点击开始训练
        this.$router.push(
          "/video-player/" +
            this.courseId +
            "/" +
            this.nextPlayId +
            "?key=" +
            this.nextPlayKey +
            "&isAdd=" +
            isAdd
        );
      }
    },
    //加入课程
    joinCourse() {
      if (this.noAuth) {
        return;
      }
      joinCourse({
        curriculumId: this.courseId,
        deadline: this.course.deadline
      }).then(res => {
        this.isAdd = true;
        this.setNavigationBarButtons(); //重置顶部导航栏
        this.$forceUpdate(); //防止缓存不刷新
      });
    },
    //删除已加入课程
    menuClick(key, item) {
      if (key == "delMenu") {
        delCourse({
          curriculumId: this.courseId
        }).then(res => {
          this.isAdd = false;
          this.setNavigationBarButtons(); //重置顶部导航栏
          this.$forceUpdate(); //防止缓存不刷新
        });
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
              "/fittime/static/images/ic_more_black@3x.png",
            buttonId: "moreBtn", // 按钮唯一Id
            callbackHandlerName: "showMenuCall", // 事件回调函数名
            callback: this.showNavigationMenu //按钮的点击事件
          }
        ];
      }
      //分享导航按钮
      buttons.push({
        imageUrl:
          window.location.protocol +
          "//" +
          window.location.host +
          "/fittime/static/images/ic_share@3x.png",
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
      shareUrlBridge({
        title: "跟上我，一起练「" + this.course.title + "」。",
        url:
          location.origin +
          "/fittime/#/course-detail/" +
          this.courseId +
          "?from=share",
        imgUrl:
          "https://files.lifesense.com/other/20181029/c2b8c1bfd33140069d4cc3bc19b0f402.png",
        desc: "一共" + this.course.heat + "人在练。"
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
  // height: 430px;
  img {
    width: 100%;
    height: auto;
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
      span {
        color: rgba(74, 144, 226, 1);
      }
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
      right: -42px;
      top: -8px;
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

@supports (bottom: env(safe-area-inset-bottom)) {
  .main-content {
    padding-bottom: env(safe-area-inset-bottom);
  }
}

.content-wrap {
  padding-bottom: 60px;
  .intro {
    padding: 132px 40px 0;
    .bg("icons/quotation");
    background-size: 50px 50px;
    background-position: center 64px;
    .wrap-img {
      position: relative;
    }
    img {
      max-width: 100%;
      height: auto;
      display: block;
    }
    .title {
      text-align: center;
      font-size: 32px;
      color: rgba(65, 65, 65, 1);
      line-height: 50px;
      margin-bottom: 30px;
    }
    .content {
      text-align: center;
      font-size: 24px;
      color: rgba(155, 155, 155, 1);
      line-height: 36px;
      margin-bottom: 60px;
    }
    .img-wrap {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      background: rgba(0, 0, 0, 0.6);
      color: rgba(255, 255, 255, 1);
      text-align: center;
      padding-bottom: 32px;
      .img-title {
        text-align: center;
        height: 36px;
        font-size: 32px;
        line-height: 36px;
        margin: 39px 0 20px;
      }
      .mess {
        margin: 0 auto;
        font-size: 24px;
        line-height: 36px;
        opacity: 0.6;
      }
    }
  }
  .course-list {
    li {
      height: 130px;
      padding: 30px 30px 26px;
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
      width: 128px;
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
  margin: 60px 40px 0;
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
  margin-top: 70px;
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
  background: #fff;
  overflow: hidden;
  &.share-footer {
    display: none;
  }
  .buy-wrap {
    padding: 15px 0;
    padding-left: 50px;
    .not-buy {
      display: flex;
    }
    .lapse {
      text-align: center;
      width: 640px;
      height: 80px;
      line-height: 80px;
      background: linear-gradient(
        180deg,
        rgba(213, 238, 255, 1) 0%,
        rgba(166, 215, 255, 1) 100%
      );
      border-radius: 100px;
      font-size: 32px;
      color: rgba(255, 255, 255, 1);
    }
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
    padding: 15px 0;
    button {
      border: none;
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
}

.download-wrap {
  display: none;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 10;
  border-top: 2px solid #d9d9d9;
  background: #fff;
  font-size: 0;
  box-sizing: border-box;
  &.share-download {
    display: block;
  }
  .wrap {
    padding: 20px 30px 20px 40px;
  }
  img,
  .mess,
  a {
    display: inline-block;
    vertical-align: top;
  }
  img {
    width: 100px;
    height: 100px;
    margin-right: 20px;
  }
  .mess {
    p {
      color: #b7b7b7;
      font-size: 24px;
    }
    .title {
      color: #414141;
      font-size: 32px;
    }
  }
  a {
    float: right;
    background: #05aef0;
    width: 200px;
    height: 100px;
    border-radius: 8px;
    text-align: center;
    p {
      color: #ffffff;
      font-size: 30px;
      text-align: center;
      margin-top: 18px;
    }
    span {
      color: #a8e7ff;
      font-size: 20px;
      display: block;
      margin-top: 2px;
      text-align: center;
    }
  }
}

@supports (bottom: env(safe-area-inset-bottom)) {
  .footer,
  .download-wrap {
    padding-bottom: env(safe-area-inset-bottom);
  }
}
</style>