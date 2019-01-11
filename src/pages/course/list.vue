<template>
  <div class="list-wrap">
    <div class="list-header">
      <div class="class-box">
        <div
          v-for="item in catagory"
          :key="item.key"
          class="class-cate"
          :class="currentCate == item.key ?'current-cate':''"
          @click="handleCategoryClick(item.key)"
        >{{item.name}}</div>
      </div>
    </div>
    <div class="list-content">
      <list-item v-for="item in list" :key="item.id" :data="item"></list-item>
    </div>
  </div>
</template>

<script>
import mixin from "@/util/mixin";
import ListItem from "@/components/ListItem";
import {curriculumPage} from '@/api/course.js'
export default {
  name: "courseList",
  data() {
    return {
      currentCate: 0,
      catagory: [
        { key: 0, name: "减肥燃脂" },
        { key: 1, name: "夜间助眠" },
        { key: 2, name: "增肌塑形" },
        { key: 3, name: "热身拉伸" },
        { key: 4, name: "日常保健" }
      ],
      list: [
        {
          "id": 1,
          "title": "Andy的课程",
          "coverImg": "http://img3.a0bi.com/upload/ttq/20141202/1417528541822.jpg",
          "listImg": "http://baidu.com",
          "standbyImg": "http://baidu.com",
          "grade": 1,
          "classify": "减脂",
          "price": 100,
          "heat": 15,
          "deadline": 60,
          "contentImg": "http://baidu.com",
          "calorie": 50,
          "appliance": "测试",
          "throng": "测试2",
          "onlineTime": 1547114950,
          "offlineTime": 1547114950,
          "status": 1,
          "deleted": 0,
          "label": "减脂,白领",
          "created": 1547049600000,
          "updated": 1547114950
        }
      ]
    };
  },
  mixins: [mixin],
  components: {
    "list-item": ListItem
  },
  created() {
    let { catagory } = this;
    this.actionGetCourseListByCate(catagory[0].key);
  },
  methods: {
    /**
     * 切换课程类别
     */
    handleCategoryClick(key) {
      this.currentCate = key;
      this.actionGetCourseListByCate(key);
    },
    /**
     * 根据课程类型拉取列表
     */
    actionGetCourseListByCate(key) {
      console.log(key);
      curriculumPage({offset:1,pageSize:20}).then(res => {
        console.log(res)
      })
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
  }
}
</style>