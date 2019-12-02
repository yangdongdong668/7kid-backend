<template>
  <div class="r-container">
    <el-card>
        <div slot="header" class="clearfix">
          <span>常用菜</span>
          <span class="float-right">
					<el-button type="primary" @click="addFood">
						<i class="el-icon-plus" />新增常用菜
					</el-button>
				</span>
        </div>
        <el-table :data="tableData"  border style="width: 100%" class="default-table">
			<el-table-column prop="id" label="ID" />
				<el-table-column prop="name" label="菜名" />
				<el-table-column prop="frequency" label="使用次数" />
				<el-table-column prop="date" label="创建时间" />
				<el-table-column label="是否显示">
					<template slot-scope="scope" >
						<el-switch v-model="scope.row.status" active-value="1" inactive-value="0" />
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button size="mini" type="primary" @click="handleEdit(scope.row)">修改</el-button>
						<el-button size="mini" type="danger" @click="handleDel(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
				<el-pagination align="right" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 50]" :page-size.sync="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalPage" />
	</el-card>
	<el-dialog
		:title="dialogTitle"
		:visible.sync="dialogVisible"
		width="600px"
		center
		append-to-body
		destroy-on-close
		class="default-dialog"
	>
		<menu-post v-if="dialogVisible" />
	</el-dialog>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import menuPost from './post.vue';

export default {
	components: {
		menuPost
	},
	data() {
		return {
			tableData: [{
				id: '1',
				frequency: '0',
				date: '2016-05-02',
				name: '番茄鸡蛋',
				status: '0'
			}, {
				id: '1',
				frequency: '0',
				date: '2016-05-04',
				name: '番茄鸡蛋',
				status: '1'
			}, {
				id: '1',
				frequency: '0',
				date: '2016-05-01',
				name: '番茄鸡蛋',
				status: '1'
			}, {
				id: '1',
				frequency: '0',
				date: '2016-05-03',
				name: '番茄鸡蛋',
				status: '1'
			}],
			currentPage: 1,
			pageSize: 10,
			totalPage: 1,
			editId: '',
			dialogVisible: false
		};
	},
	computed: {
		...mapGetters([
			'name'
		]),
		dialogTitle() {
			return this.editId ? '修改常用菜' : '新增常用菜';
		}
	},
	methods: {
		addFood() {
			this.editId = '';
			this.dialogVisible = !this.dialogVisible;
		},
		handleEdit(row) {
			this.editId = row.id;
			this.dialogVisible = !this.dialogVisible;
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
</style>
