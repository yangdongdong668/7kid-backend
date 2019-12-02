import { fetchPost, downloadPost } from '@/utils/request';

// 获取幼儿列表
export function getStudents(data) {
	return fetchPost('/kid-arch/v1/student/query-list', data);
}

// 新增学生
export function addStudent(data) {
	return fetchPost('/kid-arch/v1/student/add', data, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

// 学生退园
export function quitSchool(data) {
	return fetchPost('/kid-arch/v1/student/quit-school', data);
}

// 重新入园
export function reentry(data) {
	return fetchPost('/kid-arch/v1/student/reentry', data);
}

// 批量调班
export function changeClazz(data) {
	return fetchPost('/kid-arch/v1/student/change-clazz', data, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

// 获取学生基本信息
export function getStudentBaseInfo(data) {
	return fetchPost('/kid-arch/v1/student/get', data);
}

// 获取学生家庭信息
export function getStudentFamilyInfo(data) {
	return fetchPost('/kid-arch/v1/student/family/get', data);
}

// 获取学生扩展信息
export function getStudentExtraInfo(data) {
	return fetchPost('/kid-arch/v1/student/extra/get', data);
}

// 更改学生基本信息
export function updateStudentBaseInfo(data) {
	return fetchPost('/kid-arch/v1/student/update', data, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

// 更改学生监护人信息
export function updateStudentFamilyInfo(data) {
	return fetchPost('/kid-arch/v1/student/family/update', data, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

// 更改学生扩展信息
export function updateStudentExtraInfo(data) {
	return fetchPost('/kid-arch/v1/student/extra/update', data, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

// 导出全员花名册
export function exportStudents() {
	return downloadPost('/kid-arch/v1/file/download/student', { responseType: 'blob' });
}

/**  -----通用选项------  **/

// 获取全部的年级和班级列表
export function getGradeClasses() {
	return fetchPost('/kid-arch/v1/clazz/grade-clazz-option');
}

// 获取制定班级下学生列表
export function getClassStudents(data) {
	return fetchPost('/kid-arch/v1/student/option', data);
}

// 获取性别列表
export function getGender() {
	return fetchPost('/kid-arch/v1/option/gender');
}

// 获取血型列表
export function getBloods() {
	return fetchPost('/kid-arch/v1/option/blood-type');
}

// 获取学历列表
export const getEducations = function() {
	return fetchPost('/kid-arch/v1/option/education-level');
};

// 获取入学状态列表
export function getStudentStatus() {
	return fetchPost('/kid-arch/v1/option/student-status');
}

// 获取幼儿关系列表
export function getRelations() {
	return fetchPost('/kid-arch/v1/option/relation-type');
}

// 获取幼儿证件类型列表
export function getCardTypes() {
	return fetchPost('/kid-arch/v1/option/child-card-type');
}
