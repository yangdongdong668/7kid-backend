<template>
	<div class="r-container semester">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>学期和时间设置</span>
				<span class="float-right">
					<el-button type="primary" @click="addTerm">
						<i class="el-icon-plus" />新增
					</el-button>
				</span>
			</div>
			<el-table :data="list" stripe border style="width: 100%" class="default-table">
				<el-table-column prop="name" label="学期名称" />
				<el-table-column :formatter="formatType" label="学期类型" />
				<el-table-column :formatter="formatDate" label="学期时间段" />
				<el-table-column :formatter="formatRuyuan" label="入园时间" />
				<el-table-column :formatter="formatLiyuan" label="离园时间" />
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button size="mini" type="primary" @click="handleEdit(scope.row)">修改</el-button>
						<el-button size="mini" type="danger" @click="handleDel(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				layout="prev, pager, next"
				:total="total"
				:page-size="pageSize"
				@size-change="changePage"
				hide-on-single-page
			></el-pagination>
		</el-card>
		<el-dialog
			:title="dialogTitle"
			:visible.sync="dialogVisible"
			width="600px"
			center
			append-to-body
			destroy-on-close
		>
			<semester-post v-if="dialogVisible" @ok="ok" @cancel="cancel" :typeArr="typeArr" :id="editId" />
		</el-dialog>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getTermBySchoolId, updateNewTerm } from '@/api/system/semester';
import { parseTime } from '@/utils/index';

import SemesterPost from './post.vue';
export default {
	name: 'semester-index',
	components: { SemesterPost },
	data() {
		return {
			list: [],
			editId: '',
			dialogVisible: false,
			total: 0,
			currPage: 1,
			pageSize: 10,
			typeArr: [
				{ id: 1, name: '第一学期2-6月' },
				{ id: 2, name: '第二学期1,7-12月' }
			]
		};
	},
	computed: {
		...mapGetters(['schoolId']),
		dialogTitle() {
			return this.editId ? '修改' : '新增';
		}
	},
	mounted() {
		this.getTermList();
	},
	methods: {
		async getTermList() {
			const data = {
				schoolId: this.schoolId,
				pageNum: this.currPage,
				pageSize: this.pageSize
			};

			const [err, result] = await this.$promise(getTermBySchoolId(data));

			if (err) return false;

			this.total = Number(lodash.get(result, 'total')) || 0;
			this.list = lodash.get(result, 'list') || [];
		},
		// 修改页数
		changePage(value) {
			this.currPage = value;
		},
		formatType(row) {
			const typeInfo = this.typeArr.find(type => {
				return type.id === row.type;
			});
			return typeInfo.name;
		},
		formatDate(row) {
			// 格式化日期
			return (
				parseTime(row.startTime, '{y}-{m}-{d}') +
				' — ' +
				parseTime(row.endTime, '{y}-{m}-{d}')
			);
		},
		formatYuan(str) {
			// 格式化时间
			const timeArr = str.split(':');
			timeArr.forEach(function(time, index) {
				timeArr[index] = time.length > 1 ? time : '0' + time;
			});
			return timeArr.join(':');
		},
		formatRuyuan(row) {
			// 格式化入园时间
			return this.formatYuan(row.morning);
		},
		formatLiyuan(row) {
			// 格式化离园时间
			return this.formatYuan(row.evening);
		},
		addTerm() {
			this.editId = '';
			this.showDialog();
		},
		handleEdit(row) {
			this.editId = row.id;
			this.showDialog();
		},
		// 删除
		async handleDel(row) {
			const [err] = await this.$promise(
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					type: 'warning'
				})
			);

			if (err) return false;

			const { id } = row,
				delData = { id, isDeleted: 1 };
			// 删除
			this.delInfo(delData);
		},
		async delInfo(data) {
			const [err] = await this.$promise(updateNewTerm(data));

			if (err) return false;
			// 触发成功接口
			this.$message({ message: '删除成功', type: 'success' });
			this.getTermList();
		},
		ok() {
			this.cancel();
			// 新建或修改成功，重新请求数据
			this.getTermList();
		},
		showDialog() {
			this.dialogVisible = true;
		},
		cancel() {
			this.dialogVisible = false;
		}
	},
	watch: {
		// 页数改变时自动获取最新数据
		currPage() {
			this.getTermList();
		}
	}
};
</script>

<style lang="scss" scoped>
</style>
