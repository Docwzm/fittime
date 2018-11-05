<template>
  <div class="home-page">
    <ul>
      <li v-for="item in list" :key="item.courseKey" @click="toDetail(item)">
        <img :src="item.imgUrl">
        <div class="detail">
          <p class="top">{{item.title}}</p>
          <div class="bottom">
            <p>
              <img src="../assets/icon_hot.png"><span>{{item.hotCount}}</span>
            </p>
            <p>{{item.time}}分钟 | {{item.level}}</p>
          </div>
        </div>
      </li>
    </ul>
    <div v-transfer-dom>
      <x-loading :show="loading" text=""></x-loading>
    </div>
  </div>
</template>
<script>
import { getCourseList, addHotCourse } from "@/api";
import mockList from "@/mock/list.js";

export default {
  data() {
    return {
      list: [],
      loading:true
    };
  },
  created() {
    this.getList();
  },
  methods: {
    //获取视频列表
    getList() {
      let data = [
        {
          courseKey: "course_key_2018_11_08_001",
          hotCount: 1
        },
        {
          courseKey: "course_key_2018_11_08_002",
          hotCount: 2
        }
      ];
      for (let x in mockList) {
        Object.assign(mockList[x], data[x]);
      }
      this.list = mockList;
      this.loading = false;
      // getCourseList().then(res => {
        // this.loading = false;
      //   let data = res.data.hotcounts;
      //   // for (let x in list) {
      //   //   Object.assign(list[x],data[x])
      //   // }
      // });
    },
    //前往视频详情页面
    toDetail(item) {
      item.hotCount = item.hotCount + 1;
      //公开课点击，请求添加热度
      // addHotCourse(item.courseKey).then(() => {
      //   item.hotcount = item.hotcount + 1;
      // })
      this.$router.push({ name: "detail", query: { id: item.courseKey } });
    }
  }
};
</script>

<style lang="less" scoped>
.home-page {
  background: rgba(240, 240, 240, 1);
  ul {
    padding: 0 10px;
    li {
      position: relative;
      width: 355px;
      height: 150px;
      margin-top: 15px;
      > img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      .detail {
        position: absolute;
        bottom: 0;
        padding: 10px 15px;
        width: 100%;
      }
      .top {
        font-size: 20px;
        margin-bottom: 10px;
      }
      .bottom {
        width: 100%;
        font-size: 12px;
        color: #e2e2e2;
        display: flex;
        justify-content: space-between;
        img {
          width: 8px;
          height: 10px;
        }
      }
    }
  }
}
</style>


