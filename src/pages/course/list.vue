<template>
  <div class="list-wrap">
    <div class="list-header">
      <div class="class-box">
        <div
          v-for="item in classify"
          :key="item.key"
          class="class-cate"
          :class="currentCate == item.key ?'current-cate':''"
          @click="handleCategoryClick(item.key)"
        >{{item.name}}</div>
      </div>
    </div>
    <div class="list-content" @touchstart="handleTouchStart" @touchmove="handleTouchMove">
      <list-item v-for="item in list" :key="item.id" :data="item"></list-item>
    </div>
    <div class="loading-wrap" v-if="bottomLoading">{{bottom.words}}</div>
  </div>
</template>

<script>
import mixin from "@/util/mixin";
import ListItem from "@/components/ListItem";
import { curriculumPage } from "@/api/course.js";
export default {
  name: "courseList",
  data() {
    return {
      currentCate: 0,
      classify: [
        { key: 0, name: "减肥燃脂" },
        { key: 1, name: "夜间助眠" },
        { key: 2, name: "增肌塑形" },
        { key: 3, name: "热身拉伸" },
        { key: 4, name: "日常保健" }
      ],
      list: [],
      bottomLoading: false,
      bottom: {
        words: "加载中..."
      },
      page: 1,
      maxPage: 1
    };
  },
  mounted() {},
  mixins: [mixin],
  components: {
    "list-item": ListItem
  },
  created() {
    let { classify, page } = this;
    this.actionGetCourseListByCate({ offset: page });
  },
  methods: {
    //切换课程类别
    handleCategoryClick(key) {
      this.currentCate = key;
      this.actionGetCourseListByCate(key);
    },
    //根据课程类型拉取列表
    actionGetCourseListByCate(data, cb) {
      curriculumPage({ ...data, pageSize: 20 })
        .then(res => {
          if (res.code === 200) {
            const { data } = res;
            this.list = data.list;
            this.maxPage = data.maxPage;
            this.page += 1;
          }
          cb && cb(res);
        })
        .catch(err => {
          cb && cb(err);
        });
    },

    handleTouchStart(e) {
      this.startY = e.targetTouches[0].pageY;
    },

    handleTouchMove(e) {
      //判断方向
      if (e.targetTouches[0].pageY < this.startY) {
        let innerHeight = document.querySelector(".list-content").clientHeight;
        let scrollTop =
          document.documentElement.scrollTop ||
          window.pageYOffset ||
          document.body.scrollTop;
        let scrollHeight =
          document.documentElement.clientHeight || document.body.scrollHeight;
        if (scrollTop + scrollHeight >= innerHeight) {
          //触底
          this.handleTouchBottom();
        }
      }
    },

    handleTouchBottom() {
      const { bottomLoading, page, maxPage } = this;
      let self = this;
      if (!bottomLoading && page <= maxPage) {
        this.actionGetCourseListByCate(1, () => {
          self.bottomLoading = false;
        });
        this.bottomLoading = true;
      }
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
    z-index: 99;
    .class-box {
      display: -webkit-box;
      overflow-x: scroll;
      height: inherit;
      line-height: inherit;
      padding-bottom: 20px;
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
            width: 40px;
            height: 2.5px;
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
    padding-bottom: 40px;
  }
  .loading-wrap {
    width: 100%;
    height: 120px;
    line-height: 120px;
    text-align: center;
    color: #999;
  }
}
</style>