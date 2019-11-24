<template>
	<view class="flex align-center px-2 py-2 border-bottom border-light-secondary animated fast fadeIn" @click="open">
		<image :src="item.avatar" mode="" class="rounded-circle mr-2" style="height: 80rpx; width: 80rpx;"></image>
		<view class="flex flex-column  flex-1">
			<view class="flex align-center justify-between">
				<text class="font-md">{{ item.username }}</text>
				<text class="font-sm text-secondary">{{ item.update_time | formatTime }}</text>
			</view>
			<view class="flex align-center justify-between">
				<text class="text-secondary text-ellipsis" style="max-width: 500rpx;">{{ item.data }}</text>
				<uni-badge class="uni-badge-left-margin" :text='item.noread | num2str' type="error"></uni-badge>
			</view>
		</view>
	</view>
</template>

<script>
	import uniBadge from '@/components/uni-ui/uni-badge/uni-badge.vue';
	//引入时间库
	import $T from '@/common/time.js';
	export default {
		components: {
			uniBadge
		},
		props: {
			item: Object,
			index: Number
		},
		filters: {
			formatTime: function(value) {
				return $T.gettime(value)
			},
			num2str: function(value){
				return value.toString()
			}
		},
		methods:{
			open(){
				uni.navigateTo({
					url: '/pages/user-chat/user-chat',
				});
			}
		}
	}
</script>

<style></style>
