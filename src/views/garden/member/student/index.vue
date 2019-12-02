<template>
	<div class="r-container infant">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>幼儿管理</span>
				<transition name="slide-fade" mode="out-in">
					<span v-if="activeStatus == 1" key="0" class="float-right">
						<el-button type="primary" @click="exportFile">导出全员花名册</el-button>
						<el-button type="warning" @click="changeStudent">批量调班</el-button>
						<el-button type="primary">批量导入</el-button>
						<router-link :to="{name: 'student-add'}">
							<el-button type="primary">新增+</el-button>
						</router-link>
					</span>
					<span v-if="activeStatus == 0" key="1" class="float-right">
						<el-button type="primary">导出带分班花名册</el-button>
						<el-button type="warning" @click="changeStudent">批量调班</el-button>
					</span>
				</transition>
			</div>

			<el-tabs v-model="activeStatus" v-if="statusList.length" type="card">
				<el-tab-pane
					v-for="statu in statusList"
					:key="statu.status"
					:label="statu.statusName"
					:name="statu.status.toString()"
				>
					<!-- 除了毕业，其他都显示 -->
					<el-row v-if="activeStatus !== '3'" class="search-groups">
						<el-form :model="searchForm" :inline="true" size="small">
							<el-col :span="18" :offset="1">
								<el-row>
									<el-col :span="8">
										<el-form-item prop="childName" label="幼儿">
											<el-input v-model="searchForm.childName" placeholder="姓名/手机号/幼儿ID"></el-input>
										</el-form-item>
									</el-col>
									<!-- 已分班显示 -->
									<el-col v-if="activeStatus === '1'" :span="8">
										<el-form-item prop="clazzId" label="班级">
											<el-select v-model="searchForm.clazzId" placeholder="请选择班级搜索">
												<el-option
													v-for="(clase, index) in allClasses"
													:key="index"
													:label="clase.clazzName"
													:value="clase.clazzId"
												></el-option>
											</el-select>
										</el-form-item>
									</el-col>
									<!-- 退园显示 -->
									<el-col v-if="activeStatus === '2'" :span="14">
										<el-form-item prop="class" label="退园日期">
											<el-date-picker
												v-model="searchForm.pickDate"
												type="daterange"
												range-separator="到"
												start-placeholder="开始日期"
												end-placeholder="结束日期"
												value-format="yyyy-MM-dd"
												@change="changeDate"
											></el-date-picker>
										</el-form-item>
									</el-col>
								</el-row>
							</el-col>
							<el-col :span="5" style="text-align: right;">
								<el-form-item>
									<el-button size="small" type="primary" @click="searchSubmit">查询</el-button>
									<el-button size="small" @click="searchReset">清空</el-button>
								</el-form-item>
							</el-col>
						</el-form>
					</el-row>
				</el-tab-pane>
			</el-tabs>
			<el-table :data="list" tooltip-effect="dark" @selection-change="selectionChange">
				<el-table-column type="selection" width="55"></el-table-column>

				<el-table-column align="center" prop="studentCode" label="幼儿ID"></el-table-column>

				<el-table-column align="center" prop="childName" label="幼儿姓名"></el-table-column>

				<el-table-column align="center" prop="mobile" label="家长手机号"></el-table-column>

				<el-table-column align="center" prop="clazzName" label="所在班级"></el-table-column>

				<el-table-column align="center" prop="genderName" label="性别"></el-table-column>

				<el-table-column align="center" :formatter="formatDate" label="出生日期"></el-table-column>

				<el-table-column label="操作" align="center" width="200px">
					<div class="el-actions" slot-scope="scope">
						<router-link
							v-if="activeStatus != 2"
							:to="{name: 'student-edit', query: {id: scope.row.studentId}}"
						>
							<el-button type="primary" size="mini">修改</el-button>
						</router-link>
						<router-link
							v-if="activeStatus != 2"
							:to="{name: 'student-info', query: {id: scope.row.studentId}}"
						>
							<el-button type="primary" size="mini">查看</el-button>
						</router-link>
						<el-button v-if="activeStatus == 1" type="warning" size="mini" @click="quit(scope.row)">退园</el-button>
						<el-button
							v-if="activeStatus == 2"
							type="warning"
							size="mini"
							@click="inSchool(scope.row)"
						>重新入园</el-button>
					</div>
				</el-table-column>
			</el-table>
			<el-pagination
				@current-change="handleCurrentChange"
				:current-page="currentPage"
				:page-sizes="[10, 20, 30, 50]"
				:page-size.sync="pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="totalPage"
			></el-pagination>
		</el-card>
		<el-dialog
			:title="dialogTitle"
			:visible.sync="dialogVisible"
			width="1000px"
			center
			append-to-body
			destroy-on-close
		>
			<quit-school v-if="dialogVisible && type === 'quit'" @ok="ok" @cancel="cancel" :id="studentId" />
			<in-school v-if="dialogVisible && type === 'in'" @ok="ok" @cancel="cancel" :id="studentId" />
			<student-change
				v-if="dialogVisible && type === 'change'"
				@ok="ok"
				@cancel="cancel"
				:selects="selects"
				:activeStatus="activeStatus"
			/>
		</el-dialog>
	</div>
</template>

<script>
import {
	getStudents,
	getStudentStatus,
	exportStudents,
	getGradeClasses
} from '@/api/student';
import { parseTime } from '@/utils/index';
import QuitSchool from './quit-school.vue';
import InSchool from './in-school.vue';
import StudentChange from './student-change.vue';
import { get } from 'lodash';
export default {
	name: 'student-index',
	components: { QuitSchool, InSchool, StudentChange },
	data() {
		return {
			searchForm: {
				childName: '',
				clazzId: '',
				studentCode: '',
				mobile: '',
				quitDateStart: '',
				quitDateEnd: '',
				pickDate: []
			},
			activeStatus: '1',
			statusList: [],
			list: [],
			selects: [],
			editId: '',
			studentId: '',
			type: '',
			dialogVisible: false,
			currPage: 1,
			grades: [],
			classes: [],
			allClasses: [],
			currentPage: 1,
			pageSize: 10,
			totalPage: 1
		};
	},
	computed: {
		dialogTitle() {
			let name = '';
			switch (this.type) {
				case 'quit':
					name = '退园';
					break;
				case 'in':
					name = '重新入园';
					break;
				case 'change':
					name = '批量调班';
					break;
				default:
					name = '退园';
			}

			return name;
		},
		pageParam() {
			return {
				pageNum: this.currentPage,
				pageSize: this.pageSize
			};
		}
	},
	mounted() {
		this.getStudentList();
		this.getStudentStatus();
		this.getGradesAndClasses();
	},
	methods: {
		// 封装年级班级列表
		async getGradesAndClasses() {
			const [err, result] = await this.$promise(getGradeClasses());
			if (err) return false;

			const grades = [],
				classes = [];
			// 进行年级班级数据封装
			result.forEach(item => {
				// 添加班级
				classes.push({
					gradeId: item.gradeId,
					clazzId: item.clazzId,
					clazzName: item.clazzName
				});
				// 添加年级
				if (!grades.find(grade => grade.gradeId === item.gradeId)) {
					grades.push({ gradeId: item.gradeId, gradeName: item.gradeName });
				}
			});

			this.grades = grades;
			this.allClasses = classes;
			// 默认将全部的班级放入
			this.classes = classes;
		},
		// 获取状态列表
		async getStudentStatus() {
			const [err, result] = await this.$promise(getStudentStatus());
			if (err) return false;
			// 将里面的 status 改为 string
			for (const res of result) {
				res.status = res.status.toString();
			}
			this.statusList = result;
		},
		// 获取学生列表
		async getStudentList(fields = {}) {
			const data = {
				...{
					pageNum: this.currPage,
					pageSize: this.pageSize,
					status: this.activeStatus
				},
				...fields
			};

			const [err, result] = await this.$promise(getStudents(data));

			if (err) return false;

			this.total = Number(get(result, 'total')) || 0;
			this.list = get(result, 'list') || [];
		},
		changeDate(values) {
			if (!values) values = ['', ''];

			this.searchForm.quitDateStart = values[0];
			this.searchForm.quitDateEnd = values[1];
		},
		// 搜索
		searchSubmit() {
			// 设置 mobile studentCode childName 为同一个值
			this.searchForm.studentCode = this.searchForm.childName;
			this.searchForm.mobile = this.searchForm.childName;

			let searchFields = {
				studentCode: this.searchForm.studentCode,
				mobile: this.searchForm.mobile,
				childName: this.searchForm.childName
			};
			// 已分班
			if (this.activeStatus === '1') {
				searchFields = { ...searchFields, clazzId: this.searchForm.clazzId };
			}
			// 退园离园
			if (this.activeStatus === '2') {
				searchFields = {
					...searchFields,
					quitDateStart: this.searchForm.quitDateStart,
					quitDateEnd: this.searchForm.quitDateEnd
				};
			}
			// 重置页面page为1
			searchFields = { ...searchFields, pageNum: 1 };
			// todo:搜索以后再下一页，没有搜索的参数。。。
			this.getStudentList(searchFields);
		},
		// 清空
		searchReset() {
			var that = this;

			this.searchForm.keyword = '';
			this.searchForm.classid = '';

			this.$nextTick(function() {
				that.$refs.searchForm.$el.submit();
			});
		},
		formatDate(row) {
			// 格式化日期
			return parseTime(row.birthday, '{y}-{m}-{d}');
		},
		// 多选
		selectionChange(selects) {
			this.selects = selects;
		},
		// 下载文件
		exportFile() {
			exportStudents();
		},
		changeStudent() {
			if (!this.selects.length) {
				this.$message({ message: '请选择幼儿', type: 'error' });
				return false;
			}
			// 打开批量调班功能
			this.showDialog('change');
		},
		// 退园
		quit(row) {
			this.studentId = row.studentId;
			this.showDialog('quit');
		},
		inSchool(row) {
			this.studentId = row.studentId;
			this.showDialog('in');
		},
		showDialog(type = '') {
			this.type = type;
			this.dialogVisible = type !== '';
		},
		ok(active) {
			console.log(active, this.activeStatus);
			if (undefined !== active) this.activeStatus = active.toString();
			// this.getStudentList();
			this.cancel();
		},
		cancel() {
			this.dialogVisible = false;
		},
		handleCurrentChange(val) {
			this.currentPage = val;
		}
	},
	watch: {
		pageParam: {
			handler(n, o) {
				this.getStudentList();
			},
			deep: true
		},
		activeStatus() {
			this.list = [];
			this.getStudentList();
		}
	}
};
</script>

<style lang="scss" scoped>
</style>
