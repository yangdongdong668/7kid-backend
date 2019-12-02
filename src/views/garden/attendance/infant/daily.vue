<template>
  <div class="attendance-daily">
    <el-form ref="searchForm" :model="searchForm" label-width="100px" size="small">
      <el-row>
        <el-col :span="18">
          <el-row>
            <el-col :span="8">
              <el-form-item label="关键字" prop="keyword">
                <el-input v-model="searchForm.keyword" type="text" placeholder="姓名/学号"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="状态" prop="keyword">
                <el-option
                  v-for="status in attendanceStatus"
                  :key="status.value"
                  :label="status.label"
                  :value="grade.value">
                </el-option>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="日期" prop="dateTime">
                <el-date-picker v-model="searchForm.dateTime" type="date" placeholder="请选择日期" value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button type="primary" @click="getClassAttendanceStatistics">查询</el-button>
            <el-button @click="clearSearchParam">清空</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="statisticslist" stripe border class="default-table" style="width: 100%">
      <el-table-column prop="clazzName" label="班级名称" width="150"></el-table-column>
      <el-table-column prop="gradeName" label="年级" width="150"></el-table-column>
      <el-table-column prop="gradeName" label="应出勤人数" width="180"></el-table-column>
      <el-table-column prop="gradeName" label="实际出勤人数" width="180"></el-table-column>
      <el-table-column prop="gradeName" label="请假人数" width="150"></el-table-column>
      <el-table-column prop="gradeName" label="出勤率" width="150"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="$router.push('class?id='+row.id)">班级记录</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

import { getStudentDailyStatistics } from '@/api/garden';
import { parseTime } from '@/utils/index';
export default {
  name: 'attendance-grade',
  props:['ids'],
  data() {
    return {
      attendanceStatus:[{
        label: 0,
        value: '出勤'
      },{
        label: 1,
        value: '病假'
      },{
        label: 2,
        value: '事假'
      },{
        label: 3,
        value: '缺勤'
      }],
      searchForm: {
        dateTime: parseTime(new Date(),'{y}-{m}-{d}'),
        grade: '',
      },
      statisticslist:[],
    };
  },
  mounted() {
    this.getClassAttendanceStatistics();
    this.getGradeList();
  },
  methods: {
    getClassAttendanceStatistics() {
      getClassAttendanceStatistics({ ...this.searchForm }).then(res => {
        this.statisticslist = res.list;
      }).catch(()=>{});
    },
    getGradeList() { // 年级选择下拉列表
      getGradeList().then(res => {
        this.gradeList = res;
      });
    },
    clearSearchParam(){
      this.searchForm.grade = '';
      this.searchForm.dateTime = parseTime(new Date(),'{y}-{m}-{d}');
      this.getClassAttendanceStatistics();
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
