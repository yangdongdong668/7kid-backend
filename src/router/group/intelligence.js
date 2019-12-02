import Layout from '@/layout';
const routes = [
	{
		path: '/intelligence',
		redirect: '/intelligence/attendance',
		meta: { title: '智慧环境', level: 1 },
		hidden: true
	},
	{
		path: '/intelligence/attendance',
		component: Layout,
		redirect: '/intelligence/attendance/machine/index',
		meta: { title: '考勤机', icon: 'form' },
		children: [
			{
				path: 'machine/index',
				name: 'attendance-machine-index',
				component: () => import('@/views/group/intelligence/attendance/machine/index'),
				meta: { title: '考勤机' }
			},
			{
				path: 'machine/edit',
				name: 'attendance-machine-edit',
				component: () => import('@/views/group/intelligence/attendance/machine/edit'),
				meta: { title: '考勤机修改' },
				hidden: true
			},
			{
				path: 'version/index',
				name: 'attendance-machine-version',
				component: () => import('@/views/group/intelligence/attendance/version/index'),
				meta: { title: '版本管理' }
			},
			{
				path: 'version/edit',
				name: 'attendance-machine-version-edit',
				component: () => import('@/views/group/intelligence/attendance/version/edit'),
				meta: { title: '版本修改' },
				hidden: true
			}
		]
	},
	{
		path: '/intelligence/inspection',
		component: Layout,
		redirect: '/intelligence/inspection/robot/index',
		meta: { title: '晨检机器人', icon: 'form' },
		alwaysShow: true,
		children: [
			{
				path: 'robot/index',
				name: 'inspection-robot-index',
				component: () => import('@/views/group/intelligence/inspection/robot/index'),
				meta: { title: '晨检机器人' }
			},
			{
				path: 'robot/edit',
				name: 'inspection-robot-edit',
				component: () => import('@/views/group/intelligence/inspection/robot/edit'),
				meta: { title: '晨检机器人' },
				hidden: true
			}
		]
	},
	{
		path: '/intelligence/gate',
		component: Layout,
		redirect: '/intelligence/gate/machine/index',
		meta: { title: '闸机', icon: 'form' },
		children: [
			{
				path: 'machine/index',
				name: 'gate-machine',
				component: () => import('@/views/group/intelligence/gate/machine/index'),
				meta: { title: '闸机管理' }
			},
			{
				path: 'machine/edit',
				name: 'gate-machine',
				component: () => import('@/views/group/intelligence/gate/machine/edit'),
				meta: { title: '闸机修改' },
				hidden: true
			},
			{
				path: 'version/index',
				name: 'gate-machine-version',
				component: () => import('@/views/group/intelligence/gate/version/index'),
				meta: { title: '版本管理' }
			},
			{
				path: 'version/edit',
				name: 'gate-machine-version-edit',
				component: () => import('@/views/group/intelligence/gate/version/edit'),
				meta: { title: '版本修改' },
				hidden: true
			}
		]
	}
	// {
	// 	path: '/intelligence/aucard ',
	// 	component: Layout,
	// 	redirect: '/intelligence/aucard/index',
	// 	meta: { title: '阿优卡管理', icon: 'form' },
	// 	children: [
	// 		{
	// 			path: 'aucard',
	// 			name: 'aucard-index',
	// 			component: () => import('@/views/group/intelligence/aucard/index'),
	// 			meta: { title: '阿优卡管理' }
	// 		},
	// 	]
	// },
];
export default routes;
