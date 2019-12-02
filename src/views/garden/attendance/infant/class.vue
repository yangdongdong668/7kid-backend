<template>
  <div class="r-container attendance-class">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>幼儿出勤</span>
        <transition name="slide-fade" mode="out-in">
          <span v-if="activeTab == 0" key="0" class="float-right">
            <el-button type="primary">导出</el-button>
            <el-button type="primary">返回</el-button>
          </span>
          <span v-else key="1" class="float-right">
            <el-button type="primary">导出</el-button>
            <el-button type="primary">返回</el-button>
          </span>
        </transition>
      </div>
      <el-tabs v-model="activeTab" type="card">
        <el-tab-pane label="出勤日报">
          <daily-statistics :ids="ids"></daily-statistics>
        </el-tab-pane>
        <el-tab-pane label="出勤月报">
          <!-- <monthly-statistics :ids="ids"></monthly-statistics> -->
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
import { getGradeList, getClassAttendanceStatistics } from '@/api/garden';
import { parseTime } from '@/utils/index';
import dailyStatistics from './daily'
// import monthlyStatistics from './monthly'
export default {
  name: 'attendance-class',
  components:{
    dailyStatistics,
    // monthlyStatistics
  },
  data() {
    return {
      activeTab: 0,
      ids: {
        classId: this.$route.query.classId,
        schoolId: this.$store.getters.schoolId,
      }
    };
  }
};
</script>

<style lang="scss" scoped>

</style>
