<template>
  <div class="home-page">
    <ul v-if="list">
      <li v-for="(item,index) in list" :key="index" @click="toDetail(item)">
        <img v-lazy="item.imgUrl">
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
  </div>
</template>
<script>
import { getCourseList } from "@/api";
import mockList from "@/mock/courseList.js";

export default {
  data() {
    return {
      list: null,
      loading: true
    };
  },
  created() {
    this.getList();
  },
  methods: {
    //获取视频列表
    getList() {
      getCourseList().then(res => {
        let list = res.data;
        for(let y in mockList){
          for (let x in list) {
            if(list[x].courseKey==mockList[y].courseKey){
              Object.assign(mockList[y], list[x]);
            }
          }
        }
        console.log(mockList)
        this.list = mockList;
        this.loading = false;
      });
    },
    //前往视频详情页面
    toDetail(item) {
      item.hotCount++;
      location.href = '/fittime/#/detial?id='+item.courseKey
      // this.$router.push({ name: "detail", query: { id: item.courseKey } });
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


