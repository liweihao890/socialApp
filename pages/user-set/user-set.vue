<template>
	<view>
		<uni-list-item title="账号与安全" @click="open('user-password')"></uni-list-item>
		<uni-list-item title="绑定邮箱" @click="open('user-email')"></uni-list-item>
		<uni-list-item title="资料编辑" @click="open('user-info')"></uni-list-item>
		<uni-list-item title="清除缓存" @click="clearCache">
			<view  slot="right">
				{{currentSize | format}}
			</view>
		</uni-list-item>
		<uni-list-item title="意见反馈"  @click="open('user-feedback')"></uni-list-item>
		<uni-list-item title="关于社区"  @click="open('about')"></uni-list-item>
		<view class="py-2 px-3">
			<button type="primary" class="text-main text-white bg-main" style="border-radius: 50rpx; border: 0;">退出登录 </button>
		</view>
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
				currentSize: 0
			}
		},
		filters: {
			format(value) {
				return value > 1024 ? (value/1024).toFixed(2) + 'MB' : value.toFixed(2)+ 'kb'
			}
		},
		onLoad() {
			this.getStorageInfo()
		},
		methods: {
			// 根据路径打开对应的页面
			open(path){
				uni.navigateTo({
					url:`../${path}/${path}`
				})
			},
			//获取缓存信息
			getStorageInfo(){
				const res = uni.getStorageInfoSync();
				this.currentSize = res.currentSize
			},
			//清除缓存
			clearCache(){
				uni.showModal({
					title: '提示',
					content: '是否要清除缓存',
					showCancel: true,
					cancelText: '不清除',
					confirmText: '清除',
					success: res => {
						if(res.confirm){
							uni.clearStorage();
							uni.showToast({
								title:'清除成功',
								icon: 'none'
							});
							this.getStorageInfo()
						}
					},
					
				});
			},
			
		}
	}
</script>

<style>

</style>
