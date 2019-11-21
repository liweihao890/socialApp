<template>
	<view>
		<view class="">
			<image :src="topicDetailInfo.cover" mode="aspectFill" style="height: 300rpx; " class="w-100 filter "></image>
		</view>
		<view class="position-relative bg-white px-2 pb-2" style="z-index: 10;">
			<view class="flex" >
				<image :src="topicDetailInfo.cover"  style="height: 150rpx;width: 150rpx; margin-top: -75rpx ; " class="rounded mr-2"></image>
				<text class="font-md" >{{topicDetailInfo.title}}</text>
			</view>
			<view class="flex align-center font text-secondary mr-1">
				<text class="mr-2">动态 : {{topicDetailInfo.news_count}}</text>
				<text>今日 : {{topicDetailInfo.today_count}}</text>
			</view>
			<view class="font-md text-secondary">{{topicDetailInfo.desc}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			topicDetailInfo: Object
		}
	}
</script>

<style>
	.filter{
		filter: blur(10px);
	}
</style>
