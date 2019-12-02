<template>
  <div class="r-container role-edit">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>角色编辑</span>
        <span class="float-right">
          <el-button type="primary" @click="$router.go(-1)">返回</el-button>
        </span>
      </div>
      <el-form ref="roleForm" :model="role" label-width="100px" class="default-form">
        <div class="form-title">角色设置</div>
        <el-form-item label="角色名称" prop="name" class="col-1">
          <el-input v-model="role.name" type="text" />
        </el-form-item>
        <el-form-item label="角色简介" prop="intro" class="col-1">
          <el-input v-model="role.intro" type="textarea" :autosize="{ minRows: 2}" />
        </el-form-item>

        <template>
			<div class="deliverySetting">
				<el-divider />
				<div class="select-head">
					<div class="selection-h">
						<el-checkbox :indeterminate="indeterminate" v-model="ischeckAll" @change="handleCheckAllChange">教学管理</el-checkbox>
					</div>
				</div>
				<div class="select-body" v-for="(partition,partitionIndex) in funTotal" :key="partitionIndex">
					<div class="selection-b">
						<p><el-checkbox :indeterminate="partition.indeterminate" v-model="partition.selected" @change="handleCheckedFunPartChange(partitionIndex,partition.partitionId,$event)" :key="partitionIndex">{{partition.partitionName}}</el-checkbox></p>
					</div>
					<div class="selection-g">
						<el-checkbox v-for="funGroup in partition.funGroup" v-model="funGroup.selected" @change="handleCheckedFunGroupChange(partitionIndex,funGroup.id,partition.partitionId,$event)" :label="funGroup" :key="funGroup.id">{{funGroup.fieldName}}</el-checkbox>
					</div>
				</div>
			</div>
        </template>
        <el-form-item class="col-1 text-center">
          <el-button type="primary" @click="submitForm('gardenForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
	// TODO
	data() {
		return {
			role: {
				name: '1212',
				intro: 'hahha'
			},
			funTotal: [
				{ partitionName: '教学计划', selected: false, partitionId: 1, isIndeterminate: false,
					funGroup: [
						{ id: '1', fieldName: '查看', selected: false },
						{ id: '2', fieldName: '新增', selected: false },
						{ id: '3', fieldName: '修改', selected: false },
						{ id: '4', fieldName: '删除', selected: false },
						{ id: '5', fieldName: '模板设置', selected: false }]
				},
				{ partitionName: '亲子任务', selected: false, partitionId: 2, isIndeterminate: false,
					funGroup: [
						{ id: '6', fieldName: '查看', selected: false },
						{ id: '7', fieldName: '新增', selected: false },
						{ id: '8', fieldName: '修改', selected: false },
						{ id: '9', fieldName: '删除', selected: false }]
				},
				{ partitionName: '智能相册', selected: false, partitionId: 3, isIndeterminate: false,
					funGroup: [
						{ id: '10', fieldName: '查看', selected: false },
						{ id: '11', fieldName: '新增', selected: false },
						{ id: '12', fieldName: '修改', selected: false },
						{ id: '13', fieldName: '删除', selected: false }]
				}
			],
			ischeckAll: false, // 一级全选状态
			indeterminate: false
		};
	},
	computed: {},
	methods: {
		handleCheckAllChange(e) { // 一级change事件
			this.ischeckAll = e;
			if (e === true) {
				this.indeterminate = false;
				for (let i = 0, len = this.funTotal.length; i < len; i++) { // 二级全选反选不确定
					this.funTotal[i].selected = e;
					this.funTotal[i].indeterminate = false; // 去掉二级不确定状态
					for (let j = 0, len1 = this.funTotal[i].funGroup.length; j < len1; j++) {
						this.funTotal[i].funGroup[j].selected = e;
					}
				}
			} else {
				this.indeterminate = false;
				for (let i = 0, len = this.funTotal.length; i < len; i++) { // 三级全选反选不确定
					this.funTotal[i].selected = e;
					this.funTotal[i].indeterminate = false; // 去掉二级不确定状态
					for (let j = 0, len1 = this.funTotal[i].funGroup.length; j < len1; j++) {
						this.funTotal[i].funGroup[j].selected = e;
					}
				}
			}
		},
		handleCheckedFunPartChange(index, topId, e) { // 二级change事件
			this.funTotal[index].selected = e;// 二级勾选后，子级全部勾选或者取消
			if (e === false) this.funTotal[index].indeterminate = false; // 去掉二级不确定状态
			var childrenArray = this.funTotal[index].funGroup;
			if (childrenArray) {
				for (let i = 0, len = childrenArray.length; i < len; i++) { childrenArray[i].selected = e; }
			}

			this.getIsCheckAll();
		},
		handleCheckedFunGroupChange(topIndex, sonId, topId, e) { // 三级change事件
			var childrenArray = this.funTotal[topIndex].funGroup;
			var tickCount = 0, unTickCount = 0, len = childrenArray.length;
			for (var i = 0; i < len; i++) {
				if (sonId === childrenArray[i].id) childrenArray[i].selected = e;
				if (childrenArray[i].selected === true) tickCount++;
				if (childrenArray[i].selected === false) unTickCount++;
			}
			if (tickCount === len) { // 三级级全勾选
				this.funTotal[topIndex].selected = true;
				this.funTotal[topIndex].indeterminate = false;
			} else if (unTickCount === len) { // 三级级全不勾选
				this.funTotal[topIndex].selected = false;
				this.funTotal[topIndex].indeterminate = false;
			} else {
				this.funTotal[topIndex].selected = false;
				this.funTotal[topIndex].indeterminate = true; // 添加二级不确定状态
			}

			this.getIsCheckAll();
		},
		getIsCheckAll() {
			let tickCount = 0, unTickCount = 0;
			const ArrLength = this.funTotal.length;
			for (let j = 0; j < ArrLength; j++) { // 全选checkbox状态
				if (this.funTotal[j].selected === true) tickCount++;
				if (this.funTotal[j].selected === false) unTickCount++;
			}
			if (tickCount === ArrLength) { // 二级全勾选
				this.ischeckAll = true;
				this.indeterminate = false;
			} else if (unTickCount === ArrLength) { // 二级全不勾选
				this.ischeckAll = false;
				this.indeterminate = false;
			} else {
				this.ischeckAll = false;
				this.indeterminate = true; // 添加一级不确定状态
			}
		}

	}
};
</script>

<style lang="scss" scoped>
.role-edit {
  /deep/ .el-card__header {
    padding: 10px 20px;
    line-height: 40px;
  }
}
.deliverySetting{
	margin-bottom:30px;
	.selection-h{
		/deep/ .el-checkbox__label{
			font-size:18px;
			font-weight:600;
		}

	}
	.selection-b{
		margin:30px 20px;
		/deep/ .el-checkbox__label{
			font-size:16px;
			font-weight:600;
		}
	}
	.selection-g{
		margin-left:60px;
	}
}
</style>
