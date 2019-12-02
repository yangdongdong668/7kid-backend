import Layout from '@/layout';

const routes = [
	{
		path: '/teaching',
		component: Layout,
		redirect: '/teaching/plan',
		meta: { title: 'teaching', level: 1 },
		hidden: true
	},
	{
		path: '/teaching/plan',
		name: 'Teaching_plan',
		component: Layout,
		redirect: '/teaching/plan/plan',
		meta: { title: 'teaching', icon: 'form' },
		alwaysShow: true,
		children: [
			{
				path: 'plan',
				component: () => import('@/views/teaching/plan/plan'),
				meta: { title: 'teaching_manager' }
			}
		]
	}
];

export default routes;
