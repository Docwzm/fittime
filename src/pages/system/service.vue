<template>
  <div class="service-wrap">
    <div class="service-content">
      <div class="title">如何联系乐心客服？</div>
      <p>如果您在选购乐心课程过程中遇到订单问题，均可通过以下任意方式联系乐心客服咨询。</p>
      <p>·拨打乐心客服热线： 4006002323 周一至周日8:30-20:00（仅收市话费）</p>
      <p>·打开乐心运动公众号，直接回复“人工客服”，进入在线 客服</p>
    </div>
  </div>
</template>

<script>
import { navTitleBridge, LSJavascriptBridgeInit } from "@/util/jsBridge";

export default {
  mounted() {
    LSJavascriptBridgeInit(() => {
      navTitleBridge({
        title: "联系客服",
        autoTopPadding: true,
        tintColorType: 2,
        backButtonType: 1,
        barLineHidden: false,
        color: { red: 255, green: 255, blue: 255, alpha: 255 }
      });
    });
  },
};
</script>

<style lang="less">
.service-wrap {
  width: 100%;
  min-height: 100vh;
  background: #f1f2f7;
  overflow: hidden;
  .service-content {
    background: #fff;
    padding: 60px 30px;
    margin-top: 20px;
    .title {
      font-size: 32px;
      color: #414141;
    }
    p {
      font-size: 28px;
      color: #b6b6b6;
      margin-top: 12px;
    }
  }
}
</style>