<template>
  <div class="r-container clazz-view">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>班级详情</span>
        <span class="float-right">
        	<el-button type="primary" @click="exportData">批量导出</el-button>
          <el-button type="primary" @click="$router.push('edit?id='+id)">修改</el-button>
          <el-button type="primary" @click="$router.back(-1)">返回</el-button>
        </span>
      </div>
      <div>
      	<el-form :model="clazz" label-width="100px" class="default-form" :inline="true">
          <el-form-item label="班级名：" class="col-3">
            <span>{{clazz.clazzName}}</span>
          </el-form-item>
          <el-form-item label="班级码：" class="col-3">
            <span>{{clazz.clazzCode}}</span>
          </el-form-item>
          <el-form-item label="定额人数：" class="col-3">
            <span>{{clazz.maxStudentNum}}</span>
          </el-form-item>
          <el-form-item label="所属年级：" class="col-3">
            <span>{{clazz.gradeName}}</span>
          </el-form-item>
          <el-form-item label="入学时间：" class="col-3">
            <span>{{parseTime(clazz.startDate)}}</span>
          </el-form-item>
          <el-form-item label="生成时间：" class="col-3">
            <span>{{parseTime(clazz.createdTime)}}</span>
          </el-form-item>
          <el-form-item label="班级人数：" class="col-3">
            <span>{{clazz.studentNum || 0}}</span>
          </el-form-item>
          <el-form-item label="男生：" class="col-3">
            <span>{{clazz.boyNum || 0}}</span>
          </el-form-item>
          <el-form-item label="女生：" class="col-3">
            <span>{{clazz.girlNum || 0}}</span>
          </el-form-item>
          <el-form-item label="老师：" class="col-1">
            <el-tag v-for="teacher in clazz.teachers" :key="teacher.teacherId">{{teacher.jobsName+':'+teacher.teacherName}}</el-tag>
          </el-form-item>
        </el-form>
       	<el-divider></el-divider>
       	<el-table :data="studentList" stripe border style="width: 100%" class="default-table">
          <el-table-column prop="studentCode" label="幼儿ID" width="120"></el-table-column>
          <el-table-column prop="childName" label="学生姓名" width="120"></el-table-column>
          <el-table-column prop="genderName" label="性别" width="60"></el-table-column>
          <el-table-column prop="birthday" label="出生日期" width="120">
            <template slot-scope="{row}">
              <span>{{parseTime(row.birthday)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="监护人" width="240">
            <template slot-scope="{row}">
              <el-tag :key="guardian.mobile" v-for="guardian in row.guardians" :disable-transitions="false">
              {{guardian.name + ':' + guardian.mobile}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="考勤卡" width="240">
            <template slot-scope="{row}">
              <el-tag :key="index" v-for="(card,index) in row.cardNos" :disable-transitions="false">{{card}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{row}">
            	<el-button size="mini" icon="el-icon-edit"  @click="$router.push({name:'student-info',query:{id:row.id}})">查看</el-button>
              <el-button type="primary" size="mini" icon="el-icon-edit" @click="showCardBind(row)">绑定考勤卡</el-button>
              <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeStudent(row.id)">移除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 50]" :page-size.sync="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalPage" />
      </div>
      <el-dialog title="绑定考勤卡" :visible.sync="dialog.visible" width="680px" center class="default-dialog">
        <el-form ref="dialogForm" :model="dialog" label-width="80px" style="padding: 30px 50px 10px;">
          <el-form-item  prop="childName" label="学生姓名" >
            <el-input v-model="dialog.childName" placeholder="请输入学生姓名" disabled></el-input>
          </el-form-item>
          <el-form-item  prop="cardNo" label="考勤卡号" >
            <el-input v-model="dialog.cardNo" placeholder="请输入考勤卡号"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="medium" @click="dialog.visible = false">取 消</el-button>
          <el-button size="medium" type="primary" @click="bindTimeCard">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { getClassDetail, getStudentListOfClazz, removeStudentOfClazz, downloadStudentsInfo, bindTimeCard } from '@/api/garden';
import { parseTime } from '@/utils/index';
export default {
	name: 'class-view',
	data() {
		return {
			id: this.$route.query.id,
			clazz: {},
			studentList: [],
			currentPage: 1,
			pageSize: 10,
			totalPage: 1,
			dialog: {
				visible: false,
				studentId: '',
				childName: '',
				cardNo: ''
			}
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
				this.getStudentListOfClazz();
			},
			deep: true
		}
	},
	mounted() {
		this.getClassDetail();
		this.getStudentListOfClazz();
	},
	methods: {
		getClassDetail() {
			getClassDetail({ clazzId: this.id }).then(res => {
				this.clazz = res;
			});
		},
		getStudentListOfClazz() {
			getStudentListOfClazz({ clazzId: this.id, ...this.pageParam }).then(res => {
				this.totalPage = Number(res.total);
				this.studentList = res.list;
			});
		},
		showCardBind(info) {
			this.dialog.childName = info.childName;
			this.dialog.studentId = info.id;
			this.dialog.visible = true;
		},
		bindTimeCard() {
			bindTimeCard({ studentId: this.dialog.studentId, cardNo: this.dialog.cardNo }).then(res => {
				this.$message({
					message: '绑定成功',
					type: 'success'
				});
			});
		},
		removeStudent(id) {
			this.$confirm('您是否将已选中的幼儿移除出班级？移除后幼儿将全部改为待分班中，请谨慎操作。', '移除提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				deleteClass({
					clazzId: row.id
				}).then(res => {
					removeStudentOfClazz({ studentId: id }).then(res => {
						this.$message({
							message: '移除成功',
							type: 'success'
						});
						this.getStudentListOfClazz();
					});
				});
			}).catch(() => {});
		},
		exportData() {
			downloadStudentsInfo({ clazzId: this.id });
		},
		parseTime(time) {
			return time ? parseTime(time, '{y}-{m}-{d}') : '';
		}
	}
};
</script>

<style lang="scss" scoped>

</style>
