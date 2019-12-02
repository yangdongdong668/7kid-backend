<template>
	<div class="kid-header">
		<header-left />
		<header-right />
	</div>
</template>

<script>
import HeaderLeft from './Left.vue';
import HeaderRight from './Right.vue';
export default {
	name: 'kid-header',
	components: { HeaderLeft, HeaderRight }
};
</script>

<style lang="scss" scoped>
.kid-header {
	height: 50px;
	background: rgba(0, 0, 0, 0.2);
	box-shadow: 0px 2px 4px 0px rgba(221, 221, 221, 0.2);

	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	align-items: center;
}
</style>
