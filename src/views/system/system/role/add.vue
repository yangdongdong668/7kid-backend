<template>
    <div class="r-container role-add">
         <el-card class="box-card">
             <div slot="header" class="clearfix">
                <span>新增角色</span>
                <span class="float-right">
                <el-button type="primary" @click="$router.go(-1)">返回</el-button>
                </span>
            </div>
            <el-form ref="roleForm" :model="role" label-width="100px" class="default-form">
                <div class="form-title">角色设置</div>
                <el-form-item label="角色名称" prop="name" class="col-1">
                <el-input v-model="role.name" type="text" />
                </el-form-item>
                <el-form-item label="角色简介" prop="intro" class="col-1">
                <el-input v-model="role.intro" type="textarea" :autosize="{ minRows: 2}" />
                </el-form-item>
                <el-form-item class="col-1 text-center">
            <el-button type="primary" @click="addRolefn">提交</el-button>
            </el-form-item>
        </el-form>
         </el-card>
    </div>
</template>
<script>
import { addRole } from '@/api/system/role';
export default {
	data() {
		return {
			role: {
				name: '1212',
				intro: 'hahha'
			}
		};
	},
	methods: {
		async addRolefn() {
			if (!this.role.name || !this.role.intro) {
				this.$message({
					message: '请完成每一项填写！',
					type: 'warning'
				});
				return false;
			}
			const data = {
				presetRoleId: 0,
				name: this.role.name,
				description: this.role.intro,
				sort: 1,
				isUsed: true,
				isPreset: true
			};
			const [err, result] = await this.$promise(addRole(data));
			if (err) return false;
			console.log(result);
		}

	}
};
</script>
<style lang="scss" scoped>
.role-add {
  /deep/ .el-card__header {
    padding: 10px 20px;
    line-height: 40px;
  }
}
</style>
