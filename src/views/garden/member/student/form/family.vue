<template>
	<el-row>
		<el-form ref="form" :model="family" label-width="140px" class="el-row">
			<el-col class="family-group" :span="18" v-for="(form, index) in family.forms" :key="index">
				<h4 class="family-title">监护人 {{ index + 1 }}</h4>
				<el-col :span="12" class="form-table">
					<el-form-item label="姓名" :prop="familyProp(index, 'realName')" :rules="realNameRule">
						<el-input v-model="form.realName" type="text" autocomplete="off" :disabled="isShow" />
					</el-form-item>
				</el-col>
				<el-col :span="12" class="form-table">
					<el-form-item label="与幼儿关系" :prop="familyProp(index, 'relationType')" :rules="relationRule">
						<el-select v-model="form.relationType" placeholder="请选择" :disabled="isShow">
							<el-option
								v-for="(relation, index) in relations"
								:key="index"
								:label="relation.relationTypeName"
								:value="relation.relationType"
							></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12" class="form-table">
					<el-form-item label="手机号" :prop="familyProp(index, 'mobile')" :rules="mobileRule">
						<el-input v-model="form.mobile" type="text" autocomplete="off" :disabled="isShow" />
					</el-form-item>
				</el-col>
				<el-col :span="12" class="form-table">
					<el-form-item label="学历" :prop="familyProp(index, 'educationLevel')">
						<el-select v-model="form.educationLevel" placeholder="请选择" :disabled="isShow">
							<el-option
								v-for="(education, index) in educations"
								:key="index"
								:label="education.educationLevelName"
								:value="education.educationLevel"
							></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12" class="form-table">
					<el-form-item label="证件类型" :prop="familyProp(index, 'cardType')">
						<el-select v-model="form.cardType" placeholder="请选择" :disabled="isShow">
							<el-option
								v-for="(card, index) in cards"
								:key="index"
								:label="card.cardTypeName"
								:value="card.cardType"
							></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12" class="form-table">
					<el-form-item label="证件号码" :prop="familyProp(index, 'cardNo')">
						<el-input v-model="form.cardNo" type="text" autocomplete="off" :disabled="isShow" />
					</el-form-item>
				</el-col>
				<el-col :span="12" class="form-table">
					<el-form-item label="工作单位" :prop="familyProp(index, 'company')">
						<el-input v-model="form.company" type="text" autocomplete="off" :disabled="isShow" />
					</el-form-item>
				</el-col>
				<el-col :span="12" class="form-table">
					<el-form-item label="职业" :prop="familyProp(index, 'profession')">
						<el-input v-model="form.profession" type="text" autocomplete="off" :disabled="isShow" />
					</el-form-item>
				</el-col>
				<el-col :span="12" class="form-table">
					<el-form-item label="户籍所在地" :prop="familyProp(index, 'censusAddress')">
						<el-input v-model="form.censusAddress" type="text" autocomplete="off" :disabled="isShow" />
					</el-form-item>
				</el-col>
				<el-col :span="12" class="form-table">
					<el-form-item label="是否是直属监护人" :prop="familyProp(index, 'isDirectGuardian')">
						<el-checkbox
							v-model="form.isDirectGuardian"
							:disabled="isShow"
						>{{ isDirectGuardian(form.isDirectGuardian) }}</el-checkbox>
					</el-form-item>
				</el-col>
				<i v-if="index > 0" class="el-icon-remove delete" @click="deleteFamily(index)"></i>
			</el-col>
			<el-col v-if="!isShow" :span="16">
				<el-form-item label-width="0">
					<span class="add" @click="addFamily">
						<i class="el-icon-circle-plus"></i>添加监护人
					</span>
				</el-form-item>
				<el-form-item class="submit-group align-center" label-width="0">
					<el-button type="primary" size="medium" :loading="loading" @click="onSubmit">修改</el-button>
					<router-link :to="{name: 'student-index'}">
						<el-button size="medium">返回</el-button>
					</router-link>
				</el-form-item>
			</el-col>
		</el-form>
	</el-row>
</template>
<script>
import {
	getStudentFamilyInfo,
	getRelations,
	getEducations,
	getCardTypes,
	updateStudentFamilyInfo
} from '@/api/student';
export default {
	name: 'student-family',
	props: {
		isShow: {
			type: Boolean,
			default: false
		},
		id: {
			type: String,
			default: ''
		}
	},
	computed: {},
	data() {
		var phoneMatchRule = function(rule, value, callback) {
			if (!/^[1][0-9]{10}$/.test(value)) {
				callback(new Error('手机号格式不正确'));
			}
			callback();
		};
		return {
			loading: false,
			family: {
				forms: []
			},
			defaultCommon: {
				id: '',
				accountId: '',
				studentId: ''
			},
			defaultForm: {
				realName: '',
				relationType: '',
				mobile: '',
				region: '',
				educationLevel: '',
				cardType: '',
				cardNo: '',
				company: '',
				profession: '',
				censusAddress: '',
				isDirectGuardian: false
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
				{ validator: phoneMatchRule, trigger: 'blur' }
			],
			relations: [],
			educations: [],
			cards: []
		};
	},
	mounted() {
		if (this.id) this.getStudentFamilyInfo();
		this.getRelations();
		this.getEducations();
		this.getCardTypes();
	},
	methods: {
		async getStudentFamilyInfo() {
			const data = { studentId: this.$route.query.id };
			const [err, result] = await this.$promise(getStudentFamilyInfo(data));
			if (err) return false;
			this.initFamily(result);
		},
		// 获取关系列表
		async getRelations() {
			const [err, result] = await this.$promise(getRelations());
			if (err) return false;

			this.relations = result;
		},
		// 获取学历列表
		async getEducations() {
			const [err, result] = await this.$promise(getEducations());
			if (err) return false;

			this.educations = result;
		},
		// 获取证件类型列表
		async getCardTypes() {
			const [err, result] = await this.$promise(getCardTypes());
			if (err) return false;

			this.cards = result;
		},
		familyProp(index, name) {
			return `forms.${index}.${name}`;
		},
		isDirectGuardian(is) {
			return is ? '是' : '否';
		},
		// 添加新的监护人
		addFamily() {
			this.family.forms.push({ ...this.defaultCommon, ...this.defaultForm });
		},
		// 删除监护人
		deleteFamily(index) {
			this.family.forms.splice(index, 1);
		},
		// 初始化监护人信息
		initFamily(result) {
			const defaultForm = { ...this.defaultCommon, ...this.defaultForm };
			const keys = Object.keys(defaultForm);

			// 循环 result 数组
			const families = result.map(item => {
				// 循环 keys，封装 form shuxing
				const form = {};

				for (const key of keys) {
					form[key] = item[key] || defaultForm[key];
				}

				return form;
			});

			this.family.forms = families;
		},
		onSubmit() {
			const form = this.$refs['form'];
			form.validate(valid => {
				if (!valid) {
					return false;
				}
				// 提交表单
				this.post();
			});
		},
		async post() {
			const postData = [...this.family.forms];
			this.loading = true;
			const [err] = await this.$promise(updateStudentFamilyInfo(postData));
			this.loading = false;
			if (err) return false;
			this.$message({ message: '修改成功', type: 'success' });
		}
	}
};
</script>
<style lang="scss" scoped>
.family-group {
	padding-bottom: 20px;
	position: relative;

	.delete {
		position: absolute;
		top: 5px;
		right: -35px;
		font-size: 30px;
		color: red;
		cursor: pointer;
	}
}
.family-title {
	text-align: center;
	height: 40px;
	line-height: 40px;
	background: #f5f5f6;
	border: 1px solid #ddd;
	margin: 0;
}
.form-table {
	border: 1px solid #ddd;
	padding: 20px 10px 10px 10px;
	border-top-width: 0;

	&:nth-child(2n) {
		border-right-width: 0;
	}
}

.add {
	padding-left: 20px;
	font-size: 18px;
	cursor: pointer;

	i {
		font-size: 30px;
		vertical-align: sub;
		padding-right: 10px;
	}
}
</style>
