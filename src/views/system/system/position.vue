<template>
  <div class="r-container module">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>职位管理</span>
        <span class="float-right">
          <el-button type="primary" @click="addJob">新增职位</el-button>
        </span>
      </div>
      <el-table :data="jobList" stripe border style="width: 100%" class="default-table">
        <el-table-column label="职位名称">
          <template slot-scope="{row}">
            <template v-if="row.edit">
              <el-input v-model="row.name" class="edit-input" size="small" />
            </template>
            <span v-else>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="职位说明">
          <template slot-scope="{row}">
            <template v-if="row.edit">
              <el-input v-model="row.describe" class="edit-input" size="small" />
            </template>
            <span v-else>{{ row.describe }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="是否启用" width="80">
          <template slot-scope="{row}">
            <el-switch v-model="row.isShow" :active-value=true :inactive-value=false :disabled="!row.edit"/>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{row}">
            <el-button v-if="row.edit" type="success" size="small" icon="el-icon-circle-check" @click="confirmEdit(row)">确定</el-button>
            <el-button v-else type="primary" size="mini" icon="el-icon-edit" @click="row.edit = !row.edit;">编辑</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteJob(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getJobList, addJob, updateJob, deleteJob } from '@/api/system/job';
export default {
	name: 'position-index',
	data() {
		return {
			jobList: []
		};
	},
	mounted() {
		this.getJobList();
	},
	methods: {
		getJobList() {
			getJobList().then(res => {
				this.jobList = res;
				this.jobList.map(item => {
					this.$set(item, 'edit', false);
				});
			});
		},
		addJob() {
			if (this.jobList.some(item => !item.id)) {
				return false;
			}
			const item = {
				name: '',
				describe: '',
				isShow: 0,
				edit: true
			};
			this.jobList.push(item);
		},
		confirmEdit(row) {
			if (!row.name) {
				this.$message({
					message: '职位名称为空',
					type: 'error'
				});
				return false;
			}
			const data = lodash.omit(row, ['edit']);// TOOD
			if (!row.id) {
				addJob(data).then(res => {
					row.edit = false;
					this.getJobList();
					this.$message({
						message: '新增成功',
						type: 'success'
					});
				});
			} else {
				updateJob(data).then(res => {
					row.edit = false;
					this.$message({
						message: '编辑成功',
						type: 'success'
					});
				});
			}
		},
		deleteJob(row) {
			if (row.id){
				this.$confirm('您将删除该条数据，删除后将无法查看申请信息，请谨慎操作?', '删除提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					deleteJob({ id: row.id }).then(res => {
						this.getJobList();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
					});
				}).catch(()=>{});
			} else {
				this.jobList.pop();
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.module {
}
</style>
