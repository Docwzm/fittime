<template>
  <div class="special-wrap">
    <div class="banner">
      <img v-lazy="subject.coverImg">
      <!-- <div class="title">{{subject.title}}</div> -->
    </div>
    <div class="description">
      <p>{{subject.content}}</p>
    </div>
    <div class="list-content">
      <list-item v-for="item in subject.curriculumDtos" :key="item.id" :data="item" pageType="newclass_specialtopic_class" pageName="课程专题页"></list-item>
    </div>
    <div class="all-course">
      <img src="@/assets/images/icons/right@2x.png">
      <span @click="handleToCourseList">查看所有课程</span>
    </div>
  </div>
</template>

<script>
import ListItem from "@/components/ListItem";
import { getSubject } from "@/api/course";
import { navTitleBridge, LSJavascriptBridgeInit } from "@/util/jsBridge";

export default {
  name: "courseSpecial",
  data() {
    return {
      subject: {}
    };
  },
  components: {
    "list-item": ListItem
  },
  created() {
    let id = this.$route.params.id;
    this.actionGetSubject(id);
    //进入专题页面
    umTrigger('newclass_specialtopic',"进入",'课程专题页_curriculumId_'+id)
    // _czc.push(["_trackEvent", 'newclass_specialtopic','进入','课程专题页_curriculumId_'+id]);
  },
  activated() {
    LSJavascriptBridgeInit(() => {
      navTitleBridge({
        title: "课程专题",
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
    handleToCourseList() {
      this.$router.push("/course-list");
    },
    actionGetSubject(id) {
      getSubject(id).then(res => {
        if (res.code === 200) {
          this.subject = res.data;
        }
      });
    },

  }
};
</script>

<style lang="less">
.special-wrap {
  .banner {
    // height: 270px;
    background: #f5f5f5;
    position: relative;
    overflow: hidden;
    img {
      display: block;
      width: 100%;
      height: auto;
      // position: absolute;
      // top: 0;
    }
    .title {
      font-size: 40px;
      padding: 0 40px;
      margin-top: 70px;
      color: #fff;
    }
  }
  .description {
    width: 684px;
    margin: 0 auto;
    padding: 15px 0;
    box-sizing: border-box;
    p {
      font-size: 28px;
      color: #414141;
    }
  }
  .list-content {
    margin-top: 80px;
  }
  .all-course {
    font-size: 26px;
    text-align: center;
    padding-bottom: 60px;
    padding-top: 40px;
    color: #414141;
    img {
      display: inline-block;
      width: 30px;
      height: 30px;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
    }
  }
}
</style>