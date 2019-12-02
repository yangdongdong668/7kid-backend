const getters = {
	device: state => state.app.device,
	language: state => state.app.language,
	token: state => state.user.token,
	refreshToken: state => state.user.refreshToken,
	avatar: state => state.user.avatar,
	name: state => state.user.name,
	visitedViews: state => state.tagsView.visitedViews,
	cachedViews: state => state.tagsView.cachedViews,
	roles: state => state.permission.roles,
	routes: state => state.permission.routes,
	schoolId: state => state.user.schoolId
};
export default getters;
