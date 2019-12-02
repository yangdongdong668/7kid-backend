<template>
	<el-row :gutter="24">
		<el-col :span="17" :offset="3" style="text-align: left;">
			<el-form label-width="100px" ref="form" :model="form" :rules="rules">
				<el-form-item label="选择年级" prop="gradeId">
					<el-select v-model="form.gradeId" placeholder="请选择" @change="gradeChange">
						<el-option
							v-for="(grade, index) in grades"
							:key="index"
							:label="grade.gradeName"
							:value="grade.gradeId"
						></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="选择班级" prop="clazzId">
					<el-select v-model="form.clazzId" placeholder="请选择" @change="classChange">
						<el-option
							v-for="(clase, index) in classes"
							:key="index"
							:label="clase.clazzName"
							:value="clase.clazzId"
						></el-option>
					</el-select>
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
import { getGradeClasses, reentry } from '@/api/student';
export default {
	name: 'in-school',
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
				clazzId: '',
				gradeId: ''
			},
			grades: [],
			classes: [],
			allClasses: [],
			rules: {
				clazzId: [{ required: true, message: '请选择班级', trigger: 'change' }]
			}
		};
	},
	mounted() {
		if (this.id) this.form.studentId = this.id;
		this.getGradesAndClasses();
	},
	methods: {
		// 封装年级班级列表
		async getGradesAndClasses() {
			const [err, result] = await this.$promise(getGradeClasses());
			if (err) return false;

			const grades = [],
				classes = [];
			// 进行年级班级数据封装
			result.forEach(item => {
				// 添加班级
				classes.push({
					gradeId: item.gradeId,
					clazzId: item.clazzId,
					clazzName: item.clazzName
				});
				// 添加年级
				if (!grades.find(grade => grade.gradeId === item.gradeId)) {
					grades.push({ gradeId: item.gradeId, gradeName: item.gradeName });
				}
			});

			this.grades = grades;
			this.allClasses = classes;
			// 默认将全部的班级放入
			this.classes = classes;
		},
		gradeChange(value) {
			var newClasses = [];
			// 选择年级，获取关联的班级
			this.allClasses.forEach(item => {
				item.gradeId === value ? newClasses.push(item) : '';
			});
			this.classes = newClasses;
			// 班级 id 置空
			this.form.clazzId = '';
		},
		classChange(value) {
			// 选择班级，自动关联年级
			var grade = this.classes.find(item => {
				return item.clazzId === value;
			});

			if (void 0 !== grade.gradeId) this.form.gradeId = grade.gradeId;
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
		async postData() {
			this.loading = true;
			const postData = { ...this.form };
			delete postData.gradeId;
			const [err] = await this.$promise(reentry(postData));
			this.loading = false;
			if (err) return false;
			this.$message({ message: '入园成功', type: 'success' });
			this.$emit('ok', 1);
		},
		cancel() {
			this.$emit('cancel');
		}
	}
};
</script>
<style lang="scss" scoped>
</style>
