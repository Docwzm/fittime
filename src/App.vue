<template>
  <div class="app">
    <transition name="router-fade" mode="out-in">
      <keep-alive :max="20">
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
  
}
</script>
<style lang="less">
.app{
  height: 100%;
  background:rgba(240,240,240,1);
  >div{
   height: 100%; 
   overflow-y: auto;
   -webkit-overflow-scrolling: touch;
  }
}
</style>


