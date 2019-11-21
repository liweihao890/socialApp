<template>
	<view>
		<!-- 自定义导航栏 -->
		<uni-nav-bar left-icon="back"   :statusBar="true" :border="false" @clickLeft="back">
			<view class="flex align-center justify-center w-100">
				所有人可见<text class="iconfont icon-shezhi"></text>
			</view>
		</uni-nav-bar>
		<!-- 文本域 -->
		<textarea v-model= "content" placeholder="说一句话吧" class="uni-textarea "/>
		<!-- 多图上传 -->
		<upload-image @change="changeImage" :list="imageList" ref="uploadImage" 
		:show="show"></upload-image>
		<!-- 底部操作条 -->
		<view class="fixed-bottom bg-white flex align-center" style="height: 85rpx;">
			<view class="iconfont icon-caidan animated footer_btn"  hover-class="jello"></view>
			<view class="iconfont icon-huati animated footer_btn" hover-class="jello"></view>
			<view class="iconfont icon-tupian animated footer_btn" hover-class="jello"
			@click="iconClickEvent('uploadImage')"></view>
			<view class="bg-main text-white ml-auto flex justify-center align-center rounded mr-2 animated" 
			style="width: 140rpx; height: 60rpx;" hover-class="jello">发送</view> 
		</view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue';
	import uploadImage from '@/components/common/upload-image.vue';
	export default {
		components:{
			uniNavBar,
			uploadImage
		},
		data() { 
			return {
				content:"",
				imageList: [],
				//记录是否已经显示返回
				showBack: false,
				
			}
		},
		//监听页面返回操作
		onBackPress(){
			if( (this.content !== '' || this.imageList.length >0) && (!this.showBack)){
				this.showBack = true
				uni.showModal({
					title: '',
					content: '是否要保存为草稿?',
					showCancel: true,
					cancelText: '取消保存',
					confirmText: '保存',
					success: res => {
						//点击确认，保存草稿
						if(res.confirm){
							this.saveContent()
						}else if(res.cancel){
							this.deleteContent()
						}
						//手动返回
						uni.navigateBack({
							delta: 1
						});
						
					}
				});
				return true
				
			}
			
		},
		//加载页面，展示草稿内容
		onLoad(){
			uni.getStorage({
				key: 'add-input',
				success: res => {
					if(res){
						let ret = JSON.parse(res.data)
						this.content = ret.content
						this.imageList = ret.imageList
					}

				}
			})
		},
		computed: {
			//控制添加图片控件的显示
			show() {
				return this.imageList.length > 0
			}
		},
		methods: {
			//返回页面
			back(){
				uni.navigateBack({
					delta: 1
				});
			},
			//添加或者删除图片触达发
			changeImage(e){
				this.imageList = e
			},
			//保存草稿
			saveContent(){
				uni.setStorage({
					key: 'add-input',
					data: JSON.stringify({
						content: this.content,
						imageList: this.imageList
					})
				})
				
			},
			//删除草稿
			deleteContent(){
				uni.removeStorage({
					key : 'add-input',
				})
			},
			//底部图标点击事件
			iconClickEvent(type){
				switch (type){
					case 'uploadImage':
					this.$refs.uploadImage.chooseImage()
						break;
					default:
						break;
				}
			}
			
		}
	}
</script>

<style>
.footer_btn{
	width: 86rpx;
	height: 86rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 50rpx;
	
}
</style>
