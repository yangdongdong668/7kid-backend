<template>
  <div class="r-container garden">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>园所信息</span>
      </div>
      <div>
        <el-form ref="gardenForm" :model="garden" label-width="100px" :inline="true" :rules="rules" class="default-form">
          <div class="form-title">幼儿园设置</div>
          <el-form-item label="中文名称" prop="name" class="col-2">
            <el-input v-model="garden.name" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item label="英文名称" prop="EnglishName" class="col-2">
            <el-input v-model="garden.EnglishName" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item label="微信公众号" prop="wechat" class="col-2">
            <single-uploader v-model="garden.wechat" tip="请上传300px*300px的JPG或PNG图片" />
          </el-form-item>
          <el-form-item label="幼儿园logo" prop="logo" class="col-2">
            <single-uploader v-model="garden.logo" tip="请上传300px*300px的JPG或PNG图片" />
          </el-form-item>
          <el-form-item label="园所简介" prop="profile" class="col-1">
            <el-input v-model="garden.profile" type="textarea" :autosize="{ minRows: 2}" />
          </el-form-item>
          <el-divider />
          <div class="form-title">办学资质</div>
          <el-form-item label="法人姓名" prop="legalPerson" class="col-2">
            <el-input v-model="garden.legalPerson" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item label="法人电话" prop="mobile" class="col-2">
            <el-input v-model.number="garden.mobile" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item label="类型" prop="type" class="col-2">
            <el-input v-model="garden.type" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item label="内容" prop="content" class="col-2">
            <el-input v-model="garden.content" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item label="办学许可证" prop="school_license" class="col-2">
            <single-uploader v-model="garden.school_license" />
          </el-form-item>
          <el-form-item label="营业执照" prop="business_licence" class="col-2">
            <single-uploader v-model="garden.business_licence" />
          </el-form-item>
          <el-form-item label="办学许可证到期日期" prop="school_license_endtime" class="col-2">
            <el-date-picker v-model="garden.school_license_endtime" type="date" placeholder="选择日期" />
          </el-form-item>
          <el-form-item label="营业执照到期日期" prop="business_licence_endtime" class="col-2">
            <el-date-picker v-model="garden.business_licence_endtime" type="date" placeholder="选择日期" />
          </el-form-item>
          <el-divider />
          <div class="form-title">联系方式</div>
          <el-form-item label="地址" prop="address" class="col-1">
            <el-input v-model="garden.address" type="text" />
          </el-form-item>
          <el-form-item label="电话" prop="tel" class="col-1">
            <el-input v-model="garden.tel" type="text" />
          </el-form-item>
          <el-form-item label="邮箱" prop="email" class="col-1">
            <el-input v-model="garden.email" type="text" />
          </el-form-item>
          <el-form-item label="传真" prop="fax" class="col-1">
            <el-input v-model="garden.fax" type="text" />
          </el-form-item>
          <el-divider />
          <el-form-item class="col-1 text-center">
            <el-button type="primary" @click="submitForm('gardenForm')">提交</el-button>
            <el-button @click="resetForm('gardenForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import singleUploader from '@/components/ImgUploader/singleUploader';
import { validMobile } from '@/utils/validate';
export default {
	components: {
		singleUploader
	},
	data() {
		var checkMobile = (rule, value, callback) => {
			if (value !== '' && !validMobile(value)) {
				callback(new Error('手机号格式错误'));
			} else {
				callback();
			}
		};
		return {
			garden: {
				name: '',
				EnglishName: '',
				wechat: '',
				logo: '',
				profile: '',
				legalPerson: '',
				mobile: '',
				type: '',
				content: '',
				school_license: '',
				business_licence: '',
				school_license_endtime: '',
				address: '',
				tel: '',
				email: '',
				fax: ''
			},
			rules: {
				name: [{ required: true, message: '中文名称不能为空' }],
				mobile: [{ validator: checkMobile, trigger: ['blur', 'change'] }]
			}
		};
	},
	computed: {
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					alert('submit!');
				} else {
					this.$message.error('信息提交错误');
					return false;
				}
			});
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		}
	}
};
</script>

<style lang="scss" scoped>

</style>
