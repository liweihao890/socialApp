import Vue from 'vue'
import App from './App'
import $U from './common/util.js';
Vue.config.productionTip = false

App.mpType = 'app'
// 注册全局组件
import Divider from "./components/common/Divider.vue";
import LoadMore from '@/components/common/LoadMore.vue';
import Nothing from '@/components/common/Nothing.vue';
Vue.component("divider", Divider)
Vue.component('loadmore', LoadMore)
Vue.component('nothing',Nothing)

Vue.prototype.$U = $U
const app = new Vue({
    ...App
})
app.$mount()
