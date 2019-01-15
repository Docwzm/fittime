<template>
  <div>服务协议</div>
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
