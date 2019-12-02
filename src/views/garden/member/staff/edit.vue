<template>
  <div class="r-container staff-edit">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{title}}</span>
      </div>
      <div>
        <el-form ref="staffForm" :model="staff" label-width="100px" :inline="true" :rules="rules" class="default-form" :disabled="!!$route.query.view">
          <el-form-item label="员工名称" prop="realName" class="col-2" >
            <el-input v-model="staff.realName" type="text" autocomplete="off" :disabled="!!id"/>
          </el-form-item>
          <el-form-item label="手机号" prop="mobile" class="col-2">
            <el-input v-model="staff.mobile" type="text" autocomplete="off" :disabled="!!id"/>
          </el-form-item>
          <el-form-item label="昵称" prop="nickname" class="col-2">
            <el-input v-model="staff.nickname" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item label="入职日期" prop="joinTime" class="col-2">
          	<el-date-picker v-model="staff.joinTime" type="date" placeholder="选择入职日期" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <el-form-item label="性别" prop="gender" class="col-2">
            <el-radio v-model="staff.gender" :label=1>男</el-radio>
            <el-radio v-model="staff.gender" :label=2>女</el-radio>
          </el-form-item>
          <el-form-item label="电脑端登录" prop="pcLogin" class="col-2">
            <el-radio v-model="staff.pcLogin" :label=true>允许</el-radio>
            <el-radio v-model="staff.pcLogin" :label=false>不允许</el-radio>
          </el-form-item>
          <el-form-item label="岗位" prop="jobIds" class="col-1">
            <el-select v-model="staff.jobIds" multiple placeholder="请选择岗位">
              <el-option
                v-for="job in jobList"
                :key="job.id"
                :label="job.name"
                :value="job.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="角色" prop="roleIds" class="col-1">
            <el-select v-model="staff.roleIds" multiple placeholder="请选择角色">
              <el-option
                v-for="role in roleList"
                :key="role.id"
                :label="role.name"
                :value="role.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所在班级" prop="clazzIds" class="col-1">
            <el-select v-model="staff.clazzIds" multiple placeholder="请选择班级">
              <el-option
                v-for="clazz in clazzList"
                :key="clazz.id"
                :label="clazz.clazzName"
                :value="clazz.id">
              </el-option>
            </el-select>
          </el-form-item>
         	<el-divider></el-divider>
         	<!-- <el-form-item label="一寸照片" prop="headImg" class="col-2">
            <single-uploader v-model="staff.headImg" tip="" />
          </el-form-item>
          <el-form-item label="头像" prop="avatarImg" class="col-2">
            <single-uploader v-model="staff.avatarImg" tip="" />
          </el-form-item> -->
          <el-form-item label="工作邮箱" prop="email" class="col-2" :rules="[
          	{type:'email', message:'请输入正确的邮箱地址'}
          ]">
            <el-input v-model="staff.email" type="text" autocomplete="off" />
          </el-form-item>
        <!--   <el-form-item label="手机号区号" prop="region" class="col-2">
            <el-input v-model="staff.region" type="text" autocomplete="off" />
          </el-form-item> -->
          <el-form-item label="教职工工号" prop="jobNumber" class="col-2">
            <el-input v-model="staff.jobNumber" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item label="职称" prop="technical" class="col-2">
          	<el-select v-model="staff.technical" placeholder="请选择职称">
            	<el-option label="幼师一级" :value=1></el-option>
            	<el-option label="幼师二级" :value=2></el-option>
            	<el-option label="幼师三级" :value=3></el-option>
            	<el-option label="其他职称" :value=4></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学历" prop="education" class="col-2">
          	<el-select v-model="staff.education" placeholder="请选择学历">
            	<el-option value="本科"></el-option>
            	<el-option value="专科"></el-option>
            	<el-option value="硕士"></el-option>
            	<el-option value="博士"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="毕业学校" prop="graduate" class="col-2">
            <el-input v-model="staff.graduate" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item label="专业" prop="profession" class="col-2">
            <el-input v-model="staff.profession" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item label="教师资格证" prop="certification" class="col-2" :rules="[
          	{ min: 17, max: 17,  message: '请输入17位纯数字',  trigger: ['blur', 'change']}
          ]">
            <el-input v-model="staff.certification" autocomplete="off" />
          </el-form-item>
          <el-form-item label="户口类型" prop="nativeType" class="col-2">
            <el-radio v-model="staff.nativeType" :label=1>农业</el-radio>
            <el-radio v-model="staff.nativeType" :label=2>非农</el-radio>
          </el-form-item>
          <el-form-item label="婚姻状态" prop="isMarryed" class="col-2">
            <el-radio v-model="staff.isMarryed" :label=false>未婚</el-radio>
            <el-radio v-model="staff.isMarryed" :label=true>已婚</el-radio>
          </el-form-item>
          <el-form-item label="编制" prop="establish" class="col-2">
            <el-radio v-model="staff.establish" :label=1>非在编</el-radio>
            <el-radio v-model="staff.establish" :label=2>在编</el-radio>
          </el-form-item>
       <!--    <el-form-item label="教职工状态" prop="status" class="col-2">
          	<el-select v-model="staff.status" placeholder="请选择教职工状态">
            	<el-option label="在职" value="1"></el-option>
            	<el-option label="离职" value="0"></el-option>
            	<el-option label="冻结" value="2"></el-option>
            	<el-option label="注销" value="3"></el-option>
            </el-select> -->
          </el-form-item>
          <el-form-item label="家庭住址" prop="address" class="col-1">
            <el-input v-model="staff.address" type="text" autocomplete="off" />
          </el-form-item>
        <!--   <el-form-item label="离职日期" prop="leaveTime" class="col-2">
          	<el-date-picker v-model="staff.leaveTime" type="date" placeholder="选择离职日期" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <el-form-item label="离职原因" prop="leaveReason" class="col-1">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入离职原因" v-model="staff.leaveReason">
						</el-input>
					</el-form-item> -->
					<el-form-item label="个人简介" prop="about" class="col-1">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入个人简介" v-model="staff.about">
						</el-input>
          </el-form-item>
          <el-form-item label="备注信息" prop="info" class="col-1">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入备注信息" v-model="staff.info">
						</el-input>
          </el-form-item>
          <el-form-item class="col-1 text-center" v-if="!$route.query.view">
            <el-button type="primary" @click="submitForm('staffForm')">提交</el-button>
            <el-button @click="$router.back(-1)">返回</el-button>
          </el-form-item>
        </el-form>
        <div class="text-center" v-if="$route.query.view"><el-button @click="$router.back(-1)">返回</el-button></div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getTeacherDetail, getClassList, updateTeacher, addTeacher } from '@/api/garden';
import { getRoleList, getJobList } from '@/api/system/job'; // TODO 拆分role
import singleUploader from '@/components/ImgUploader/singleUploader';
export default {
	name: 'staff-edit',
	components: {
		singleUploader
	},
	data() {
		return {
			id: this.$route.query.id,
			title: this.$route.query.view ? '查看教职工' : this.$route.query.id ? '修改教职工' : '新增教职工',
			staff: {
				realName: '',
				nickname: '',
				joinTime: '',
				mobile: '',
				gender: 1,
				pcLogin: true,
				jobIds: [],
				roleIds: [],
				clazzIds: [],
				headImg: '',
				avatarImg: '',
				jobNumber: '',
				isMarryed: '',
				email: '',
				about: '',
				education: '',
				profession: '',
				graduate: '',
				certification: '',
				nativeType: '',
				technical: '',
				establish: '',
				address: '',
				info: '',
				status: '',
				leaveReason: '',
				leaveTime: '',
				region: ''
			},
			rules: {
				realName: [
					{ required: true, message: '请输入员工名称' }
				],
				nickname: [
					{ required: true, message: '请输入昵称' }
				],
				mobile: [
					{ required: true, message: '请输入手机号' },
					{ pattern: /^1[34578]\d{9}$/, message: '请输入11位手机号' }
				],
				joinTime: [
					{ required: true, message: '请选择入职日期' }
				],
				gender: [
					{ required: true, message: '请选择性别' }
				],
				pcLogin: [
					{ required: true, message: '请选择电脑端登录授权' }
				],
        jobIds: [
          { required: true, message: '请选择岗位' }
        ],
        // roleIds: [
        //   { required: true, message: '请选择角色' }
        // ],
        // clazzIds: [
        //   { required: true, message: '请选择班级' }
        // ],
			},
			roleList: [],
			jobList: [],
			clazzList: []
		};
	},
	mounted() {
		if (this.id) {
			this.getTeacherDetail();
		}
		this.getRoleList();
		this.getJobList();
		this.getClassList();
	},
	methods: {
		getTeacherDetail() {
			getTeacherDetail(this.id).then(res => {
				this.staff = res;
				this.$set(this.staff, 'joinTime', new Date(this.staff.joinTime));
				this.$set(this.staff, 'roleIds', this.staff.roleList.map(item => item.roleId));
				this.$set(this.staff, 'jobIds', this.staff.jobList.map(item => item.id));
				this.$set(this.staff, 'clazzIds', this.staff.clazzList.map(item => item.id));
			});
		},
		getRoleList() {
			getRoleList().then(res => {
				this.roleList = res;
			});
		},
		getJobList() {
			getJobList().then(res => {
				this.jobList = res;
			});
		},
		getClassList() {
			getClassList().then(res => {
				this.clazzList = res;
			});
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				let staff = lodash.omit(this.staff, ['headImg', 'avatarImg', 'status', 'leaveReason', 'leaveTime', 'region', 'roleList', 'jobList', 'clazzList']); // TOOD
				if (valid) {
					if (this.id) {
						staff.roleList = staff.roleIds.map(role => ({ roleId: role }));
						staff.jobList = staff.jobIds.map(job => ({ id: job }));
						staff.clazzList = staff.clazzIds.map(clazz => ({ id: clazz }));
						staff = _.omit(staff, ['roleIds', 'jobIds', 'clazzIds', 'realName', 'nickname', 'mobile']); // TODO
						updateTeacher(staff).then(res => {
							this.$message({
								message: '修改成功',
								type: 'success'
							});
							this.$router.push({ path: 'index' });
						});
					} else {
						addTeacher(staff).then(res => {
							this.$message({
								message: '新增成功',
								type: 'success'
							});
							this.$router.push({ path: 'index' });
						});
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
