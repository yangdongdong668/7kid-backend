<template>
	<el-form ref="form" :model="form" label-width="100px" :rules="rules" class="el-row">
		<h3>幼儿情况说明</h3>
		<el-row>
			<el-col :span="16">
				<el-form-item
					:label="student.name"
					:prop="returnProp(student.type)"
					v-for="(student, index) in students"
					:key="index"
				>
					<el-input
						v-model="form[`${student.type}Info`]"
						type="textarea"
						rows="4"
						resize="none"
						:disabled="isShow"
					/>
					<multi-img-uploader
						v-model="form[`${student.type}Ids`]"
						:size="{height: '100px', width: '100px'}"
						tip="请上传413px*626px的JPG或PNG图片"
						:propFiles="returnPropFiles(student.type)"
						path="kidarch/"
					/>
				</el-form-item>
			</el-col>
		</el-row>
		<el-divider></el-divider>
		<h3>家庭情况说明</h3>
		<el-row>
			<el-col :span="16">
				<el-form-item
					:label="family.name"
					:prop="returnProp(family.type)"
					v-for="(family, index) in families"
					:key="index"
				>
					<el-input
						v-model="form[`${family.type}Info`]"
						type="textarea"
						rows="4"
						resize="none"
						:disabled="isShow"
					/>
					<multi-img-uploader
						v-model="form[`${family.type}Ids`]"
						:size="{height: '100px', width: '100px'}"
						tip="请上传413px*626px的JPG或PNG图片"
						:propFiles="returnPropFiles(family.type)"
						path="kidarch/"
					/>
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
import { getStudentExtraInfo, updateStudentExtraInfo } from '@/api/student';
import MultiImgUploader from '@/components/ImgUploader/MultiImgUploader.vue';
export default {
	name: 'student-extra',
	components: { MultiImgUploader },
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
				schoolId: '',
				studentId: '',
				educationInfo: '',
				educationIds: [],
				healthInfo: '',
				healthIds: [],
				studyBehaviorInfo: '',
				studyBehaviorIds: [],
				birthCertificateInfo: '',
				birthCertificateIds: [],
				vaccinationInfo: '',
				vaccinationIds: [],
				houseCardInfo: '',
				houseCardIds: [],
				censusCardInfo: '',
				censusCardIds: [],
				residenceCardInfo: '',
				residenceCardIds: []
			},
			rules: {
				childName: [
					{ required: true, message: '请填写学期名称', trigger: 'blur' }
				]
			},
			educationInfoUrls: [],
			healthInfoUrls: [],
			studyBehaviorInfoUrls: [],
			birthCertificateInfoUrls: [],
			vaccinationInfoUrls: [],
			houseCardInfoUrls: [],
			censusCardInfoUrls: [],
			residenceCardInfoUrls: [],
			students: [
				{ type: 'education', name: '亲子教育经历' },
				{ type: 'health', name: '健康或生理问题' },
				{ type: 'studyBehavior', name: '学习或行为问题' },
				{ type: 'birthCertificate', name: '幼儿出生证' },
				{ type: 'vaccination', name: '预防接种证' }
			],
			families: [
				{ type: 'houseCard', name: '房产证照片' },
				{ type: 'censusCard', name: '户口本照片' },
				{ type: 'residenceCard', name: '居住证照片' }
			]
		};
	},
	mounted() {
		if (this.id) this.getStudentExtraInfo();
	},
	methods: {
		async getStudentExtraInfo() {
			const data = { studentId: this.$route.query.id };
			const [err, result] = await this.$promise(getStudentExtraInfo(data));
			if (err) return false;
			this.initExtra(result);
		},
		returnProp(type) {
			return `${type}Info`;
		},
		returnPropFiles(type) {
			return this[`${type}InfoUrls`];
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
			this.loading = true;
			const [err] = await this.$promise(updateStudentExtraInfo(this.form));
			this.loading = false;
			if (err) return false;

			this.$message({ message: '修改成功', type: 'success' });
		},
		initExtra(result) {
			const keys = Object.keys(this.form),
				form = {};

			for (const key of keys) {
				// 批量赋值
				form[key] = result[key] || this.form[key];
				console.log(`key:${key}-value:${result[key]}`);
			}
			this.form = form;
			// 图片列表重新赋值
			const imgs = [
				...this.students.map(student => student.type),
				...this.families.map(family => family.type)
			];
			// 循环给列表赋值
			for (const imgObj of imgs) {
				const InfoUrls = result[`${imgObj}InfoUrls`],
					ids = result[`${imgObj}Ids`];
				if (InfoUrls && ids) {
					// 循环当前数组，并将 id 插入
					this[`${imgObj}InfoUrls`] = InfoUrls.map((ar, index) => {
						const tmpObj = { ...ar },
							id = ids[index];

						return { ...tmpObj, id };
					});
				}
			}
		}
	}
};
</script>
<style lang="scss" scoped>
</style>
