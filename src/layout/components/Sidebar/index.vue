<template>
	<div class="sidebar-container">
		<el-scrollbar wrap-class="scrollbar-wrapper">
			<el-menu
				:default-active="activeMenu"
				:collapse=false
				:background-color="variables.menuBg"
				:text-color="variables.menuText"
				:unique-opened="false"
				:active-text-color="variables.menuActiveText"
				:collapse-transition="false"
				mode="vertical"
			>
				<sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
			</el-menu>
		</el-scrollbar>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import SidebarItem from './SidebarItem';
import variables from '@/styles/variables.scss';

export default {
	name: 'Sidebar',
	components: { SidebarItem },
	computed: {
		...mapGetters({
			sidebar: 'sidebar'
		}),
		routes() {
			var path = this.$route.fullPath, reg = /\/(.+?)\//, column = path.match(reg) === null ? 'desktop' : path.match(reg)[1];
			return this.$store.state.permission.routes.filter(
				item => item.path.indexOf(column) === 1
			);
		},
		activeMenu() {
			const route = this.$route, { meta, path } = route;
			// if set path, the sidebar will highlight the path you set
			if (meta.activeMenu) {
				return meta.activeMenu;
			}
			return path;
		},
		variables() {
			return variables;
		}
	}
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.sidebar-container {
	transition: width 0.28s;
	width: $sideBarWidth !important;
	background-color: $menuBg;
	position: absolute;
	font-size: 0px;
	top: 0;
	bottom: 0;
	z-index: 1001;
	overflow: hidden;

	/*reset element-ui css*/
	.horizontal-collapse-transition {
		transition: 0s width ease-in-out, 0s padding-left ease-in-out,
			0s padding-right ease-in-out;
	}

	>>> .scrollbar-wrapper {
		overflow-x: hidden !important;
 	}

	.el-scrollbar__bar.is-vertical {
		right: 0px;
	}

	.el-scrollbar {
		height: 100%;
	}

	.is-horizontal {
		display: none;
	}

	a {
		display: inline-block;
		width: 100%;
		overflow: hidden;
	}

	.svg-icon {
		margin-right: 16px;
	}

	.el-menu {
		border: none;
		height: 100%;
		width: 100% !important;
	}

	/*menu hover*/
	.submenu-title-noDropdown,
	.el-submenu__title {
		font-weight: 600;
		font-size: 16px;

		&:hover {
			background-color: $menuHover !important;
		}

		i {
			color: #fff;
		}
	}

	.is-active > .el-submenu__title {
		color: $subMenuActiveText !important;
	}

	& .nest-menu .el-submenu > .el-submenu__title,
	& .el-submenu .el-menu-item {
		min-width: $sideBarWidth !important;
		background-color: $subMenuBg !important;

		&.is-active {
			background-color: $subMenuHover !important;
		}

		&:hover {
			background-color: $subMenuHover !important;
		}
	}
}
</style>
