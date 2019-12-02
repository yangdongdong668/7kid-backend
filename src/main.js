import Vue from 'vue';

import 'normalize.css/normalize.css'; // A modern alternative to CSS resets

import ElementUI from 'element-ui';
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
// import 'element-ui/lib/theme-chalk/index.css';
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n
// import locale from 'element-ui/lib/locale/lang/zh-CN';
import i18n from './lang'; // internationalization

import '@/styles/element-hack.scss'; // hack css
import '@/styles/index.scss'; // global css

import App from './App';
import store from './store';
import router from './router';

import '@/icons'; // icon
import '@/permission'; // permission control

import ECharts from 'vue-echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';

import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';

import prom from '@/utils/promise';

Vue.prototype.$promise = prom;
Vue.component('v-chart', ECharts);

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
// import { mockXHR } from '../mock'
// if (process.env.NODE_ENV === 'production') {
//   mockXHR()
// }

Vue.component(CollapseTransition.name, CollapseTransition);
// set ElementUI lang to EN
Vue.use(ElementUI, {
	i18n: (key, value) => i18n.t(key, value)
});

Vue.config.productionTip = false;

new Vue({
	el: '#app',
	router,
	store,
	i18n,
	render: h => h(App)
});
