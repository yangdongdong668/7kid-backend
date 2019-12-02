<template>
	<div class="desktop-container">
		<div class="main-left">
			<div class="date-info">
				<div class="time">{{ time }}</div>
				<div class="other">
					<span class="today">{{ today }}</span>
					<span class="week">{{ week }}</span>
				</div>
			</div>
			<div class="quick-link">
				<router-link class="quick-item" :to="fit.path" v-for="fit in fits" :key="fit.path">
					<img class="quick-icon" src="../../assets/desktop-icons/icon_jiaoxuejihua@2x.png" alt />
					<span class="quick-name">{{ generateTitle(fit.meta.title) }}</span>
				</router-link>
				<!-- <el-scrollbar style="height: 100%;">

				</el-scrollbar>-->
			</div>
		</div>
	</div>
</template>

<script>
import { generateTitle } from '@/utils/i18n';
export default {
	name: 'Desktop',
	data() {
		return {
			picUrl:
				'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
			date: new Date()
		};
	},
	computed: {
		fits() {
			return this.$store.state.permission.addRoutes.filter(
				item => item.meta && item.meta.level === 1
			);
		},
		today() {
			const month = (this.date.getMonth() + 1).toString().padStart(2, '0'),
				day = this.date
					.getDate()
					.toString()
					.padStart(2, '0');

			return `${month}月${day}日`;
		},
		week() {
			const week = this.date.getDay(),
				weekList = ['日', '一', '二', '三', '四', '五', '六'];
			return '星期' + weekList[week];
		},
		time() {
			const hour = this.date
					.getHours()
					.toString()
					.padStart(2, '0'),
				minute = this.date
					.getMinutes()
					.toString()
					.padStart(2, '0');

			return `${hour}:${minute}`;
		}
	},
	mounted() {},
	methods: {
		generateTitle
	}
};
</script>

<style lang="scss" scoped>
.desktop-container {
	height: 100%;
}
.main-left {
	padding: 40px 0 0 30px;
	display: inline-block;
	width: 50%;
	height: 100%;
}

.date-info {
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	color: rgba(255, 255, 255, 1);

	.time {
		font-size: 70px;
		font-weight: 400;
		line-height: 98px;
	}

	.other {
		padding-left: 25px;

		display: flex;
		flex-flow: column nowrap;

		.date {
			font-size: 16px;
			line-height: 22px;
		}
		.week {
			font-size: 24px;
			line-height: 33px;
		}
	}
}

.quick-link {
	// display: inline-block;
	// width: 170px;
	// 需要给滚动条空出大小
	// width: 100px;
	height: 420px;
	// overflow: auto;

	display: flex;
	flex-flow: column wrap;
	justify-content: flex-start;
	align-content: flex-start;

	// >>> .el-scrollbar__wrap {
	// 	overflow-x: hidden;
	// }

	.quick-item {
		display: inline-block;
		width: 72px;
		height: 95px;
		text-align: center;
		padding: 5px;
		border-radius: 10px;
		margin: 5px 12px;

		cursor: pointer;

		.quick-icon {
			width: 100%;
			margin-bottom: -10px;
		}

		.quick-name {
			font-size: 14px;
			text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.3);
			color: rgba(255, 255, 255, 1);
		}

		&:hover {
			background: rgba(255, 255, 255, 0.15);
			box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.18);
		}
	}
}
</style>

