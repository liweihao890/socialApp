<template>
	<view class="p-2">
		<!-- 头像昵称 | 关注按钮 -->
		<view class="flex align-center justify-between">
			<view class="flex align-center">
				<!-- 头像 -->
				
					<image   class="rounded-circle mr-2" :src="item.userpic" 
					style="width: 65rpx;height: 65rpx;" lazy-load @click="openSpace"></image>
				
				
				<!-- 昵称发布时间 -->
				<view>
					<view class="font" style="line-height: 1.5;">{{ item.username }}</view>
					<text class="font-sm text-light-muted" style="line-height: 1.5;">{{ item.newstime }}</text>
				</view>
			</view>
			<!-- 按钮 -->
			<view
				class="flex align-center justify-center rounded bg-main text-white animated faster"
				style="width: 90rpx;height: 50rpx;"
				hover-class="jello"
				v-if="!item.isFollow"
				@click="follow"
			>
				关注
			</view>
		</view>
		<!-- 标题 -->
		<view class="font-md my-1" @click="openDetail">{{ item.title }}</view>
		<!-- 图片 -->
		<image v-if="item.titlepic"  :src="item.titlepic" style="height: 350rpx;" class="rounded w-100" @click="openDetail"></image>
		<!-- 图标按钮 -->
		<view class="flex align-center">
			<view class="flex align-center justify-center flex-1" @click="doSupport('support')">
				<text class="iconfont icon-dianzan2 mr-2"
				:class="item.support.type === 'support' ? 'support_active' : '' "></text>
				<text>{{ item.support.support_count === 0 ? '支持' :  item.support.support_count}}</text>
			</view>
			<view class="flex align-center justify-center flex-1" @click="doSupport('unsupport')">
				<text class="iconfont icon-cai mr-2" 
				:class="item.support.type === 'unsupport' ? 'support_active' : '' "></text>
				<text>{{ item.support.unsupport_count === 0 ? '踩' :  item.support.unsupport_count }}</text>
			</view>
			<view class="flex align-center justify-center flex-1" @click="openDetail">
				<text class="iconfont icon-pinglun2 mr-2"></text>
				<text>{{ item.comment_count }}</text>
			</view>
			<view class="flex align-center justify-center flex-1" @click="openDetail">
				<text class="iconfont icon-fenxiang mr-2"></text>
				<text>{{ item.share_num }}</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		item: Object,
		index: Number
	},
	methods:{
		// 关注功能
		follow(){
			//点击时通知父组件
			this.$emit('follow', this.index)
		},
	
		//打开个人空间
		openSpace(){
			console.log('进入个人空间');
		},
		//打开详情页
		openDetail(){
			console.log('进入详情页');
		},
		//点赞与取消赞操作
		doSupport(type){
			this.$emit('doSupport',{
				type: type,
				index: this.index
			})
			
		}
	}
}
</script>

<style>
	.support_active{
		color: #FF4A6A;
	}
</style>
