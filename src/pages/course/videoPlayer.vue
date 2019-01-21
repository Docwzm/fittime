<template>
  <div class="player-wrap">
    <div class="video-wrap">
      <video ref="myVideo" id="my-video" width="100%" height="100%" class="video-js vjs-big-play-centered"
        webkit-playsinline="true" playsinline="true" x-webkit-airplay="allow" x5-video-player-type="h5"
        x5-video-player-fullscreen="true" x5-video-orientation="landscape" style="object-fit:fill"></video>
      <div class="poster-wrap" v-if="posterFlag">
        <img :src="poster">
        <span @click="play(0)"></span>
      </div>
    </div>
    <div class="intro vux-1px-b">
      <p class="title" @click="test1">{{ title }}</p>
      <span @click="test2">第{{sortIndex}}次训练</span>
    </div>
    <div class="detail-wrap">
      <!-- <img src="../../assets/images/poster.png"> -->
    </div>
    <div v-transfer-dom>
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
    </div>
    <div v-transfer-dom>
      <x-dialog class="confirmDialog" v-model="showConfirmTip">
        <div>
          <p class="title">不再坚持一下吗?</p>
          <div class="btn-wrap">
            <span @click="cancelWebview">退出训练</span>
            <span @click="goOnPlay">继续训练</span>
          </div>
        </div>
      </x-dialog>
    </div>
  </div>
</template>

<script>
import busEvent from "@/util/busEvent";
import { setLocal, getLocal } from "@/util/localStorage";
import { XDialog, TransferDom } from "vux";
import {
  getCourseUrl,
  finishCourse,
  getVideoDetail,
  updateVideoTime
} from "@/api/detail.js";
import {
  LSJavascriptBridgeInit,
  navTitleBridge,
  getNetworkState,
  cancelWebview,
  setBackbuttonCallBack
} from "@/util/jsBridge";
export default {
  name: "videoPlayer",
  data() {
    return {
      poster: "", //课程封面图
      loadFlag: 0, //视频是否可播放标识 2-是
      posterFlag: false, //
      sortIndex: "", //
      curriculumId: "", //课程ID
      drillId: "", //视频ID
      videoKey: "", //视频key
      title: "", //视频title
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
  directives: {
    TransferDom
  },
  beforeDestroy(){
    window.onresize = null;
  },
  mounted() {
    this.videoKey = this.$route.query.key;
    this.curriculumId = this.$route.params.courseId;
    this.drillId = this.$route.params.drillId;

    let no_network_tip = getLocal("no_network_tip");
    if (no_network_tip) {
      this.no_network = true;
    }
    LSJavascriptBridgeInit(() => {
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
    });

    this.getCourseUrl();
    this.getVideoDetail();
  },
  beforeDestroy() {
    setBackbuttonCallBack("", () => {}); //页面销毁时删除返回键监听
    if (this.player) {
      this.player.dispose(); //页面卸载前 释放播放器实例
    }
  },
  methods: {
    test1() {
      getNetworkState("networkChange", this.networkChange, status => {
        alert(status);
      });
    },
    test2() {
      getVideoDetail({
        drillId: this.drillId
      }).then(res => {
        alert(JSON.stringify(res));
      });
    },
    webviewCancel() {
      if (this.playFlag) {
        this.showConfirmTip = true;
        this.player.exitFullscreen();
        this.player.pause();
      } else {
        this.$router.back(-1);
      }
    },
    networkChange(status) {
      this.networkStatus = status; //0-未联网 1-wifi 2-手机网络
      if (!this.no_network) {
        //显示网络弹窗
        if (this.networkStatus != 1) {
          this.player.exitFullscreen();
          this.player.pause();
          this.showNetworkTip = true;
        }
      }
    },
    cancelWebview() {
      this.$router.back(-1);
    },
    goOnPlay() {
      this.showConfirmTip = false;
      this.player.play();
    },
    play(type) {
      if (type == 0) {
        this.posterFlag = false;
        if (!this.no_network) {
          //需要网络验证
          // this.player.play();
          getNetworkState("networkChange", this.networkChange, status => {
            this.networkStatus = status; //0-未联网 1-wifi 2-手机网络
            //显示网络弹窗
            if (this.networkStatus != 1) {
              this.showNetworkTip = true;
            } else {
              this.player.play();
            }
          });
        } else {
          this.player.play();
        }
      } else {
        this.showNetworkTip = false;
        this.player.play();
        if (type == 1) {
          setLocal("no_network_tip", true);
          this.no_network = true;
        }
      }
    },
    cancelPlay() {
      this.showNetworkTip = false;
    },
    getVideoDetail() {
      getVideoDetail({
        drillId: this.drillId
      }).then(res => {
        let data = res.data;
        this.trySee = data.trySee;
        this.duration = data.trySeeTime;
        this.title = data.title;
        this.sortIndex = data.indexes;
        this.videoTime = data.videoTime;
        this.curriculumName = data.curriculumName;
        this.poster = data.coverImg;
        this.loadFlag += 1;
        if (this.loadFlag == 2) {
          this.posterFlag = true;
        }
      });
    },
    getCourseUrl() {
      getCourseUrl({
        courseKey: this.videoKey
      }).then(res => {
        let data = res.data;
        this.videoUrl = data.videoAddress;
        this.player = videojs("my-video", {
          controls: true,
          aspectRatio: "16:9",
          sources: [
            {
              // src: data.videoAddress,
              src:'http://og9dz2jqu.cvoda.com/Zmlyc3R2b2RiOm9jZWFucy0xLm1wNA==_q00000001.m3u8',
              type: "application/x-mpegURL"
            }
          ],
          type: "hls",
          preload: "auto",
          autoplay: false, // 如为 true，则视频将会自动播放
          html5: {
            nativeControlsForTouch: false,
            nativeVideoTracks: false,
            nativeTextTracks: false,
            nativeAudioTracks: false
          },
          controlBar: {
            volumePanel: false,
            playToggle: false
          }
        });
        this.watchPlayer();
      });
    },
    //监听视频player 事件
    watchPlayer() {
      this.player.ready(player => {
        this.player.on("loadedmetadata", () => {
          this.loadFlag += 1;
          if (this.loadFlag == 2) {
            this.posterFlag = true;
          }
        });

        // this.player.on("fullscreenchange", () => {
        //   if (this.player.isFullscreen()) {
        //     // this.player.play();
        //   } else {
        //   }
        // });

        this.player.on("play", () => {
          if (!this.playFlag) {
            this.playFlag = true;
            updateVideoTime({
              curriculumId: this.curriculumId
            });
            //设置返回监听
            setBackbuttonCallBack("webviewCancel", this.webviewCancel);
          }
        });

        //进度条拖动的时候
        this.player.on("seeking", () => {
          //试看视频 判断是否超过试看时长 是：改变当前播放时间为0
          if (
            this.trySee == 1 &&
            Math.round(this.player.currentTime()) > this.duration
          ) {
            this.player.currentTime(0);
          }
        });

        //进度条拖动结束时
        this.player.on("seeked", () => {
          //试看视频 判断是否超过试看时长 是：改变当前播放时间为0
          if (
            this.trySee == 1 &&
            Math.round(this.player.currentTime()) > this.duration
          ) {
            this.player.currentTime(0);
          }
        });

        this.player.on("ended", () => {
          //非试看视屏 视频观看结束后 跳转视频分享页面
          if (this.trySee != 1) {
            //完成训练
            finishCourse({
              curriculumId: this.curriculumId,
              drillId: this.drillId
            })
              .then(res => {
                busEvent.$emit("playDone", this.drillId);
                this.$router.push(
                  "/course-share/" + this.videoTime + "/" + this.curriculumName
                );
              })
              .catch(err => {
                this.$vux.toast.text(err.msg, "middle");
              });
          }
        });

        //正在播放
        this.player.on("timeupdate", () => {
          //试看视频 判断是否超过试看时长
          if (
            this.trySee == 1 &&
            Math.round(this.player.currentTime()) > this.duration
          ) {
            // this.player.controls(false); //隐藏控制条 （ios退出全屏时会显示另一个控制条）
            this.player.exitFullscreen();
            this.player.pause(); //暂停播放
            // this.player.currentTime(0); //设置当前播放时间为0
            this.$vux.toast.text(
              "试看结束,更多内容请购买课程后再观看",
              "middle"
            );
          }
        });
      });
    }
  }
};
</script>

<style lang="less">
@import "../../assets/styles/mixin";
.video-js .vjs-big-play-button {
  .bg("icons/play");
  width: 96px;
  height: 96px;
}
</style>
<style lang="less" scoped>
@import "../../assets/styles/mixin";
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
  .poster-wrap {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 99;
    span {
      .bg("icons/play");
      width: 96px;
      height: 96px;
      display: block;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
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