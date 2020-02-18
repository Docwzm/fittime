<template>
  <div class="player-wrap">
    <!-- 视频播放区域 -->
    <div class="video-wrap">
      <video
        ref="myVideo"
        id="my-video"
        class="video-js vjs-big-play-centered"
        webkit-playsinline="true"
        playsinline="true"
      ></video>
      <!-- <div class="poster-wrap" v-if="posterFlag">
        <img :src="poster" />
        <span @click.passive="play(0)"></span>
      </div>-->
    </div>
    <!-- 视频信息 -->
    <div class="intro vux-1px-b" @click="handletest">
      <p class="title">{{ title }}</p>
      <span>第{{sortIndex}}次训练</span>
    </div>
    <!-- 注意事项 -->
    <div class="detail-wrap">
      <p class="title">训练注意事项</p>
      <div class="tip-mess">
        <p>1·所有的动作要领视频里都有详细的讲解，建议认真听教练的讲解、跟随教练练习，尽量跟上视频节奏。</p>
        <p>2·训练中配合正确的呼吸方式，不要憋气，训练效果会更好。</p>
        <p>3·刚开始训练时，局部肌肉酸痛属于正常情况，几次训练之后，这样的情况就会得到缓解。</p>
        <p>4·每次训练完成进行10分钟的拉伸，可以缓解肌肉酸痛。</p>
      </div>
    </div>
    <!-- 网络状态弹窗 -->
    <div v-transfer-dom>
      <x-dialog class="netwrokDialog" v-model="showNetworkTip">
        <div>
          <div class="title">当前非Wi-Fi环境，是否继续播放</div>
          <div class="btn-wrap">
            <span @click="play">继续播放</span>
            <span @click="play(1)">继续播放，下次不再提醒</span>
            <span @click="cancelPlay">取消</span>
          </div>
        </div>
      </x-dialog>
    </div>
    <!-- 返回键弹窗 -->
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
  setBackbuttonCallBack,
  hideCustomView
} from "@/util/jsBridge";
// import {getPlatform} from '@/util/tool';
export default {
  name: "videoPlayer",
  data() {
    return {
      networkCheck: true, //是否需要检查网络
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
      showConfirmTip: false, //显示返回键弹窗标识
      showNetworkTip: false, //显示网络状态提示弹框标识
      isPlayed: false, //是否已经播放过
      player: null, //播放器实例
      playFlag: false, //播放器第一次播放标识
      no_network: false, //网络判断是否已忽略 判断本地localStorage
      networkStatus: "" //网络环境状态
    };
  },
  components: {
    XDialog
  },
  directives: {
    TransferDom
  },
  beforeRouteEnter(to, from, next) {
    if (from.name == "courseDetail") {
      to.meta.haveStack = true;
    }
    next();
  },
  mounted() {
    this.videoKey = this.$route.query.key; //视频key
    this.isAdd = this.$route.query.isAdd; //视频是否添加了
    this.curriculumId = this.$route.params.courseId; //课程ID
    this.drillId = this.$route.params.drillId; //视频ID

    let no_network_tip = getLocal("no_network_tip"); //localStorage 网络状态忽略标识
    if (no_network_tip) {
      this.no_network = true; //如果有 则忽略网络状态的判断
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

    // this.getCourseUrl(); //视频链接
    this.getVideoDetail(); //视频详情
  },
  beforeDestroy() {
    setBackbuttonCallBack("", () => {}); //页面销毁前 删除返回键监听
    if (this.player) {
      this.player.dispose(); //页面卸载前 释放播放器实例
    }
  },
  methods: {
    handletest() {
      // var vConsole = new VConsole();
      console.log("...test");
    },
    //监听返回键-app回调事件
    webviewCancel() {
      if (this.playFlag) {
        //如果视频已经播放过了 返回则弹窗提醒 并暂停播放
        this.showConfirmTip = true;
        this.player.exitFullscreen();
        this.player.pause();
      } else {
        //否则返回上一页
        if (this.$route.meta.haveStack) {
          this.$router.back(-1);
        } else {
          cancelWebview();
        }
        // this.$router.replace('/course-detail/'+this.curriculumId)
      }
    },
    //监听网络状态-app回调事件（ios只能监听数据网络切换 不能监听wifi切换）
    networkChange(status) {
      this.networkStatus = status; //0-未联网 1-wifi 2-手机网络
      //网络状态非忽略（未点击过继续播放，不再提醒或清空过app数据）
      if (!this.no_network) {
        //如果之前点击了继续播放，则在当前页面销毁前都无需判断网络状态 否则如果切换数据网络则弹窗提示
        if (this.networkCheck && this.networkStatus != 1) {
          this.player.exitFullscreen();
          this.player.pause();
          this.showNetworkTip = true;
        }
      }
    },
    //退出训练
    cancelWebview() {
      if (this.$route.meta.haveStack) {
        this.$router.back(-1);
      } else {
        cancelWebview();
      }
    },
    //继续训练
    goOnPlay() {
      this.showConfirmTip = false;
      this.player.play();
    },
    //开始播放 type:0 第一次点击播放
    play(type) {
      console.log("....play");
      if (type == 0) {
        // 视频播放-埋点
        // umTrigger(
        //   "newclass_classtraining_play",
        //   "点击",
        //   "视频播放页_courseId_" +
        //     this.curriculumId +
        //     "_drillId_" +
        //     this.drillId
        // );
        // //开始播放前需要网络验证（非网络忽略状态）
        // if (!this.no_network) {
        //   // this.player.play();
        //   // this.posterFlag = false;
        //   console.log(".../networkChange");
        //   LSJavascriptBridgeInit(() => {
        //     getNetworkState("networkChange", this.networkChange, status => {
        //       console.log(".../networkChange done");
        //       this.networkStatus = status; //0-未联网 1-wifi 2-手机网络
        //       //数据网络 则显示弹窗
        //       if (this.networkStatus != 1 && this.networkStatus != null) {
        //         this.showNetworkTip = true;
        //       } else {
        //         this.posterFlag = false;
        //         this.player.play();
        //       }
        //     });
        //   });
        // } else {
        //   // 忽略网络状态 则直接开始播放
        //   this.posterFlag = false;
        //   this.player.play();
        // }
      } else {
        //其他播放 继续训练/继续播放/继续播放，下次不再提醒
        this.showNetworkTip = false;
        this.posterFlag = false;
        this.player.play();
        this.networkCheck = false;
        //不再提醒 忽略网络状态判断
        if (type == 1) {
          setLocal("no_network_tip", true);
          this.no_network = true;
        }
      }
    },
    //取消播放
    cancelPlay() {
      this.showNetworkTip = false;
    },
    //视频详情
    getVideoDetail() {
      getVideoDetail({
        drillId: this.drillId
      }).then(res => {
        let data = res.data;
        this.trySee = data.trySee; //是否试看
        this.duration = data.trySeeTime * 60; //试看时长 分钟
        this.title = data.title; //视频title
        this.sortIndex = data.indexes; //视频序列数
        this.videoTime = data.videoTime; //视频时长
        this.curriculumName = data.curriculumName; //课程名称
        this.poster = data.coverImg; //视频课程封面
        // this.loadFlag += 1; //可播放标识 需等视频元数据加载完毕后方可播放
        // if (this.loadFlag == 2) {
        //   this.posterFlag = true;
        // }
        this.getCourseUrl();
      });
    },
    // 视频链接
    getCourseUrl() {
      getCourseUrl({
        courseKey: this.videoKey
      }).then(res => {
        let data = res.data;
        this.player = videojs("my-video", {
          controls: true,
          aspectRatio: "16:9", //视频比例
          sources: [
            {
              src: data.videoAddress, //视频地址
              // src:
              //   "http://og9dz2jqu.cvoda.com/Zmlyc3R2b2RiOm9jZWFucy0xLm1wNA==_q00000001.m3u8",
              type: "application/x-mpegURL" //m3u8格式
            }
          ],
          poster: this.poster,
          type: "hls", //流文件
          preload: "auto", //预加载
          autoplay: false, // 如为 true，则视频将会自动播放
          html5: {
            nativeControlsForTouch: false,
            nativeVideoTracks: false,
            nativeTextTracks: false,
            nativeAudioTracks: false
          },
          //控制条组件
          controlBar: {
            volumePanel: false //声音
            // playToggle: false,//播放
            // fullscreenToggle:false//全屏
          }
        });

        //监听视频
        this.watchPlayer();
      });
    },
    //监听视频player 事件
    watchPlayer() {
      this.player.ready(player => {
        // let element = this.$refs.myVideo;
        //获取视频播放按钮 播放时隐藏 暂停时显示（刚开始的时候按钮是隐藏的）
        let el_button_play = document.getElementsByClassName(
          "vjs-big-play-button"
        )[0];

        this.player.on("loadedmetadata", () => {
          //视频元数据加载完成 可以播放了
          // this.loadFlag += 1;
          // if (this.loadFlag == 2) {
          this.posterFlag = true;
          // }
        });

        this.player.on("pause", () => {
          //暂停
          el_button_play.style.display = "block";
          this.checkNetWork = true;
        });

        this.player.on("play", () => {
          // this.player.requestFullscreen();//部分安卓机型不兼容 会导致整个webview退出
          el_button_play.style.display = "none";

          //第一次播放
          if (!this.playFlag) {
            this.playFlag = true;
            //如果为已加入的课程 播放需要更新状态
            if (this.isAdd == 1) {
              updateVideoTime({
                curriculumId: this.curriculumId
              });
            }
console.log('..../start')
            //设置返回监听
            LSJavascriptBridgeInit(() => {
              setBackbuttonCallBack("webviewCancel", this.webviewCancel);
            });

            // 视频播放-埋点
            umTrigger(
              "newclass_classtraining_play",
              "点击",
              "视频播放页_courseId_" +
                this.curriculumId +
                "_drillId_" +
                this.drillId
            );
            console.log('../dddd')
            //开始播放前需要网络验证（非网络忽略状态）
            if (!this.no_network) {
              // this.player.play();
              // this.posterFlag = false;
              console.log('...//go')
              LSJavascriptBridgeInit(() => {
                getNetworkState("networkChange", this.networkChange, status => {
                  this.networkStatus = status; //0-未联网 1-wifi 2-手机网络
                  //数据网络 则显示弹窗
                  console.log("network.....", status);
                  if (this.networkStatus != 1 && this.networkStatus != null) {
                    this.player.pause();
                    this.player.exitFullscreen();
                    this.showNetworkTip = true;
                  } else {
                    this.posterFlag = false;
                    // this.player.play();
                  }
                });
              });
            } else {
              // 忽略网络状态 则直接开始播放
              this.posterFlag = false;
              // this.player.play();
            }
          }

          // 每次播放的时候进行网络验证
          if (this.networkCheck) {
            if (this.checkNetWork && this.networkStatus != 1) {
              this.player.pause();
              this.player.exitFullscreen();
              this.showNetworkTip = true;
            }
          }
          this.checkNetWork = false;
        });

        let trySeeGo = () => {
          //试看视频 判断是否超过试看时长 是：改变当前播放时间为0
          if (
            this.trySee == 1 &&
            Math.round(this.player.currentTime()) > this.duration
          ) {
            this.player.controls(false); //ios自动退出全屏时 控制条重复显示 需去除控制条
            this.player.exitFullscreen(); //ios退出全屏
            if (window.orientation != 0 || window.orientation != 180) {
              hideCustomView(); //兼容android退出全屏
            }
            this.player.pause(); //暂停播放
            this.player.currentTime(0); //设置当前播放时间为0
            this.$vux.toast.text(
              "试看结束,更多内容请购买课程后再观看",
              "middle"
            );
          }
        };
        //进度条拖动
        this.player.on("seeking", trySeeGo);
        //进度条拖动结束
        this.player.on("seeked", trySeeGo);
        //正在播放
        this.player.on("timeupdate", trySeeGo);

        this.player.on("ended", () => {
          // 视频播放完成-埋点
          umTrigger(
            "newclass_classtraining_playover",
            "播放完成",
            "视频播放页_courseId_" +
              this.curriculumId +
              "_drillId_" +
              this.drillId
          );
          //非试看视屏 视频观看结束后 跳转视频分享页面
          if (this.trySee != 1) {
            //完成训练
            this.player.exitFullscreen();
            if (window.orientation != 0 && window.orientation != 180) {
              hideCustomView(); //兼容android退出全屏
            }
            //已加入的课程 需要更新状态
            if (this.isAdd == 1) {
              finishCourse({
                curriculumId: this.curriculumId,
                drillId: this.drillId
              })
                .then(res => {
                  busEvent.$emit("playDone", this.drillId); //触发播放完成
                  this.$router.push(
                    "/course-share/" +
                      this.videoTime +
                      "/" +
                      this.curriculumName
                  );
                })
                .catch(err => {
                  this.$vux.toast.text(err.msg, "middle");
                });
            } else {
              busEvent.$emit("playDone", this.drillId);
              this.$router.push(
                "/course-share/" + this.videoTime + "/" + this.curriculumName
              );
            }
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
  display: block;
}
.vjs-poster {
  background-size: 100% 100%;
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
  padding: 80px 40px 0;
  .title {
    height: 36px;
    font-size: 28px;
    color: rgba(65, 65, 65, 1);
    line-height: 36px;
    margin-bottom: 30px;
  }
  .tip-mess {
    p {
      font-size: 24px;
      color: rgba(155, 155, 155, 1);
      line-height: 36px;
    }
  }
}
</style>