<template>
	<el-container class="app-wrapper">
	  <el-header height="50px"><kid-header /></el-header>
	  <el-main><app-main /></el-main>
	</el-container>
</template>

<script>
import { AppMain, KidHeader } from './components';
import ResizeMixin from './mixin/ResizeHandler';
import { mapState } from 'vuex';
export default {
	name: 'Layout',
	components: {
		AppMain,
		KidHeader
	},
	mixins: [ResizeMixin]
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.el-header {
	padding: 0;
}
.el-main {
	padding-bottom: 0;
}
.app-wrapper {
	@include clearfix;
	width: 100%;
	height: 100%;
}
</style>
