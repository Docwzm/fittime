import request from '@/util/request'


/**
 * 分页查询所有课程
 * @param {*} data 
 */
const curriculumPage = (data) => {
	return request({
		url: "/opencourse_service/fitness/curriculum_page",
		method: "post",
		data
	})
}



export {
	curriculumPage
}