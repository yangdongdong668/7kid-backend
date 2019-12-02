<template>
	<div class="r-container clazz-edit">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>{{title}}</span>
				<span v-if="activeTab == 0" key="0" class="float-right">
          <router-link to="/garden/member/student">
						<el-button type="primary">返回</el-button>
					</router-link>
        </span>
			</div>
			<el-tabs v-model="activeStatus">
				<el-tab-pane label="基本信息" name="base"></el-tab-pane>
				<el-tab-pane label="监护人信息" name="family"></el-tab-pane>
				<el-tab-pane label="说明信息" name="extra"></el-tab-pane>
			</el-tabs>
			<keep-alive>
				<component :is="currentTabComponent" :isShow="isShow" :id="id"></component>
			</keep-alive>
		</el-card>
	</div>
</template>
<script>
import Base from './base.vue';
import Family from './family.vue';
import Extra from './extra.vue';
export default {
	name: 'student-form-index',
	components: {
		'student-base': Base,
		'student-family': Family,
		'student-extra': Extra
	},
	props: {
		id: {
			type: String,
			default: ''
		},
		title: {
			type: String,
			default: '幼儿详情'
		},
		isShow: {
			type: Boolean,
			default: true
		}
	},
	computed: {
		currentTabComponent() {
			return 'student-' + this.activeStatus;
		}
	},
	data() {
		return {
			activeStatus: 'base',
			baseInfo: {},
			familyInfo: {},
			extraInfo: {}
		};
	},
	mounted() {},
	methods: {}
};
</script>

<style lang="scss" scoped>
</style>
