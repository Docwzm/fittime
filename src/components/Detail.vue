<template>
  <div class="home-page">
    <div v-if="detail">
      <!-- 视频 -->
      <div class="video-box">
        <video id="media" src="http://www.sundxs.com/test.mp4" controls width="400px" heigt="400px"></video> 
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
    </div>
    <div v-transfer-dom>
      <loading :show="!detail" text=""></loading>
    </div>
  </div>
</template>
<script>
import { Loading,XImg, TransferDomDirective as TransferDom } from "vux";
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
      id: this.$route.query.id
    };
  },
  created() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      this.detail = require(`../config/${this.id}.json`);
      console.log(this.detail);
    }
  }
};
</script>

<style lang="less" scoped>
.home-page {
  background: rgba(240, 240, 240, 1);
}
.video-box{
 width: 100%;
 height: 185px; 
}
.label{
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-bottom: solid 1px  #D9D9D9;
  height: 65px;
  .line{
    width: 1px;
    height: 25px;
    background: #D9D9D9;
  }
  >p{
    width: 49%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .title{
      color: #B6B6B6;
      font-size: 12px;
    }
    .content{
      color:#414141;
      font-size: 16px;
      margin-top: 3px;
    }
  }
}
.introduction{
  .x-img{
    width: 100%;
  }
}
</style>



