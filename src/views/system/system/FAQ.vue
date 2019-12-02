<template>
  <div class="r-container FAQ">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>常见问题</span>
      </div>
      <el-form ref="searchForm" :model="search" :inline="true" size="small">
        <el-form-item label="关键词" prop="key">
          <el-input v-model="search.key" type="text" />
        </el-form-item>
        <el-form-item label="问题类型" prop="type" class="col-1">
          <el-select v-model="search.type" placeholder="请选择活动区域">
            <el-option label="新手引导" value="guide" />
            <el-option label="财务管理" value="finance" />
            <el-option label="园务管理" value="garden" />
            <el-option label="品牌宣传" value="brand" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('searchForm')">查询</el-button>
        </el-form-item>
      </el-form>
      <el-collapse accordion>
        <el-collapse-item v-for="(question,index) in questions" :title="question.title" :name="index">
          <div>{{ question.content }}</div>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </div>
</template>

<script>
export default {
	data() {
		return {
			search: {
				key: '',
				type: ''
			},
			questions: [
				{
					title: '教师端 · 通讯录的孩子名单和实际不符该怎么处理？',
					content: '可在首页的”幼儿管理”里修改相关孩子的信息，如没有“新增”的按钮，可联系园所管理后台负责老师，登录“优儿网”管理后台给该老师开放相关权限，或者直接在管理后台修改孩子信息。'
				},
				{
					title: '教师端 · 食谱的内容如何发布？',
					content: '周食谱的内容不需要各班老师发布，可有园所指定老师或者保健医生统一在“优儿网”管理后台统一发布给全园'
				},
				{
					title: '教师端 · 教学计划的内容按表格填写过于麻烦，是否有便捷的方式？',
					content: '老师在新增教学计划的时候，可以选择“图片式周计划”，即可对现有教学计划进行拍照上传，方便快捷，园长也可通过手机查看老师的教学计划情况。'
				},
				{
					title: '教师端 · 园所通知支持添加“附件”吗？',
					content: '目前版本暂不支持，以及“亲子任务”目前也不支持该功能，不过此功能已罗列进我们的开发计划，后续会优化'
				}
			]
		};
	}
};
</script>

<style lang="scss" scoped>
.FAQ {

}
</style>
