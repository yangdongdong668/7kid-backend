<template>
	<div class="single-uploader">
		<el-upload
			action="#"
			:show-file-list="false"
			accept="image/*"
			:on-success="handleSuccess"
			:before-upload="beforeUpload"
			:http-request="imgUpload"
		>
			<img v-if="showImgUrl" :src="showImgUrl" class="single" :style="size" @mouseenter="hover = true" />
			<i v-else class="el-icon-plus single-uploader-icon" :style="uploadSize" />
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
		<el-dialog v-if="showDialogImgUrl" :visible.sync="dialogVisible">
			<img width="100%" :src="showDialogImgUrl" alt />
		</el-dialog>
	</div>
</template>

<script>
import { uploadImg } from '@/api/tool';
export default {
	name: 'single-img-uploader',
	props: {
		imgData: {
			type: Object,
			default: () => ({})
		},
		size: {
			type: Object,
			default: () => ({ height: '150px', width: '150px' })
		},
		tip: {
			type: String,
			default: ''
		},
		path: {
			type: String,
			default: 'garden/'
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
			// 真实图片地址
			imageUrl: '',
			// 图片缩略图
			thumbnailUrl: '',
			// 图片压缩后的地址
			compressUrl: '',
			// 图片的 id
			id: '0',
			hover: false,
			dialogVisible: false
		};
	},
	computed: {
		uploadSize() {
			return { ...this.size, lineHeight: this.size.height };
		},
		// 上传组件图片显示
		showImgUrl() {
			// 存在本来的图片
			if (this.imgData.compressUrl) return this.imgData.compressUrl;
			if (this.imgData.url) return this.imgData.url;

			if (this.compressUrl) return this.compressUrl;
			if (this.imageUrl) return this.imageUrl;
			// 返回 false 不显示
			return false;
		},
		showDialogImgUrl() {
			if (this.imgData.url) return this.imgData.url;
			if (this.imageUrl) return this.imageUrl;
			// 返回 false 不显示
			return false;
		}
	},
	mounted() {},
	methods: {
		// hack 后的图片上传方法
		imgUpload(param) {
			const formData = new FormData();
			formData.append('file', param.file);
			formData.append('path', this.path);
			uploadImg(formData).then(res => {
				// id
				this.id = res.id;
				// 真实图片地址
				this.imageUrl = res.url;
				// 压缩图片
				this.compressUrl = res.compressUrl;
				// 缩略图
				this.thumbnailUrl = res.thumbnailUrl;
			});
		},
		handleSuccess(res, file) {
			// this.imageUrl = URL.createObjectURL(file.raw);
		},
		handlePreview() {
			this.dialogVisible = true;
		},
		// 删除图片
		handleRemove() {
			// 三类图片和 id 全部置位空
			this.imageUrl = '';
			this.compressUrl = '';
			this.thumbnailUrl = '';
			this.id = '0';
			this.hover = false;
		}
	},
	watch: {
		// imageUrl(n) {
		// 	// 图片变动时，将 id 传到 input 中
		// 	this.$emit('input', this.id);
		// },
		id(n) {
			// id 变动时，将 id 传到 input 中
			this.$emit('input', n);
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
		text-align: center;
	}
	.single {
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
