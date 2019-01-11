import request from '@/util/request'

/**
 * 获取课程详情
 * @export
 * @param {*} {curriculumId:课程id}
 * @returns
 */
export function getCourseDetail({curriculumId}){
    return request({
        url: '/opencourse_service/fitness/get_curriculum_info',
        method: 'get',
        params:{
            curriculumId,
        }
    })
}


/**
 * 加入课程
 * @export
 * @param {*} {curriculumId:课程ID,deadline:课程期限}
 * @returns
 */
export function joinCourse({curriculumId,deadline}){
    return request({
        url: '/opencourse_service/fitness/plan_curriculum',
        method: 'get',
        params:{
            curriculumId,
            deadline
        }
    })
}


/**
 * 删除课程
 * @export
 * @param {*} {curriculumId:课程ID}
 * @returns
 */
export function delCourse({curriculumId}){
    return request({
        url: '/opencourse_service/fitness/del_plan_curriculum',
        method: 'get',
        params:{
            curriculumId
        }
    })
}

/**
 * 完成训练
 * @export
 * @param {*} {curriculumId:课程ID,drillId:训练ID}
 * @returns
 */
export function finishCourse({curriculumId,drillId}){
    return request({
        url: '/opencourse_service/fitness/accomplish_drill',
        method: 'get',
        params:{
            curriculumId,
            drillId
        }
    })
}



