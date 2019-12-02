<template>
	<el-form ref="form" :model="form" label-width="100px" :rules="rules" class="el-row">
		<el-row>
			<el-col :span="9">
				<el-form-item label="幼儿名称" prop="childName">
					<el-input v-model="form.childName" type="text" autocomplete="off" :disabled="isShow" />
				</el-form-item>

				<el-form-item label="所在年级" prop="gradeId">
					<el-select v-model="form.gradeId" placeholder="请选择" :disabled="isShow" @change="gradeChange">
						<el-option
							v-for="(grade, index) in grades"
							:key="index"
							:label="grade.gradeName"
							:value="grade.gradeId"
						></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="所在班级" prop="clazzId">
					<el-select v-model="form.clazzId" placeholder="请选择" :disabled="isShow" @change="classChange">
						<el-option
							v-for="(clase, index) in classes"
							:key="index"
							:label="clase.clazzName"
							:value="clase.clazzId"
						></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="入园时间" prop="entryDate">
					<el-date-picker
						v-model="form.entryDate"
						type="date"
						value-format="yyyy-MM-dd"
						placeholder="选择日期"
						:disabled="isShow"
					></el-date-picker>
				</el-form-item>
			</el-col>
			<el-col :span="9" :offset="2">
				<el-form-item label="幼儿二寸照片" prop="imgId">
					<single-img-uploader
						v-model="form.archivesAvatarImg"
						:size="{height: '228px', width: '150px'}"
						tip="请上传413px*626px的JPG或PNG图片"
						:imgData="archivesAvatarImgUrls"
						path="kidarch/"
					/>
				</el-form-item>
			</el-col>
		</el-row>
		<el-divider></el-divider>
		<h3>详细信息</h3>
		<el-row>
			<el-col :span="16">
				<el-form-item label="幼儿性别" prop="genderName">
					<el-radio-group v-model="form.gender" :disabled="isShow">
						<el-radio
							v-for="gender in genders"
							:key="gender.gender"
							:label="gender.gender"
						>{{ gender.genderName }}</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="出生日期" prop="birthday">
					<el-date-picker
						v-model="form.birthday"
						type="date"
						value-format="yyyy-MM-dd"
						placeholder="选择日期"
						:disabled="isShow"
					></el-date-picker>
				</el-form-item>
				<el-form-item label="幼儿身份证号" prop="cardNo">
					<el-input v-model="form.cardNo" type="text" autocomplete="off" :disabled="isShow" />
				</el-form-item>
				<el-form-item label="现居住地址" prop="presentAddress">
					<el-input v-model="form.presentAddress" type="text" autocomplete="off" :disabled="isShow" />
				</el-form-item>
				<el-form-item label="幼儿户籍地址" prop="censusAddress">
					<el-input v-model="form.censusAddress" type="text" autocomplete="off" :disabled="isShow" />
				</el-form-item>
				<el-form-item label="国籍" prop="country">
					<el-select v-model="form.country" placeholder="请选择" :disabled="isShow">
						<el-option
							v-for="(country, index) in countrys"
							:key="index"
							:label="country"
							:value="country"
						></el-option>
					</el-select>
				</el-form-item>
			</el-col>
			<el-col :span="9">
				<el-form-item label="民族" prop="nation">
					<el-input v-model="form.nation" type="text" autocomplete="off" :disabled="isShow" />
				</el-form-item>
			</el-col>
			<el-col :span="9">
				<el-form-item label="血型" prop="bloodType">
					<el-select v-model="form.bloodType" placeholder="请选择" :disabled="isShow">
						<el-option
							v-for="(blood, index) in bloods"
							:key="index"
							:label="blood.bloodTypeName"
							:value="blood.bloodType"
						></el-option>
					</el-select>
				</el-form-item>
			</el-col>
			<el-col v-if="!isShow" :span="16">
				<el-form-item class="submit-group align-center" label-width="0">
					<el-button type="primary" size="medium" :loading="loading" @click="onSubmit">修改</el-button>
					<router-link :to="{name: 'student-index'}">
						<el-button size="medium">返回</el-button>
					</router-link>
				</el-form-item>
			</el-col>
		</el-row>
	</el-form>
</template>
<script>
import {
	getStudentBaseInfo,
	getGradeClasses,
	getGender,
	getBloods,
	updateStudentBaseInfo
} from '@/api/student';
import SingleImgUploader from '@/components/ImgUploader/SingleImgUploader.vue';
import { parseTime } from '@/utils/index';
export default {
	name: 'student-base',
	components: { SingleImgUploader },
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
		return {
			loading: false,
			form: {
				id: '',
				clazzId: '',
				childId: '',
				archivesAvatarImg: '0',
				childName: '',
				gender: '',
				birthday: '',
				presentAddress: '',
				cardType: '',
				cardNo: '',
				censusAddress: '',
				country: '',
				nation: '',
				bloodType: '',
				entryDate: ''
			},
			rules: {
				childName: [
					{ required: true, message: '请填写学期名称', trigger: 'blur' }
				],
				clazzId: [{ required: true, message: '请选择班级', trigger: 'change' }]
			},
			archivesAvatarImgUrls: {},
			grades: [],
			classes: [],
			allClasses: [],
			genders: [],
			bloods: [],
			countrys: ['中国', '美国', '英国', '日本', '韩国', '新加坡', '加拿大']
		};
	},
	mounted() {
		if (this.id) this.getStudentBaseInfo();
		// 获取年级班级
		this.getGradesAndClasses();
		// 获取性别
		this.getGender();
		this.getBloodsType();
	},
	methods: {
		async getStudentBaseInfo() {
			const data = { studentId: this.$route.query.id };
			const [err, result] = await this.$promise(getStudentBaseInfo(data));
			if (err) return false;
			this.initFormInfo(result);
			this.archivesAvatarImgUrls = result.archivesAvatarImgUrls;
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
		// 获取性别列表
		async getGender() {
			const [err, result] = await this.$promise(getGender());
			if (err) return false;

			this.genders = result;
		},
		async getBloodsType() {
			const [err, result] = await this.$promise(getBloods());
			if (err) return false;
			this.bloods = result;
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
		initFormInfo(result) {
			const {
				id,
				clazzId,
				childId,
				archivesAvatarImg,
				childName,
				gender,
				birthday,
				presentAddress,
				cardType,
				cardNo,
				censusAddress,
				country,
				nation,
				bloodType,
				gradeId,
				entryDate = ''
			} = result;

			this.form = {
				id,
				clazzId,
				childId,
				archivesAvatarImg,
				childName,
				gender,
				birthday: parseTime(birthday, '{y}-{m}-{d}'),
				presentAddress,
				cardType,
				cardNo,
				censusAddress,
				country,
				nation,
				bloodType,
				gradeId,
				entryDate: entryDate ? parseTime(entryDate, '{y}-{m}-{d}') : ''
			};
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
			/* eslint-disable */
			const { gradeId, ...postData } = this.form;

			this.loading = true;
			const [err] = await this.$promise(updateStudentBaseInfo(postData));
			this.loading = false;
			if (err) return false;

			this.$message({ message: '修改成功', type: 'success' });
			this.$router.push({ name: 'student-index' });
		}
	}
};
</script>
<style lang="scss" scoped>
</style>
