<template>
  <div class="list-item" @click="handleListItemClick">
    <div class="marker">推荐啊</div>
    <div class="title">三个动作直击小蛮腰</div>
    <div class="key-words">小器械 · 增肌 · 腰部 · 上班族</div>
    <div class="heat">
      <img src="@/assets/images/icons/hot@2x.png">
      <span>2345</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {};
  },
  created() {},
  methods: {
    handleListItemClick() {
      this.$router.push("/course-detail");
      //this.$emit('onClick')
    }
  }
};
</script>
<style lang="less">
.list-item {
  width: 690px;
  height: 226px;
  background: #bbb;
  margin: 0 auto 30px;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  &:last-child {
    margin-bottom: 0;
  }
  .marker {
    position: absolute;
    height: 28px;
    line-height: 28px;
    border-top-right-radius: 100px;
    border-bottom-right-radius: 100px;
    background: #69a8fa;
    padding: 0 12px;
    font-size: 18px;
    color: #fff;
    span {
      font-size: 18px;
      color: #fff;
      -webkit-text-size-adjust: none;
      vertical-align: top;
    }
  }
  .title {
    padding: 0 30px;
    box-sizing: border-box;
    font-size: 34px;
    color: #fff;
    margin-top: 50px;
  }
  .key-words {
    padding: 0 30px;
    box-sizing: border-box;
    font-size: 20px;
    color: #fff;
    margin-top: 10px;
  }
  .heat {
    position: absolute;
    padding: 0 30px;
    font-size: 20px;
    color: #fff;
    bottom: 18px;
    img {
      display: inline-block;
      vertical-align: middle;
      width: 20px;
      height: 22px;
    }
    span {
      vertical-align: middle;
    }
  }
}
</style>
