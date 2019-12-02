import axios from 'axios';
import qs from 'qs';
import { Message } from 'element-ui';
import download from '@/utils/download';

import store from '@/store';
// axios 配置
axios.defaults.timeout = 5000; // 10s
axios.defaults.baseURL = process.env.VUE_APP_BASE_API;
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

// axios interceptor
axios.interceptors.request.use(
	config => {
		if (store.getters.token && !config.headers['Authorization']) {
			config.headers['Authorization'] = 'Bearer ' + store.getters.token;
		}
		if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
			config.data = qs.stringify(config.data);
		}
		return config;
	},
	error => {
		// do something with request error
		console.log(error); // for debug
		return Promise.reject(error);
	}
);

// axios interceptor
axios.interceptors.response.use(
	/**
	 * If you want to get http information such as headers or status
	 * Please return  response => response
	 */
	response => {
		const res = response.data;
		// 如果返回的类型是 Blob 对象，直接将整个 response 返回，具体操作放到 downloadGet/downloadPost 中
		if (res.toString() === '[object Blob]') return response;

		if (res.code !== 'common-0001') {
			// if the custom code is not common-0001, it is judged as an error.
			Message({
				message: res.message || 'Error',
				type: 'error',
				duration: 3 * 1000
			});
			return Promise.reject(new Error(res.message || 'Error'));
		} else {
			return res;
		}
	},
	async error => {
		console.log('err' + error); // for debug
		if (error && error.response) {
			switch (error.response.status) {
				case 400:
					error.message = error.response.data.message || '请求失败';
					break;
				case 401:
					if (error.response.config.url.indexOf('/teacher-refresh') > -1) {
						await store.dispatch('user/removeToken');
						window.reload();
					} else if (store.getters.refreshToken) {
						// 如果存在refreshToken
						const config = error.response.config; // 记录上一次请求
						await store
							.dispatch('user/resetToken')
							.then(res => {
								error.message = '';
								// 刷新token
								config.baseURL = '';
								config.headers['Authorization'] = 'Bearer ' + store.getters.token;
								axios(config); // 发送上一次请求
							});
					} else {
						error.message = '授权失败，请重新登录';
					}
					break;
				case 403:
					error.message = '拒绝访问';
					break;
				case 404:
					error.message = `请求地址出错: ${error.response.config.url}`;
					break;
				case 500:
					if (error.response.data) {
						error.message = ' ';
						if (error.response.data.message) {
							// JAVA异常抛出辑错误信息
							error.message += error.response.data.message;
						}
					}
					break;
				default:
					error.message = error.response.data.message || '服务器异常';
			}
		}
		if (error.message) {
			Message({
				message: error.message,
				type: 'error',
				duration: 3 * 1000
			});
		}
		return Promise.reject(error);
	}
);

export function fetchPost(url, params, config) {
	return new Promise((resolve, reject) => {
		axios
			.post(url, params, config)
			.then(
				response => {
					resolve(response.data);
				},
				err => {
					reject(err);
				}
			)
			.catch(error => {
				reject(error);
			});
	});
}

export function fetchGet(url, param) {
	return new Promise((resolve, reject) => {
		axios
			.get(url, {
				params: param
			})
			.then(
				response => {
					resolve(response.data);
				},
				err => {
					reject(err);
				}
			)
			.catch(error => {
				reject(error);
			});
	});
}

export function fetchPut(url, params) {
	return new Promise((resolve, reject) => {
		axios
			.put(url, params)
			.then(
				response => {
					resolve(response.data);
				},
				err => {
					console.log(err);
					reject(err);
				}
			)
			.catch(error => {
				console.log(error);
				reject(error);
			});
	});
}

export function fetchDel(url, params) {
	return new Promise((resolve, reject) => {
		axios
			.delete(url, params)
			.then(
				response => {
					resolve(response.data);
				},
				err => {
					console.log(err);
					reject(err);
				}
			)
			.catch(error => {
				console.log(error);
				reject(error);
			});
	});
}
// 文件下载
export function downloadGet(url) {
	return new Promise((resolve, reject) => {
		axios
			.get(url, { responseType: 'blob' })
			.then(
				response => {
					// 获取具体的 data 和 headers
					const { data, headers } = response;
					// 获取文件名属性字段总值
					const patterns = /filename=.*.xls/.exec(headers['content-disposition']),
						fileName = decodeURIComponent(patterns[0] || 'filename=download.xls').substr(9);

					// 下载文件
					download(data, fileName);
					resolve();
				},
				err => {
					reject(err);
				}
			)
			.catch(error => {
				reject(error);
			});
	});
}

// 文件下载
export function downloadPost(url, params) {
	return new Promise((resolve, reject) => {
		axios
			.post(url, params, { responseType: 'blob' })
			.then(
				response => {
					// 获取具体的 data 和 headers
					const { data, headers } = response;
					// 获取文件名属性字段总值
					const patterns = /filename=.*.xls/.exec(headers['content-disposition']),
						fileName = decodeURIComponent(patterns[0] || 'filename=download.xls').substr(9);

					// 下载文件
					download(data, fileName);
					resolve();
				},
				err => {
					reject(err);
				}
			)
			.catch(error => {
				reject(error);
			});
	});
}

export default {
	fetchPost,
	fetchGet,
	fetchPut,
	fetchDel,
	downloadGet,
	downloadPost
};
