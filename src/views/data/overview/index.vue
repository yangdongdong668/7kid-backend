<template>
  <div class="r-container overview">
    <el-row :gutter="40">
      <el-col :span="18">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>幼儿园出勤汇总</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="8">
              <v-chart :style="{width:'100%',height:'300px'}" :options="data1" />
            </el-col>
            <el-col :span="8">
              <v-chart :style="{width:'100%',height:'300px'}" :options="data2" />
            </el-col>
            <el-col :span="8">
              <v-chart :style="{width:'100%',height:'300px'}" :options="data3" />
            </el-col>
          </el-row>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>幼儿园运营汇总</span>
          </div>
          <div>
            <v-chart :style="{width:'100%',height:'400px'}" :options="data4" />
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>待办事项</span>
          </div>
          <ul>
            <li v-for="i in 8">您有一条新的消息</li>
          </ul>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>在线客服</span>
          </div>
          <div>
            <div>客服热线: 0571-88212871</div>
            <div>服务时间: 9: 00 ~ 18:00</div>
            <div>
              <a href="tencent://message/?uin=175622186&amp;Site=有事Q我&amp;Menu=yes">
                <img style="border:0px;" src="http://wpa.qq.com/pa?p=1:175622186:3">
              </a>
            </div>
          </div>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>常见问题</span>
          </div>
          <div />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ECharts from 'vue-echarts';
export default {
	components: {
		'v-chart': ECharts
	},
	data() {
		return {
			data1: {
				title: {
					text: 'ECharts 入门示例'
				},
				tooltip: {},
				xAxis: {
					data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
				},
				yAxis: {},
				series: [{
					name: '销量',
					type: 'bar',
					data: [5, 20, 36, 10, 10, 20]
				}]
			},
			data2: {
				grid: {
					left: '40',
					right: '40'
				},
				xAxis: {
					type: 'category',
					data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
				},
				yAxis: {
					type: 'value'
				},
				series: [{
					data: [820, 932, 901, 934, 1290, 1330, 1320],
					type: 'line',
					smooth: true
				}]
			},
			data3: {
				grid: {
					left: '40',
					right: '40'
				},
				backgroundColor: '#fff',
				title: {
					text: 'Customized Pie',
					left: 'center',
					top: 20,
					textStyle: {
						color: '#ccc'
					}
				},
				tooltip: {
					trigger: 'item',
					formatter: '{a} <br/>{b} : {c} ({d}%)'
				},
				visualMap: {
					show: false,
					min: 80,
					max: 600,
					inRange: {
						colorLightness: [0, 1]
					}
				},
				series: [
					{
						name: '访问来源',
						type: 'pie',
						radius: '55%',
						center: ['50%', '50%'],
						data: [
							{ value: 335, name: '直接访问' },
							{ value: 310, name: '邮件营销' },
							{ value: 274, name: '联盟广告' },
							{ value: 235, name: '视频广告' },
							{ value: 400, name: '搜索引擎' }
						].sort(function(a, b) { return a.value - b.value; }),
						roseType: 'radius',
						label: {
							normal: {
								textStyle: {
									color: 'rgba(0, 0, 0, 1)'
								}
							}
						},
						labelLine: {
							normal: {
								lineStyle: {
									color: 'rgba(0, 0, 0, 1)'
								},
								smooth: 0.2,
								length: 10,
								length2: 20
							}
						},
						itemStyle: {
							normal: {
								color: '#fff',
								shadowBlur: 200,
								shadowColor: 'rgba(0, 0, 0, 1)'
							}
						},
						animationType: 'scale',
						animationEasing: 'elasticOut',
						animationDelay: function(idx) {
							return Math.random() * 200;
						}
					}
				]
			},
			data4: {}
		};
	},
	mounted() {
		var _this = this;
		const xAxisData = [];
		const data = [];
		const data2 = [];
		for (let i = 0; i < 50; i++) {
			xAxisData.push(i);
			data.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
			data2.push((Math.sin(i / 5) * (i / 5 + 10) + i / 6) * 3);
		}
		this.data4 = {
			backgroundColor: '#ddd',
			grid: {
				left: '5%',
				right: '5%'
			},
			xAxis: [{
				show: false,
				data: xAxisData
			}, {
				show: false,
				data: xAxisData
			}],
			visualMap: {
				show: false,
				min: 0,
				max: 50,
				dimension: 0,
				inRange: {
					color: ['#4a657a', '#308e92', '#b1cfa5', '#f5d69f', '#f5898b', '#ef5055']
				}
			},
			yAxis: {
				axisLine: {
					show: false
				},
				axisLabel: {
					textStyle: {
						color: '#4a657a'
					}
				},
				splitLine: {
					show: true,
					lineStyle: {
						color: '#08263f'
					}
				},
				axisTick: {
					show: false
				}
			},
			series: [{
				name: 'back',
				type: 'bar',
				data: data2,
				z: 1,
				itemStyle: {
					normal: {
						opacity: 0.4,
						barBorderRadius: 5,
						shadowBlur: 3,
						shadowColor: '#111'
					}
				}
			}, {
				name: 'Simulate Shadow',
				type: 'line',
				data,
				z: 2,
				showSymbol: false,
				animationDelay: 0,
				animationEasing: 'linear',
				animationDuration: 1200,
				lineStyle: {
					normal: {
						color: 'transparent'
					}
				},
				areaStyle: {
					normal: {
						color: '#08263a',
						shadowBlur: 50,
						shadowColor: '#000'
					}
				}
			}, {
				name: 'front',
				type: 'bar',
				data,
				xAxisIndex: 1,
				z: 3,
				itemStyle: {
					normal: {
						barBorderRadius: 5
					}
				}
			}],
			animationEasing: 'elasticOut',
			animationEasingUpdate: 'elasticOut',
			animationDelay(idx) {
				return idx * 20;
			},
			animationDelayUpdate(idx) {
				return idx * 20;
			}
		};
		setInterval(function() {
			_this.data1.series[0].data = _this.makeArr(6, 100);
			_this.data2.series[0].data.push(_this.data2.series[0].data[0]);
			_this.data2.series[0].data.shift();
			data.push(data[0]);
			data.shift();
			data2.push(data2[0]);
			data2.shift();
			// var series2 = Object.assign({},_this.data2.series);
			// series2.data = series2.data.push(series2.data[0]);
			// series2.data = series2.data.shift();
			// _this.$set(_this.data2,'series',series2)
		}, 2000);
	},
	methods: {
		makeArr(n, m) {
			var arr = [];
			for (var i = 0; i < n; i++) {
				var t = parseInt(Math.random() * m);
				arr.push(t);
			}
			return arr;
		}
	}
};
</script>

<style lang="scss" scoped>
  .box-card{
    margin-bottom: 30px;
  }
</style>
