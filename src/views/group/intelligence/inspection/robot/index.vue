<template>
	<div class="r-container inspection-robot">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>晨检机器人</span>
				<span class="float-right">
					<el-button type="primary" @click="$router.push('edit')">新增</el-button>
				</span>
			</div>
			<div>
				<el-form ref="searchForm" :model="searchForm" label-width="100px" size="small">
					<el-row>
						<el-col :span="18">
							<el-row>
								<el-col :span="8">
									<el-form-item label="设备SN" prop="deviceNo">
										<el-input v-model="searchForm.deviceNo" type="text" placeholder="请输入设备SN" />
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="使用园所" prop="schoolId">
										<el-select v-model="searchForm.schoolId" placeholder="请选择园所">
											<el-option
												v-for="school in schoolList"
												:key="school.id"
												:label="school.title"
												:value="school.id">
											</el-option>
										</el-select>
									</el-form-item>
								</el-col>
							</el-row>
						</el-col>
						<el-col :span="6">
							<el-form-item>
								<el-button type="primary" @click="getInspectionRobotList">查询</el-button>
								<el-button @click="clearSearchParam('searchForm')">清空</el-button>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
				<el-table :data="machineList" stripe border class="default-table">
					<el-table-column prop="deviceNo" label="设备SN" width="180"></el-table-column>
					<el-table-column prop="supplier" label="供应商" width="150"></el-table-column>
					<el-table-column prop="model" label="型号" width="150"></el-table-column>
					<el-table-column prop="schoolName" label="使用园所" width="200"></el-table-column>
					<el-table-column prop="version" label="版本" width="200"></el-table-column>
					<el-table-column prop="status" label="状态" width="100">
						<template slot-scope="{row}">
							<span>{{row.status === 1 ? '启用' : '未启用'}}</span>
						</template>
					</el-table-column>
					<el-table-column label="操作">
						<template slot-scope="{row}">
							<el-button type="primary" size="mini" @click="$router.push('edit?id='+row.id)">修改</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination align="right" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 50]" :page-size.sync="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalPage" />
			</div>
		</el-card>
	</div>
</template>

<script>
import { getInspectionRobotList, getSchoolList } from '@/api/group';
export default {
	name: 'inspection-robot-index',
	data() {
		return {
			machineList: [],
			schoolList: [],
			currentPage: 1,
			pageSize: 10,
			totalPage: 1,
			searchForm: {
				deviceNo: '',
				schoolId: ''
			},
		}
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
				this.getInspectionRobotList();
			},
			deep: true
		}
	},
	mounted() {
		this.getInspectionRobotList();
		this.getSchoolList();
	},
	methods: {
		getInspectionRobotList() {
			getInspectionRobotList({ ...this.searchForm, ...this.pageParam }).then(res => {
				this.totalPage = Number(res.total);
				this.machineList = res.list;
			}).catch(()=>{});
		},
		clearSearchParam(formName) {
			this.$refs[formName].resetFields();
			this.getInspectionRobotList();
		},
		getSchoolList() { // 园所选择下拉列表
			getSchoolList().then(res => {
				this.schoolList = res;
			});
		}
	}
};
</script>

<style lang="scss" scoped>

</style>
