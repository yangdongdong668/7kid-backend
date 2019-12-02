<template>
	<student-form-index :id="id" :isShow="isShow" :title="title"></student-form-index>
</template>
<script>
import StudentFormIndex from './form/index.vue';
export default {
	name: 'student-info',
	components: { StudentFormIndex },
	computed: {
		title() {
			return '班级详情';
		},
		isShow() {
			return true;
		},
		id() {
			return this.$route.query.id;
		}
	}
};
</script>
