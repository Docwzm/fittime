<template>
  <div class="home-page">
    <div v-if="player">
      <!-- 视频 -->
      <div class="video-box">
        <video id="my-video" class="video-js vjs-big-play-centered"></video>
        <!-- 视频简介 -->
        <div class="base-wrap" v-if="!isPlay">
          <p class="title">{{ detail.title }}</p>
          <p class="hot-count">
            <img src="../assets/icon_hot.png"><span>{{detail.hotCount}}人参加</span>
          </p>
        </div>
      </div>
      <!-- 标签 -->
      <div class="label">
        <p><span class="title">锻炼时长</span><span class="content">{{detail.time}}分钟</span></p>
        <div class="line"></div>
        <p><span class="title">难度</span><span class="content">{{detail.level}}</span></p>
      </div>
      <!-- 详情 -->
      <ul class="introduction" v-if="detail.Introduction">
        <li v-for="(imgUrl,index) in detail.Introduction" :key="index">
          <img v-lazy="imgUrl">
        </li>
      </ul>
      <!-- 按钮 -->
      <div class="btn-wrap">
        <button class="btn-player" @click="play">开始训练</button>
      </div>
    </div>
    <div v-transfer-dom>
      <x-loading :show="!detail"></x-loading>
    </div>
  </div>
</template>
<script>
import { getCourseDetail, addHotCourse } from "@/api";
import mockList from "@/mock/courseList.js";
export default {
  data() {
    return {
      detail: null,
      id: this.$route.query.id,
      player: null,
      isPlay: false
    };
  },
  created() {
    //请求添加热度
    addHotCourse(this.id);
  },
  mounted() {
    this.getDetail();
  },
  beforeDestroy() {
    QiniuPlayer.dispose("my-video"); //释放播放器实例
  },
  methods: {
    getDetail() {
      //获取本地视频详情
      for (let x in mockList) {
        if (mockList[x].courseKey == this.id) {
          this.detail = mockList[x];
        }
      }
      //获取视频播放地址
      getCourseDetail(this.$route.query.id).then(res => {
        let data = res.data;
        if (data && data.videoAddress) {
          this.detail.hotCount = data.hotCount;
          let options = {
            controls: true,
            url: data.videoAddress,
            // url:'http://phjztkxul.bkt.clouddn.com/qGPExvkCZQO2y2vVSDreY-rT4Qk=/lq3gTJhmbQ6P7q2YmUuyoRDBU_4t',
            type: "hls",
            preload: true,
            autoplay: false // 如为 true，则视频将会自动播放
            // poster:"https://sports-qa-files.lifesense.com/other/20180930/ffa2b97443f64c6891accba1ab4023f3.png"
          };
          this.player = new QiniuPlayer("my-video", options);
          this.watchPlayer();
        }
      });
    },
    //监听视频player 事件
    watchPlayer() {
      this.player.ready(() => {
        this.player.on("play", () => {
          //播放 隐藏视频简介
          this.isPlay = true;
        });
        this.player.on("pause", () => {
          //暂停 显示视频简介
          // this.isPlay = false;
        });
      });
    },
    //开始播放
    play() {
      this.player.ready(() => {
        //暂停之后开始播放---视频结束默认暂停
        if (this.player.isPaused()) {
          this.player.play();
        }
      });
    }
  }
};
</script>


<style lang="less">
// .vjs-poster {
//   background-size: 100% 100% !important;
// }
// .vjs-big-play-button{
//   display: none!important;
// }
.video-damage-note{
  text-align:center;
  padding:30px;
  font-size:20px;
  justify-content:flex-start;
}
</style>

<style lang="less" scoped>
.home-page {
  padding-bottom: 70px;
  background: rgba(240, 240, 240, 1);
}
.video-box {
  width: 100%;
  height: 185px;
  position: relative;
  .title,
  .hot-count {
    position: absolute;
    left: 20px;
  }
  .title {
    bottom: 42px;
    width: 180px;
    font-size: 20px;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 20px;
  }
  .hot-count {
    bottom: 15px;
    height: 12px;
    font-size: 12px;
    color: rgba(226, 226, 226, 1);
    line-height: 12px;
    img {
      width: 8px;
      height: 10px;
      margin-right: 4px;
    }
  }
}
.label {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-bottom: solid 1px #d9d9d9;
  height: 65px;
  .line {
    width: 1px;
    height: 25px;
    background: #d9d9d9;
  }
  > p {
    width: 49%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .title {
      color: #b6b6b6;
      font-size: 12px;
    }
    .content {
      color: #414141;
      font-size: 16px;
      margin-top: 3px;
    }
  }
}
.introduction {
  img {
    width: 100%;
    display: block;
  }
}
.btn-wrap {
  position: fixed;
  width: 100%;
  left: 50%;
  bottom: 10px;
  transform: translateX(-50%);
  text-align: center;
}
.btn-player {
  font-size: 16px;
  color: rgba(255, 255, 255, 1);
  width: 345px;
  height: 50px;
  line-height: 50px;
  background: linear-gradient(
    316deg,
    rgba(36, 121, 255, 1) 0%,
    rgba(46, 175, 255, 1) 100%
  );
  border-radius: 50px;
  border: 0;
}
</style>



