<template>
  <div class="app">
    <transition name="router-fade" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" :key="$route.fullPath"></router-view>
      </keep-alive>
    </transition>
    <transition name="router-fade" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive" :key="$route.fullPath"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  data(){
    return {
    }
  }
}
</script>

<style lang="less">
@import './assets/styles/reset.less';
@import '~vux/src/styles/1px.less';


.video-js{
  background:none;
}
// .my-video-dimensions.vjs-fluid{
//   padding-top:0;
// }
.vjs-poster{
  background-color:inherit;
  background-size:inherit;
}
.video-js .vjs-control-bar{
  background:none;
}
.video-js .vjs-load-progress{
  background:#fff;
}
.video-js .vjs-play-progress{
  background:#4A90E2;
}
.video-js .vjs-progress-holder .vjs-load-progress, .video-js .vjs-progress-holder .vjs-load-progress div, .video-js .vjs-progress-holder .vjs-play-progress, .video-js .vjs-progress-holder .vjs-tooltip-progress-bar{
  height: 4px;
  border-radius: 2px;
}

.video-js .vjs-big-play-button{
  width: 96px;
  height: 96px;
  background: rgba(0,0,0,0.5);
  border-radius: 50%;
  line-height: 96px;
  border:none;
  font-size:40px;
  margin-top:-48px;
  margin-left:-48px;
}

.vux-1px-b:after{
  border-bottom:1PX solid #F0F0F0
}
</style>


