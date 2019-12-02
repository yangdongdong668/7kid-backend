<template>
	<el-row :gutter="24">
		<div class="text-center text-error" style="margin-bottom: 15px;">幼儿退园后，该幼儿相关的数据将进入退园状态，请谨慎操作!</div>
		<el-col :span="17" :offset="3" style="text-align: left;">
			<el-form label-width="100px" ref="form" :model="form" :rules="rules">
				<el-form-item label="退园原因" prop="quitReason">
					<el-select v-model="form.quitReason" placeholder="请选择">
						<el-option
							v-for="(delreason, index) in delreasonArrs"
							:key="index"
							:label="delreason"
							:value="delreason"
						></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="退园日期" prop="quitDate">
					<el-date-picker
						v-model="form.quitDate"
						type="date"
						value-format="yyyy-MM-dd"
						placeholder="请选择退园日期"
					></el-date-picker>
				</el-form-item>

				<el-form-item class="submit-group align-center" label-width="0">
					<el-button type="primary" @click="onSubmit" :loading="loading">确认</el-button>
					<el-button @click="cancel">取消</el-button>
				</el-form-item>
			</el-form>
		</el-col>
	</el-row>
</template>
<script>
import { quitSchool } from '@/api/student';
export default {
	name: 'quit-school',
	computed: {},
	props: {
		id: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			loading: false,
			form: {
				studentId: '',
				quitReason: '',
				quitDate: ''
			},
			delreasonArrs: [
				'父母工作调动或搬家',
				'学费过高',
				'硬件设施需改善',
				'其他'
			],
			rules: {
				quitReason: [
					{ required: true, message: '请选择退园原因', trigger: 'change' }
				],
				quitDate: [
					{ required: true, message: '请选择退园日期', trigger: 'change' }
				]
			}
		};
	},
	mounted() {
		if (this.id) this.form.studentId = this.id;
	},
	methods: {
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
		async postData() {
			this.loading = true;
			const [err] = await this.$promise(quitSchool(this.form));
			this.loading = false;
			if (err) return false;
			this.$message({ message: '退园成功', type: 'success' });
			this.$emit('ok', 2);
		},
		cancel() {
			this.$emit('cancel');
		}
	}
};
</script>
<style lang="scss" scoped>
</style>
