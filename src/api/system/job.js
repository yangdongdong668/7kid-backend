import { fetchPost } from '@/utils/request';

// 角色

// getRoleList
export function getRoleList(data) {
	return fetchPost('/kid-arch/v1/role/get', data);
}

// 岗位

// 获取岗位列表
export function getJobList(data) {
	return fetchPost('/kid-arch/v1/job/listByOrganizationId', data);
}

// 新增岗位
export function addJob(data) {
	return fetchPost('/kid-arch/v1/job/add', data, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

// 修改岗位
export function updateJob(data) {
	return fetchPost('/kid-arch/v1/job/update', data, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

// 删除岗位
export function deleteJob(data) {
	return fetchPost('/kid-arch/v1/job/delById', data);
}

