<template>
  <div class="list-item" @click="handleListItemClick">
    <img class="item-bg" v-lazy="data.coverImg" alt>
    <div class="item-content">
      <div class="marker" v-if="data.type == 0">免费</div>
      <!-- <div class="marker" v-else></div> -->
      <div class="title">{{data.title}}</div>
      <div class="key-words">{{data.label}}</div>
      <div class="heat">
        <img src="@/assets/images/icons/hot@2x.png">
        <span>{{data.heat}}</span>
      </div>
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
      this.$router.push("/course-detail/" + this.data.id);
      //this.$emit('onClick')
    }
  }
};
</script>
<style lang="less">
.list-item {
  width: 690px;
  height: 226px;
  background: #f1f1f1;
  margin: 0 auto 30px;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  &:last-child {
    margin-bottom: 0;
  }
  .item-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
  .item-content {
    position: absolute;
    height: 100%;
    top: 0;
    z-index: 1;
    .marker {
      position: absolute;
      height: 28px;
      border-top-right-radius: 100px;
      border-bottom-right-radius: 100px;
      background: #69a8fa;
      padding: 0 12px;
      font-size: 18px;
      color: #fff;
      display: table-cell;
      text-align: center;
      vertical-align: middle;
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
}
</style>
