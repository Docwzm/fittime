<template>
  <div class="list-wrap" ref="list">
    <div class="list-header">
      <div class="class-box">
        <div v-for="item in classify" :key="item.id" class="class-cate" :class="currentCate == item.id ?'current-cate':''"
          @click="handleCategoryClick(item.id)">{{item.title}}</div>
      </div>
    </div>
    <div class="list-content" @touchstart="handleTouchStart" @touchmove="handleTouchMove">
      <list-item v-for="item in list" :key="item.id" :data="item"></list-item>
    </div>
    <div class="loading-wrap" v-if="bottomLoading">{{bottom.words}}</div>
  </div>
</template>

<script>
// import mixin from "@/util/mixin";
import ListItem from "@/components/ListItem";
import { curriculumPage, getClassify } from "@/api/course.js";
import { navTitleBridge, LSJavascriptBridgeInit } from "@/util/jsBridge";
import { setTimeout } from "timers";

export default {
  name: "courseList",
  data() {
    return {
      currentCate: 1,
      classify: [],
      list: [],
      bottomLoading: false,
      bottom: {
        words: "加载中..."
      },
      page: 1,
      maxPage: 1
    };
  },
  activated() {
    // this.$nextTick(() => {
    //   let el = document.documentElement || document.body;
    //   el.scrollTop = 1000;
    // });
    // setTimeout(() => {
    // },0)
    document.body.scrollTop = this._d.domTopList['list'];
    LSJavascriptBridgeInit(() => {
      navTitleBridge({
        title: "全部课程",
        autoResetToDefaultConfigWhtenOpenLink: true,
        autoTopPadding: true,
        // topPadding: 0,
        tintColorType: 2,
        backButtonType: 1,
        barLineHidden: false,
        color: { red: 255, green: 255, blue: 255, alpha: 255 }
      });
    });
  },
  deactivated() {
    let el = document.body || document.documentElement;
    this._d.domTopList['list'] = el.scrollTop;
  },
  // mounted() {
  //   LSJavascriptBridgeInit(() => {
  //     navTitleBridge({
  //       title: "全部课程",
  //       autoResetToDefaultConfigWhtenOpenLink: true,
  //       autoTopPadding: true,
  //       // topPadding: 0,
  //       tintColorType: 2,
  //       backButtonType: 1,
  //       barLineHidden: false,
  //       color: { red: 255, green: 255, blue: 255, alpha: 255 }
  //     });
  //   });
  // },
  // watch: {
  //   $route: () => {
  //     LSJavascriptBridgeInit(() => {
  //       navTitleBridge({
  //         title: "全部课程",
  //         autoResetToDefaultConfigWhtenOpenLink: true,
  //         autoTopPadding: true,
  //         // topPadding: 0,
  //         tintColorType: 2,
  //         backButtonType: 1,
  //         barLineHidden: false,
  //         color: { red: 255, green: 255, blue: 255, alpha: 255 }
  //       });
  //     });
  //   }
  // },
  // mixins: [mixin],
  components: {
    "list-item": ListItem
  },
  created() {
    let { classify, page } = this;
    let tab = this.$route.query.tab;
    this.actionGetClassify(tab);
  },
  methods: {
    //切换课程类别
    handleCategoryClick(key) {
      this.currentCate = key;
      this.list = []
      this.actionGetCourseListByCate({ pageNum: 1, classifyId: parseInt(key) });
    },
    //根据课程类型拉取列表
    actionGetCourseListByCate(data, cb) {
      curriculumPage({ ...data, pageSize: 10 })
        .then(res => {
          if (res.code === 200) {
            const { data } = res;
            this.list = this.list.concat(data.list);
            this.maxPage = data.maxPage;
            this.page += 1;
          }
          cb && cb(res);
        })
        .catch(err => {
          cb && cb(err);
        });
    },

    //获取课程分类
    actionGetClassify(tab) {
      const { page } = this;
      getClassify().then(res => {
        if (res.code === 200) {
          tab ? (this.currentCate = tab) : (this.currentCate = res.data[0].id);
          //所有
          this.classify = res.data;
          this.actionGetCourseListByCate({
            pageNum: page,
            classifyId: tab || res.data[0].id
          });
        }
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
      const { bottomLoading, page, maxPage, currentCate } = this;
      let self = this;
      if (!bottomLoading && page <= maxPage) {
        this.actionGetCourseListByCate(
          { pageNum: page, classifyId: currentCate },
          () => {
            self.bottomLoading = false;
          }
        );
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
        overflow: hidden;
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