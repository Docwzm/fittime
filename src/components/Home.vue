<template>
  <div class="home-page">
    <ul>
      <li v-for="item in list" :key="item.id" @click="toDetail(item)">
        <img :src="item.imgUrl" alt="">
        <div class="detail">
          <p class="top">{{item.title}}</p>
          <div class="bottom">
            <p>
              <img src="../assets/icon_hot.png" alt=""><span>{{item.hotCount}}</span>
            </p>
            <p>{{item.time}}分钟 | {{item.level}}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data(){
    return {
      list:[]
    }
  },
  created(){
    this.getList();
  },
  methods:{
    getList(){
      this.list = require('../config/list.json').list
      console.log(this.list)
    },
    toDetail(item){
      this.$router.push({name:'detail',query:{id:item.id}})
    }
  }
}
</script>

<style lang="less" scoped>
.home-page{
  background:rgba(240,240,240,1);
  ul{
    padding: 0 10px;
    li{
      position: relative;
      width: 355px;
      height: 150px;
      margin-top: 15px;
      >img{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      .detail{
        position: absolute;
        bottom: 0;
        padding: 10px 15px;
        width: 100%;
      }
      .top{
        font-size: 20px;
        margin-bottom: 10px;
      }
      .bottom{
        width: 100%;
        font-size: 12px;
        color: #E2E2E2;
        display: flex;
        justify-content: space-between;
        img{
          width: 8px;
          height: 10px;
        }
      }
    }
  }
}
</style>


