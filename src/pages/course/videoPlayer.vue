<template>
  <div class="player-wrap">
    <div class="wrap-video">
      <div class="video-wrap">
        <video id="my-video" class="video-js vjs-big-play-centered" playsinline="true"
          webkit-playsinline="true"></video>
      </div>
      <div class="mask" v-show="showMask"></div>
    </div>
    <div class="intro vux-1px-b">
      <p class="title">健身燃脂舞</p>
      <span>第3次训练</span>
    </div>
    <div class="detail-wrap">
      <img src="">
    </div>
    <confirm v-model="showConfirm" title="" cancel-text="重新观看" confirm-text="前往购买" @on-cancel="onCancel"
      @on-confirm="onConfirm">
      <p>试看结束</p>
    </confirm>
  </div>
</template>

<script>
import { Confirm } from "vux";
import { getCourseDetail } from "@/api";
import poster from "@/assets/images/poster.png";
import { setTimeout } from "timers";
export default {
  name: "videoPlayer",
  data() {
    return {
      player: null, //播放器实例
      playFlag: false,
      poster,
      free: false,
      showConfirm: false,
      duration: 2,
      showMask: false
    };
  },
  components: {
    Confirm
  },
  created() {
    this.getCourseDetail();
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose(); //释放播放器实例
    }
  },
  methods: {
    onCancel() {
      this.player.currentTime(0.1, player => {
        this.player.play();
      });
    },
    onConfirm() {
      this.$router.push("/course-detail");
    },
    getCourseDetail() {
      // getCourseDetail({
      //   courseKey:'course_key_2018_11_08_001'
      // }).then(res => {
      //   let data = res.data;

      let options = {
        controls: true,
        // url:data.videoAddress,
        url:
          "http://og9dz2jqu.cvoda.com/Zmlyc3R2b2RiOm9jZWFucy0xLm1wNA==_q00000001.m3u8",
        type: "hls",
        preload: "auto",
        autoplay: false, // 如为 true，则视频将会自动播放
        poster: this.poster
        // stretching:'letterbox'
      };
      this.player = new QiniuPlayer("my-video", options);
      this.watchPlayer();

      // })
    },
    //监听视频player 事件
    watchPlayer() {
      this.player.ready(() => {
        this.player.aspectRatio("16:9", () => {});

        this.player.on("loadedmetadata", () => {
          this.player.duration(this.duration);
        });

        // this.player.on('fullscreenchange',()=>{
        //   this.player.duration(this.duration)
        // })
        this.player.on("play", () => {
          if (!this.free) {
            this.player.duration(2, () => {
              // this.player.currentTime(1,);
            });

            // this.player.fullscreen(false);

            // this.showConfirm = true;
            // this.showMask = true;
            // this.player.duration(4,() => {
            //   alert('...')
            // })
            // this.isDuration = true
            // this.$vux.toast.text("试看结束,更多内容请购买课程后再观看", "middle");
          }
          // console.log(this.player.currentTime())
          // if (!this.playFlag) {
          //   _czc.push(["_trackEvent", "class_fitime_play", "点击", this.id]);
          // }
          // this.playFlag = true;
        });

        this.player.on("timeupdate", () => {
          // if(this.player.currentTime()>=this.duration){
          //   this.player.fullscreen(false);
          //   // this.player.controls(false,() => {
          //   // })
          //   this.$vux.toast.text("试看结束,更多内容请购买课程后再观看", "middle");
          //   this.player.pause();
          //   // this.showMask = true;
          // this.showConfirm = true;
          // }
          // if(this.player.isEnded()){
          //   this.$router.push('/course-share')
          // }
        });
      });
    }
  }
};
</script>

<style lang="less" scoped>
// .player-wrap{
//   padding-top:400px;
// }
.wrap-video {
  height: 400px;
  position: relative;
}
.video-wrap,
.mask {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  // .mask{
  //   position: absolute;
  //   left:0;
  //   top:0;
  //   right:0;
  //   bottom:0;
  //   background:rgba(0,0,0,1);
  //   z-index:99;
  // }
}
.mask {
  z-index: 99999 !important;
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