<template>
	<view>
		<input type="text" v-model="oldPassword" placeholder="输入旧密码" class="uni-input"/>
		<input type="text" v-model="newPassword" placeholder="输入新密码" class="uni-input"/>
		<input type="text" v-model="renewPassword" placeholder="确认密码" class="uni-input"/>
		<view class="py-2 px-3">
			<button type="primary" class="text-main text-white " :class="disable ? 'bg-main-disabled' : 'bg-main' " style="border-radius: 50rpx; border: 0;"
			 :disabled="disable" @tap="submit">设置 </button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				oldPassword: '',
				newPassword: '',
				renewPassword: ''
			}
		},
		computed: {
			disable() {
				return this.oldPassword === '' || this.newPassword === '' || this.renewPassword === ''
			}
		},
		methods: {
			//验证密码是否一致
			check(){
				if(this.newPassword !== this.renewPassword){
					uni.showToast({
						title:'两次密码不一致',
						icon: 'none'
					});
					return false
				}
				return true
			},
			
			submit(){
				if(!this.check()){
					return 
				}
				uni.showToast({
					title:'提交成功',
					icon: 'none'
				})
			}
		}
	}
</script>

<style>

</style>
