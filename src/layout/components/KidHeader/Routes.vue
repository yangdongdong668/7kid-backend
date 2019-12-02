<template>
	<div class="routes-lists">
		<router-link
			v-for="tag in visitedViews"
			ref="tag"
			:key="tag.path"
			:class="isActive(tag)?'active':''"
			:to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath, query: tag.query }"
			tag="span"
			class="routes-item"
			@click.middle.native="closeSelectedTag(tag)"
			@contextmenu.prevent.native="openMenu(tag,$event)"
		>
			<img class="route-icon" :src="require('@/assets/icons/icon_application_normal.png')" alt />
			{{ generateTitle(tag.title) }}
			<span
				v-if="!tag.meta.affix"
				class="el-icon-close routes-close"
				@click.prevent.stop="closeSelectedTag(tag)"
			/>
		</router-link>
	</div>
</template>

<script>
import path from 'path';
import { generateTitle } from '@/utils/i18n';
import { mapGetters, mapActions } from 'vuex';
export default {
	name: 'header-routes',
	data() {
		return {};
	},
	computed: {
		...mapGetters(['visitedViews', 'routes'])
	},
	mounted() {
		this.initTags();
		this.addTags();
	},
	methods: {
		...mapActions(['tagsView/addView', 'tagsView/delView']),
		generateTitle,
		isActive(route) {
			return route.path === this.$route.path;
		},
		async closeSelectedTag(view) {
			await this['tagsView/delView'](view);

			// 这里暂时写死，如果当前 route 不是桌面或者应用中心，就不进行重定向
			const doNotClose = ['/desktop/index', '/desktop/application'];
			if (doNotClose.indexOf(this.$route.path) === -1) this.toHome();
		},
		toHome() {
			this.$router.push('/');
		},
		openMenu(tag, e) {
			return false;
		},
		initTags() {
			const affixTags = this.filterAffixTags(this.routes);
			for (const tag of affixTags) {
				// Must have tag name
				if (tag.name) {
					this['tagsView/addView'](tag);
				}
			}
		},
		addTags() {
			const { name } = this.$route
			if(name) {
				this['tagsView/addView'](this.$route);
			}
		},
		filterAffixTags(routes, basePath = '/') {
			let tags = [];
			routes.forEach(route => {
				if (route.meta && route.meta.affix) {
					const tagPath = path.resolve(basePath, route.path);
					tags.push({
						fullPath: tagPath,
						path: tagPath,
						name: route.name,
						meta: { ...route.meta }
					});
				}
				if (route.children) {
					const tempTags = this.filterAffixTags(route.children, route.path);
					if (tempTags.length >= 1) {
						tags = [...tags, ...tempTags];
					}
				}
			});
			return tags;
		}
	},
	watch: {
		$route() {
			this.addTags();
		}
	}
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.routes-lists {
	height: 100%;
	vertical-align: top;

	display: inline-block;

	.routes-item {
		display: inline-block;
		width: 118px;
		line-height: 50px;
		text-align: center;
		font-size: 14px;
		color: $whiteText;
		cursor: pointer;

		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;

		position: relative;

		.routes-close {
			position: absolute;
			top: 4px;
			right: 4px;
		}
		.route-icon {
			display: inline-block;
			vertical-align: sub;
			margin-right: 5px;
		}
	}

	.routes-item.active {
		background: rgba(255, 255, 255, 0.15);
		border-bottom: 2px solid #20d1c0;
	}
}
</style>
