<template>
  <div class="r-container role">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>角色与权限</span>
        <span class="float-right">
			<router-link to="/system/system/role/add">
				<el-button type="primary"><i class="el-icon-plus" />新增角色</el-button>
			</router-link>
        </span>
      </div>
      <el-table :data="roles" stripe border style="width: 100%" class="default-table">
        <el-table-column prop="role" label="角色名称" width="100" />
        <el-table-column prop="amount" label="角色用户数" width="100" />
        <el-table-column prop="intro" label="角色说明" />
        <el-table-column prop="status" label="是否启用" width="80">
          <template slot-scope="{row}">
            <el-switch v-model="row.statue" active-value="1" inactive-value="0" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
import { getRoleList } from '@/api/system/role';
export default {
	data() {
		return {
			roles: [{
				role: '园长',
				amount: '1',
				intro: '园长具有本园内所有权限',
				status: '1'
			}, {
				role: '副园长',
				amount: '3',
				intro: '副园长默认具有本园园务、宣传、营养健康的所有权限，可自行设置调整',
				status: '0'
			}],
			accountId: '64617269241578504'
		};
	},
	methods: {
		handleEdit(index, row) {
			this.$router.push({ path: 'edit', query: { id: 121 }});
		},
		handleDelete(index, row) {
			console.log(index, row);
		},
		async roleList() {
			const data = this.accountId;
			const [err, result] = await this.$promise(getRoleList(data));
			if (err) return false;
			console.log(result);
		}
	},
	mounted() {
		this.roleList();
	}
};

</script>
<style lang="scss" scoped>
.role {}

</style>
