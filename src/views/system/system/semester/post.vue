<template>
	<el-row :gutter="24">
		<el-col :span="20" :offset="2" style="text-align: left;">
			<el-form ref="form" :model="form" :rules="rules" label-width="100px" method="POST">
				<input type="hidden" name="id" v-model="form.id" />
				<el-form-item label="学期名称:" prop="name">
					<el-input name="name" v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="学期类型:" prop="type">
					<el-radio-group v-model="form.type">
						<el-radio :label="type.id" v-for="type in typeArr" :key="type.id">{{ type.name }}</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="学期时间段:" prop="dateline">
					<input type="hidden" name="startTime" v-model="form.startTime" />
					<input type="hidden" name="endTime" v-model="form.endTime" />
					<el-date-picker
						v-model="form.dateline"
						type="daterange"
						range-separator="到"
						start-placeholder="开始日期"
						@change="changeDate"
						value-format="yyyy-MM-dd"
						end-placeholder="结束日期"
						style="width: 100%"
					></el-date-picker>
				</el-form-item>
				<el-form-item label="入园时间:" prop="morning">
					<el-time-picker
						name="morning"
						v-model="form.morning"
						:picker-options="morningConfig"
						:default-value="defaultMorning"
						format="HH:mm:ss"
						value-format="HH:mm:ss"
						placeholder="入园时间"
					></el-time-picker>
				</el-form-item>
				<el-form-item label="离园时间:" prop="evening">
					<el-time-picker
						name="evening"
						v-model="form.evening"
						:picker-options="eveningConfig"
						:default-value="defaultEvening"
						format="HH:mm:ss"
						value-format="HH:mm:ss"
						placeholder="离园时间"
					></el-time-picker>
				</el-form-item>
				<el-form-item class="no-margin-bottom">
					<el-button type="primary" @click="onSubmit" :loading="loading">立即创建</el-button>
					<el-button @click="cancel">&nbsp;&nbsp;&nbsp;取消&nbsp;&nbsp;&nbsp;</el-button>
				</el-form-item>
			</el-form>
		</el-col>
	</el-row>
</template>
<script>
import { mapGetters } from 'vuex';
import { addNewTerm, updateNewTerm, searchTerm } from '@/api/system/semester';
import { parseTime } from '@/utils/index';
export default {
	name: 'semester-post',
	props: {
		typeArr: {
			type: Array,
			default: () => []
		},
		id: {
			type: String,
			default: ''
		}
	},
	data() {
		const validateEvening = (rule, value, callback) => {
			const morning = this.form.morning,
				evening = this.form.evening;

			if (!value) return callback(new Error('请填选择入园时间'));

			if (evening < morning) {
				return callback(new Error('离园时间不得早于入园时间'));
			}
			// 必须最后执行这个 callback，否则其他验证无法执行
			callback();
		};
		return {
			loading: false,
			form: {
				id: 0,
				name: '',
				startTime: '',
				endTime: '',
				type: '',
				morning: '',
				evening: '',
				dateline: []
			},
			rules: {
				name: [{ required: true, message: '请填写学期名称', trigger: 'blur' }],
				type: [
					{ required: true, message: '请选择学期类型', trigger: 'change' }
				],
				dateline: [
					{ required: true, message: '请选择学期时间段', trigger: 'change' }
				],
				morning: [
					{ required: true, message: '请填选择入园时间', trigger: 'change' }
				],
				evening: [
					{ required: true, message: '请填选择离园时间', trigger: 'blur' },
					{ validator: validateEvening, trigger: 'change' }
				]
			},
			morningConfig: {
				selectableRange: '05:00:00 - 12:00:00'
			},
			eveningConfig: {
				selectableRange: '12:00:00 - 23:59:59'
			},
			defaultMorning: new Date(1),
			defaultEvening: new Date(28800000)
		};
	},
	computed: {
		...mapGetters(['schoolId'])
	},
	mounted() {
		if (this.id) this.initData();
	},
	methods: {
		async initData() {
			const [err, result] = await this.$promise(searchTerm({ id: this.id }));

			if (err) return false;

			const { id, type, name, startTime, endTime, morning, evening } = result;
			this.form = {
				id,
				name,
				type,
				startTime: this.formatDate(startTime),
				endTime: this.formatDate(endTime),
				morning,
				evening,
				dateline: [this.formatDate(startTime), this.formatDate(endTime)]
			};
		},
		formatDate(date) {
			return parseTime(date, '{y}-{m}-{d}');
		},
		changeDate(val) {
			const startTime = val[0] || '',
				endTime = val[1] || '';
			this.form.startTime = startTime;
			this.form.endTime = endTime;
		},
		onSubmit() {
			const form = this.$refs['form'];
			form.validate(valid => {
				if (!valid) {
					return false;
				}

				// 提交表单
				this.postData();
			});
		},
		// 封装表单信息
		postData() {
			this.loading = true;
			const postData = { ...this.form, schoolId: this.schoolId };
			// 移除无用的 dateline
			delete postData.dateline;

			if (this.form.id) {
				postData.isDeleted = 0;
				this.updateInfo(postData);
			} else {
				delete postData.id;
				this.addInfo(postData);
			}
		},
		async addInfo(data) {
			await addNewTerm(data);

			// 触发成功接口
			this.ok('add');
		},
		async updateInfo(data) {
			await updateNewTerm(data);
			// 触发成功接口
			this.ok('update');
		},
		ok(operat) {
			this.loading = false;
			this.$message({
				message: operat === 'add' ? '添加成功' : '修改成功',
				type: 'success'
			});
			this.$emit('ok');
		},
		cancel() {
			this.$emit('cancel');
		}
	}
};
</script>
<style lang="scss" scoped>
</style>
