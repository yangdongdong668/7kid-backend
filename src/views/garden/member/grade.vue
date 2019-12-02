<template>
  <div class="r-container grade">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ $t('route.grade_manager') }}</span>
        <span class="float-right">
          <el-button type="primary" @click="addGrade">{{ $t('button.add') }}</el-button>
        </span>
      </div>
      <div>
        <el-table :data="gradeList" stripe border style="width: 100%" class="default-table">
          <el-table-column :label="$t('grade.id')">
            <template slot-scope="{row}">
              <template v-if="row.edit">
                <el-input v-model.number="row.gradeOrder" class="edit-input" size="small" />
              </template>
              <span v-else>{{ row.gradeOrder }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('grade.gradeName')">
            <template slot-scope="{row}">
              <template v-if="row.edit">
                <el-input v-model="row.gradeName" class="edit-input" size="small" />
              </template>
              <span v-else>{{ row.gradeName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="clazzNum" :label="$t('grade.clazzNum')"></el-table-column>
          <el-table-column prop="studentNum" :label="$t('grade.studentNum')"></el-table-column>
          <el-table-column :label="$t('grade.operate')">
            <template slot-scope="{row}">
              <el-button v-if="row.edit" type="success" size="mini" icon="el-icon-circle-check" @click="confirmEdit(row)">{{ $t('button.confirm') }}</el-button>
              <el-button v-else type="primary" size="mini" icon="el-icon-edit" @click="row.edit = !row.edit;">{{ $t('button.edit') }}</el-button>
              <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteGrade(row)">{{ $t('button.delete') }}</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination align="right" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 50]" :page-size.sync="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalPage" />
      </div>
    </el-card>
  </div>
</template>

<script>
import { getGradeListByPage, addGrade, updateGrade, deleteGrade } from '@/api/garden';
import { validNumber } from '@/utils/validate';
export default {
	name: 'grade-index',
	data() {
		return {
			gradeList: [],
			currentPage: 1,
			pageSize: 10,
			totalPage: 1
		};
	},
	computed: {
		pageParam() {
			return {
				pageNum: this.currentPage,
				pageSize: this.pageSize
			};
		}
	},
	watch: {
		pageParam: {
			handler(n, o) {
				this.getGradeList();
			},
			deep: true
		}
	},
	mounted() {
		this.getGradeList();
	},
	methods: {
		getGradeList() {
			getGradeListByPage(this.pageParam).then(res => {
				this.totalPage = Number(res.total);
				this.gradeList = res.list || [];
				this.gradeList.map(item => {
					this.$set(item, 'edit', false);
				});
			}).catch(()=>{});
		},
		addGrade() {
			if (this.gradeList.some(item => item.gradeOrder === '')) {
				return false;
			}
			const item = {
				gradeOrder: '',
				gradeName: '',
				clazzNum: 0,
				studentNum: 0,
				edit: true
			};
			this.gradeList.push(item);
		},
		confirmEdit(row) {
			if (!validNumber(row.gradeOrder)) {
				this.$message({
					message: '序号应为数字',
					type: 'error'
				});
				return false;
			}else if (row.gradeOrder < 0 || row.gradeOrder > 9999) {
				this.$message({
					message: '序号应为0~9999内数字',
					type: 'error'
				});
				return false;
			}else if (!row.gradeName) {
				this.$message({
					message: '年级名称为空',
					type: 'error'
				});
				return false;
			}
			if (!row.id) {
				addGrade({
					gradeOrder: row.gradeOrder,
					gradeName: row.gradeName
				}).then(res => {
					row.edit = false;
					this.getGradeList();
					this.$message({
						message: '新增成功',
						type: 'success'
					});
				}).catch(()=>{});
			} else {
				updateGrade({
					id: row.id,
					gradeOrder: row.gradeOrder,
					gradeName: row.gradeName
				}).then(res => {
					row.edit = false;
					this.$message({
						message: '编辑成功',
						type: 'success'
					});
				}).catch(()=>{});
			}
		},
		deleteGrade(row) {
			if(row.id){
				this.$confirm('该年级相关的所有数据均会被删除请谨慎操作！', '删除提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					deleteGrade({
						gradeId: row.id
					}).then(res => {
						this.getGradeList();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
					});
				}).catch(() => {});
			}else {
				this.gradeList.pop();
			}
		}
	}
};
</script>

<style lang="scss" scoped>

</style>
