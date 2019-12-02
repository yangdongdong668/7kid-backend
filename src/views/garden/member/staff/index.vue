<template>
  <div class="r-container staff">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>教职工管理</span>
        <transition name="slide-fade" mode="out-in">
          <span v-if="activeTab == 0" key="0" class="float-right">
            <el-button type="primary" @click="$router.push('edit')">新增教职工</el-button>
            <el-button type="primary">批量导入</el-button>
            <el-button type="primary">批量导出</el-button>
          </span>
          <span v-if="activeTab == 1" key="1" class="float-right">
          </span>
        </transition>
      </div>
      <el-tabs v-model="activeTab" type="card">
        <el-tab-pane label="在职员工">
          <el-form ref="searchForm" :model="searchForm" label-width="100px" size="small">
            <el-row>
              <el-col :span="18">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="关键字" prop="realNameOrMobile">
                      <el-input v-model="searchForm.realNameOrMobile" type="text" placeholder="姓名/手机号" clearable/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="年级" prop="gradeId">
                      <el-select v-model="searchForm.gradeId" placeholder="请选择年级" clearable>
                        <el-option
                          v-for="grade in gradeList"
                          :key="grade.id"
                          :label="grade.gradeName"
                          :value="grade.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="班级" prop="clazzId">
                      <el-select v-model="searchForm.clazzId" placeholder="请选择班级" clearable>
                        <el-option
                          v-for="clazz in classList"
                          :key="clazz.id"
                          :label="clazz.clazzName"
                          :value="clazz.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="6">
                <el-form-item>
                  <el-button type="primary" @click="getTeacherList">查询</el-button>
                  <el-button @click="clearSearchParam">清空</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-table ref="multipleTable" :data="staffList" class="default-table" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="jobNumber" label="工号" width="120" />
            <el-table-column prop="realName" label="姓名" width="150" />
            <el-table-column prop="mobile" label="手机号" width="150" />
            <el-table-column prop="clazzList" label="所在班级" width="150" show-overflow-tooltip/>
            <el-table-column prop="jobs" label="职位" width="120" />
            <el-table-column prop="roleList" label="角色" width="120" />
            <el-table-column prop="name" label="操作">
              <template slot-scope="{row}">
                <div>
                  <el-button size="mini" type="primary" @click="$router.push('edit?id='+row.id)">&#12288;修改&#12288;</el-button>
                  <el-button size="mini" type="warning">重置密码</el-button>
                </div>
                <div style="margin-top: 10px;">
                  <el-button size="mini" @click="$router.push('edit?view=true&id='+row.id)">&#12288;查看&#12288;</el-button>
                  <el-button size="mini" type="danger">&#12288;离职&#12288;</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination align="right" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 50]" :page-size.sync="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalPage" >
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="离职员工">离职员工</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { getTeacherList, getGradeList, getClassList } from '@/api/garden';
export default {
	name: 'staff-index',
	data() {
		return {
			activeTab: 0,
			searchForm: {
				realNameOrMobile: '',
				gradeId: '',
				clazzId: ''
			},
			gradeList: [],
			classList: [],
			staffList: [],
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
				this.getTeacherList();
			},
			deep: true
		}
	},
	mounted() {
		this.getTeacherList();
		this.getClassList();
		this.getGradeList();
	},
	methods: {
		getTeacherList() {
			getTeacherList({ ...this.searchForm, ...this.pageParam }).then(res => {
				this.totalPage = Number(res.total);
				this.staffList = res.list;
			}).catch(()=>{});
		},
		getGradeList() { // 年级选择下拉列表
			getGradeList().then(res => {
				this.gradeList = res;
			}).catch(()=>{});
		},
		getClassList() {
			getClassList().then(res => {
				this.classList = res;
			}).catch(()=>{});
		},
		clearSearchParam() {
			for (var param in this.searchForm) {
				this.searchForm[param] = '';
			}
			this.getTeacherList();
		},
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},
	}
};
</script>

<style lang="scss">
.el-tooltip__popper {
  max-width: 400px;
}
</style>
