<template>
  <div class="r-container class">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>班级管理</span>
        <span class="float-right">
          <el-button type="primary"  @click="$router.push('edit')">新增班级</el-button>
          <el-button type="primary" @click="upgrade">批量升班</el-button>
          <el-button type="primary" @click="graduate">批量毕业</el-button>
        </span>
      </div>
      <div>
        <el-form ref="searchForm" :model="searchForm" label-width="100px" size="small">
          <el-row>
            <el-col :span="18">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="班级名称" prop="clazzName">
                    <el-input v-model="searchForm.clazzName" type="text" placeholder="请输入班级名称" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="年级" prop="gradeId">
                    <el-select v-model="searchForm.gradeId" placeholder="请选择年级">
                      <el-option
                        v-for="grade in gradeList"
                        :key="grade.id"
                        :label="grade.gradeName"
                        :value="grade.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="6">
              <el-form-item>
                <el-button type="primary" @click="getClassList">查询</el-button>
                <el-button @click="clearSearchParam('searchForm')">清空</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-table :data="classList" stripe border style="width: 100%" class="default-table" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="clazzCode" label="班级码" width="150"></el-table-column>
          <el-table-column prop="clazzName" label="班级名称" width="150"></el-table-column>
          <el-table-column prop="gradeName" label="年级" width="120"></el-table-column>
          <el-table-column label="老师">
            <template slot-scope="{row}">
              <el-tag :key="teacher.id" v-for="teacher in row.teachers" :disable-transitions="false">
              {{teacher.jobsName + ':' + teacher.teacherName}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="studentNum" label="幼儿人数" width="120"></el-table-column>
          <el-table-column label="操作" width="280">
            <template slot-scope="{row}">
            	<el-button size="mini" icon="el-icon-view" @click="$router.push('view?id='+row.id)">查看</el-button>
              <el-button type="primary" size="mini" icon="el-icon-edit" @click="$router.push('edit?id='+row.id)">编辑</el-button>
              <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteClass(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination align="right" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 50]" :page-size.sync="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalPage" />
      </div>
    </el-card>
  </div>
</template>

<script>
import { getClassListByPage, deleteClass, getGradeList, upgradeClass, graduateClass } from '@/api/garden';
export default {
	name: 'class-index',
	data() {
		return {
			gradeList: [],
			classList: [],
			currentPage: 1,
			pageSize: 10,
			totalPage: 1,
			searchForm: {
				clazzName: '',
				gradeId: ''
			},
			multipleSelection: []
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
				this.getClassList();
			},
			deep: true
		}
	},
	mounted() {
		this.getClassList();
		this.getGradeList();
	},
	methods: {
		getClassList() {
			getClassListByPage({ ...this.searchForm, ...this.pageParam }).then(res => {
				this.totalPage = Number(res.total);
				this.classList = res.list;
			}).catch(()=>{});
		},
		deleteClass(row) {
			this.$confirm('当您删除该班级项时,该班级项下相关的数据都会被删除,幼儿将进入待分班状态，请谨慎操作!', '删除提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				deleteClass({
					clazzId: row.id
				}).then(res => {
					this.getClassList();
					this.$message({
						message: '删除成功',
						type: 'success'
					});
				});
			}).catch(() => {});
		},
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},
		clearSearchParam(formName) {
			this.$refs[formName].resetFields();
			this.getClassList();
		},
		getGradeList() { // 年级选择下拉列表
			getGradeList().then(res => {
				this.gradeList = res;
			});
		},
		upgrade() {
			if (this.multipleSelection.length < 1) {
				this.$message({
					message: '未选择班级',
					type: 'warning'
				});
				return false;
			}
			var clazzInfos = this.multipleSelection.map(({ id, clazzName }) => ({ id, clazzName }));
			upgradeClass({ isChangeName: false, clazzInfos: clazzInfos }).then(res => {
				this.getClassList();
				this.$message({
					message: '操作成功',
					type: 'success'
				});
			});
		},
		graduate() {
			if (this.multipleSelection.length < 1) {
				this.$message({
					message: '未选择班级',
					type: 'warning'
				});
				return false;
			}
			var clazzIds = this.multipleSelection.map(item => item.id).join(',');
			graduateClass({ clazzIds }).then(res => {
				this.getClassList();
				this.$message({
					message: '操作成功',
					type: 'success'
				});
			});
		}
	}
};
</script>

<style lang="scss" scoped>

</style>
