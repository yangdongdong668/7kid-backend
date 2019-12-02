import Layout from '@/layout';
const routes = [
	{
		path: '/system',
		component: Layout,
		redirect: '/system/system',
		meta: { title: 'system', level: 1 },
		hidden: true
	},
	{
		path: '/system/system',
		name: 'System_system',
		component: Layout,
		redirect: '/system/system/garden',
		meta: { title: 'system_setting', icon: 'table' },
		children: [
			{
				path: 'garden',
				component: () => import('@/views/system/system/garden'),
				meta: { title: 'garden_setting' }
			},
			{
				path: 'account',
				component: () => import('@/views/system/system/account'),
				meta: { title: 'my_account' }
			},
			{
				path: 'role/index',
				component: () => import('@/views/system/system/role/index'),
				meta: { title: 'role_permission' }
			},
			{
				path: 'role/edit',
				component: () => import('@/views/system/system/role/edit'),
				meta: { title: 'role_edit' },
				hidden: true
			},
			{
				path: 'role/add',
				component: () => import('@/views/system/system/role/add'),
				meta: { title: 'role_add' },
				hidden: true
			},

			{
				path: 'position',
				name: 'position-index',
				component: () => import('@/views/system/system/position'),
				meta: { title: 'position' }
			},
			{
				path: 'FAQ',
				component: () => import('@/views/system/system/FAQ'),
				meta: { title: 'faq' }
			},
			{
				path: 'module',
				component: () => import('@/views/system/system/module'),
				meta: { title: 'module' }
			},
			{
				path: 'semester',
				name: 'semester-index',
				component: () => import('@/views/system/system/semester/index'),
				meta: { title: 'semester' }
			}
		]
	}
];
export default routes;
