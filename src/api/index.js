import request from '@/util/request'

//获取公开课热度列表
export function getCourseList() {
    return request({
        url: '/opencourse_service/course/hotcounts',
        method: 'post'
    })
}


//公开课点击，请求添加热度
export function addHotCourse(courseKey) {
    return request({
        url: '/opencourse_service/course/add_hotcount',
        method: 'post',
        data:{
            courseKey
        }
    })
}

//获取公开课播放地址
export function getCourseDetail(courseKey) {
    return request({
        url: '/opencourse_service/course/play_address',
        method: 'post',
        data:{
            courseKey,
        }
    })
}