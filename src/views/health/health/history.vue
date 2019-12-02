<template>
  <div class="r-container">
    <el-card>
        <div slot="header" class="clearfix">
          <span>既往史记录</span>
          <span class="float-right">
					<el-button type="primary" @click="derive">导出</el-button>
          <el-button type="primary" @click="addHistory">新增</el-button>
				</span>
        </div>
		<el-form ref="form" :inline="true" :model="searchForm" label-width="100px" size="small">
			<el-row>
				<el-col :xs="12" :sm="12" :md="16" :lg="18" :xl="20">
					<el-row>
						<!-- <el-col :xs="12" :sm="12" :md="8" :lg="8" :xl="6">
							<el-form-item label="班级选择" prop="selClass">
								<el-select v-model="searchForm.selClass" placeholder="请选择">
								<el-option v-for="(option,index) in selects.optionArr1" :key="'option'+index" :label="option.label" :value="option.value"></el-option>
								</el-select>
							</el-form-item>
						</el-col> -->
						<el-col :xs="12" :sm="12" :md="8" :lg="8" :xl="6">
							<el-form-item label="幼儿" prop="studentName">
								<el-input v-model="searchForm.studentName" placeholder="姓名"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-col>
				<el-col :xs="12" :sm="12" :md="8" :lg="6" :xl="4" class="inquiry">
					<el-form-item>
						<el-button type="primary" @click="getMedicalHistoryList" size="small">查询</el-button>
						<el-button @click="resetForm('form')" size="small">清空</el-button>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
    <el-table :data="medicalHistoryList" border class="default-table">
			<el-table-column prop="clazzName" label="班级名称" width="200"/>
			<el-table-column prop="studentName" label="姓名"  width="200"/>
			<el-table-column prop="medicalName" label="既往史" show-overflow-tooltip/>
		</el-table>
		<el-pagination align="right" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 50]" :page-size.sync="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalPage" />
	</el-card>
  <el-dialog
		title="既往史"
		:visible.sync="dialogVisible"
		width="600px"
		center
		append-to-body
		destroy-on-close
		class="default-dialog"
	>
		<history-post v-if="dialogVisible" />
	</el-dialog>
</div>
</template>

<script>
import historyPost from './post.vue';
import { getClassList } from '@/api/garden';
import { getMedicalHistoryList } from '@/api/health';
export default {
	components: {
		historyPost
	},
	data() {
		return {
			medicalHistoryList: [],
			classList: [],
			currentPage: 1,
			pageSize: 10,
			totalPage: 1,
			searchForm: {
				// clazz: '',
				studentName: ''
			},
			dialogVisible: false
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
				this.getMedicalHistoryList();
			},
			deep: true
		}
	},
	mounted(){
		this.getMedicalHistoryList();
	},
	methods: {
		getMedicalHistoryList(){
			getMedicalHistoryList({ ...this.searchForm, ...this.pageParam }).then(res=>{
				this.totalPage = Number(res.total);
				this.medicalHistoryList = res.list;
			})
		},
		derive() {
			console.log('导出'); //TODO
		},
		addHistory() {
			this.dialogVisible = !this.dialogVisible;
		},
		onSubmit(e) {
			console.log(this.searchForm);
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
			this.getMedicalHistoryList();
		}
	}

};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.inquiry{
	text-align: center;
}
</style>
