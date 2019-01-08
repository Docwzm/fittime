<template>
  <div>
    <div class="video-wrap">
      <video id="my-video" width="100%" height="100%" class="video-js vjs-big-play-centered"></video>
    </div>
    <div class="intro">
      <p class="title">健身燃脂舞</p>
      <span>第3次训练</span>
    </div>
    <div class="detail-wrap">
      <img src="">
    </div>
  </div>
</template>

<script>
import poster from '@/assets/images/poster.png'
export default {
  name: "videoPlayer",
  data() {
    return {
      player: null, //播放器实例
      playFlag: false,
      poster
    };
  },

  created() {
    let options = {
      controls: true,
      url:"http://og9dz2jqu.cvoda.com/Zmlyc3R2b2RiOm9jZWFucy0xLm1wNA==_q00000001.m3u8",
      type: "hls",
      preload: true,
      autoplay: false, // 如为 true，则视频将会自动播放
      poster: this.poster,
      stretching:'letterbox'
    };
    this.player = new QiniuPlayer("my-video", options);
    this.watchPlayer();
  },
  beforeDestroy() {
    QiniuPlayer.dispose("my-video"); //释放播放器实例
  },
  methods: {
    //监听视频player 事件
    watchPlayer() {
      this.player.ready(() => {
        // this.player.aspectRatio("16:9", () => {});
        this.player.on("play", () => {
          if (!this.playFlag) {
            _czc.push(["_trackEvent", "class_fitime_play", "点击", this.id]);
          }
          this.playFlag = true;
          //播放 隐藏视频简介
          this.isPlay = true;
        });
        this.player.on("ended", () => {
          // 播放结束需要跳到分享页面
          
        });
      });
    },
    //开始播放
    play() {
      this.player.ready(() => {
        //暂停之后开始播放---视频结束默认暂停
        this.player.fullscreen(true);
        //安卓全屏播放时需手动触发视频中的播放按钮（待解决。）
        if (this.player.isPaused()) {
          this.player.play();
        }
      });
    }
  }
};
</script>

<style lang="less">
.video-wrap{
  height:400px;
}
</style>