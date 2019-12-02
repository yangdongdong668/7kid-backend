import { fetchPost } from '@/utils/request';

// 查询某个学校的学期信息
export const getTermBySchoolId = async function(data) {
	return await fetchPost('/kid-arch/v1/schoolTerm/listBySchoolId', data);
};

// 新增学期
export const addNewTerm = async function(data) {
	return await fetchPost('/kid-arch/v1/schoolTerm/add', data, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
};
// 修改学期
export const updateNewTerm = async function(data) {
	return await fetchPost('/kid-arch/v1/schoolTerm/update', data, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
};
// 查询学期信息
export const searchTerm = async function(data) {
	return await fetchPost('/kid-arch/v1/schoolTerm/getById', data);
};
