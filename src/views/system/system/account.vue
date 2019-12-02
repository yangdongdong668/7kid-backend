<template>
  <div class="r-container account">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>我的账户</span>
      </div>
      <div>
        <el-form ref="accountForm" :model="account" label-width="100px" class="default-form">
          <div class="form-title">账户设置</div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="账户名" prop="username">
                <el-input v-model="account.username" type="text" autocomplete="off" :disabled="true">
                  <template slot="append"><i class="el-icon-edit" @click="" /></template>
                </el-input>
              </el-form-item>
              <el-form-item label="PC端密码" prop="password" :disabled="true">
                <el-input v-model="account.password" type="password" autocomplete="off" :disabled="true">
                  <template slot="append"><i class="el-icon-edit" /></template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="我的头像" prop="avatar" class="text-center">
                <el-avatar :src="account.avatar" :size="120" fit="fill" @click.native="imagecropperShow=true" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider />
          <div class="form-title">登录日志</div>
          <el-form-item label="上次登录时间" prop="date" class="col-1">
            <el-input v-model="account.date" type="text" :disabled="true" />
          </el-form-item>
          <el-form-item label="上次登录IP" prop="ip" class="col-1">
            <el-input v-model="account.ip" type="text" :disabled="true" />
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <image-cropper
      v-show="imagecropperShow"
      :key="imagecropperKey"
      :width="300"
      :height="300"
      url="https://httpbin.org/post"
      lang-type="zh"
      @close="close"
      @crop-upload-success="cropSuccess"
    />
  </div>
</template>

<script>
import ImageCropper from '@/components/ImgUploader/ImageCropper';
export default {
	components: {
		ImageCropper
	},
	data() {
		return {
			account: {
				username: '我是小星星',
				password: '123456789',
				avatar: 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191',
				date: '2019-08-20 10:08:35',
				ip: '192.168.1.1'
			},
			imagecropperShow: false,
			imagecropperKey: 0
		};
	},
	methods: {
		cropSuccess(resData) {
			this.imagecropperShow = false;
			this.imagecropperKey = this.imagecropperKey + 1;
			this.image = resData.files.avatar;
		},
		close() {
			this.imagecropperShow = false;
		}
	}
};
</script>

<style lang="scss" scoped>
</style>
