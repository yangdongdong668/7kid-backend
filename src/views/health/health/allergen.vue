<template>
  <div class="r-container">
    <el-card>
        <div slot="header" class="clearfix">
          <span>过敏源统计</span>
          <span class="float-right">
					<el-button type="primary" @click="derive">
						导出
					</el-button>
				</span>
        </div>
		<el-form ref="form" :inline="true" :model="formInline" class="allergy-form">
			<el-row>
				<el-col :span="20">
					<el-col :xs="12" :sm="12" :md="12" :lg="8" :xl="6">
						<el-form-item label="班级选择" prop="selClass">
							<el-select v-model="formInline.selClass" placeholder="请选择">
							<el-option v-for="(option,index) in selects.optionArr1" :key="'option'+index" :label="option.label" :value="option.value"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="12" :sm="12" :md="12" :lg="8" :xl="6">
						<el-form-item label="过敏源类型" prop="selAllergy">
							<el-select v-model="formInline.selAllergy" placeholder="请选择">
							<el-option v-for="(option,index) in selects.optionArr2" :key="'option'+index" :label="option.label" :value="option.value"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="12" :sm="12" :md="12" :lg="8" :xl="6">
						<el-form-item label="过敏源种类" prop="allergyTaype">
							<el-select v-model="formInline.allergyTaype" placeholder="请选择">
							<el-option v-for="(option,index) in selects.optionArr3" :key="'option'+index" :label="option.label" :value="option.value"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="12" :sm="12" :md="12" :lg="8" :xl="6">
						<el-form-item label="幼儿" prop="child">
							<el-input v-model="formInline.child" placeholder="姓名/手机号/幼儿ID"></el-input>
						</el-form-item>
					</el-col>
				</el-col>
				<el-col :span="4" class="inquiry">
						<el-form-item>
							<el-button type="primary" @click="onSubmit" size="small">查询</el-button>
							<el-button @click="resetForm('form')" size="small">清空</el-button>
						</el-form-item>
				</el-col>
			</el-row>

		</el-form>
        <el-table :data="tableData"  border style="width: 100%" class="default-table">
			<el-table-column prop="clName" label="班级名称" />
				<el-table-column prop="stName" label="姓名" />
				<el-table-column prop="foodAllergy" label="食物过敏" />
				<el-table-column prop="drugAllergy" label="药物过敏" />
				<el-table-column prop="lifeAllergy" label="生活过敏" />
				<el-table-column prop="otherAllergy" label="其他过敏" />
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
				clName: '混龄大班',
				foodAllergy: '牛肉',
				drugAllergy: '抗生素',
				lifeAllergy: '棉絮',
				otherAllergy: '棉絮',
				stName: '番茄鸡蛋'
			}, {
				id: '1',
				clName: '混龄大班',
				foodAllergy: '牛肉',
				drugAllergy: '抗生素',
				lifeAllergy: '棉絮',
				otherAllergy: '棉絮',
				stName: '番茄鸡蛋'
			}, {
				id: '1',
				clName: '混龄大班',
				foodAllergy: '牛肉',
				drugAllergy: '抗生素',
				lifeAllergy: '棉絮',
				otherAllergy: '棉絮',
				stName: '番茄鸡蛋'
			}, {
				id: '1',
				clName: '混龄大班',
				foodAllergy: '牛肉',
				drugAllergy: '抗生素',
				lifeAllergy: '棉絮',
				otherAllergy: '棉絮',
				stName: '番茄鸡蛋'
			}],
			currentPage: 1,
			pageSize: 10,
			totalPage: 1,
			formInline: {
				selClass: '',
				selAllergy: '',
				allergyTaype: '',
				child: ''
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
				}],
				optionArr2: [{
					label: '食物过敏',
					value: '1'
				}, {
					label: '药物过敏',
					value: '2'
				}, {
					label: '生活过敏',
					value: '3'
				}],
				optionArr3: [{
					label: '区域一',
					value: 'shanghai'
				}, {
					label: '区域二',
					value: 'beijing'
				}, {
					label: '区域三',
					value: '杭州'
				}]
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
</style>
