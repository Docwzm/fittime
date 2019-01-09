<template>
  <div class="list-wrap">
    <div class="list-header">
      <div class="class-box">
        <div class="class-cate">减肥燃脂</div>
        <div class="class-cate current-cate">夜间助眠</div>
        <div class="class-cate">增肌塑形</div>
        <div class="class-cate">热身拉伸</div>
        <div class="class-cate">日常保健</div>
      </div>
    </div>
    <div class="list-content">
      <list-item v-for="item in list" :key="item.id" :data="item" @onClick="handleListItemClick"></list-item>
    </div>
  </div>
</template>

<script>
import mixin from "@/util/mixin";
import ListItem from "@/components/ListItem";
export default {
  name: "courseList",
  data() {
    return {
      list: [{id:0,title:"666666"},{id:2,title:"666666"}]
    };
  },
  mixins: [mixin],
  components: {
    "list-item": ListItem
  },
  created() {},
  methods: {
		handleListItemClick(){
			alert(6)
		}
	}
};
</script>

<style lang="less">
.list-wrap {
  .list-header {
    width: 100%;
    height: 72px;
    line-height: 72px;
    border-bottom: 1px solid #f0f0f0;
    overflow: hidden;
    -webkit-overflow-scrolling: touch;
    position: fixed;
    top: 0;
    background: #fff;
    .class-box {
      display: -webkit-box;
      overflow-x: scroll;
      height: inherit;
      line-height: inherit;
      padding-bottom: 10px;
      .class-cate {
        width: 20%;
        height: inherit;
        text-align: center;
        line-height: inherit;
        font-size: 26px;
        color: #b6b6b6;
        &.current-cate {
          color: #4a90e2;
          position: relative;
          &:after {
            content: "";
            position: absolute;
            display: block;
            width:40px;
            height:2.5px;
            background: #4a90e2;
            top: 60px;
            left: 50%;
            margin-left: -20px;
          }
        }
      }
    }
  }
  .list-content {
    padding-top: 102px;
  }
}
</style>