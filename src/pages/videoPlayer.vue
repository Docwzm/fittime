<template>
  <div>
    <div class="video-wrap">
      <video id="my-video" width="100%" height="100%" class="video-js vjs-big-play-centered"></video>
    </div>
    <div class="intro vux-1px-b">
      <p class="title">健身燃脂舞</p>
      <span>第3次训练</span>
    </div>
    <div class="detail-wrap">
      <img src="">
    </div>
  </div>
</template>

<script>
import { getCourseDetail } from '@/api'
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
    this.getCourseDetail();
  },
  beforeDestroy() {
    QiniuPlayer.dispose("my-video"); //释放播放器实例
  },
  methods: {
    getCourseDetail(){
      // getCourseDetail({
      //   courseKey:'course_key_2018_11_08_001'
      // }).then(res => {
      //   let data = res.data;

        let options = {
          controls:true,
          // url:data.videoAddress,
          url:"http://og9dz2jqu.cvoda.com/Zmlyc3R2b2RiOm9jZWFucy0xLm1wNA==_q00000001.m3u8",
          type: "hls",
          preload: true,
          autoplay: false, // 如为 true，则视频将会自动播放
          poster: this.poster,
          // stretching:'letterbox'
        };
        this.player = new QiniuPlayer("my-video", options);
        this.watchPlayer();

      // })
    },
    //监听视频player 事件
    watchPlayer() {
      this.player.ready(() => {
        // this.player.aspectRatio("16:9", () => {});
        // console.log(this.player.duration)
        this.player.duration(1,player=>{
          console.log(player)
        })

        this.player.on("play", () => {
          // if (!this.playFlag) {
          //   _czc.push(["_trackEvent", "class_fitime_play", "点击", this.id]);
          // }
          // this.playFlag = true;
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

<style lang="less" scoped>
.video-wrap{
  height:400px;
}
.intro{
  padding:30px 0 30px 40px;
  .title{
    height:45px;
    font-size:32px;
    color:rgba(65,65,65,1);
    line-height:45px;
  }
  span{
    display: block;
    font-size:24px;
    color:rgba(182,182,182,1);
    line-height:33px;
  }
}
.detail-wrap{
  img{
    max-width: 100%;
    display: block;
  }
}
</style>