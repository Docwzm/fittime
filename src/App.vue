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
  
}
</script>
<style lang="less">

</style>


