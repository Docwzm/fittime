<template>
  <div class="home-page">
    <div v-if="detail">
      <!-- 视频 -->
      <div class="video-box">
        <video id="media" class="video-js vjs-big-play-centered"></video>
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
      <loading :show="!detail" text=""></loading>
    </div>
  </div>
</template>
<script>
import { Loading, XImg, TransferDomDirective as TransferDom } from "vux";
export default {
  directives: {
    TransferDom
  },
  components: {
    Loading,
    XImg
  },
  data() {
    return {
      detail: null,
      id: this.$route.query.id,
      player: null
    };
  },
  created() {
    this.getDetail();
  },
  mounted() {
    let options = {
      controls: true,
      url:
        "http://phjztkxul.bkt.clouddn.com/qGPExvkCZQO2y2vVSDreY-rT4Qk=/lq3gTJhmbQ6P7q2YmUuyoRDBU_4t",
      type: "hls",
      preload: true,
      autoplay: false // 如为 true，则视频将会自动播放
      // poster:
      //   "https://sports-qa-files.lifesense.com/other/20180930/ffa2b97443f64c6891accba1ab4023f3.png"
    };
    this.player = new QiniuPlayer("media", options);
  },
  methods: {
    getDetail() {
      this.detail = require(`../config/${this.id}.json`);
    },
    //开始播放
    play() {
      this.player.ready(() => {
        this.player.play();
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
  background: rgba(240, 240, 240, 1);
}
.video-box {
  width: 100%;
  height: 185px;
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
// .btn-wrap{
//   position:fixed;
//   width:100%;
//   left:50%;
//   bottom:10px;
//   transform:translateX(-50%);
//   text-align:center;
// }
// .btn-player {
//   font-size: 16px;
//   color: rgba(255, 255, 255, 1);
//   width: 345px;
//   height: 50px;
//   line-height: 50px;
//   background: linear-gradient(
//     316deg,
//     rgba(36, 121, 255, 1) 0%,
//     rgba(46, 175, 255, 1) 100%
//   );
//   border-radius: 50px;
//   border:0;
// }
</style>



