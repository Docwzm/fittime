<template>
  <div class="service-wrap">
    <div class="service-content">
      <p>服务协议</p>
    </div>
  </div>
</template>
<script>
import { navTitleBridge, LSJavascriptBridgeInit } from "@/util/jsBridge";

export default {
  mounted() {
    LSJavascriptBridgeInit(() => {
      navTitleBridge({
        title: "服务协议",
        autoTopPadding: true,
        tintColorType: 2,
        backButtonType: 1,
        barLineHidden: false,
        color: { red: 255, green: 255, blue: 255, alpha: 255 }
      });
    });
  }
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