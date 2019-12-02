<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
import { mapActions } from 'vuex';
import router from './router';
export default {
	name: 'App',
};
</script>
<style lang="scss">
#app {
	width: 100%;
	height: 100%;
	background: url("./assets/img/bg.jpg") no-repeat fixed;
	background-size: cover;
	background-position: center;
	background-attachment: fixed;
	padding: 1px;
	box-sizing: border-box;
	z-index: 1;
}
#app:after {
	content: "";
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
	background: inherit;
	filter: blur(10px);
	z-index: -2;
}
</style>
