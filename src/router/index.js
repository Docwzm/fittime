import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// import courseDetail from '@/pages/course/courseDetail'
// import videoPlayer from '@/pages/course/videoPlayer';
// import courseList from '@/pages/course/list'
// import courseSpecial from '@/pages/course/special'
// import courseShare from '@/pages/course/share'
// import coursePayment from '@/pages/course/payment'
// import systemService from '@/pages/system/service'
// import systemAgreement from '@/pages/system/agreement'

export default new Router({
  // mode: 'history',
  routes: [{
    path: '/course-detail/:id',
    name: 'courseDetail',
    component: () => import('@/pages/course/courseDetail'),
    meta: {
      keepAlive: true
    }
  }, {
    path: '/video-player/:courseId/:drillId',
    name: 'videoPlayer',
    component: () => import('@/pages/course/videoPlayer')
  }, {
    path: '/course-list',
    name: 'courseList',
    component: () => import('@/pages/course/list'),
    meta: {
      title: '课程列表',
      keepAlive: true
    }
  },
  {
    path: '/course-special/:id',
    name: 'courseSpecial',
    component: () => import('@/pages/course/special'),
    meta: {
      title: '课程专题',
      keepAlive: true
    }
  },
  {
    path: '/course-payment/:id',
    name: 'coursePayment',
    component: () => import('@/pages/course/payment'),
    meta: {
      title: '课程购买'
    }
  },
  {
    path: '/course-share/:time/:className',
    name: 'courseShare',
    component: () => import('@/pages/course/share'),
    meta: {
      title: '课程分享'
    }
  },
  {
    path: '/system-service',
    name: 'systemService',
    component: () => import('@/pages/system/service'),
    meta: {
      title: '联系客服'
    }
  }, {
    path: '/system-agreement',
    name: 'systemAgreement',
    component: () => import('@/pages/system/agreement'),
    meta: {
      title: '服务协议'
    }
  },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop;
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  }
})