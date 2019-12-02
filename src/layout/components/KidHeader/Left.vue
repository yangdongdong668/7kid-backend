<template>
	<div class="header-left">
		<div class="school-info">
			<img class="logo" src="../../../assets/logo.png" alt />
			<div class="school-name">菲园幼儿园</div>
		</div>
		<header-routes />
	</div>
</template>

<script>
import HeaderRoutes from './Routes.vue';
export default {
	name: 'header-left',
	components: { HeaderRoutes }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.header-left {
	color: $whiteText;
	height: 100%;
}
.school-info {
	height: 100%;

	display: inline-flex;
	flex-flow: row nowrap;
	justify-content: flex-start;
	align-items: center;

	.logo {
		height: 20px;
		padding: 0 15px;
	}

	.school-name {
		font-size: 14px;
	}

	&::after {
		content: "";
		display: inline-block;
		height: 30px;
		width: 1px;
		padding: 10px 0;
		margin: 0 -4px 0 25px;
		background: rgba(255, 255, 255, 0.5);
	}
}
</style>
