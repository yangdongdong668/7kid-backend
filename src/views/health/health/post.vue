<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
	        <el-form-item label="班级选择" prop="clazz">
            <el-cascader
					    :options="gradeClasses"
					    :props="{ value: 'id', label: 'name' }"
					    @change="handleChange"
					    clearable>
					  </el-cascader>
	        </el-form-item>
	        <el-form-item label="幼儿选择" prop="child">
	            <el-select v-model="ruleForm.child" placeholder="请选择活动区域">
	            <el-option v-for="stu in studentList" :label="stu.childName" :value="stu.id"></el-option>
	            </el-select>
	        </el-form-item>
	        <el-form-item label="既往史" prop="desc">
	            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
	        </el-form-item>
	        <el-form-item class="text-center" label-width="0">
	            <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
	            <el-button @click="resetForm('ruleForm')">重置</el-button>
	        </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { getGradeClasses, getClassStudents } from '@/api/student';
export default {
	data() {
		return {
			gradeClasses: [],
			studentList: [],
			ruleForm: {
				grade: '',
				clazz: '',
				child: '',
				desc: ''
			},
			rules: {
				clazz: [
					{ required: true, message: '请选择班级', }
				],
				child: [
					{ required: true, message: '请选择幼儿', }
				],
				desc: [
					{ required: true, message: '请填写既往史', }
				]
			}
		};
	},
	mounted(){
		this.getGradeClasses();
	},
	methods: {
		handleChange(val){
			var that = this;
			[that.ruleForm.grade,that.ruleForm.clazz] = val;
			this.getClassStudents(that.ruleForm.clazz);
		},
		getGradeClasses(){
			getGradeClasses().then(res=>{
				let classes = lodash.forIn(lodash.groupBy(res, grade=>grade.gradeId),function(value, key) {
				  lodash.forEach(value,item=> lodash.assign(item,{id:item.clazzId,name:item.clazzName}))
				});
				this.gradeClasses = lodash.uniqBy(res,'gradeId').map(function(item){
					return lodash.assign({},{id:item.gradeId,name:item.gradeName || '无名',children: classes[item.gradeId]})
				})
			})
		},
		getClassStudents(classId){
			getClassStudents({clazzId:classId}).then(res=>{
				this.studentList = res;
			})
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					alert('submit!');
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		}
	}
};
</script>
