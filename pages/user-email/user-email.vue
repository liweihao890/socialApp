<template>
	<view>
		<input type="text"  placeholder="请输入你要绑定的邮箱" v-model="email" class="uni-input"/>
		<input type="text"  placeholder="请输入密码" v-model="password" class="uni-input"/>
		<view class="py-2 px-3">
			<button type="primary" class="text-main text-white " :class="disable ? 'bg-main-disabled' : 'bg-main' " style="border-radius: 50rpx; border: 0;"
			 :disabled="disable" @tap="submit">绑定 </button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				email:'',
				password:''
			}
		},
		computed: {
			disable() {
				return this.email === '' || this.password === ''
			}
		},
		methods: {
			//验证密码是否一致
			check(){
				// 邮箱验证
				let rule = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
				if(!rule.test(this.email)){
					 uni.showToast({
						title:'邮箱格式错误',
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
