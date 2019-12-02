import { refreshToken, login, getInfo } from '@/api/user';
import { resetRouter } from '@/router';

const state = {
		token: '',
		refreshToken: '',
		accountId: '',
		teacherId: '',
		schoolId: '',
		name: '',
		avatar: ''
	},
	mutations = {
		SET_TOKEN: (state, token) => {
			state.token = token;
		},
		SET_REFRESHTOKEN: (state, refreshToken) => {
			state.refreshToken = refreshToken;
		},
		SET_NAME: (state, name) => {
			state.name = name;
		},
		SET_AVATAR: (state, avatar) => {
			state.avatar = avatar;
		},
		SET_SCHOOLID: (state, schoolId) => (state.schoolId = schoolId),
		SET_ACCOUNTID: (state, accountId) => (state.accountId = accountId),
		SET_TEACHERID: (state, teacherId) => (state.teacherId = teacherId)
	},
	actions = {
		// user login
		async login({ commit }, userInfo) {
			await login(userInfo,
				{
					headers: {
						Authorization: 'Bearer ' + userInfo.temptoken
					}
				}
			).then(res => {
				commit('SET_TOKEN', res.token);
				commit('SET_REFRESHTOKEN', res.refreshToken);
				commit('SET_SCHOOLID', res.schoolId);
				commit('SET_ACCOUNTID', res.accountId);
				commit('SET_TEACHERID', res.teacherId);
			});
		},
		// get user info
		getInfo({ dispatch, commit, state }) {
			return new Promise((resolve, reject) => {
				getInfo()
					.then(response => {
						const data = {
							name: '大老师',
							avatar: '',
							roles: ['admin']
						};
						const { name, avatar, roles } = data;
						commit('SET_NAME', name);
						commit('SET_AVATAR', avatar);
						dispatch('permission/setRoles', roles, { root: true });
						resolve(data);
					})
					.catch(error => {
						reject(error);
					});
			});
		},

		// user logout
		logout({ dispatch, state }) {
			dispatch('removeToken');
			dispatch('permission/setRoles', [], { root: true });
			resetRouter();
		},

		// reset token
		resetToken({ commit, state }) {
			return new Promise((resolve, reject) => {
				refreshToken({}, {
					headers: {
						'Authorization': 'Bearer ' + state.refreshToken
					}
				}).then(res => {
					commit('SET_TOKEN', res.token);
					commit('SET_REFRESHTOKEN', res.refreshToken);
					resolve(res);
				});
			});
		},

		removeToken({ commit }) {
			commit('SET_TOKEN', '');
			commit('SET_REFRESHTOKEN', '');
		}
	};

export default {
	namespaced: true,
	state,
	mutations,
	actions
};
