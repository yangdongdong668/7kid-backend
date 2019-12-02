<template>
	<div class="header-right">
		<lang-select class="lang-select hover-effect" />
		<el-menu
			class="user-menu"
			mode="horizontal"
			text-color="#ffffff"
			unique-opened
			menu-trigger="click"
		>
			<el-submenu index="1" :popper-append-to-body="false">
				<div slot="title" class="user-info">
					<el-avatar :size="36" :src="require('../../../assets/avatar_6.jpg')"></el-avatar>
					<span class="user-name">大老师</span>
				</div>
				<el-menu-item index="user-info">用户信息</el-menu-item>
				<el-menu-item index="logout" @click="logout">退出</el-menu-item>
			</el-submenu>
		</el-menu>
	</div>
</template>

<script>
import { mapActions } from 'vuex';
import LangSelect from '@/components/LangSelect';
export default {
	name: 'header-right',
	components: {
		LangSelect
	},
	methods: {
		...mapActions(['user/logout']),
		async logout() {
			await this['user/logout']();
			// 返回到登陆页面
			this.$router.push({ name: 'login' });
		}
	}
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.header-right {
	color: $whiteText;
	padding: 0 40px;
	height: 100%;
}

.lang-select {
	display: inline-block;
	padding: 8px;
	height: 100%;
	font-size: 24px;
	color: #fff;
	vertical-align: text-bottom;
	&.hover-effect {
		cursor: pointer;
		transition: background 0.3s;
		&:hover {
			background: rgba(0, 0, 0, 0.025);
		}
	}
}

.user-info {
	height: 100%;
	width: 120px;
	cursor: pointer;

	display: inline-block;
	line-height: 50px;
	vertical-align: top;

	.user-name {
		padding-left: 15px;
		font-size: 14px;
		line-height: 17px;
	}
}

// el-menu hack
.user-menu {
	display: inline-block;
	background: transparent;
}
.el-menu.el-menu--horizontal {
	border-width: 0;
}
.el-menu--horizontal > .el-menu-item {
	height: 50px;
	line-height: 50px;
}

.el-menu--horizontal > .el-submenu >>> .el-submenu__title {
	height: 50px;
	line-height: 50px;
}

.el-submenu >>> .el-submenu__title i {
	color: #ffffff;
	font-weight: 900;
}

.el-menu--horizontal > .el-submenu >>> .el-submenu__title:hover {
	background: rgba(255, 255, 255, 0.15);
}

.el-submenu >>> .el-menu--horizontal {
	background: transparent;
	top: 40px !important;
}
.el-submenu >>> .el-menu--horizontal .el-menu--popup {
	min-width: 180px;
}
.el-submenu >>> .el-menu--horizontal .el-menu {
	.el-menu-item {
		background: transparent;
		width: 180px;
		min-width: 180px;
		color: #333333 !important;
		text-align: center;

		&:hover {
			background: #f2f2f2;
			color: #4ac9c3 !important;
		}
	}
	.el-menu-item.is-active {
		color: #4ac9c3 !important;
	}
}
.el-menu--horizontal > .el-submenu.is-active >>> .el-submenu__title {
	color: #ffffff;
}

.el-submenu >>> .el-icon-arrow-down:before {
	content: "\E790";
}
</style>
