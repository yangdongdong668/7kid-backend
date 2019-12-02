import { fetchPost } from '@/utils/request';

// getTemporaryToken
export function getTemporaryToken(data) {
	return fetchPost('/iam/v1/web-oauth/common/token', data, {
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(res => res.token);
}

// refreshToken
export function refreshToken(data, config) {
	return fetchPost('/iam/v1/web-oauth/kid-login/teacher-refresh', data, config);
}

// getSchoolId
export function getSchoolId(data, config) {
	return fetchPost('/iam/v1/web-oauth/kid-login/teacher-school', data, config).then(res => res);
}

export function login(data, config) {
	return fetchPost('/iam/v1/web-oauth/kid-login/teacher-login?schoolId=' + data.schoolId, {}, config);
}

// export function getInfo() {
// 	return fetchGet('/user/info');
// }

export function getInfo() {
	return new Promise((resolve, reject) => {
		resolve();
	});
}

export function logout() {
	return fetchPost('/user/logout');
}
