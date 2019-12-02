<template>
	<div class="file-uploader">
		<el-upload drag action="#" :multiple="true" :http-request="fileUpload" :accept="_config.accept" :before-upload="_config.beforeUpload" :on-remove="remove" :limit="_config.maximum" :on-exceed="exceed" :file-list="files">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">{{config.tip}}</div>
    </el-upload>
	</div>
</template>

<script>
import { uploadFile } from '@/api/tool';
export default {
	name: 'fileUploader',
	props: {
		value: {
			type: Array,  //Important
			required: true,
		},
		config: {
			type: Object,
			default:() => {}
		},
	},
	data() {
		return {
			files: []
		};
	},
	computed:{
		_config(){
			return lodash.merge({},{
				maximum: 50,  //最大可上传文件数量
				path: 'garden/',
				accept: '',
				tip: '',
				beforeUpload: ()=>{
					return true;
				}
			},this.config)
		},
	},
	mounted() {
	},
	methods: {
		async fileUpload(param) {
			const formData = new FormData();
			formData.append('file', param.file);
			formData.append('path', this._config.path);
			await uploadFile(formData).then(res=>{
				this.files.push(res);
			})
		},
		remove(index) {
			this.files.splice(index, 1);
		},
		exceed(files, fileList){
			this.$message({
        message: '最多可上传' + this._config.maximum + '个文件',
        type: 'warning'
      });
		}
	},
	watch: {
		value:{
			handler(n){
				if(Array.isArray(n)){
					this.files = n;
				}
			},
			immediate:true
		},
		files:{
			handler(n) {
				this.$emit('input', n);
			},
			immediate:true
		},
	}
};
</script>

<style lang="scss" scoped>
.multi-uploader {
	padding: 10px 0;
	>>> .el-upload--picture-card {
		width: 100px;
		height: 100px;
		line-height: 100px;
	}

	.upload {
		display: inline-block;
	}

	.single-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		text-align: center;
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
	}
}
</style>
