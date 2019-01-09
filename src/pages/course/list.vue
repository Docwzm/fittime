<template>
  <div class="list-wrap">
    <div class="list-header">
      <div class="class-box">
        <div
          v-for="item in catagory"
          :key="item.key"
          class="class-cate"
          :class="item.selected?'current-cate':''"
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
export default {
  name: "courseList",
  data() {
    return {
      catagory: [
        { key: 0, name: "减肥燃脂", selected: true },
        { key: 1, name: "夜间助眠", selected: false },
        { key: 2, name: "增肌塑形", selected: false },
        { key: 3, name: "热身拉伸", selected: false },
        { key: 4, name: "日常保健", selected: false }
      ],
      list: [{ id: 0, title: "666666" }, { id: 2, title: "666666" }]
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
      let { catagory } = this;
      let _category = catagory.map(item => {
        if (item.key === key) {
          item.selected = true;
        } else {
          item.selected = false;
        }
        return item;
      });
      this.actionGetCourseListByCate(key);
      this.category = _category;
    },
    /**
     * 根据课程类型拉取列表
     */
    actionGetCourseListByCate(key) {
      console.log(key);
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