<template>
  <div class="share-wrap">
    <div class="share-img">
      <img src="@/assets/images/result@2x.png" alt>
    </div>
    <div class="share-title">本次共训练 {{time}} 分钟</div>
    <div class="share-sub-title">恭喜你，完成训练</div>
    <div class="button-wrap">
      <div class="btn btn-finish" @click="handleFinish">完成</div>
      <div class="btn btn-share" @click="handleShare">炫耀一下</div>
    </div>
  </div>
</template>

<script>
import mixin from "@/util/mixin";
import { courseShareBridge, popToRootControllerBridge } from "@/util/jsBridge";

export default {
  name: "courseDetail",
  data() {
    return {};
  },
  mixins: [mixin],
  created() {
    this.count = this.$route.params.count;
    this.time = this.$route.params.time;
  },
  methods: {
    handleShare() {
      const { count, time } = this;
      courseShareBridge({count,time},this.callbackShare);
    },
    handleFinish() {
      popToRootControllerBridge();
    },

    callbackShare(res) {
      console.log("拉起分享成功");
    }
  }
};
</script>

<style lang="less">
.share-wrap {
  height: 100vh;
  position: relative;
  overflow: hidden;
  .share-img {
    width: 492px;
    height: 396px;
    margin: 90px auto 0;
    img {
      display: block;
      width: 446px;
      height: 358px;
      margin: 19px auto;
    }
  }
  .share-title {
    text-align: center;
    font-size: 32px;
    color: #414141;
    margin-top: 83px;
  }
  .share-sub-title {
    font-size: 28px;
    text-align: center;
    color: #b6b6b6;
    margin-top: 16px;
  }
  .button-wrap {
    position: absolute;
    bottom: 50px;
    height: 100px;
    line-height: 100px;
    width: 100%;
    text-align: center;
    .btn {
      display: inline-block;
      width: 320px;
      height: inherit;
      line-height: inherit;
      text-align: center;
      font-size: 32px;
      border-radius: 16px;
      &.btn-finish {
        border: 1px solid #1eabe1;
        color: #1eabe1;
        box-sizing: border-box;
      }
      &.btn-share {
        background: linear-gradient(left, #35c4ff, #1960ff);
        color: #fff;
        margin-left: 30px;
      }
    }
  }
}
</style>