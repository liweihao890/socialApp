<template>
	<view>
		<!-- tab -->
		<view class="flex align-center " style="height: 100rpx;" >
			<view class="flex-1 flex align-center justify-center " 
			v-for="(item,index) in tabBar" :key="index" @click="changeTab(index)"
			:class="tabIndex === index ? 'font-lg font-weight-bold text-main '  : 'font-md '  ">
				{{item.name}}<text v-if="item.num" class="ml-2">{{item.num}}</text>
			</view>
		</view>
		<!-- 列表 -->
		<swiper :duration="150" :current="tabIndex" :style="'height:' + scrollH + 'px'" @change="onChangeTab">
			<swiper-item v-for="(item, index) in followFriendInfo" :key="index">
				<scroll-view scroll-y="true" :style="'height:' + scrollH + 'px'" @scrolltolower="loadmore(index)">
					<!-- 有数据 -->
					<template v-if="item.list.length">
						<block v-for="(item2, index2) in item.list" :key="index2">
							<!-- 列表样式 -->
							<user-list :item="item2" :index="index2"></user-list>
						</block>
						<!-- 上拉加载更多 -->
						<loadmore v-if="item.list.length > 10" :loadmore="item.loadmore"></loadmore>
					</template>
					<!-- 没有数据 -->
					<template v-else>
						<nothing></nothing>
					</template>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import LoadMore from '@/components/common/LoadMore.vue';
	import {getUserData} from '@/network/getData.js';
	
	import userList from '@/components/content/user-list/user-list.vue';
	export default {
		components:{
			LoadMore,
			userList
		},
		data() {
			return {
				followFriendInfo:[],
				//初始化可滚动高度
				scrollH: 800,
				tabIndex: 0,
				tabBar: [{name: ' 互关',num: 0 },{name: '关注',num: 10},{name: '粉丝',num: 20}],
				
			}
		},
		onNavigationBarSearchInputClicked() {
				uni.navigateTo({
					url: '../search/search?type=user',
				});
		},
		onNavigationBarButtonTap() {
				uni.navigateBack({
					delta: 1
				});
		},
		onLoad() {
			uni.getSystemInfo({
				success: res => {
					this.scrollH = res.windowHeight - uni.upx2px(100);
				}
			});
			//获取数据
			this.followFriendInfo = getUserData(this.tabBar.length)
		},
		
		methods: {
			changeTab(index){
				this.tabIndex = index;
			},
			onChangeTab(e){
				
				this.changeTab(e.detail.current)
			},
			//上拉加载更多功能实现
			loadmore(index) {
				//拿到当前列表页
				let item = this.newsList[index];
				//判断是否处于可加载状态
				if (item.loadmore !== '上拉加载更多') return;
				// 修改当前列表页加载状态为加载中
				item.loadmore = '加载中';
				//模拟数据请求
				setTimeout(() => {
					//加载数据
					item.list = [...item.list, ...item.list];
					//回复加载状态
					item.loadmore = '上拉加载更多';
				}, 1000);
			},
			
		}
	}
</script>

<style>

</style>
