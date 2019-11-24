<template>
	<view>
		<uni-list-item title="头像" @click="changeUserPic">
			<view class="flex align-center" slot="right">
				<image :src="userpic" style="height: 100rpx;width: 100rpx;" class="rounded-circle"></image>
				<text class="iconfont icon-bianji1 ml-2 font-md"></text>
			</view>
		</uni-list-item>
		<uni-list-item title="昵称">
			<view class="flex align-center" slot="right">
				<input v-model="username" class="uni-input text-right" />
				<text class="iconfont icon-bianji1 ml-2 font-md"></text>
			</view>
		</uni-list-item>
		<uni-list-item title="性别" >
			<view class="flex align-center" slot="right">
				<text>{{sexText}}</text>
				<text class="iconfont icon-bianji1 ml-2 font-md" @click="changeSex"></text>
			</view>
		</uni-list-item>
		<picker mode="date" :value="birthday" @change="changeBirthday">
			<uni-list-item title="生日">
				<view class="flex align-center" slot="right">
					<text>{{birthday}}</text>
					<text class="iconfont icon-bianji1 ml-2 font-md"></text>
				</view>
			</uni-list-item>
		</picker>
		
		<uni-list-item title="情感">
			<view class="flex align-center" slot="right">
				<text>{{emotionText}}</text>
				<text class="iconfont icon-bianji1 ml-2 font-md" @click="changeEmotion"></text>
			</view>
		</uni-list-item>
		<uni-list-item title="职业">
			<view class="flex align-center" slot="right">
				<text>{{jobText}}</text>
				<text class="iconfont icon-bianji1 ml-2 font-md" @click="changeJob"></text>
			</view>
		</uni-list-item>
		<uni-list-item title="家乡" @click="showCityPicker">
			<view class="flex align-center" slot="right">
				<text>{{pickerText}}</text>
				<text class="iconfont icon-bianji1 ml-2 font-md"></text>
			</view>
		</uni-list-item>
		<view class="py-2 px-3">
			<button type="primary" class="text-main text-white " :class="disable ? 'bg-main-disabled' : 'bg-main' " style="border-radius: 50rpx; border: 0;"
			  >完成 </button>
		</view>
		<!-- 三级联动选择器 -->
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" 
		:pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
</template>

<script>
	const sexArr = ['保密','男','女'];
	const emotionArr = ['保密','未婚','已婚'];
	const jobArr = ['IT','机械','公务员','教师','其他']
	import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue';
	import mpvueCityPicker from '@/components/uni-ui/mpvue-citypicker/mpvueCityPicker.vue';
	export default {
		components: {
			uniListItem,
			mpvueCityPicker
		},
		data() {
			return {
				themeColor: '#007AFF',
				cityPickerValueDefault: [0, 0, 1],
				pickerText: '广东广州',
				userpic:'/static/default.jpg',
				username: '昵称',
				sex: 0,
				emotion:0,
				job: 0,
				birthday:'1998-09-08'
			}
		},
		computed: {
			sexText(){
				return sexArr[this.sex]
			},
			emotionText(){
				return emotionArr[this.emotion]
			},
			jobText(){
				return jobArr[this.job]
			}
		},
		// 监听返回
		onBackPress() {
		  if (this.$refs.mpvueCityPicker.showPicker) {
		  	this.$refs.mpvueCityPicker.pickerCancel();
		    return true;
		  }
		},
		// 监听页面卸载
		onUnload() {
			if (this.$refs.mpvueCityPicker.showPicker) {
				this.$refs.mpvueCityPicker.pickerCancel()
			}
		},
		methods: {
			// 修改头像
			changeUserPic(){
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album','camera'], //从相册选择
				    success: (res) => {
					this.userpic = res.tempFilePaths[0]
					}
				});
			},
			// 修改性别
			changeSex(){
				uni.showActionSheet({
				    itemList: sexArr,
				    success: (res) => {
						this.sex = res.tapIndex
					}
				});
			},
			
			// 修改情感
			changeEmotion(){
				uni.showActionSheet({
				    itemList: emotionArr,
				    success: (res) => {
						this.emotion = res.tapIndex
					}
				});
			},
			//修改职业
			changeJob(){
				uni.showActionSheet({
				    itemList: jobArr,
				    success: (res) => {
						this.job = res.tapIndex
					}
				});
			},
			
			//修改生日
			changeBirthday(e){
				this.birthday = e.detail.value
			},
			// 显示三级联动选择器
			showCityPicker(){
				this.$refs.mpvueCityPicker.show()
			},
			// 三级联动提交事件
			onConfirm(e) {
				this.pickerText = e.label
			},
			
			
		}
	}
</script>

<style>

</style>
