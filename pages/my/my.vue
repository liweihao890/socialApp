<template>
	<view>
		<navigator url="../login/login">
			<view class="flex align-center p-2" hover-class="bg-light">
				<image src="/static/default.jpg" mode="" style="height: 100rpx; width: 100rpx;" class="rounded-circle"></image>
				<view class="flex flex-column flex-1 px-2">
					<text class="font-lg font-weight-bold text-dark">昵称</text>
					<text class="font text-muted">总帖子10 今日发帖0</text>
				</view>
				<text class="iconfont icon-jinru font-lg"></text>
			</view>
		</navigator>
		<view class="flex align-center px-3 py-2">
			<view class="flex-1 flex flex-column align-center justify-center" v-for="(item,index) in myData" :key="index">
				<text class="font-lg font-weight-bold">{{item.num}}</text>
				<text class="font text-muted">{{item.name}}</text>
			</view>
			
		</view>
		
		<!-- 广告位 -->
		<view >
			<image src="/static/demo/banner1.jpg" mode="aspectFill" style="height: 200rpx;width: 93%; " class="rounded px-2 py-2"></image>
		</view>
		
		<uni-list-item title="浏览历史" showExtraIcon>
			<text slot="icon" class="iconfont icon-liulan"></text>
		</uni-list-item>
		<uni-list-item title="社区认证" showExtraIcon>
			<text slot="icon" class="iconfont icon-huiyuanvip"></text>
		</uni-list-item>
		<uni-list-item title="审核帖子" showExtraIcon>
			<text slot="icon" class="iconfont icon-keyboard"></text>
		</uni-list-item>
	</view>
</template>

<script>
	import uniListItem from '../../components/uni-ui/uni-list-item/uni-list-item.vue';
	export default {
		components: {
			uniListItem
		},
		data() {
			return {
				myData:[
					{
						name: '帖子',
						num: 0
					},
					{
						name: '动态',
						num: 2
					},
					{
						name: '评论',
						num: 2
					},
					{
						name: '粉丝',
						num: 1
					},
				],
				
			}
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url: '../user-set/user-set',
			});
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
