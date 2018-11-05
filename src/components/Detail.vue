<template>
  <div class="home-page">
    <div v-if="detail">
      <!-- 视频 -->
      <div class="video-box">
        <video id="media" class="video-js vjs-big-play-centered"></video>
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
        <p><span class="title">锻炼时长</span><span class="content">{{detail.time}}</span></p>
        <div class="line"></div>
        <p><span class="title">难度</span><span class="content">{{detail.level}}</span></p>
      </div>
      <!-- 详情 -->
      <ul class="introduction">
        <li v-for="(imgUrl,index) in detail.Introduction" :key="index">
          <x-img :src="imgUrl" class="x-img" :offset="-100" container="#vux_view_box_body"></x-img>
        </li>
      </ul>
      <!-- 按钮 -->
      <div class="btn-wrap">
        <button class="btn-player" @click="play">开始训练</button>
      </div>
    </div>
    <div v-transfer-dom>
      <x-loading :show="!detail" text=""></x-loading>
    </div>
  </div>
</template>
<script>
import { getCourseDetail } from "@/api";
import mockDetail from "@/mock/detail.js";
export default {
  data() {
    return {
      detail: null,
      id: this.$route.query.id,
      player: null,
      isPlay: false
    };
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      //获取本地视频详情
      for (let x in mockDetail) {
        if (mockDetail[x].courseKey == this.id) {
          this.detail = mockDetail[x];
        }
      }
      //获取视频播放地址
      // getCourseDetail(this.$route.query.id)
      //   .then(res => {
      //     console.log(res.video_info.video_address);
      //   })
      //   .catch(e => {
      let options = {
        controls: true,
        url: "https://fit-time.lifesense.com/m3u8/test_01.m3u8",
        type: "hls",
        preload: true,
        autoplay: false, // 如为 true，则视频将会自动播放
        poster:
          "https://sports-qa-files.lifesense.com/other/20180930/ffa2b97443f64c6891accba1ab4023f3.png"
      };
      this.player = new QiniuPlayer("media", options);

      this.watchPlayer();
      // });
    },
    //监听视频player 事件
    watchPlayer() {
      this.player.ready(() => {
        this.player.fullscreen(false, () => {
          console.log("hahha.............");
        });
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
          this.player.fullscreen(false, () => {
            console.log("hahha.............");
          });
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
  .x-img {
    width: 100%;
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



