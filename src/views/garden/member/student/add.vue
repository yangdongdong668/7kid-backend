<template>
	<div class="r-container clazz-edit">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>{{title}}</span>
			</div>
			<el-row>
				<el-col :span="18" :offset="2">
					<el-form ref="form" :model="form" :rules="rules" label-width="120px">
						<el-form-item label="幼儿姓名" prop="childName">
							<el-input v-model="form.childName"></el-input>
						</el-form-item>

						<el-form-item label="选择性别" prop="gender">
							<el-radio-group v-model="form.gender">
								<el-radio
									v-for="gender in genders"
									:key="gender.gender"
									:label="gender.gender"
								>{{ gender.genderName }}</el-radio>
							</el-radio-group>
						</el-form-item>

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

						<el-form-item label="出生日期" prop="birthday">
							<el-date-picker
								v-model="form.birthday"
								type="date"
								value-format="yyyy-MM-dd"
								placeholder="选择日期"
							></el-date-picker>
						</el-form-item>

						<div class="family-groups" v-for="(family, index) in form.families" :key="index">
							<div class="family-groups--title">监护人 {{ familySort(index) }} 信息</div>
							<el-row class="family-groups__content">
								<el-col class="family-groups__content--item left" :span="12">
									<el-form-item
										v-if="index === 0"
										label="家长姓名"
										:prop="familiesRuleNames(index, 'realName')"
										:rules="realNameRule"
									>
										<el-input v-model="family.realName" style="width: 220px;"></el-input>
									</el-form-item>
									<el-form-item v-else label="家长姓名" :prop="familiesRuleNames(index, 'realName')">
										<el-input v-model="family.realName" style="width: 220px;"></el-input>
									</el-form-item>
								</el-col>
								<el-col class="family-groups__content--item" :span="12">
									<el-form-item
										v-if="index === 0"
										label="与幼儿关系"
										:prop="familiesRuleNames(index, 'relationType')"
										:rules="relationRule"
									>
										<el-select v-model="family.relationType" placeholder="请选择">
											<el-option
												v-for="(relation, index) in relations"
												:key="index"
												:label="relation.relationTypeName"
												:value="relation.relationType"
											></el-option>
										</el-select>
									</el-form-item>
									<el-form-item v-else label="与幼儿关系" :prop="familiesRuleNames(index, 'relationType')">
										<el-select v-model="family.relationType" placeholder="请选择">
											<el-option
												v-for="(relation, index) in relations"
												:key="index"
												:label="relation.relationTypeName"
												:value="relation.relationType"
											></el-option>
										</el-select>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row class="family-groups__content">
								<el-col class="family-groups__content--item left" :span="12">
									<el-form-item
										v-if="index === 0"
										label="手机号"
										:prop="familiesRuleNames(index, 'mobile')"
										:rules="mobileRule"
									>
										<el-input
											v-model="family.mobile"
											placeholder="手机号即家长登录账户"
											style="width: 220px;"
											maxlength="11"
										></el-input>
									</el-form-item>
									<el-form-item v-else label="手机号" :prop="familiesRuleNames(index, 'mobile')">
										<el-input
											v-model="family.mobile"
											placeholder="手机号即家长登录账户"
											style="width: 220px;"
											maxlength="11"
										></el-input>
									</el-form-item>
								</el-col>
								<el-col class="family-groups__content--item" :span="12">
									<el-form-item label="是否直属亲戚" :prop="familiesRuleNames(index, 'isDirectGuardian')">
										<el-checkbox v-model="family.isDirectGuardian"></el-checkbox>
									</el-form-item>
								</el-col>
							</el-row>
							<i
								v-if="allowFamilyDel(index)"
								class="family-groups--del el-icon-remove"
								@click="delFamily(index)"
							></i>
						</div>

						<el-form-item class="align-center" label-width="0">
							<el-button type="primary" icon="el-icon-circle-plus" @click="addFamily">添加监护人</el-button>
						</el-form-item>

						<el-form-item class="submit-group align-center" label-width="0">
							<el-button type="primary" size="medium" :loading="loadingStatus" @click="onSubmit">提交</el-button>
							<el-button @click="back" size="medium">取消</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</el-card>
	</div>
</template>
<script>
import {
	getGradeClasses,
	getGender,
	getRelations,
	addStudent
} from '@/api/student';
export default {
	name: 'student-add',
	computed: {
		title() {
			return this.$route.query.id ? '修改班级' : '新增班级';
		}
	},
	data() {
		// 基本的手机号验证
		const mobileMatchRule = (rule, value, callback) => {
			if (!/^[1][0-9]{10}$/.test(value)) {
				callback(new Error('手机号格式不正确'));
			}

			callback();
		};
		return {
			form: {
				childName: '',
				gender: 0,
				gradeId: '',
				clazzId: '',
				birthday: '',
				families: []
			},
			emptyFamily: {
				realName: '',
				relationType: '',
				mobile: '',
				region: '86',
				isDirectGuardian: false
			},
			rules: {
				childName: [
					{ required: true, message: '请填写幼儿姓名', trigger: 'blur' }
				],
				sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
				clazzId: [{ required: true, message: '请选择班级', trigger: 'change' }],
				birthday: [
					{ required: true, message: '请选择出生日期', trigger: 'change' }
				]
			},
			realNameRule: {
				required: true,
				message: '请填写家长姓名',
				trigger: 'blur'
			},
			relationRule: {
				required: true,
				message: '请选择与幼儿关系',
				trigger: 'change'
			},
			mobileRule: [
				{ required: true, message: '请填写手机号', trigger: 'blur' },
				{ validator: mobileMatchRule, trigger: 'blur' }
			],
			relations: [],
			grades: [],
			classes: [],
			allClasses: [],
			genders: [],
			loadingStatus: false
		};
	},
	mounted() {
		this.getRelations();
		this.addFamily();
		this.getGradesAndClasses();
		this.getGender();
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
		// 获取性别列表
		async getGender() {
			const [err, result] = await this.$promise(getGender());
			if (err) return false;

			this.genders = result;
		},
		// 获取关系列表
		async getRelations() {
			const [err, result] = await this.$promise(getRelations());
			if (err) return false;

			this.relations = result;
		},
		back() {
			this.$router.push({ name: 'student-index' });
		},
		onSubmit() {
			var form = this.$refs['form'],
				that = this;
			form.validate(valid => {
				if (!valid) {
					this.$message({
						message: '保存失败！页面信息填写有误，请确认后重新保存！',
						type: 'error'
					});
					return false;
				}
				// 提交表单
				that.submitForm();
			});
		},
		async submitForm() {
			// 打开 loading
			this.operateLoading();
			const postData = { ...this.form };
			// 需要去除 gradeID 字段
			delete postData.gradeId;
			const [err] = await this.$promise(addStudent(postData));
			// 关闭 loading
			this.operateLoading(false);
			if (err) return false;
			this.$message({ message: '添加成功', type: 'success' });
			// 跳转到幼儿页面
			this.$router.push({ name: 'student-index' });
		},
		operateLoading(bool = true) {
			this.loadingStatus = bool;
		},
		addFamily() {
			this.form.families.push(Object.assign({}, this.emptyFamily));
		},
		delFamily(index) {
			this.form.families.splice(index, 1);
		},
		allowFamilyDel(index) {
			return index > 0;
		},
		familySort(index) {
			return index + 1;
		},
		familiesRuleNames(index, name) {
			return 'families.' + index + '.' + name;
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
		}
	}
};
</script>

<style lang="scss" scoped>
.family-groups {
	border: 1px solid #e4e4e4;
	margin-bottom: 22px;
	position: relative;
	margin-left: 15px;
}
.family-groups--title {
	height: 50px;
	line-height: 50px;
	padding: 0 5px;
	background: #f2f2f2;
}

.family-groups--del {
	position: absolute;
	right: -35px;
	top: 11px;
	font-size: 30px;
	color: red;
	cursor: pointer;
}
.family-groups__content {
	border-top: 1px solid #e2e2e2;
}
.family-groups__content--item {
	padding-top: 22px;
}
.family-groups__content--item.left {
	border-right: 1px solid #e2e2e2;
}
</style>
