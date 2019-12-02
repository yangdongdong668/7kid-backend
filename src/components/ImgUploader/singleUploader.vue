<template>
  <div class="single-uploader">
    <el-upload
      action="#"
      :show-file-list="false"
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
      :http-request="imgUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="single" @mouseenter="hover = true" />
      <i v-else class="el-icon-plus single-uploader-icon" />
      <div slot="tip">{{ tip }}</div>
      <span v-show="hover" class="el-upload-list__item-actions" @mouseleave="hover = false">
        <span @click.stop="handlePreview">
          <i class="el-icon-zoom-in" />
        </span>
        <span @click.stop="handleRemove">
          <i class="el-icon-delete" />
        </span>
      </span>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="imageUrl" alt />
    </el-dialog>
  </div>
</template>

<script>
import { uploadImg } from '@/api/tool';
export default {
	name: 'SinglgUploader',
	props: {
		value: {
			type: String,
			required: true
		},
		action: {
			type: String,
			default: '/v1/file/upload/binary'
		},
		tip: {
			type: String,
			default: ''
		},
		beforeUpload: {
			type: Function,
			default: function() {
				return true;
			}
		}
	},
	data() {
		return {
			imageUrl: '',
			hover: false,
			dialogVisible: false
		};
	},
	watch: {
		imageUrl(n) {
			this.$emit('input', n);
		}
	},

	mounted() {},
	methods: {
		imgUpload(param) {
			const formData = new FormData();
			formData.append('file', param.file);
			formData.append('path', 'garden/');
			uploadImg(formData).then(res => {
				this.imageUrl = res.url;
			});
		},
		handleSuccess(res, file) {
			// this.imageUrl = URL.createObjectURL(file.raw);
		},
		handlePreview() {
			this.dialogVisible = true;
		},
		handleRemove() {
			this.imageUrl = '';
			this.hover = false;
		}
	}
};
</script>

<style lang="scss" scoped>
.single-uploader {
  /deep/ .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  /deep/ .el-upload:hover {
    border-color: #20d1c0;
  }
  .single-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .single {
    width: 178px;
    height: 178px;
    display: block;
  }
  .el-upload-list__item-actions {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    cursor: default;
    text-align: center;
    color: #fff;
    opacity: 0.5;
    font-size: 20px;
    background-color: #000;
    transition: all 0.3s;
    line-height: 178px;

    & > span {
      cursor: grab;
      margin: 10px;
    }
  }
}
</style>
