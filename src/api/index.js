import request from '@/util/request'

//获取公开课热度列表
export function getCourseDetail({courseKey}) {
    return request({
        url: '/opencourse_service/course/play_address',
        method: 'post',
        data:{
            courseKey,
        }
    })
}