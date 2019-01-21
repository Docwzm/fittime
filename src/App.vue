<template>
  <div class="app">
    <!-- <transition name="router-fade" mode="out-in"> -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" :key="$route.fullPath"></router-view>
    </keep-alive>
    <!-- </transition> -->
    <!-- <transition name="router-fade" mode="out-in"> -->
    <router-view v-if="!$route.meta.keepAlive" :key="$route.fullPath"></router-view>
    <!-- </transition> -->
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="less">
@import "./assets/styles/reset.less";
@import "~vux/src/styles/1px.less";

.vjs-poster {
  background-color: inherit;
  background-size: inherit;
}
.video-js .vjs-control-bar {
  background: none;
}
.video-js .vjs-load-progress {
  background: #fff;
}
.video-js .vjs-play-progress {
  background: #4a90e2;
}
.video-js .vjs-progress-holder .vjs-load-progress,
.video-js .vjs-progress-holder .vjs-load-progress div,
.video-js .vjs-progress-holder .vjs-play-progress,
.video-js .vjs-progress-holder .vjs-tooltip-progress-bar {
  height: 4px;
  border-radius: 2px;
}
.vjs-paused .vjs-big-play-button {
  display: block !important;
}
.video-js .vjs-big-play-button {
  width: 96px;
  height: 96px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  line-height: 96px;
  border: none;
  font-size: 40px;
  margin-top: -48px;
  margin-left: -48px;
  // display: none;
  // visibility: hidden!important;
  // &.no-play{
  //   display: none!important;
  // }
}

.vjs-mobile.vjs-paused.no-play .vjs-big-play-button,
.vjs-using-native-controls.no-play .vjs-big-play-button,
.vjs-using-native-controls.vjs-paused.no-play .vjs-big-play-button,
.vjs-using-native-controls.no-play .vjs-poster {
  display: none;
}

.video-js.no-play .vjs-play-control {
  display: none;
}

.vux-1px-b:after {
  border-bottom: 1px solid #f0f0f0;
}

.weui-dialog {
  width: 560px !important;
  box-sizing: border-box;
}
</style>


