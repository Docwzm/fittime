<template>
  <div class="list-wrap" ref="list">
    <div class="list-header">
      <div class='scroll-box'>
         <div class="class-box" :style="'left:' + scrollLeft">
            <div v-for="(item,index ) in classify" :key="item.id" :style="'width:'+eachWidth" class="class-cate" :class="currentCate == item.id ?'current-cate':''"
              @click="handleCategoryClick(item.id,index)">{{item.title}}</div>
          </div>
      </div>
    </div>
    <!-- <swiper class='swiper' height="100vh" :show-dots="false" @on-index-change="handleIndexChange" v-model="index"> -->
    <swiper class='swiper' height="100vh" :show-dots="false" @on-index-change="handleIndexChange" v-model="index">
      <swiper-item class="black swiper-item" v-for="cls in classify" :key="cls.id">
        <div class="scroll">
          <div class="list-content" ref='listContent'  @touchstart="handleTouchStart" @touchmove="handleTouchMove">
            <list-item v-for="item in classifyStore[cls.id]" :key="cls.id + '-'+item.id" :data="item"></list-item>
          </div>
        </div>
      </swiper-item>
    </swiper>
    <div class="loading-wrap" v-if="bottomLoading">{{bottom.words}}</div>
  </div>
</template>
<script>
import ListItem from "@/components/ListItem";
import { curriculumPage, getClassify } from "@/api/course.js";
import { navTitleBridge, LSJavascriptBridgeInit } from "@/util/jsBridge";
import { Swiper,SwiperItem} from 'vux'
export default {
  name: "courseList",
  data() {
    return {
      index:0,
      currentCate: 1,
      classify: [],
      list: [],
      bottomLoading: false,
      bottom: {
        words: "加载中..."
      },
      page: 1,
      maxPage: 1,
      eachWidth:"100%",
      classifyStore:[],
      scrollLeft:0
    };
  },
  components: {
    "list-item": ListItem,
    Swiper,
    SwiperItem,
  },
  created() {
    let { classify, page } = this;
    let tab = this.$route.query.tab;
    this.actionGetClassify(tab);
  },
  activated() {
    LSJavascriptBridgeInit(() => {
      navTitleBridge({
        title: "全部课程",
        autoResetToDefaultConfigWhtenOpenLink: true,
        autoTopPadding: true,
        tintColorType: 2,
        backButtonType: 1,
        barLineHidden: false,
        color: { red: 255, green: 255, blue: 255, alpha: 255 }
      });
    });
  },

  methods: {
    //切换课程类别
    handleCategoryClick(key,index) {
      this.currentCate = key;
      this.index = index;
      this.list = []
      this.actionGetCourseListByCate({ pageNum: 1, classifyId: parseInt(key) });
    },
    //头部滑动
    handleIndexChange(index){
      let {classify} = this;
      this.currentCate = classify[index].id
      this.actionGetCourseListByCate({pageNum:1,classifyId:classify[index].id})
      this.handleHeaderScroll(index)
    },

    //根据index计算头部位置
    handleHeaderScroll(index){
      let step = 0;
      if(index > 2){
        step = index - 2
      }
      this.scrollLeft = "-" + (step * 20).toString() + "%"
    },

    //根据课程类型拉取列表
    actionGetCourseListByCate(params, cb) {
      let self = this
      let {classifyStore,classify} = this
      if(params.pageNum === 1){
        if(classifyStore[params.classifyId].length === 0){
          curriculumPage({ ...params, pageSize: 20 })
          .then(res => {
            if (res.code === 200) {
              const { data } = res;
              classifyStore[params.classifyId] = data.list
              this.classifyStore = classifyStore
              this.maxPage = res.data.maxPage;
              this.page += 1;
            }
            cb && cb(res);
          })
        }
      }else{
        curriculumPage({ ...params, pageSize: 20 })
        .then(res => {
          if (res.code === 200) {
            const { data } = res;
            classifyStore[params.classifyId] = data.list
            classifyStore[params.classifyId] = classifyStore[params.classifyId].concat(data.list)
            this.classifyStore = classifyStore
            this.maxPage = res.data.maxPage;
            this.page += 1;
          }
          cb && cb(res);
        })
      }
      
    },
    //获取课程分类
    actionGetClassify(tab) {
      const { page } = this;
      getClassify().then(res => {
        if (res.code === 200) {
          tab ? (this.currentCate = tab) : (this.currentCate = res.data[0].id);
          //所有
          this.classify = res.data;
          let classifyStore = {}
          this.classify.forEach(item => {
            //创建列表内容保存栈
            classifyStore[item.id] = []
          })
          this.classifyStore = classifyStore
          //根绝分类计算宽度
          let catLen = this.classify.length;
          let fullWidth = 100;
          let eachWidth = fullWidth
          if(catLen <= 5){
            eachWidth = fullWidth / catLen
          }else{
            eachWidth = 20
          }
          eachWidth = eachWidth.toString()+"%"
          this.eachWidth = eachWidth
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
    },
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
    .scroll-box{
      white-space: nowrap;
      padding: relative;
      //overflow:scroll;
      .class-box {
        display: -webkit-box;
        height: inherit;
        line-height: inherit;
        padding-bottom: 20px;
        position:relative;
        .class-cate {
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
              height: 4px;
              background: #4a90e2;
              border-radius: 2px;
              top: 60px;
              left: 50%;
              margin-left: -20px;
            }
          }
        }
      }
    }
    
  }
  .swiper{
    padding-top: 72px;
    box-sizing: border-box;
    height: calc(100vh);
    .swiper-item{
      .scroll{
        width: 100%;
        height: 100%;
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
        .list-content {
          //padding-top: 102px;
          padding-bottom: 102px;
          .list-item{
            &:first-child{
              margin-top: 30px;
            }
          }
        }
      }
    }
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