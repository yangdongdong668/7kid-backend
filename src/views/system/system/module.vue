<template>
  <div class="r-container module">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>模块名称修改</span>
      </div>
      <p>PC官网</p>
      <el-table :data="modules_PC" stripe border style="width: 100%" class="default-table">
        <el-table-column prop="oldName" label="原模块名称" />
        <el-table-column label="新模块名称">
          <template slot-scope="{row}">
            <template v-if="row.edit">
              <el-input v-model="row.newName" class="edit-input" size="small" />
            </template>
            <span v-else>{{ row.newName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="EnglishName" label="英文名称">
          <template slot-scope="{row}">
            <template v-if="row.edit">
              <el-input v-model="row.EnglishName" class="edit-input" size="small" />
            </template>
            <span v-else>{{ row.EnglishName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="是否启用" width="80">
          <template slot-scope="{row}">
            <el-switch v-model="row.status" active-value="1" inactive-value="0" />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{row}">
            <el-button v-if="row.edit" type="success" size="small" icon="el-icon-circle-check-outline" @click="confirmEdit(row)">确定</el-button>
            <el-button v-else type="primary" size="small" icon="el-icon-edit" @click="row.edit = !row.edit;">编辑</el-button>
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
			modules_PC: [
				{
					oldName: 'banner管理',
					newName: 'banner管理',
					EnglishName: 'banner',
					status: 1
				},
				{
					oldName: '新闻动态',
					newName: '新闻动态',
					EnglishName: 'news',
					status: 0
				},
				{
					oldName: '视频相册',
					newName: '视频相册',
					EnglishName: 'ablum',
					status: 1
				}
			]
		};
	},
	mounted() {
		this.modules_PC.map(item => {
			this.$set(item, 'edit', false);
		});
	},
	methods: {
		confirmEdit(row) {
			row.edit = false;
			this.$message({
				message: '编辑成功',
				type: 'success'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.module {
}
</style>
