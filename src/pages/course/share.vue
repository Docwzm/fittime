<template>
  <div class="share-wrap">
    <div class="share-img">
      <img src="@/assets/images/result@2x.png" alt>
    </div>
    <div class="share-title">本次共训练 17 分钟</div>
    <div class="share-sub-title">恭喜你，完成训练</div>
    <div class="button-wrap">
      <div class="btn btn-finish">完成</div>
      <div class="btn btn-share">炫耀一下</div>
    </div>
  </div>
</template>

<script>
import mixin from "@/util/mixin";
import { courseShareBridge } from "@/util/jsBridge";

export default {
  name: "courseDetail",
  data() {
    return {};
  },
  mixins: [mixin],
  created() {},
  methods: {
    handleShare() {
      courseShareBridge(
        {
          count: 45,
          time: 18
        },
        this.callbackShare
      );
    },
    callbackShare(res) {
      alert(res);
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
    width: 6.56rem;
    height: 5.28rem;
    border: 1px dashed #ccc;
    margin: 1.2rem auto 0;
    img {
      display: block;
      width: 5.946rem;
      height: 4.773rem;
      margin: 0.3rem auto;
    }
  }
  .share-title {
    text-align: center;
    font-size: 0.4266rem;
    color: #414141;
    margin-top: 1.12rem;
  }
  .share-sub-title {
    font-size: 0.3733rem;
    text-align: center;
    color: #b6b6b6;
    margin-top: 0.2133rem;
  }
  .button-wrap {
    position: absolute;
    bottom: 0.666rem;
    height: 1.333rem;
    line-height: 1.333rem;
    width: 100%;
    text-align: center;
    .btn{
      display: inline-block;
      width: 4.266rem;
      height: inherit;
      line-height: inherit;
      text-align: center;
      font-size: .4266rem;
      &.btn-finish{
        border:1px solid #1EABE1;
        color: #1EABE1;
        border-radius: .2133rem;
        box-sizing: border-box;
      }
      &.btn-share{
        background: linear-gradient(left,#35C4FF,#1960FF);
        color: #fff;
        border-radius: .2133rem;
        margin-left: .4rem;
      }
    }
  }
}
</style>