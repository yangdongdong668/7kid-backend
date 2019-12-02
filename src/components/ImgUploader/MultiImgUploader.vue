<template>
	<div class="multi-uploader">
		<ul class="el-upload-list el-upload-list--picture-card">
			<li v-for="(file, index) in files" :key="index" class="el-upload-list__item" :style="size">
				<img :src="file.compressUrl" alt class="el-upload-list__item-thumbnail" />
				<span class="el-upload-list__item-actions">
					<span class="el-upload-list__item-preview" @click="preview(file)">
						<i class="el-icon-zoom-in"></i>
					</span>
					<span class="el-upload-list__item-delete" @click="remove(index)">
						<i class="el-icon-delete"></i>
					</span>
				</span>
			</li>
		</ul>
		<div class="upload">
			<el-upload action="#" :show-file-list="false" :multiple="true" :http-request="imgUpload">
				<i class="el-icon-plus single-uploader-icon" :style="uploadSize"></i>
			</el-upload>
		</div>

		<el-dialog :visible.sync="dialogVisible">
			<img width="100%" :src="dialogImageUrl" alt />
		</el-dialog>
	</div>
</template>

<script>
import { uploadImg } from '@/api/tool';
export default {
	name: 'multi-img-uploader',
	props: {
		propFiles: {
			type: Array,
			default: () => []
		},
		size: {
			type: Object,
			default: () => ({ height: '150px', width: '150px' })
		},
		path: {
			type: String,
			default: 'garden/'
		}
	},
	data() {
		return {
			files: [],
			dialogVisible: false,
			dialogImageUrl: ''
		};
	},
	computed: {
		uploadSize() {
			return { ...this.size, lineHeight: this.size.height };
		}
	},
	mounted() {},
	methods: {
		async imgUpload(param) {
			const formData = new FormData();
			formData.append('file', param.file);
			formData.append('path', this.path);

			const [err, result] = await this.$promise(uploadImg(formData));
			if (err) return false;

			this.files.push(result);
		},
		preview(file) {
			this.dialogImageUrl = file.url;
			this.dialogVisible = true;
		},
		remove(index) {
			this.files.splice(index, 1);
		}
	},
	watch: {
		files() {
			// 将 id 数组传给 input
			const ids = this.files.map(file => file.id);
			this.$emit('input', ids);
		},
		propFiles(n) {
			this.files = [...this.propFiles];
		}
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
