<template>
	<view>
		<!-- 状态栏 -->
		<uni-status-bar></uni-status-bar>
		<!-- 导航栏 -->
		<view>
			<view class="iconfont icon-guanbi flex align-center justify-center font-lg" 
			style="width: 100rpx;height: 100rpx;" 
			hover-class="bg-light" @click="back">
				
			</view>
		</view>
		
		<!-- 提示语 -->
		<view class="text-center font-lg" style="padding-top: 130rpx;padding-bottom: 70rpx;font-size:55rpx">
			{{status ? '手机验证码登录' : '账号密码登录' }}
		</view>
		<!-- 输入框 -->
		<view class="px-2">
			<!-- 手机验证码登录 -->
			<template v-if="status">
				<view class="mb-2 flex align-stretch">
					<view class="border-bottom flex align-center justify-center font ml-1">
						+86
					</view>
					<input type="text" value="" class="uni-input p-2 border-bottom flex-1" placeholder="手机号" v-model="phoneNumber"/>
				</view>
				<view class="mb-2 flex align-stretch">
					<input type="text flex-1" value="" class="uni-input p-2 border-bottom" placeholder="请输入验证码" v-model="code"/>
					<view class="border-bottom flex align-center justify-center font-sm text-white  bg-main" 
					style="width: 180rpx" @click="getCode" :class="codeTime > 0 ? 'bg-main-disabled' : 'bg-main' ">
						{{codeTime > 0 ? codeTime+'s' : '获取验证码'}}
					</view>
				</view>
			</template>
			<!-- 账号密码登录 -->
			<template v-else>
				<!-- 账号密码登录 -->
				<view class="mb-2">
					<input type="text" value="" class="uni-input p-2 border-bottom" placeholder="昵称/手机号/邮箱" v-model="username"/>
				</view>
				<view class="mb-2 flex align-stretch">
					<input type="text flex-1" value="" class="uni-input p-2 border-bottom" placeholder="请输入密码" v-model="password"/>
					<view class="border-bottom flex align-center justify-center font text-muted" style="width: 150rpx">
						忘记密码
					</view>
				</view>
			</template>
	
			<!-- 按钮 -->
			<view class="py-2 px-3">
				<button type="primary" class="text-main text-white " style="border-radius: 50rpx; border: 0;" :disabled="disable" 
				:class="disable ? 'bg-main-disabled' : 'bg-main' " @click="submit">登录 </button>
			</view>
			
			<view class="flex align-center justify-center pt-2 pb-4">
				<view class="text-primary font-sm" @click="changeStatus">
					{{status ? '账号密码登录' : '验证码登录' }}
				</view>
				<text class="text-muted mx-2">|</text>
				<view class="text-primary font-sm">
					登录遇到问题
				</view>
			</view>
			
			<view class="flex align-center justify-center">
				<view class="" style="height: 1rpx;background-color: #ddddd; width: 100rpx"></view>
				<view class="mx-2 text-muted">
					社交账号登录
				</view>
				<view  style="height: 1rpx;background-color: #ddddd; width: 100rpx"></view>
			</view>
			
			<other-login></other-login>
			
			<view class="flex align-center justify-center text-muted">
				注册即代表同意<text class="text-primary"> 《xxx社区协议》 </text>
			</view>
			
		</view>
	</view>
</template>	

<script>
	import uniStatusBar from '@/components/uni-ui/uni-status-bar/uni-status-bar.vue';
	import otherLogin from '@/components/common/other-login.vue';
	export default {
		components: {
			uniStatusBar,
			otherLogin
		},
		data() {
			return {
				status: false,
				username:'',
				password:'',
				phoneNumber:'',
				code:'',
				codeTime: 0,
				
				
			}
		},
		onLoad() {
			
		},
		computed:{
			disable(){
				if( (this.username === '' || this.password === '') && (this.phoneNumber === '' || this.code === '')){
					return true
				}
				return false
			},
			
		},
		
		methods: {
			//返回
			back(){
				uni.navigateBack({
					delta: 1
				});
			},
			//切换登录方式
			changeStatus(){
				this.initForm()
				this.status = !this.status
			},
			//初始化表单
			initForm(){
				this.username = ''
				this.password = ''
				this.phoneNumber = ''
				this.code = ''
			},
			//获取验证码
			getCode(){
				// 防止用户重复操作
				if(this.codeTime > 0){
					return 
				}
				if(!this.validate()) return ;
				this.codeTime = 60
				let timer = setInterval((res) => {
					
					if(this.codeTime >= 1){
						this.codeTime--
					}else{
						this.codeTime = 0
						clearInterval()
					}
				},1000)
			},
			//表单验证
			validate(params){
				//手机号正则
				let mPattern = /^1[34578]\d{9}$/; 
				if(!mPattern.test(this.phoneNumber)){
					uni.showToast({
						title: '手机格式不正确',
						icon: 'none'
					});
					return false
				}
				return true
			},
			//提交按钮
			submit(){
				//表单验证
				if(!this.validate()) return ;
				//提交后端
				
				//登陆成功处理
				
			},
			
		}
	}
</script>

<style>

</style>
