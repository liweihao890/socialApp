<template>
	<view class="flex p-2 align-center border-bottom border-light-secondary" hover-class="bg-light">
		<image :src="item.avatar" mode="" style="height: 100rpx; width: 100rpx;" 
		class="rounded-circle mr-2">
			
		</image>
		<view class="flex flex-column flex-1">
			<text class="font-md text-dark">{{item.username}}</text>
			<uni-badge  :text='item.age | num2str' :type="item.sex === 1 ? 'error' : 'primary' " size="small" >
				<text class="iconfont  text-white font-sm " style="margin-right: 5rpx" :class="item.sex === 1 ? 'icon-nv' : 'icon-nan' "></text>
			</uni-badge>
		</view>
		<view class="uni-icon uni-icon-checkbox-filled"
		:class="item.isFollow ? 'text-light-muted' : 'text-main' ">
			
		</view>
	</view>
</template>

<script>
	import uniBadge from '@/components/uni-ui/uni-badge/uni-badge.vue';
	export default {
		components:{
			uniBadge
		},
		props:{
			item: Object,
			index: Number
		},
		filters: {
			
			num2str: function(value){
				return value.toString()
			}
		},
	}
</script>

<style>
</style>
