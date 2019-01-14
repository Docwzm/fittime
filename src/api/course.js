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

/**
 * 获取课程分类
 */
const getClassify = () => {
	return request({
		url:'/opencourse_service/fitness/get_classify'
	})
}

/**
 * 课程订单信息
 * @param {*} curriculumId 
 */
const payInfo = (curriculumId) => {
	return request({
		url: `/opencourse_service/fitness/get_curriculum_ft?curriculumId=` + curriculumId,
		method: "post"
	})
}

/**
 * 创建订单
 * @param {*} data 
 */
const createOrder = (data) => {
	return request({
		url: '/opencourse_service/fitness/create_ft_order',
		method: "post",
		data
	})
}

/**
 * 购买课程
 * 支付完成的回调
 * @param {*} curriculumId 
 */
const buyCourse = (curriculumId) => {
	return request({
		url: "/opencourse_service/fitness/buy_curriculum?curriculumId=" + curriculumId
	})
}

/**
 * 获取专题内容
 * @param {*} subjectId 
 */
const getSubject = (subjectId) => {
	return request({
		url: "/opencourse_service/fitness/subject_curriculum?subjectId=" + subjectId,
	})
}



export {
	curriculumPage,
	payInfo,
	createOrder,
	buyCourse,
	getSubject,
	getClassify
}