import request from '@/util/request'

//播放完成时 将该训练视频设置为已完成训练状态
export function setCourseDone({courseKey}) {
    return request({
        url: '/opencourse_service/course/play_address',
        method: 'post',
        data:{
            courseKey,
        }
    })
}


export function getCourse(){
    return request({
        url: '/opencourse_service/fitness/curriculum_page',
        method: 'post',
        data:{
            "classify":"减脂",
            "offset":0,
            "pageSize":10
        }
    })
}

//获取课程详情
export function getCourseDetail({curriculumId}){
    return request({
        url: '/opencourse_service/fitness/get_curriculum_info',
        method: 'get',
        data:{
            curriculumId,
        }
    })
}



