<template>
  <div class="r-container attendance-machine-edit">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{title}}</span>
      </div>
      <div>
        <el-form ref="robotForm" :model="robot" :rules="rules" label-width="100px" class="default-form">
          <el-form-item  prop="deviceNo" label="设备SN号" class="col-1">
            <el-input v-model="robot.deviceNo" :disabled="!!id"></el-input>
          </el-form-item>
          <el-form-item  prop="supplier" label="供应商" class="col-1">
            <el-input v-model="robot.supplier" placeholder="请输入供应商"></el-input>
          </el-form-item>
          <el-form-item  prop="model" label="设备型号" class="col-1">
            <el-input v-model="robot.model" placeholder="请输入设备型号"></el-input>
          </el-form-item>
          <el-form-item  prop="schoolId" label="使用园所" class="col-1">
            <el-select v-model="robot.schoolId" placeholder="请选择园所">
              <el-option
                v-for="school in schoolList"
                :key="school.id"
                :label="school.title"
                :value="school.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item  prop="status" label="设备开关"class="col-1">
            <el-switch v-model="robot.status" :active-value=1 :inactive-value=0 active-text="启用" inactive-text="不启用"></el-switch>
          </el-form-item>
          <el-form-item class="col-1 text-center">
            <el-button type="primary" @click="submitForm('robotForm')">提交</el-button>
            <el-button @click="$router.back(-1)">返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getInspectionRobotDetail, addInspectionRobotDetail, updateInspectionRobotDetail, getSchoolList } from '@/api/group';
export default {
  name: 'attendance-machine-edit',
  data() {
    return {
      id: this.$route.query.id,
      title: this.$route.query.id ? '修改机器人' : '新增机器人',
      robot:{
        deviceNo:'',
        mac:'',
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
      this.getInspectionRobotDetail();
    }
    this.getSchoolList();
  },
  methods: {
    getInspectionRobotDetail() {
      getInspectionRobotDetail({ id: this.id }).then(res => {
        this.robot = res;
      });
    },
    getSchoolList() { // 园所选择下拉列表
      getSchoolList().then(res => {
        this.schoolList = res;
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.id) {
            let robot = lodash.pick(this.robot,['id','supplier','model','schoolId','status']);
            updateInspectionRobotDetail(robot).then(res=>{
              this.$message({
                message: '修改成功',
                type: 'success'
              });
              this.$router.push({ path: 'index' });
            }).catch(()=>{});
          }else {
            addInspectionRobotDetail(this.robot).then(res=>{
              this.$message({
                message: '修改成功',
                type: 'success'
              });
              this.$router.push({ path: 'index' });
            }).catch(()=>{});
          }
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
