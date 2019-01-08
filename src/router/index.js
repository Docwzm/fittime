import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import courseDetail from '@/pages/courseDetail'
import videoPlayer from '@/pages/videoPlayer';
import courseList from '@/pages/course/list'
import courseSpecial from '@/pages/course/special'
import courseShare from '@/pages/course/share'

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/course-detail',
      name: 'courseDetail',
      component: courseDetail,
      meta: {
        title: '课程详情'
      }
    },{
      path: '/video-player',
      name: 'videoPlayer',
      component: videoPlayer
    }, {
      path: '/course-list',
      name: 'courseList',
      component: courseList,
      meta: {
        title: '课程列表'
      }
    },
    {
      path: '/course-special',
      name: 'courseSpecial',
      component: courseSpecial,
      meta: {
        title: '课程专题'
      }
    },
    {
      path: '/course-share',
      name: 'courseShare',
      component: courseShare,
      meta: {
        title: '课程分享'
      }
    },
  ]
  // scrollBehavior(to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition
  //   }
  //   else {
  //     return { x: 0, y: 1 }
  //   }
  // }
})