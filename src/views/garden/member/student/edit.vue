<template>
	<student-form-index :id="id" :isShow="isShow" :title="title"></student-form-index>
</template>
<script>
import StudentFormIndex from './form/index.vue';
export default {
	name: 'student-edit',
	components: { StudentFormIndex },
	computed: {
		title() {
			return '修改幼儿';
		},
		isShow() {
			return false;
		},
		id() {
			return this.$route.query.id;
		}
	}
};
</script>
