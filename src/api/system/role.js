import { fetchPost } from '@/utils/request';

// 获取账户的角色列表
export const getRoleList = async function(data) {
	return await fetchPost('/kid-arch/v1/account-role/get-by-account-id', data, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
};

// 新增角色
export const addRole = async function(data) {
	return await fetchPost('/kid-arch/v1/role/add', data, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
};
