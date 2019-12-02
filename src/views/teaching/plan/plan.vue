<template>
  <div class="r-container infant">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>教学计划</span>
        <span class="float-right">
          <el-button type="primary">模板设置</el-button>
          <el-button type="warning">新增+</el-button>
        </span>
      </div>
      <el-form ref="searchForm1" :model="search1" label-width="100px" size="small">
        <el-row>
          <el-col :span="18">
            <el-row>
              <el-col :span="8">
                <el-form-item label="周计划名称" prop="todo1">
                  <el-input v-model="search1.todo1" type="text" placeholder="姓名/手机号/幼儿ID" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="选择日期" prop="todo2">
                  <el-date-picker v-model="search1.todo2" type="date" placeholder="选择日期" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="班级" prop="todo3">
                  <el-select v-model="search1.todo2" placeholder="请选择班级">
                    <el-option label="大一班" value="0" />
                    <el-option label="大二班" value="1" />
                    <el-option label="中一班" value="2" />
                    <el-option label="小一班" value="3" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button type="primary">查询</el-button>
              <el-button>清空</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="light" class="default-table" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="ID" label="幼儿ID" width="120" />
        <el-table-column prop="name" label="幼儿姓名" width="150" />
        <el-table-column prop="mobile" label="家长手机号" width="150" />
        <el-table-column prop="class" label="所在班级" width="120" />
        <el-table-column prop="gender" label="性别" width="120" />
        <el-table-column prop="birthday" label="出生日期" width="120" />
        <el-table-column prop="name" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary">修改</el-button>
            <el-button size="mini">查看</el-button>
            <el-button size="mini" type="danger">退园</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
	data() {
		return {
			search1: {
				todo1: '',
				todo2: ''
			},
			tableData: [{
				ID: 20192232,
				name: '王小虎',
				mobile: 13898920134,
				class: '大一班',
				gender: '男',
				birthday: '2016-05-03'
			}, {
				ID: 20192232,
				name: '王小虎',
				mobile: 13898920134,
				class: '大一班',
				gender: '男',
				birthday: '2016-05-03'
			}, {
				ID: 20192232,
				name: '王小虎',
				mobile: 13898920134,
				class: '大一班',
				gender: '男',
				birthday: '2016-05-03'
			}]
		};
	},
	methods: {
		handleSelectionChange(val) {
			this.multipleSelection = val;
		}
	}
};
</script>

<style lang="scss" scoped>
.el-date-editor{
  width: 100%;
}
</style>
