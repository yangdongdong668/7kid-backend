import { fetchPost } from '@/utils/request';

// 健康管理
// 既往史记录

// 根据条件分页查找既往史
export function getMedicalHistoryList(data) {
	return fetchPost('/attendance/v1/admin/medicalHistoryStudent/getList', data);
}

