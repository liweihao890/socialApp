
<template>
<!-- 底部操作条 -->
		<view class="fixed-bottom flex align-center border-top bg-white" style="height: 100rpx;">
			<input type="text" value="" placeholder="文明发言" class=" flex-1 rounded bg-light ml-2  " style="padding: 10px 5px"
			v-model="content" :adjust-position="true" :confirm-hold="true" 
			:focus="focus"
			@confirm="submit"/>
			<view class="iconfont icon-fabu flex justify-center align-center font-lg animated " style="width: 100rpx;" 
			hover-class="jello text-main"
			@click="submitBtn"></view>
		</view>
</template>

<script>
	export default {
		data(){
			return {
				content: "",
				focus: false
			}
		},
		
		methods:{
			submit(){
				//是否为空
				if (this.content === '') {
					return uni.showToast({
						title:'消息不能为空',
						icon: 'none'
					})
				};
				this.$emit('submit', this.content);
				//清空输入框
				this.content = ''
			},
			submitBtn(){
				this.submit()
				 // 点击发送按钮事件
				 this.focus = true
			}
		}
	}
</script>

<style>
</style>
