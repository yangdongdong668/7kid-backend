<template>
	<el-container class="app-main">
		<el-aside width="200px" v-show="!isDesktop"><Sidebar /></el-aside>
		<el-main>
			<el-scrollbar style="height: 100%;">
				<transition mode="out-in">
					<keep-alive :include="cachedViews">
						<router-view :key="key" />
					</keep-alive>
				</transition>
			</el-scrollbar>
		</el-main>
	</el-container>
</template>

<script>
import Sidebar from './Sidebar/index';
export default {
	name: 'AppMain',
	components: {
		Sidebar
	},
	computed: {
		key() {
			return this.$route.path;
		},
		isDesktop() {
			return !!(
				this.$route.path === '/desktop/index' ||
				this.$route.path === '/desktop/application'
			);
		},
		cachedViews() {
			return this.$store.state.tagsView.cachedViews;
		}
	}
};
</script>

<style lang="scss" scoped>
.app-main {
	height: 100%;
	position: relative;
	overflow: hidden;
	border-radius: 6px;
	.el-main {
		padding: 0;
		.el-scrollbar {
			>>> .el-scrollbar__wrap {
				overflow-x: hidden;
				.el-scrollbar__view {
					height: 100%;
				}
			}
		}
	}
}
</style>
