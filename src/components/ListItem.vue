<template>
  <div class="list-item" @click="handleListItemClick">
    <div class="marker">
      <span>推荐啊</span>
    </div>
    <div class="title">三个动作直击小蛮腰</div>
    <div class="key-words">小器械 · 增肌 · 腰部 · 上班族</div>
    <div class="heat">
			<img src='@/assets/images/icons/hot@2x.png'/>
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
  created() {
    
	},
	methods: {
		handleListItemClick(){
			this.$emit('onClick')
		}
	},
};
</script>
<style lang="less">
.list-item {
  width: 9.2rem;
  height: 3.01rem;
  background: #bbb;
  margin: 0 auto 0.4rem;
  border-radius: 0.1rem;
  position: relative;
  overflow: hidden;
  .marker {
    position: absolute;
    height: 0.373rem;
    border-top-right-radius: 0.1865rem;
    border-bottom-right-radius: 0.1865rem;
    background: #69a8fa;
    padding: 0 0.15rem;
    span {
      font-size: 0.266rem;
      color: #fff;
      -webkit-text-size-adjust: none;
      vertical-align: top;
    }
  }
  .title {
    padding: 0 0.4rem;
    box-sizing: border-box;
    font-size: 0.45rem;
    color: #fff;
    margin-top: 0.666rem;
  }
  .key-words {
    padding: 0 0.4rem;
    box-sizing: border-box;
    font-size: 0.266rem;
    color: #fff;
    margin-top: 0.1333rem;
  }
  .heat {
    position: absolute;
    padding: 0 0.4rem;
    font-size: 0.37rem;
    color: #fff;
		bottom: 0.186rem;
		img{
			display: inline-block;
			vertical-align: middle;
			width: .2666rem;
			height: .2666rem;
		}
		span{
			vertical-align: middle
		}
  }
}
</style>
