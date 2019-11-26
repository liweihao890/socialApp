import Vue from 'vue'
import App from './App'
Vue.config.productionTip = false
App.mpType = 'app'

// 注册全局组件
import Divider from "./components/common/Divider.vue";
import LoadMore from '@/components/common/LoadMore.vue';
import Nothing from '@/components/common/Nothing.vue';
Vue.component("divider", Divider)
Vue.component('loadmore', LoadMore)
Vue.component('nothing',Nothing)

// 引入全局函数
import $U from './common/js/util.js';
import User from './common/js/user.js';
import Tip from './common/js/tip.js';
import request from "./network/request.js";
Vue.prototype.$http = request;
Vue.prototype.$U = $U
Vue.prototype.User = User
Vue.prototype.Tip = Tip


const app = new Vue({
    ...App
})
app.$mount()
