<template>
  <div class="r-container monthlyCheck">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>本月晨检</span>
      </div>
      <div>
        <v-chart :options="polar" />
      </div>
    </el-card>
  </div>
</template>

<script>
import ECharts from 'vue-echarts';
import 'echarts/lib/component/polar';
export default {
	components: {
		'v-chart': ECharts
	},
	data() {
		const data = [];

		for (let i = 0; i <= 360; i++) {
			const t = i / 180 * Math.PI;
			const r = Math.sin(2 * t) * Math.cos(2 * t);
			data.push([r, i]);
		}

		return {
			polar: {
				title: {
					text: '极坐标双数值轴'
				},
				legend: {
					data: ['line']
				},
				polar: {
					center: ['50%', '54%']
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross'
					}
				},
				angleAxis: {
					type: 'value',
					startAngle: 0
				},
				radiusAxis: {
					min: 0
				},
				series: [
					{
						coordinateSystem: 'polar',
						name: 'line',
						type: 'line',
						showSymbol: false,
						data: data
					}
				],
				animationDuration: 2000
			}
		};
	},
	mounted() {
	}
};
</script>

<style lang="scss" scoped>
</style>

