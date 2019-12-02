import Layout from '@/layout';
const routes = [
	{
		path: '/garden',
		component: Layout,
		redirect: '/garden/member',
		meta: { title: 'garden', level: 1 },
		hidden: true
	},
	{
		path: '/garden/member',
		name: 'Garden-member',
		component: Layout,
		redirect: '/garden/member/student',
		meta: { title: 'member_manager', icon: 'form' },
		children: [
			{
				path: 'student',
				name: 'student-index',
				component: () => import('@/views/garden/member/student/index'),
				meta: { title: 'student_manager' }
			},
			{
				path: 'student/add',
				name: 'student-add',
				component: () => import('@/views/garden/member/student/add'),
				meta: { title: '新增幼儿' },
				hidden: true
			},
			{
				path: 'student/info',
				name: 'student-info',
				component: () => import('@/views/garden/member/student/info'),
				meta: { title: '幼儿详情' },
				hidden: true
			},
			{
				path: 'student/edit',
				name: 'student-edit',
				component: () => import('@/views/garden/member/student/edit'),
				meta: { title: '修改幼儿' },
				hidden: true
			},
			{
				path: 'staff/index',
				name: 'staff-index',
				component: () => import('@/views/garden/member/staff/index'),
				meta: { title: 'staff_manager' }
			},
			{
				path: 'staff/edit',
				name: 'staff-edit',
				component: () => import('@/views/garden/member/staff/edit'),
				meta: { title: 'staff_edit' },
				hidden: true
			},
			{
				path: 'class/index',
				name: 'class-index',
				component: () => import('@/views/garden/member/class/index'),
				meta: { title: 'class_manager' }
			},
			{
				path: 'class/view',
				name: 'class-view',
				component: () => import('@/views/garden/member/class/view'),
				meta: { title: 'class_view' },
				hidden: true
			},
			{
				path: 'class/edit',
				name: 'class-edit',
				component: () => import('@/views/garden/member/class/edit'),
				meta: { title: 'class_edit' },
				hidden: true
			},
			{
				path: 'grade',
				name: 'grade-index',
				component: () => import('@/views/garden/member/grade'),
				meta: { title: 'grade_manager' }
			}
		]
	},
	{
		path: '/garden/attendance',
		name: 'Garden_attendance',
		component: Layout,
		redirect: '/garden/attendance/infant/grade',
		meta: { title: 'attendance_manager', icon: 'form' },
		children: [
			{
				path: 'infant/grade',
				component: () => import('@/views/garden/attendance/infant/grade'),
				meta: { title: 'attendance_infant' }
			},
			{
				path: 'infant/class',
				component: () => import('@/views/garden/attendance/infant/class'),
				meta: { title: 'attendance_infant' },
				hidden: true
			},
			{
				path: 'card',
				component: () => import('@/views/garden/attendance/card'),
				meta: { title: 'attendance_card' }
			}
		]
	}
];
export default routes;
