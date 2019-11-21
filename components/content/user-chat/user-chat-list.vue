<template>
	<view >
		<!-- 时间 -->
		<view class="py-2 flex align-center justify-center font-sm text-light-muted" v-if="shortTime">
			{{shortTime}}
		</view>
		<!-- 消息气泡 -->
		<view class="flex align-start px-2 my-2":style="isSelf ? 'flex-direction: row-reverse;' : '' ">
			<image :src="item.avatar" mode="" style="height: 100rpx; width: 100rpx;" class="rounded-circle"></image>
			<view class="bg-light p-2 rounded mx-2" style="min-width: 100rpx; max-height: 400rpx;">
				{{item.data}}
			</view>
		</view>
	</view>
</template>

<script>
	// 模拟当前登录用户的id
	let currentUser_id = 1;
	import $T from '@/common/time.js'
	export default {
		props:{
			item: Object,
			index: Number,
			pre_time: [Number,String]
		},
		computed:{
			//判断是不是当前用户
			isSelf(){
				return currentUser_id === this.item.user_id
			},
			// 300s内只显示一条时间戳
			shortTime(){
				return $T.getChatTime(this.item.create_time,this.pre_time)
			}
		}
	}
</script>

<style>
</style>
