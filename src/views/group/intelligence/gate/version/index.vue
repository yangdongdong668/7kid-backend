<template>
  <div class="r-container machine-version">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>考勤机版本管理</span>
        <span class="float-right">
          <el-button type="primary" @click="$router.push('edit')">新增</el-button>
        </span>
      </div>
      <div>
        <el-table :data="versionList" stripe border class="default-table">
          <el-table-column prop="version" label="版本号" width="150"></el-table-column>
          <el-table-column prop="remark" label="迭代内容" width="250" show-overflow-tooltip></el-table-column>
          <el-table-column prop="isForce" label="强制更新" width="100">
            <template slot-scope="{row}">
              <span>{{row.isForce ? '是' : '否'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="updatedTime" label="更新日期" width="150">
            <template slot-scope="{row}">
              <span>{{parseTime(row.updatedTime)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="size" label="文件大小" width="150"></el-table-column>
          <el-table-column prop="apkUrl" label="下载" width="150">
            <template slot-scope="{row}">
              <el-link  :href="row.apkUrl" type="info">点击下载</el-link>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{row}">
              <el-button type="primary" size="mini" @click="$router.push('edit?id='+row.id)">修改</el-button>
              <el-button type="danger" size="mini" @click="deleteVersion(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination align="right" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 50]" :page-size.sync="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalPage" />
      </div>
    </el-card>
  </div>
</template>

<script>
import { getMachineVersionList,deleteMachineVersion } from '@/api/group';
import { parseTime } from '@/utils/index';
export default {
  name: 'attendance-machine-version-index',
  data() {
    return {
      versionList: [],
      currentPage: 1,
      pageSize: 10,
      totalPage: 1,
    }
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
        this.getMachineList();
      },
      deep: true
    }
  },
  mounted() {
    this.getMachineVersionList();
  },
  methods: {
    getMachineVersionList() {
      getMachineVersionList({ ...this.pageParam }).then(res => {
        this.totalPage = Number(res.total);
        this.versionList = res.list;
      }).catch(()=>{});
    },
    parseTime(time) {
      return time ? parseTime(time, '{y}-{m}-{d}') : '';
    },
    deleteVersion(id){
      this.$confirm('是否删除？请谨慎操作!', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteMachineVersion({id}).then(res => {
          this.getMachineVersionList();
          this.$message({
            message: '删除成功',
            type: 'success'
          });
        });
      }).catch(() => {});
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
