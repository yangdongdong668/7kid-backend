<template>
  <div class="r-container web-pc">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>幼儿管理</span>
      </div>
      <el-form ref="searchForm1" :model="search1" label-width="100px" size="small">
        <el-row>
          <el-col :span="18">
            <el-row>
              <el-col :span="8">
                <el-form-item label="关键词" prop="todo1">
                  <el-input v-model="search1.todo1" type="text" placeholder="请输入关键词" />
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
      <el-tabs tab-position="left">
        <el-tab-pane label="banner管理">
          <el-table ref="multipleTable" :data="tableData" tooltip-effect="light" class="default-table" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="ID" label="ID" width="60" />
            <el-table-column prop="todo1" label="标题" width="150" />
            <el-table-column prop="todo2" label="浏览量" width="120" />
            <el-table-column prop="todo3" label="发布时间" width="120" />
            <el-table-column prop="todo4" label="创建时间" width="120" />
            <el-table-column prop="todo5" label="排序" width="60" />
            <el-table-column prop="todo6" label="是否显示" width="120">
              <template slot-scope="{row}">
                <el-switch v-model="row.statue" active-value="1" inactive-value="0" />
              </template>
            </el-table-column>
            <el-table-column prop="name" label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="primary">修改</el-button>
                <el-button size="mini" type="danger">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="新闻动态">
          <el-table ref="multipleTable" :data="tableData" tooltip-effect="light" class="default-table" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="ID" label="ID" width="60" />
            <el-table-column prop="todo1" label="标题" width="150" />
            <el-table-column prop="todo2" label="浏览量" width="120" />
            <el-table-column prop="todo3" label="发布时间" width="120" />
            <el-table-column prop="todo4" label="创建时间" width="120" />
            <el-table-column prop="todo5" label="排序" width="60" />
            <el-table-column prop="todo6" label="是否显示" width="120">
              <template slot-scope="{row}">
                <el-switch v-model="row.statue" active-value="1" inactive-value="0" />
              </template>
            </el-table-column>
            <el-table-column prop="name" label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="primary">修改</el-button>
                <el-button size="mini" type="danger">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="视频相册">视频相册</el-tab-pane>
        <el-tab-pane label="教育教学">教育教学</el-tab-pane>
        <el-tab-pane label="特色教育">特色教育</el-tab-pane>
        <el-tab-pane label="活动展示">活动展示</el-tab-pane>
        <el-tab-pane label="通知公告">通知公告</el-tab-pane>
        <el-tab-pane label="关于我们">关于我们</el-tab-pane>
        <el-tab-pane label="周行事历">周行事历</el-tab-pane>
        <el-tab-pane label="我们的团队">我们的团队</el-tab-pane>
        <el-tab-pane label="常见问题">常见问题</el-tab-pane>
        <el-tab-pane label="家长学堂">家长学堂</el-tab-pane>
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
				todo1: ''
			},
			tableData: [{
				ID: 1,
				todo1: '爱我中华',
				todo2: 24,
				todo3: '2019-08-31',
				todo4: '2019-09-01',
				todo5: 13,
				todo6: 1
			}, {
				ID: 2,
				todo1: '中秋团圆',
				todo2: 2,
				todo3: '2019-08-31',
				todo4: '2019-09-01',
				todo5: 1,
				todo6: 1
			}, {
				ID: 3,
				todo1: '欢度国庆',
				todo2: 2411,
				todo3: '2019-08-31',
				todo4: '2019-09-01',
				todo5: 2,
				todo6: 0
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

</style>
