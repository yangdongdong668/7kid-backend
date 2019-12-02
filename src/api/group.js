import { fetchPost } from '@/utils/request';
// 获取所有学校信息
export function getSchoolList(data) {
	return fetchPost('/kid-arch/v1/school/listIdAndTitleAllSchool', data);
}

// 智慧环境

// 考勤机
// 获取智能考勤机列表
export function getAttendanceMachineList(data) {
	return fetchPost('/attendance/v1/superAdmin/machineKQ/getList', data);
}

// 获取智能考勤机详情
export function getAttendanceMachineDetail(data) {
	return fetchPost('/attendance/v1/superAdmin/machineKQ/getInfoById', data);
}

// 智能考勤机修改
export function updateAttendanceMachine(data) {
	return fetchPost('/attendance/v1/superAdmin/machineKQ/doUpdate', data, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

// 获取考勤机版本列表
export function getMachineVersionList(data) {
	return fetchPost('/attendance/v1/superAdmin/machineApk/getList', data);
}

// 根据主键获取考勤机版本详情
export function getMachineVersionDetail(data) {
	return fetchPost('/attendance/v1/superAdmin/machineApk/getInfoById', data);
}

// 新增考勤机版本
export function addMachineVersion(data) {
	return fetchPost('/attendance/v1/superAdmin/machineApk/doAdd', data, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

// 修改考勤机版本
export function updateMachineVersion(data) {
	return fetchPost('/attendance/v1/superAdmin/machineApk/doUpdate', data, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

// 删除考勤机版本
export function deleteMachineVersion(data) {
	return fetchPost('/attendance/v1/superAdmin/machineApk/doDelete', data, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

// 晨检机器人
// 获取晨检机器人列表
export function getInspectionRobotList(data) {
	return fetchPost('/attendance/v1/superAdmin/machineInepection/getList', data);
}

// 获取晨检机器人详情
export function getInspectionRobotDetail(data) {
	return fetchPost('/attendance/v1/superAdmin/machineInepection/getInfoById', data);
}

// 新增晨检机器人详情
export function addInspectionRobotDetail(data) {
	return fetchPost('/attendance/v1/superAdmin/machineInepection/doAdd', data, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

// 修改晨检机器人详情
export function updateInspectionRobotDetail(data) {
	return fetchPost('/attendance/v1/superAdmin/machineInepection/doUpdate', data, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

// 闸机
// 获取闸机列表
export function getGateMachineList(data) {
	return fetchPost('/attendance/v1/superAdmin/machineZJ/getList', data);
}

// 获取闸机详情
export function getGateMachineDetail(data) {
	return fetchPost('/attendance/v1/superAdmin/machineZJ/getInfoById', data);
}

// 闸机修改
export function updateGateMachine(data) {
	return fetchPost('/attendance/v1/superAdmin/machineZJ/doUpdate', data, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

// 获取闸机版本列表
export function getGateVersionList(data) {
	return fetchPost('/attendance/v1/superAdmin/machineApkZJ/getList', data);
}

// 根据主键获取闸机版本详情
export function getGateVersionDetail(data) {
	return fetchPost('/attendance/v1/superAdmin/machineApkZJ/getInfoById', data);
}

// 新增闸机版本
export function addGateVersion(data) {
	return fetchPost('/attendance/v1/superAdmin/machineApkZJ/doAdd', data, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

// 修改闸机版本
export function updateGateVersion(data) {
	return fetchPost('/attendance/v1/superAdmin/machineApkZJ/doUpdate', data, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

// 删除闸机版本
export function deleteGateVersion(data) {
	return fetchPost('/attendance/v1/superAdmin/machineApkZJ/doDelete', data, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
