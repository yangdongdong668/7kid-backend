import Vue from 'vue';
import Vuex from 'vuex';
import persistedState from 'vuex-persistedstate';
import getters from './getters';

Vue.use(Vuex);

const modulesFiles = require.context('./modules', true, /\.js$/),
	// you do not need `import app from './modules/app'`
	// it will auto require all vuex module from modules file
	modules = modulesFiles.keys().reduce((modules, modulePath) => {
		// set './app.js' => 'app'
		const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1'),
			value = modulesFiles(modulePath);
		modules[moduleName] = value.default;
		return modules;
	}, {}),
	store = new Vuex.Store({
		modules,
		getters,
		plugins: [persistedState({
			reducer(state) {
				return {
					user: state.user,
					app: state.app,
					tagsView: state.tagsView
				};
			}
		})]
	});

export default store;
