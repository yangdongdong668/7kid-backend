<template>
  <div class="r-container clazz-edit">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{title}}</span>
      </div>
      <div>
        <el-form ref="clazzForm" :model="clazz" :rules="rules" label-width="100px" class="default-form">
          <el-form-item label="年级" prop="gradeId" class="col-1">
            <el-select v-model="clazz.gradeId" placeholder="请选择年级">
              <el-option
                v-for="grade in gradeList"
                :key="grade.id"
                :label="grade.gradeName"
                :value="grade.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="班级名称" prop="clazzName" class="col-1">
            <el-input v-model="clazz.clazzName" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item label="定额人数" prop="maxStudentNum" class="col-1">
            <el-input v-model.number="clazz.maxStudentNum" autocomplete="off" />
          </el-form-item>
          <el-form-item label="班级老师" prop="teacherIds" class="col-1">
            <el-select v-model="clazz.teacherIds" multiple plaeholder="请选择">
              <el-option
                v-for="teacher in teachers"
                :key="teacher.teacherId"
                :label="teacher.jobsName+'-'+teacher.teacherName"
                :value="teacher.teacherId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="col-1 text-center">
            <el-button type="primary" @click="submitForm('clazzForm')">提交</el-button>
            <el-button @click="$router.back(-1)">返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getClassDetail, getGradeList, updateClass, addClass, getTeacherJobList } from '@/api/garden';
export default {
	name: 'class-edit',
	data() {
		return {
			id: this.$route.query.id,
			title: this.$route.query.id ? '修改班级' : '新增班级',
			gradeList: [],
			rules: {
				gradeId: [
					{ required: true, message: '请选择年级' }
				],
				clazzName: [
					{ required: true, message: '请输入班级名称' },
					{ min: 1, max: 20, message: '最多输入20个字符' }
				],
				maxStudentNum: [
					{ required: true, message: '请输入定额人数' },
					{ type: 'number', message: '人数必须为数字' },
					{ pattern:/^\d{1,3}$/, message: '定额人数应在0~999之间', }
				]
			},
			clazz: {
				gradeId: '',
				clazzName: '',
				maxStudentNum: '',
				teacherIds: []
			},
			teachers: []
		};
	},
	mounted() {
		if (this.id) {
			this.getClassDetail();
		}
		this.getGradeList();
		this.getTeacherList();
	},
	methods: {
		getClassDetail() {
			getClassDetail({ clazzId: this.id }).then(res => {
				this.clazz = res;
				this.$set(this.clazz, 'teacherIds', this.clazz.teachers.map(item => item.teacherId));
			});
		},
		getGradeList() { // 年级选择下拉列表
			getGradeList().then(res => {
				this.gradeList = res;
			});
		},
		getTeacherList() {
			getTeacherJobList().then(res => {
				this.teachers = res;
			});
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					const clazz = {
						gradeId: this.clazz.gradeId,
						clazzName: this.clazz.clazzName,
						maxStudentNum: this.clazz.maxStudentNum,
						teacherIds: this.clazz.teacherIds.join(',')
					};
					if (this.id) {
						clazz.id = this.id;
						updateClass(clazz).then(res => {
							this.$message({
								message: '修改成功',
								type: 'success'
							});
							this.$router.push({ path: 'index' });
						}).catch(()=>{});
					} else {
						addClass(clazz).then(res => {
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
