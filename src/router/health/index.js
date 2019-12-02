import Layout from '@/layout';
const routes = [
	{
		path: '/health',
		component: Layout,
		redirect: '/health/nutrition',
		meta: { title: 'health', level: 1 },
		hidden: true
	},
	{
		path: '/health/nutrition',
		name: 'Health_nutrition',
		component: Layout,
		redirect: '/health/nutrition/recipe/index',
		meta: { title: 'nutrition', icon: 'table' },
		children: [
			{
				path: 'recipe/index',
				component: () => import('@/views/health/nutrition/recipe/index'),
				meta: { title: 'recipe' }
			},
			{
				path: 'recipe/edit',
				component: () => import('@/views/health/nutrition/recipe/edit'),
				meta: { title: 'recipe_edit' },
				hidden: true
			},
			{
				path: 'menu',
				component: () => import('@/views/health/nutrition/menu'),
				meta: { title: 'menu' }
			}
		]
	},
	{
		path: '/health/health',
		name: 'Health_health',
		component: Layout,
		redirect: '/health/health/health',
		meta: { title: 'health_manager', icon: 'table' },
		children: [
			{
				path: 'health',
				component: () => import('@/views/health/health/health'),
				meta: { title: 'health_manager' }
			},
			{
				path: 'dailyCheck',
				component: () => import('@/views/health/health/dailyCheck'),
				meta: { title: '晨检日报' }
			},
			{
				path: 'monthlyCheck',
				component: () => import('@/views/health/health/monthlyCheck'),
				meta: { title: '晨检月报' }
			},
			{
				path: 'allergen',
				component: () => import('@/views/health/health/allergen'),
				meta: { title: 'statistic_allergen' }
			},
			{
				path: 'history',
				component: () => import('@/views/health/health/history'),
				meta: { title: 'medical_history' }
			}
		]
	}
];
export default routes;
