<template>
  <div class="player-wrap">
    <div class="video-wrap">
      <video muted id="my-video" width="100%" height="100%" class="video-js vjs-big-play-centered" x-webkit-airplay="allow" webkit-playsinline="true" playsinline="true" x5-video-player-type="" x5-video-player-fullscreen="false" x5-video-orientation="landscape"></video>
    </div>
    <div class="intro vux-1px-b">
      <p class="title">健身燃脂舞</p>
      <span>第3次训练</span>
    </div>
    <div class="detail-wrap">
      <img src="../../assets/images/poster.png">
    </div>

    <!-- <actionsheet
      v-model="showNetworkTip"
      :menus="menu7"
      theme="android">
    </actionsheet> -->
  </div>
</template>

<script>
import { getCourseDetail,setCourseDone } from "@/api";
import { LSJavascriptBridgeInit,navTitleBridge, getNetworkState } from '@/util/jsBridge';
import poster from "@/assets/images/poster.png";
export default {
  name: "videoPlayer",
  data() {
    return {
      // menu7: {
      //   menu1: '北京烤鸭',
      //   menu2: '陕西油泼面',
      //   menu3: '西安肉夹馍'
      // },
      // showNetworkTip:true,//显示网络状态提示弹框标识
      isPlayed:false,//是否已经播放过
      player: null, //播放器实例
      playFlag: false,
      free: true,//是否为非试看
      duration: 2,//试看时长
      networkStatus:''//网络环境状态
    };
  },
  created() {
    window.networkChange = (status) => {
      this.networkStatus = status //0-未联网 1-wifi 2-手机网络
      alert(status)
    }

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
    });
    this.getCourseDetail();
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose(); //页面卸载前 释放播放器实例
    }
  },
  methods: {
    getCourseDetail() {
      // getCourseDetail({
      //   courseKey:'course_key_2018_11_08_001'
      // }).then(res => {
      //   let data = res.data;
      let options = {
        controls: true,
        // url:data.videoAddress,
        url: "http://og9dz2jqu.cvoda.com/Zmlyc3R2b2RiOm9jZWFucy0xLm1wNA==_q00000001.m3u8",
        type: "hls",
        preload: "auto",
        autoplay: false, // 如为 true，则视频将会自动播放
        poster
        // stretching:'panscan'
      };

      getNetworkState('networkChange',status => {
        this.networkStatus = status //0-未联网 1-wifi 2-手机网络
        alert(status)
        if(this.networkStatus!=1){
          //非wifi状态
        }else{
          this.player = new QiniuPlayer("my-video", options);
          this.watchPlayer();
        }
      })

      // this.player = new QiniuPlayer("my-video", options);
      // this.watchPlayer();

      // })
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
          // if(!this.isPlayed){
            // this.player.pause();
            // this.player.play();
            // this.isPlayed = true;//第一次点击的时候需要触发获取网络状态 
            // getNetworkState(changeStatus => {
            //   //网络环境改变时候调用
            //   this.networkStatus = changeStatus;
            // },status => {
            //   this.networkStatus = status //0-未联网 1-wifi 2-手机网络
            // })
          // }
          if (!this.free) {
            
          }
          // if (!this.playFlag) {
          //   _czc.push(["_trackEvent", "class_fitime_play", "点击", this.id]);
          // }
          // this.playFlag = true;
        });

        //进度条拖动的时候
        this.player.on('seeking',() => {
          //试看视频 判断是否超过试看时长 是：改变当前播放时间为0
          if (!this.free&&Math.round(this.player.currentTime()) >= this.duration) {
            this.player.currentTime(0)
          }
        })

        //进度条拖动结束时
        this.player.on('seeked',() => {
          //试看视频 判断是否超过试看时长 是：改变当前播放时间为0
          if (!this.free&&Math.round(this.player.currentTime()) >= this.duration) {
            this.player.currentTime(0)
          }
        })
        
        //正在播放
        this.player.on("timeupdate", () => {
          if(this.networkStatus!=1){
          //   //非wifi状态
          //   this.player.controls(false);//隐藏控制条 （ios退出全屏时会显示另一个控制条）
          //   this.player.fullscreen(false);//退出全屏 （全屏播放时，toast看不到）
          //   this.player.pause();//暂停播放
          //   // this.$vux.toast.text("wifi", "middle");
          //   this.showNetworkTip = true;
          }
          //试看视频 判断是否超过试看时长 
          if (!this.free&&Math.round(this.player.currentTime()) > this.duration) {
            this.player.controls(false);//隐藏控制条 （ios退出全屏时会显示另一个控制条）
            this.player.fullscreen(false);//退出全屏 （全屏播放时，toast看不到）
            this.player.pause();//暂停播放
            this.player.currentTime(0);//设置当前播放时间为0
            this.$vux.toast.text("试看结束,更多内容请购买课程后再观看", "middle");
          }
          //非试看视屏 视频观看结束后 跳转视频分享页面
          if(this.free&&this.player.isEnded()){
            this.$router.push('/course-share')
            // setCourseDone()//将该视频状态置为已完成训练
          }
        });
      });
    }
  }
};
</script>

<style lang="less" scoped>
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