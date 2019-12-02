<template>
  <div class="r-container online">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>线上收费</span>
        <transition name="slide-fade" mode="out-in">
          <span v-if="activeTab == 0" key="0" class="float-right">
            <el-button type="primary">导出账单</el-button>
            <el-button type="warning">批量作废</el-button>
            <el-button type="primary">批量发送</el-button>
            <el-button type="primary">批量新增</el-button>
            <el-button type="primary">新增账单</el-button>
          </span>
          <span v-else key="1" class="float-right">
            <el-button type="primary">导出账单</el-button>
          </span>
        </transition>
      </div>
      <el-tabs v-model="activeTab" type="card">
        <el-tab-pane label="用户管理">
          <el-form ref="searchForm1" :model="search1" label-width="100px" size="small">
            <el-row>
              <el-col :span="18">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="基本状态" prop="todo1">
                      <el-select v-model="search1.todo1" placeholder="请选择">
                        <el-option label="有效" value="0" />
                        <el-option label="作废" value="1" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="发送状态" prop="todo2">
                      <el-select v-model="search1.todo2" placeholder="请选择">
                        <el-option label="未发送" value="0" />
                        <el-option label="发送成功" value="1" />
                        <el-option label="发送失败" value="2" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="收费状态" prop="todo3">
                      <el-select v-model="search1.todo3" placeholder="请选择">
                        <el-option label="已支付" value="0" />
                        <el-option label="未支付" value="1" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="单号/账单" prop="todo4">
                      <el-input v-model="search1.todo4" type="text" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="幼儿" prop="todo5">
                      <el-input v-model="search1.todo5" type="text" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="班级名称" prop="todo6">
                      <el-select v-model="search1.todo6" placeholder="请选择">
                        <el-option label="大一班" value="0" />
                        <el-option label="大二班" value="1" />
                        <el-option label="大三班" value="2" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-collapse-transition>
                  <el-row v-if="searchShow1" :gutter="40">
                    <el-col :span="12">
                      <el-form-item label="费用开始时间" prop="todo7">
                        <el-date-picker v-model="search1.todo7" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="费用结束时间" prop="todo8">
                        <el-date-picker v-model="search1.todo8" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="发送日期" prop="todo9">
                        <el-date-picker v-model="search1.todo9" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-collapse-transition>
              </el-col>
              <el-col :span="6">
                <el-form-item>
                  <el-button type="primary">查询</el-button>
                  <el-button>清空</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-divider>
            <span @click="searchShow1 = !searchShow1">
              <i v-if="searchShow1" class="el-icon-arrow-up" />
              <i v-else class="el-icon-arrow-down" />
            </span>
          </el-divider>
          <el-table ref="multipleTable" :data="tableData" tooltip-effect="light" class="default-table" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column label="日期" width="120">
              <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120" />
            <el-table-column prop="address" label="地址" show-overflow-tooltip />
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="配置管理">配置管理</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
	data() {
		return {
			activeTab: 0,
			search1: {
				todo1: '',
				todo2: '',
				todo3: '',
				todo4: '',
				todo5: '',
				todo6: '',
				todo7: '',
				todo8: '',
				todo9: ''
			},
			searchShow1: false,
			tableData: [{
				date: '2016-05-03',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1518 弄'
			}, {
				date: '2016-05-02',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1518 弄'
			}, {
				date: '2016-05-04',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1518 弄'
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
  .el-select {
    width: 100%;
  }
  .el-date-editor--daterange {
    width: 100%;
  }
</style>
