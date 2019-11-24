<template>
	<view >
		<template v-if="searchList.length === 0">
			<!-- 搜索历史 -->
			<view class="py-2 font-md px-2">搜索历史</view>
			<view class="flex flex-wrap">
				<view class="border rounded font mx-2 my-1 px-2" 
				v-for="(item,index) in historyList" :key="index"
				hover-class="bg-light"
				@click="clickSearchHistory(item)">{{item}}</view>
			</view>
		</template>
		<template v-else>
			<!-- 数据列表 -->
			<block v-for="(item,index) in searchList" :key="index">
				<template v-if="type === 'post' ">
					<common-list :item="item" :index="index"></common-list>
				</template>
				<template v-else-if=" type === 'topic' ">
					<topic-list :item="item" :index="index"></topic-list>
				</template>
				<template v-else>
					<user-list :item="item" :index="index"></user-list>
				</template>
			</block>
		</template>
		
		
	</view>
</template>

<script>
	import {getPostList,getTopicList,getUserList} from '@/network/getData.js';
	import CommonList from "@/components/common/CommList.vue";
	import topicList from '@/components/content/new/topic-list.vue';
	import userList from '@/components/content/user-list/user-list.vue';
	export default {
		components:{
			CommonList,
			topicList,
			userList
		},
		data() {
			return {
				//搜索内容
				searchText: '',
				//搜索结果
				searchList: [],
				//搜索历史
				historyList:['uni-app第二季商城类实战开发','uni-app第三季仿微信实战开发','实战教程','系列教程'],
				// 当前搜索类型
				type: 'post'
			}
		},
		//监听导航搜索框输入
		onNavigationBarSearchInputChanged(e){
			this.searchText = e.text
		},
		//监听点击搜索按钮
		onNavigationBarButtonTap(e){
			if(e.index ===0 ){
				this.searchEvent()
			}
		},
		onLoad(e) {
			if (e.type) {
				this.type = e.type
			}
			switch (e.type){
				case 'post':
					pageTitle: '帖子';
					break;
				case 'topic':
					pageTitle: '话题';
					break;
				case 'user':
					pageTitle: '用户';
					break;
			}
			//条件编译
			// #ifdef APP-PLUS
			// 修改搜索占位
			let currentWebview = this.$mp.page.$getAppWebview();
			let tn = currentWebview.getStyle().titleNView;
			tn.searchInput.placeholder = '搜索' + pageTitle;
			currentWebview.setStyle({
				titleNView: tn
			})
			// #endif
			
		},
		methods: {
			//点击搜索，搜索内容
			searchEvent(){
				//收起键盘
				uni.hideKeyboard()
				//显示loading状态
				uni.showLoading({
					title: '加载中...',
					mask:false
				})
				//请求搜索,保存搜索结果
				setTimeout( ()=> {
					switch (this.type){
						case 'post':
							this.searchList = getPostList()
							break;
						case 'topic':
							this.searchList = getTopicList()
							break;
						case 'user':
							this.searchList = getUserList()
							break;
					}
					//隐藏Loading
					uni.hideLoading()
				} ,1000)
			},
			//点击搜索历史
			clickSearchHistory(text){
				this.searchText = text
				this.searchEvent()
			}
		},
		
	}
</script>

<style>

</style>
