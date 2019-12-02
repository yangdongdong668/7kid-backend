<template>
  <div class="r-container attendance-machine-edit">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{title}}</span>
      </div>
      <div>
        <el-form ref="deviceForm" :model="device" :rules="rules" label-width="100px" class="default-form">
          <el-form-item  prop="deviceNo" label="设备SN号" class="col-1">
            <el-input v-model="device.deviceNo"  disabled></el-input>
          </el-form-item>
          <el-form-item  prop="mac" label="设备MAC" class="col-1">
            <el-input v-model="device.mac" disabled></el-input>
          </el-form-item>
          <el-form-item  prop="createdTime" label="注册时间" class="col-1">
            <el-input v-model="device.createdTime" placeholder="请输入注册时间" disabled></el-input>
          </el-form-item>
          <el-form-item  prop="supplier" label="供应商" class="col-1">
            <el-input v-model="device.supplier" placeholder="请输入供应商"></el-input>
          </el-form-item>
          <el-form-item  prop="model" label="设备型号" class="col-1">
            <el-input v-model="device.model" placeholder="请输入设备型号"></el-input>
          </el-form-item>
          <el-form-item  prop="schoolId" label="使用园所" class="col-1">
            <el-select v-model="device.schoolId" placeholder="请选择园所">
              <el-option
                v-for="school in schoolList"
                :key="school.id"
                :label="school.title"
                :value="school.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item  prop="status" label="设备开关"class="col-1">
            <el-switch v-model="device.status" :active-value=1 :inactive-value=0 active-text="启用" inactive-text="不启用"></el-switch>
          </el-form-item>
          <el-form-item class="col-1 text-center">
            <el-button type="primary" @click="submitForm('deviceForm')">提交</el-button>
            <el-button @click="$router.back(-1)">返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getAttendanceMachineDetail, updateAttendanceMachine, getSchoolList } from '@/api/group';
import { parseTime } from '@/utils/index';
export default {
  name: 'attendance-machine-edit',
  data() {
    return {
      id: this.$route.query.id,
      title: this.$route.query.id ? '修改考勤机' : '新增考勤机',
      device:{
        deviceNo:'',
        mac:'',
        createdTime:'',
        model:'',
        schoolId:'',
        status: false,
      },
      rules:{},
      schoolList:[],
    }
  },
  mounted() {
    if (this.id) {
      this.getAttendanceMachineDetail();
    }
    this.getSchoolList();
  },
  methods: {
    getAttendanceMachineDetail() {
      getAttendanceMachineDetail({ id: this.id }).then(res => {
        this.device = res;
        this.device.createdTime = this.parseTime(this.device.createdTime)
      });
    },
    getSchoolList() { // 园所选择下拉列表
      getSchoolList().then(res => {
        this.schoolList = res;
      });
    },
    parseTime(time) {
      return time ? parseTime(time, '{y}-{m}-{d}') : '';
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let device = lodash.pick(this.device,['id','supplier','model','schoolId','status']);
          updateAttendanceMachine(device).then(res=>{
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            this.$router.push({ path: 'index' });
          }).catch(()=>{});
        } else {
          // this.$message.error('信息提交错误');
          return false;
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
