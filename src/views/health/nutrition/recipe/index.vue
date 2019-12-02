<template>
  <div class="r-container infant">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>食谱管理</span>
        <span class="float-right">
          <router-link to="edit"><el-button type="primary">新增+</el-button></router-link>
        </span>
      </div>
      <el-form ref="searchForm1" :model="search1" label-width="100px" size="small">
        <el-row>
          <el-col :span="18">
            <el-row>
              <el-col :span="8">
                <el-form-item label="选择日期" prop="todo1">
                  <el-date-picker v-model="search1.todo1" type="date" placeholder="选择日期" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button type="primary">查询</el-button>
              <el-button>清空</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row :gutter="1">
        <el-col v-for="item in 25" :span="6">
          <recipe-card />
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>

var recipeCard = {
	name: 'recipeCard',
	template: `<el-card class="recipe-card">
    <div @mouseenter="hover=true">
      <img :src="imgSrc">
      <div>素食餐</div>
      <p>2019-09-01至2019-09-08</p>
      <div>发布范围:全体师生</div>
    </div>
    <transition>
      <div v-show="hover" @mouseleave="hover=false" class="cover">
        <span @click.stop="handleEdit"><i class="el-icon-edit"></i></span>
        <span @click.stop="handleRemove"><i class="el-icon-delete"></i></span>
      </div>
    </transition>
  </el-card>`,
	data() {
		return {
			imgSrc: require('@/assets/recipe.png'),
			hover: false
		};
	},
	mounted() {
	},
	methods: {
		handleEdit() {
			console.log(1);
		},
		handleRemove() {
			console.log(2);
		}
	}
};
export default {
	components: {
		recipeCard
	},
	data() {
		return {
			search1: {
				todo1: ''
			}
		};
	},
	methods: {
	}
};
</script>

<style lang="scss" scoped>
.recipe-card{
  position: relative;
  margin: 8px;
  text-align: center;
  &:hover{
    transform: scale(1.1);
  }
  /deep/ .cover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.3);
    text-align: center;
    line-height: 200px;
    font-size: 0;
    span {
      color: #fff;
      font-size: 24px;
      margin: 5px;
    }
  }
}
</style>
