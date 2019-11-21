<template>
	<view>
		<!-- 热门分类 -->
		<view class="flex align-center justify-between px-2 ">
			<text class=" font-md">热门分类</text>
			<view class="flex align-center font text-secondary animated " hover-class="jello" @click="open">
				更多<text class="iconfont icon-jinru " ></text>
			</view>
		</view>
		<!-- 功能列表 -->
		<view class="flex align-center py-3 border-bottom px-2">
			<view class="border rounded bg-light mx-1 px-2 animated " hover-class="jello" v-for="(item,index) in hotCate" :key="index" @click="openDetail">
				{{item.name}}
			</view>
		</view>
	</view>
</template>

<script>
	
	
	export default {
		props:{
			hotCate: Array
		},
		methods:{
			open(){
				uni.navigateTo({
					url: "/pages/topic-nav/topic-nav",
					
				});
			},
			openDetail(){
				console.log('888');
			}
		}
	}
</script>

<style>
</style>
