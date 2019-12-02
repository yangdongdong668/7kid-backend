import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import brand from './brand';
import data from './data';
import finance from './finance';
import garden from './garden';
import health from './health';
import system from './system';
import teaching from './teaching';
import group from './group'; // TODO 集团园后台模块 待拆分

/* Layout */
import Layout from '@/layout';

// 修改 vue-router 原型链，不用 promise 方式
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err);
};

const errorRoutes = [{ path: '*', redirect: '/404', hidden: true }];

export const constantRoutes = [
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login/index'),
		hidden: true
	},
	{
		path: '/404',
		component: () => import('@/views/404'),
		hidden: true
	},
	{
		path: '/',
		redirect: '/desktop'
	},
	{
		path: '/desktop',
		component: Layout,
		redirect: '/desktop/index',
		children: [
			{
				path: 'index',
				name: 'index',
				component: () => import('@/views/desktop/index'),
				meta: { title: 'desktop', affix: true }
			},
			{
				path: 'application',
				name: 'application',
				component: () => import('@/views/desktop/application'),
				meta: { title: 'application', affix: true }
			}
		]
	}
];

export const asyncRoutes = [...brand, ...data, ...finance, ...garden, ...health, ...system, ...teaching, ...group, ...errorRoutes];

const createRouter = () => {
	return new Router({
		// mode: 'history', // require service support
		scrollBehavior: () => ({ y: 0 }),
		routes: constantRoutes
	});
};

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
	const newRouter = createRouter();
	router.matcher = newRouter.matcher; // reset router
}

export default router;
