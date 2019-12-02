<template>
  <div class="r-container machine-version-edit">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{title}}</span>
      </div>
      <div>
        <el-form ref="versionForm" :model="version" :rules="rules" label-width="100px" class="default-form">
          <el-form-item label="版本号" prop="version" class="col-1">
            <el-input v-model.number="version.version" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item label="强制更新" prop="isForce" class="col-1">
            <el-switch v-model="version.isForce" active-color="#ff4949" active-text="是" inactive-text="否"></el-switch>
          </el-form-item>
          <el-form-item label="更新包上传" prop="apkUrl" class="col-1">
            <file-uploader v-model="file" :config="fileConfig"></file-uploader>
          </el-form-item>
          <el-form-item label="迭代内容" prop="remark" class="col-1">
            <el-input v-model="version.remark" type="textarea" autocomplete="off" :rows="2" />
          </el-form-item>
          <el-form-item class="col-1 text-center">
            <el-button type="primary" @click="submitForm('versionForm')">提交</el-button>
            <el-button @click="$router.back(-1)">返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getMachineVersionDetail,addMachineVersion,updateMachineVersion } from '@/api/group';
import  fileUploader  from '@/components/FileUploader/FileUploader';
export default {
  name: 'attendance-machine-version-index',
  components: {
    fileUploader
  },
  data() {
    return {
      id: this.$route.query.id,
      title: this.$route.query.id ? '修改版本' : '新增版本',
      version:{
        version:'',
        isForce: false,
        apkUrl:'',
        remark:'',
        size:'',
        type: 1,
      },
      rules: {
        version: [
          { required: true, message: '请输入版本号' },
          { type:'number', min:0 , max: 999999999, message:'请输入10位以内数字'},
        ],
        isForce: [
          { required: true, message: '请选择是否强制更新' }
        ],
        apkUrl: [
          { required: true, message: '请上传文件', trigger:'change'},
        ],
      },
      file:[],
      fileConfig: {
        accept: 'application/vnd.android.package-archive',
        maximum: 1,
        tip: '只允许上传apk文件'
      },
    };
  },
  mounted() {
    if (this.id) {
      this.getMachineDetail();
    }
  },
  watch:{
    file(n){
      this.$set(this.version,`apkUrl`, n[0].url);
      this.$set(this.version,`size`, n[0].size);
    }
  },
  methods: {
    getMachineDetail() {
      getMachineVersionDetail({ id: this.id }).then(res => {
        this.version = res;
        this.file = [{
          name: res.apkUrl,
          url: res.apkUrl,
          size: res.size,
        }]
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let version = lodash.pick(this.version,['version','isForce','apkUrl','remark','type','size'])
          if (this.id) {
            version.id = this.id;
            updateMachineVersion(version).then(res => {
              this.$message({
                message: '修改成功',
                type: 'success'
              });
              this.$router.push({ path: 'index' });
            }).catch(()=>{});
          } else {
            addMachineVersion(version).then(res => {
              this.$message({
                message: '新增成功',
                type: 'success'
              });
              this.$router.push({ path: 'index' });
            }).catch(()=>{});
          }
        } else {
          // this.$message.error('信息提交错误');
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
