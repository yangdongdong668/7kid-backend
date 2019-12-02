<template>
	<el-row :gutter="24">
		<el-col :span="12" :offset="6">
			<el-steps :active="active" finish-status="success">
				<el-step title="Step1" description="选择班级"></el-step>
				<el-step title="Step2" description="点击确认调班，完成操作"></el-step>
			</el-steps>
		</el-col>
		<br />
		<el-row :gutter="24" v-if="active === 0">
			<el-col :span="17" :offset="3" style="text-align: left;">
				<el-form label-width="100px" ref="formOne" :model="formOne" :rules="formOneRules">
					<el-form-item label="选择年级" prop="gradeId">
						<el-select v-model="formOne.gradeId" placeholder="请选择" @change="gradeChange">
							<el-option
								v-for="(grade, index) in grades"
								:key="index"
								:label="grade.gradeName"
								:value="grade.gradeId"
							></el-option>
						</el-select>
					</el-form-item>

					<el-form-item label="选择班级" prop="clazzId">
						<el-select v-model="formOne.clazzId" placeholder="请选择" @change="classChange">
							<el-option
								v-for="(clase, index) in classes"
								:key="index"
								:label="clase.clazzName"
								:value="clase.clazzId"
							></el-option>
						</el-select>
					</el-form-item>

					<el-form-item class="submit-group align-center" label-width="0">
						<el-button type="primary" @click="oneSubmit">确认</el-button>
						<el-button @click="cancel">取消</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
		<el-row :gutter="24" v-if="active === 1">
			<div class="text-center" style="margin-bottom: 15px;">调入班级：{{ toClass }}</div>
			<el-col :span="20" :offset="2" style="text-align: left; height: 350px; overflow-y: auto;">
				<el-table :data="currSelects" tooltip-effect="dark">
					<el-table-column align="center" prop="childName" label="姓名"></el-table-column>

					<el-table-column align="center" prop="genderName" label="性别"></el-table-column>

					<el-table-column align="center" :formatter="formatDate" label="出生日期"></el-table-column>

					<el-table-column align="center" label="调入班级">
						<template>{{ toClass }}</template>
					</el-table-column>

					<el-table-column align="center" prop="clazzName" label="原班级"></el-table-column>

					<el-table-column label="操作" align="center" width="200px">
						<template slot-scope="scope">
							<el-button type="primary" size="mini" @click="delSelection(scope.$index)">移除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-col>
			<el-col :span="20" :offset="2">
				<div>调入幼儿：{{ currSelects.length }}名</div>
				<div class="submit-group align-center">
					<el-button type="primary" @click="toPrev">返回上一步</el-button>
					<el-button @click="onSubmit" :loading="loading">确认调班</el-button>
					<el-button @click="cancel">退出</el-button>
				</div>
			</el-col>
		</el-row>
	</el-row>
</template>
<script>
import { getGradeClasses, changeClazz } from '@/api/student';
import { parseTime } from '@/utils/index';
export default {
	name: 'student-change',
	props: {
		activeStatus: {
			type: String,
			default: '0'
		},
		selects: {
			type: Array,
			default: () => []
		}
	},
	computed: {
		toClass() {
			// 获取调班的班级名称
			const classObj = this.allClasses.find(item => {
				return item.clazzId === this.formOne.clazzId;
			});

			return classObj.clazzName;
		}
	},
	data() {
		return {
			active: 0,
			loading: false,
			currSelects: [],
			grades: [],
			classes: [],
			allClasses: [],
			formOne: {
				gradeId: '',
				clazzId: ''
			},
			formOneRules: {
				clazzId: [{ required: true, message: '请选择班级', trigger: 'change' }]
			},
			formTwo: {
				name: ''
			},
			rules: {
				name: [{ required: true, message: '请填写学期名称', trigger: 'blur' }]
			}
		};
	},
	mounted() {
		this.getGradesAndClasses();

		this.copyData();
	},
	methods: {
		copyData() {
			// props 赋值，便于操作
			this.currSelects = lodash.cloneDeep(this.selects);
		},
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
			this.formOne.clazzId = '';
		},
		classChange(value) {
			// 选择班级，自动关联年级
			var grade = this.classes.find(item => {
				return item.clazzId === value;
			});

			if (void 0 !== grade.gradeId) this.formOne.gradeId = grade.gradeId;
		},
		formatDate(row) {
			// 格式化日期
			return parseTime(row.birthday, '{y}-{m}-{d}');
		},
		delSelection: function(index) {
			// 删除调入班级
			this.currSelects.splice(index, 1);
		},
		oneSubmit() {
			const form = this.$refs['formOne'];
			form.validate(valid => {
				if (!valid) {
					return false;
				}
				// 跳转到第二个
				this.next();
			});
		},
		toPrev() {
			this.copyData();
			this.prev();
		},
		onSubmit() {
			if (!this.currSelects.length) {
				this.$message({ message: '请选择幼儿', type: 'error' });
				return false;
			}
			// 提交表单
			this.change();
		},
		async change() {
			this.loading = true;
			const postIds = this.currSelects.map(select => select.childId);
			const [err] = await this.$promise(
				changeClazz({
					clazzId: this.formOne.clazzId,
					studentIds: postIds.join(',')
				})
			);
			this.loading = false;
			if (err) return false;
			this.$emit('ok', this.activeStatus);
		},
		cancel() {
			this.$emit('cancel');
		},
		prev() {
			if (this.active-- < 0) this.active = 1;
		},
		next() {
			if (this.active++ > 1) this.active = 0;
		}
	}
};
</script>
<style lang="scss" scoped>
</style>
