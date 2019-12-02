import Layout from '@/layout';
const routes = [
	{
		path: '/finance',
		component: Layout,
		redirect: '/finance/charge',
		meta: { title: 'finance', level: 1 },
		hidden: true
	},
	{
		path: '/finance/charge',
		name: 'Finance_charge',
		component: Layout,
		redirect: '/finance/charge/online',
		meta: { title: 'finance_charge', icon: 'table' },
		children: [
			{
				path: 'online',
				component: () => import('@/views/finance/charge/online'),
				meta: { title: 'charge_online' }
			},
			{
				path: 'offline',
				component: () => import('@/views/finance/charge/offline'),
				meta: { title: 'charge_offline' }
			},
			{
				path: 'arrearage',
				component: () => import('@/views/finance/charge/offline'),
				meta: { title: 'charge_arrearage' }
			},
			{
				path: 'setting',
				component: () => import('@/views/finance/charge/setting'),
				meta: { title: 'charge_setting' }
			}
		]
	},
	{
		path: '/finance/refund',
		name: 'Finance_refund',
		component: Layout,
		redirect: '/finance/refund/settlement',
		meta: { title: 'refund_manager', icon: 'table' },
		children: [
			{
				path: 'settlement',
				component: () => import('@/views/finance/refund/settlement'),
				meta: { title: 'refund_settlement' }
			},
			{
				path: 'note',
				component: () => import('@/views/finance/refund/note'),
				meta: { title: 'refund_note' }
			},
			{
				path: 'setting',
				component: () => import('@/views/finance/refund/setting'),
				meta: { title: 'refund_setting' }
			}
		]
	}
];
export default routes;
