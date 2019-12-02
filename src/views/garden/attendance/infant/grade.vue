<template>
  <div class="r-container attendance-grade">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>班级出勤记录</span>
      </div>
      <div>
        <el-form ref="searchForm" :model="searchForm" label-width="100px" size="small">
          <el-row>
            <el-col :span="18">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="年级" prop="grade">
                    <el-select v-model="searchForm.grade" placeholder="请选择年级" clearable>
                      <el-option
                        v-for="grade in gradeList"
                        :key="grade.id"
                        :label="grade.gradeName"
                        :value="grade.id">
                      </el-option>
                    </el-select>
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
              <el-button type="primary" size="mini" icon="el-icon-edit" @click="$router.push('class?classId='+row.id)">班级记录</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getGradeList, getClassAttendanceStatistics } from '@/api/garden';
import { parseTime } from '@/utils/index';
export default {
  name: 'attendance-grade',
  data() {
    return {
      gradeList: [],
      searchForm: {
        dateTime: parseTime(new Date(),'{y}-{m}-{d}'),
        grade: '',
        schoolId: this.$store.getters.schoolId
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
