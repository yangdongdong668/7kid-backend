import Layout from '@/layout';
const routes = [
	{
		path: '/brand',
		component: Layout,
		redirect: '/brand/brand',
		meta: { title: 'brand', level: 1 },
		hidden: true
	},
	{
		path: '/brand/brand',
		name: 'Brand_brand',
		component: Layout,
		redirect: '/brand/brand/web_pc',
		meta: { title: 'brand_promotion', icon: 'table' },
		children: [
			{
				path: 'web_pc',
				component: () => import('@/views/brand/brand/web_pc'),
				meta: { title: 'web_pc' }
			},
			{
				path: 'web_pc_en',
				component: () => import('@/views/brand/brand/web_pc_en'),
				meta: { title: 'web_pc_en' }
			},
			{
				path: 'web_mobile',
				component: () => import('@/views/brand/brand/web_mobile'),
				meta: { title: 'web_mobile' }
			},
			{
				path: 'web_mobile_en',
				component: () => import('@/views/brand/brand/web_mobile_en'),
				meta: { title: 'web_mobile_en' }
			},
			{
				path: 'recruit',
				component: () => import('@/views/brand/brand/recruit'),
				meta: { title: 'recruit' }
			},
			{
				path: 'attendance_machine',
				component: () => import('@/views/brand/brand/attendance_machine'),
				meta: { title: 'attendance_machine' }
			}
		]
	},
	{
		path: '/brand/visit',
		name: 'Brand_visit',
		component: Layout,
		redirect: '/brand/visit/visit',
		meta: { title: 'brand_visit', icon: 'table' },
		children: [
			{
				path: 'visit',
				component: () => import('@/views/brand/visit/visit'),
				meta: { title: 'visit_manager' }
			}
		]
	},
	{
		path: '/brand/consult',
		name: 'Brand_consult',
		component: Layout,
		redirect: '/brand/consult/consult',
		meta: { title: 'brand_consult', icon: 'table' },
		children: [
			{
				path: 'consult',
				component: () => import('@/views/brand/consult/consult'),
				meta: { title: 'consult_list' }
			}
		]
	},
	{
		path: '/brand/employ',
		name: 'Brand_employ',
		component: Layout,
		redirect: '/brand/employ/employ',
		meta: { title: 'employ', icon: 'table' },
		children: [
			{
				path: 'employ',
				component: () => import('@/views/brand/employ/employ'),
				meta: { title: 'employ' }
			}
		]
	}
];
export default routes;
