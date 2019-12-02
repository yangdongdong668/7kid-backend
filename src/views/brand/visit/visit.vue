<template>
  <div class="r-container visit">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>角色编辑</span>
      </div>
      <div>
        <el-checkbox v-model="checkAll">全选</el-checkbox>
        <div style="margin: 15px 0;" />
        <el-checkbox-group v-model="checkedCities">
          <!-- <el-checkbox v-for="(city,index) in cities" :label="city" :key="city" v-model="city_1"></el-checkbox> -->
          <el-checkbox v-model="city[0]" label="上海">上海</el-checkbox>
          <!-- <el-checkbox-group  v-model="checkedCountries[0]">
            <el-checkbox label="浦东">浦东</el-checkbox>
            <el-checkbox label="虹口">虹口</el-checkbox>
            <el-checkbox label="徐汇">徐汇</el-checkbox>
            <el-checkbox label="虹桥">虹桥</el-checkbox>
          </el-checkbox-group>-->
          <el-checkbox v-model="city[1]" label="北京">北京</el-checkbox>
          <el-checkbox v-model="city[2]" label="广州">广州</el-checkbox>
          <el-checkbox v-model="city[3]" label="深圳">深圳</el-checkbox>
        </el-checkbox-group>
      </div>
    </el-card>
  </div>
</template>

<script>
const cityOptions = ['上海', '北京', '广州', '深圳'];
export default {
	data() {
		return {
			checkedCities: [],
			cities: cityOptions,
			city: [true, true, true, true]
		};
	},
	computed: {
		checkAll: {
			get() {
				console.log(this.city.filter(item => item).length);
				return this.city.filter(item => item).length === this.city.length;
			},
			set(val) {
				if (val) {
					this.checkedCities = cityOptions;
				} else {
					this.checkedCities = [];
				}
			}
		}
	},
	mounted() {},
	methods: {}
};
</script>

<style lang="scss" scoped>
</style>
