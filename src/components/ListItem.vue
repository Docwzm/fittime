<template>
  <div class="list-item" @click="handleListItemClick">
    <img class="item-bg" v-lazy="itemData.listImg" alt>
    <div class="item-content">
      <div class="marker" v-if="itemData.type == 0">免费</div>
      <!-- <div class="marker" v-else></div> -->
      <div class="title">{{itemData.title}}</div>
      <div class="key-words">{{itemData.label}}</div>
      <div class="heat">
        <img src="@/assets/images/icons/hot@3x.png">
        <span>{{itemData.heat}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      itemData:this.data
    };
  },
  created() {},
  methods: {
    handleListItemClick() {
      this.$router.push("/course-detail/" + this.itemData.id);
      // let heat = this.itemData.heat + 1;
      // this.$set(this.itemData,'heat',heat)
      this.itemData.heat += 1;
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
    width:100%;
    top: 0;
    z-index: 1;
    .marker {
      position: absolute;
      height: 56px;
      line-height: 56px;
      border-top-right-radius: 200px;
      border-bottom-right-radius: 200px;
      background: #69a8fa;
      padding: 0 24px;
      font-size: 36px;
      color: #fff;
      -webkit-text-size-adjust: none;
      transform: scale(0.5);
      top:-14px;
      left:-30px;
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
      display: flex;
      align-items: center;
      img {
        display: inline-block;
        vertical-align: middle;
        width: 20px;
        height: 22px;
        margin-right: 11px;
      }
      span {
        vertical-align: middle;
      }
    }
  }
}
</style>
