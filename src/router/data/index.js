import Layout from '@/layout';
const routes = [
	{
		path: '/data',
		component: Layout,
		redirect: '/data/overview/overview',
		meta: { title: 'data', level: 1 },
		hidden: true
	},
	{
		path: '/data/overview',
		name: 'Data_overview',
		component: Layout,
		redirect: '/data/overview/overview',
		meta: { title: 'overview', icon: 'table' },
		alwaysShow: true,
		children: [
			{
				path: 'overview',
				component: () => import('@/views/data/overview/index'),
				meta: { title: 'data_overview' }
			}
		]
	},
	{
		path: '/data/health',
		name: 'Data_health',
		component: Layout,
		redirect: '/data/health/monthlyCheck',
		meta: { title: 'data_health', icon: 'example' },
		children: [
			{
				path: 'monthlyCheck',
				component: () => import('@/views/data/health/monthlyCheck'),
				meta: { title: 'monthly_check' }
			},
			{
				path: 'dailyCheck',
				component: () => import('@/views/data/health/dailyCheck'),
				meta: { title: 'daily_check' }
			},
			{
				path: 'allergen',
				component: () => import('@/views/data/health/allergen'),
				meta: { title: 'allergen' }
			}
		]
	},
	{
		path: '/data/attendance',
		name: 'Data_attendance',
		component: Layout,
		redirect: '/data/attendance/overview',
		meta: { title: 'data_attendance', icon: 'form' },
		children: [
			{
				path: 'overview',
				component: () => import('@/views/data/attendance/overview'),
				meta: { title: 'attendance_overview' }
			},
			{
				path: 'monthly',
				component: () => import('@/views/data/attendance/monthly'),
				meta: { title: 'monthly_attendance' }
			},
			{
				path: 'daily',
				component: () => import('@/views/data/attendance/daily'),
				meta: { title: 'daily_attendance' }
			}
		]
	}
];

export default routes;
