<template>
  <div class="r-container">
    <el-card>
        <div slot="header" class="clearfix">
          <span>晨检日报</span>
          <span class="float-right">
					<el-button type="primary" @click="derive">
						导出
					</el-button>
				</span>
        </div>
		<template>
			<div class="tempBox">
				<el-card shadow="always" :body-style="carddStyle">
					<el-col :span="4">
						<span class="check_title">全园晨检概况</span>
					</el-col>
					<el-col :span="4" class="check_content">
						<span class="content-data">0 <i style="font-size:14px;">%</i></span>
						<span class="content-txt">晨检率</span>
					</el-col>
					<el-col :span="4" class="check_content">
						<span class="content-data">0</span>
						<span class="content-txt">正常人数</span>
					</el-col>
					<el-col :span="4" class="check_content">
						<span class="content-data">0</span>
						<span class="content-txt">因病离园</span>
					</el-col>
					<el-col :span="4" class="check_content">
						<span class="content-data">0</span>
						<span class="content-txt">重点观察</span>
					</el-col>
					<el-col :span="4" class="check_content">
						<span class="content-data">0 </span>
						<span class="content-txt">未晨检人数</span>
					</el-col>
				</el-card>
			</div>
		</template>
		<el-form ref="form" :inline="true" :model="formInline" class="allergy-form">
			<el-row>
				<el-col :xs="12" :sm="12" :md="16" :lg="18" :xl="20">
					<el-col :xs="12" :sm="12" :md="14" :lg="12" :xl="6">
						<el-form-item label="日期" prop="date">
							<el-date-picker
							v-model="formInline.date"
							type="date"
							placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :xs="12" :sm="12" :md="14" :lg="12" :xl="6">
						<el-form-item label="年级选择" prop="selClass">
							<el-select v-model="formInline.selClass" placeholder="请选择">
							<el-option v-for="(option,index) in selects.optionArr1" :key="'option'+index" :label="option.label" :value="option.value"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-col>
				<el-col :xs="12" :sm="12" :md="8" :lg="6" :xl="4" class="inquiry">
						<el-form-item>
							<el-button type="primary" @click="onSubmit"  size="small">查询</el-button>
							<el-button @click="resetForm('form')"  size="small">清空</el-button>
						</el-form-item>
				</el-col>
			</el-row>

		</el-form>
        <el-table :data="tableData"  border style="width: 100%" class="default-table">
			<el-table-column prop="date" label="日期" />
			<el-table-column prop="classes" label="班级" />
			<el-table-column prop="normalCheck" label="晨检正常" />
			<el-table-column prop="getIll" label="因病离园" />
			<el-table-column prop="observation" label="重点观察" />
			<el-table-column prop="observationList" label="观察名单" />
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="" @click="handleEdit(scope.row)"><i class="el-icon-view" /> 班级记录</el-button>
                </template>
            </el-table-column>
        </el-table>
		<el-pagination align="right" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 50]" :page-size.sync="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalPage" />
	</el-card>
</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	data() {
		return {
			tableData: [{
				id: '1',
				date: '2019-11-15',
				classes: '混龄大班',
				normalCheck: '0',
				getIll: '0',
				observation: '0',
				observationList: '番茄鸡蛋'
			}, {
				id: '1',
				date: '2019-11-15',
				classes: '混龄大班',
				normalCheck: '0',
				getIll: '0',
				observation: '0',
				observationList: '番茄鸡蛋'
			}, {
				id: '1',
				date: '2019-11-15',
				classes: '混龄大班',
				normalCheck: '0',
				getIll: '0',
				observation: '0',
				observationList: '番茄鸡蛋'
			}, {
				id: '1',
				date: '2019-11-15',
				classes: '混龄大班',
				normalCheck: '0',
				getIll: '0',
				observation: '0',
				observationList: '番茄鸡蛋'
			}],
			currentPage: 1,
			pageSize: 10,
			totalPage: 1,
			formInline: {
				selClass: '',
				date: ''
			},
			selects: {
				optionArr1: [{
					label: '大班',
					value: '1'
				}, {
					label: '中班',
					value: '2'
				}, {
					label: '小班',
					value: '3'
				}]
			},
			carddStyle: {
				background: '#e8f8f3',
				height: '110px'
			}

		};
	},
	computed: {
		...mapGetters([
			'name'
		])
	},
	methods: {
		derive() {
			console.log('导出');
		},
		onSubmit(e) {
			console.log(this.formInline);
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
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
.tempBox{
	margin-bottom:20px;
}
.check_title{
    font-weight:500;
    height:100%;
    font-size:20px;
    color:#666666;
    text-align: center;
    line-height:70px;
}
.check_content{
    color:#666666;
    text-align: center;
    margin-top:10px;
	.content-data{
		width:100%;
		font-size:28px;
		display:inline-block;
		color:#000;
	}
	.content-txt{
		font-size:14px;
		color:#999999;
	}
}

</style>
