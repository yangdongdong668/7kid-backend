import { fetchPost, downloadPost } from '@/utils/request';

// 教职工

// 根据条件分页查找教职工列表
export function getTeacherList(data) {
	return fetchPost('/kid-arch/v1/accountTeacher/find', data);
}

// 获取教职工及岗位信息
export function getTeacherJobList(data) {
	return fetchPost('/kid-arch/v1/accountTeacher/listTeacherAndJobsBySchool', data, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

// 获取教职工详情
export function getTeacherDetail(data) {
	return fetchPost('/kid-arch/v1/accountTeacher/getById', data, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

// 添加教职工信息
export function addTeacher(data) {
	return fetchPost('/kid-arch/v1/accountTeacher/add', data, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

// 修改教职工信息
export function updateTeacher(data) {
	return fetchPost('/kid-arch/v1/accountTeacher/update', data, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

// 年级

// 获取年级列表（下拉框）
export function getGradeList(data) {
	return fetchPost('/kid-arch/v1/grade/query-grade-option', data);
}

// 分页获取年级列表
export function getGradeListByPage(data) {
	return fetchPost('/kid-arch/v1/grade/query-list', data);
}

// 添加年级信息
export function addGrade(data) {
	return fetchPost('/kid-arch/v1/grade/add', data, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

// 修改年级信息
export function updateGrade(data) {
	return fetchPost('/kid-arch/v1/grade/update', data, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

// 删除年级
export function deleteGrade(data) {
	return fetchPost('/kid-arch/v1/grade/delete', data);
}

// 班级

// 获取班级列表（下拉框）
export function getClassList(data) {
	return fetchPost('/kid-arch/v1/clazz/query-class-option', data);
}

// 分页获取班级信息
export function getClassListByPage(data) {
	return fetchPost('/kid-arch/v1/clazz/query-list', data);
}

// 获取班级信息详情
export function getClassDetail(data) {
	return fetchPost('/kid-arch/v1/clazz/detail', data);
}

// 分页获取该班级下学生列表
export function getStudentListOfClazz(data) {
	return fetchPost('/kid-arch/v1/student/list-of-clazz', data);
}

// 从班级移除某个学生
export function removeStudentOfClazz(data) {
	return fetchPost('/kid-arch/v1/student/remove', data);
}

// 下载班级学生信息excel
export function downloadStudentsInfo(data) {
	return downloadPost('/kid-arch/v1/file/download/clazz/student', data);
}

// 绑定学生考勤卡
export function bindTimeCard(data) {
	return fetchPost('/attendance/v1/admin/card/doBindingCard', data, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

// 新增班级
export function addClass(data) {
	return fetchPost('/kid-arch/v1/clazz/add', data, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

// 修改班级信息
export function updateClass(data) {
	return fetchPost('/kid-arch/v1/clazz/update', data, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

// 删除班级
export function deleteClass(data) {
	return fetchPost('/kid-arch/v1/clazz/delete', data);
}

// 批量升班
export function upgradeClass(data) {
	return fetchPost('/kid-arch/v1/clazz/upgrade', data, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

// 批量毕业
export function graduateClass(data) {
	return fetchPost('/kid-arch/v1/clazz/graduate', data);
}

// 考勤管理
// 幼儿出勤
export function getClassAttendanceStatistics(data) {
	return fetchPost('/attendance/v1/admin/s2/getClazzStatistics', data);
}

