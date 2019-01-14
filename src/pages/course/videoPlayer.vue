<template>
  <div class="player-wrap">
    <div class="video-wrap">
      <video muted id="my-video" width="100%" height="100%" class="video-js vjs-big-play-centered"
        x-webkit-airplay="allow" webkit-playsinline="true" playsinline="true" x5-video-player-type=""
        x5-video-player-fullscreen="false" x5-video-orientation="landscape"></video>
    </div>
    <div class="intro vux-1px-b">
      <p class="title">{{ title }}</p>
      <span>第{{sortIndex}}次训练</span>
    </div>
    <div class="detail-wrap">
      <!-- <img src="../../assets/images/poster.png"> -->
    </div>
    <x-dialog class="netwrokDialog" v-model="showNetworkTip">
      <div>
        <div class="title">
          当前非Wi-Fi环境，是否继续播放
        </div>
        <div class="btn-wrap">
          <span @click="play">继续播放</span>
          <span @click="play(1)">继续播放，下次不再提醒</span>
          <span @click="cancelPlay">取消</span>
        </div>
      </div>
    </x-dialog>
    <x-dialog class="confirmDialog" v-model="showConfirmTip">
      <div>
        <p class="title">不再坚持一下吗?</p>
        <div class="btn-wrap">
          <span>退出训练</span>
          <span>继续训练</span>
        </div>
      </div>
    </x-dialog>
  </div>
</template>

<script>
import { setLocal, getLocal } from "@/util/localStorage";
import { XDialog } from "vux";
import {
  getCourseUrl,
  finishCourse,
  getVideoDetail,
  updateVideoTime
} from "@/api/detail";
import {
  LSJavascriptBridgeInit,
  navTitleBridge,
  getNetworkState,
  cancelWebview,
  setBackbuttonCallBack
} from "@/util/jsBridge";
import poster from "@/assets/images/poster.png";
export default {
  name: "videoPlayer",
  data() {
    return {
      curriculumId:'',//课程ID
      drillId:'',//视频ID
      videoKey: "",//视频key
      title:'',//视频title
      trySee: 0, //是否为非试看
      trySeeTime: 300, //试看时长
      showConfirmTip: false,
      showNetworkTip: false, //显示网络状态提示弹框标识
      isPlayed: false, //是否已经播放过
      player: null, //播放器实例
      playFlag: false,
      no_network: false,
      networkStatus: "" //网络环境状态
    };
  },
  components: {
    XDialog
  },
  created() {
    this.videoKey = this.$route.query.key;
    this.drillId = this.$route.params.id;

    let no_network_tip = getLocal("no_network_tip");
    if (no_network_tip) {
      this.no_network = true;
    }

    LSJavascriptBridgeInit(() => {
      //监听网络变化
      window.networkChange = status => {
        this.networkStatus = status; //0-未联网 1-wifi 2-手机网络
        if (!this.no_network) {
          //显示网络弹窗
          if (this.networkStatus != 1) {
            this.showNetworkTip = true;
          }
        }
      };

      window.webviewCancel = () => {};

      //设置返回监听
      setBackbuttonCallBack("webviewCancel");

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
        color: { red: 255, green: 255, blue: 255, alpha: 0 }
      });

      this.getCourseUrl();
      this.getVideoDetail();
    });
    this.getCourseUrl();
    this.getVideoDetail();
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose(); //页面卸载前 释放播放器实例
    }
  },
  methods: {
    play(type) {
      this.playerOnFlag = true;
      this.showNetworkTip = false;
      this.player.play();
      if (type == 1) {
        setLocal("no_network_tip", true);
      }
    },
    cancelPlay() {
      this.showNetworkTip = false;
    },
    getVideoDetail(){
      getVideoDetail({
        drillId:this.drillId
      }).then(res => {
        let data = res.data;
        this.trySeeTime = 2;
        this.trySee = data.trySee;
        this.curriculumId = data.curriculumId;
        this.duration = data.trySeeTime;
        this.title = data.title;
        this.sortIndex = data.indexes
      })
    },
    getCourseUrl() {
      getCourseUrl({
        courseKey: this.videoKey
      }).then(res => {
        let data = res.data;
        let options = {
          controls: true,
          url:data.videoAddress,
          // url:
          //   "http://og9dz2jqu.cvoda.com/Zmlyc3R2b2RiOm9jZWFucy0xLm1wNA==_q00000001.m3u8",
          type: "hls",
          preload: "auto",
          autoplay: false, // 如为 true，则视频将会自动播放
          poster
          // stretching:'panscan'
        };

        // getNetworkState("networkChange", status => {
        //   let no_network_tip = getLocal('no_network_tip')
        //   if(no_network_tip){
        //     //如果之前已经点击不再提醒 则直接退出webview
        //     cancelWebview()
        //     return ;
        //   }
        //   this.networkStatus = status; //0-未联网 1-wifi 2-手机网络
        //   if (this.networkStatus != 1) {
        //     //非wifi状态
        //     this.showNetworkTip = true;

        //   } else {
        //     this.player = new QiniuPlayer("my-video", options);
        //     this.watchPlayer();
        //   }
        // });

        this.player = new QiniuPlayer("my-video", options);
        this.watchPlayer();
      });
    },
    //监听视频player 事件
    watchPlayer() {
      this.player.ready(player => {
        this.player.aspectRatio("16:9", () => {});
        // this.player.on("loadedmetadata", () => {
        //   this.player.duration(this.duration);
        // });

        // this.player.on('fullscreenchange',()=>{
        //   this.player.duration(this.duration)
        // })

        this.player.on("play", () => {
          if (!this.no_network) {
            //需要网络验证
            if (!this.playerOnFlag && this.networkStatus != 1) {
              this.player.controls(false); //隐藏控制条 （ios退出全屏时会显示另一个控制条）
              this.player.fullscreen(false); //退出全屏 （全屏播放时，toast看不到）
              this.player.pause(); //暂停播放
              this.showNetworkTip = true;
            }
          }
          // if (!this.playFlag) {
          //   _czc.push(["_trackEvent", "class_fitime_play", "点击", this.id]);
          // }
          // this.playFlag = true;
        });

        //进度条拖动的时候
        this.player.on("seeking", () => {
          //试看视频 判断是否超过试看时长 是：改变当前播放时间为0
          if (
            this.trySee==1 &&
            Math.round(this.player.currentTime()) >= this.duration
          ) {
            this.player.currentTime(0);
          }
        });

        //进度条拖动结束时
        this.player.on("seeked", () => {
          //试看视频 判断是否超过试看时长 是：改变当前播放时间为0
          if (
            this.trySee==1 &&
            Math.round(this.player.currentTime()) >= this.duration
          ) {
            this.player.currentTime(0);
          }
        });

        //正在播放
        this.player.on("timeupdate", () => {
          if (this.networkStatus != 1) {
            //   //非wifi状态
            //   this.player.controls(false);//隐藏控制条 （ios退出全屏时会显示另一个控制条）
            //   this.player.fullscreen(false);//退出全屏 （全屏播放时，toast看不到）
            //   this.player.pause();//暂停播放
            //   // this.$vux.toast.text("wifi", "middle");
            //   this.showNetworkTip = true;
          }
          //试看视频 判断是否超过试看时长
          if (
            this.trySee==1 &&
            Math.round(this.player.currentTime()) > this.duration
          ) {
            this.player.controls(false); //隐藏控制条 （ios退出全屏时会显示另一个控制条）
            this.player.fullscreen(false); //退出全屏 （全屏播放时，toast看不到）
            this.player.pause(); //暂停播放
            this.player.currentTime(0); //设置当前播放时间为0
            this.$vux.toast.text(
              "试看结束,更多内容请购买课程后再观看",
              "middle"
            );
          }
          //非试看视屏 视频观看结束后 跳转视频分享页面
          if (this.trySee!=1 && this.player.isEnded()) {
            finishCourse({
              curriculumId:this.curriculumId,
              drillId:this.drillId
            }).then(res => {
              this.$router.push("/course-share");
            })//完成训练
          }
        });
      });
    }
  }
};
</script>

<style lang="less" scoped>
.netwrokDialog {
  .title {
    padding: 48px 64px !important;
  }
  .btn-wrap {
    display: block !important;
    span {
      display: block !important;
      border-top: 1px solid #b6b6b6;
      &:first-child {
        border-top: none;
      }
    }
  }
}
.confirmDialog,
.netwrokDialog {
  .title {
    padding: 80px 64px;
    font-size: 36px;
    color: rgba(65, 65, 65, 1);
    line-height: 50px;
  }
  .btn-wrap {
    border-top: 1px solid #b6b6b6;
    display: flex;
    span {
      flex: 1;
      text-align: center;
      display: block;
      height: 100px;
      line-height: 100px;
      font-size: 36px;
      color: #1eabe1;
      border-right: 1px solid #b6b6b6;
      border-top: 1px solid #b6b6b6;
    }
  }
}
.video-wrap {
  height: 422px;
  position: relative;
  overflow: hidden;
  #my-video {
    width: 100%;
    height: 100%;
  }
}

.intro {
  padding: 30px 0 30px 40px;
  .title {
    height: 45px;
    font-size: 32px;
    color: rgba(65, 65, 65, 1);
    line-height: 45px;
  }
  span {
    display: block;
    font-size: 24px;
    color: rgba(182, 182, 182, 1);
    line-height: 33px;
  }
}
.detail-wrap {
  img {
    max-width: 100%;
    display: block;
  }
}
</style>