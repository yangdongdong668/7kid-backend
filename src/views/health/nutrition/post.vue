<template>
    <div>
        <el-form :model="foodForm" ref="foodForm" label-width="100px">
        <el-form-item
        label="菜名"
        prop="name"
        :rules="[
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]"
        >
            <el-input v-model="foodForm.name"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="region">
            <el-upload
            action="#"
            list-type="picture-card"
            :auto-upload="false"
            limit="1"
            >
                <i slot="default" class="el-icon-plus"></i>
                <div slot="file" slot-scope="{file}">
                <img
                    class="el-upload-list__item-thumbnail"
                    :src="file.url" alt=""
                >
                <span class="el-upload-list__item-actions">
                    <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                    >
                    <i class="el-icon-zoom-in"></i>
                    </span>
                    <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                    >
                    <i class="el-icon-delete"></i>
                    </span>
                </span>
                </div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </el-form-item>
        <el-form-item>
            <el-switch
            style="display: block"
            v-model="status"
            active-value="1"
            inactive-value="0"
            active-text="上线"
            inactive-text="下线">
            </el-switch>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('foodForm')">提交</el-button>
        </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
	data() {
		return {
			foodForm: {
				name: '',
				region: ''
			},
			dialogImageUrl: '',
			dialogVisible: false,
			disabled: false,
			status: '1'
		};
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					alert('submit!');
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		handleRemove(file) {
			console.log(file);
		},
		handlePictureCardPreview(file) {
			this.dialogImageUrl = file.url;
			this.dialogVisible = true;
		}
	}
};
</script>
