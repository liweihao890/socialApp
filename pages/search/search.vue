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
				<common-list :item="item" :index="index"></common-list>
			</block>
		</template>
		
		
	</view>
</template>

<script>
	import {list} from '@/network/data.js';
	import CommonList from "@/components/common/CommList.vue"
	export default {
		components:{
			CommonList
		},
		data() {
			return {
				//搜索内容
				searchText: '',
				//搜索结果
				searchList: [],
				//搜索历史
				historyList:['uni-app第二季商城类实战开发','uni-app第三季仿微信实战开发','实战教程','系列教程']
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
			console.log(e.type);
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
					this.searchList = list
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
