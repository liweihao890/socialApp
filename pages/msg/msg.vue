<template>
	<view>
		<template v-if="msgList.length">
			<block v-for="(item,index) in msgList" :key="index">
				<msg-list :item="item" :index="index"></msg-list>
			</block>	
		</template>
		<template v-else> 
			<nothing></nothing>
		</template>
		
		<!-- 弹出层 -->
		<uni-popup ref="popup" :type="type" >
			<view style="background-color: #FFFFFF;">
				<view class="flex align-center justify-center font-md border-bottom py-2" 
				hover-class="bg-light" @click="popEvent('friend')">
					<text class="iconfont icon-sousuo mr-2" ></text>添加好友
				</view>
				<view class="flex align-center justify-center font-md  py-2" hover-class="bg-light"  @click="popEvent('delete')">
					<text class="iconfont icon-shanchu mr-2"></text>清楚列表
				</view>
			</view>
			
		</uni-popup>
		
		
		
	</view>
</template>

<script>
	import msgList from '@/components/content/msg/msg-list.vue';
	import {getMsgList} from '@/network/getData.js';
	import uniPopup from '@/components/uni-ui/uni-popup/uni-popup.vue';
	//引入时间库
	export default {
		components: {
			msgList,
			uniPopup
		},
		data() {
			return {
				msgList: [],
				type: 'top'
			}
		},
		onLoad() {
			//获取消息列表数据
			this.msgList = getMsgList()
		},
		//监听刷新
		onPullDownRefresh() {
			this.refresh()
		},
		//监听原生导航栏按钮事件
		onNavigationBarButtonTap(e) {
			switch (e.index){
				case 0://左边图标
					uni.navigateTo({
						url: '../user-list/user-list',
						
					});
					this.$refs.popup.close()
					break;
				case 1://右边图标
					this.$refs.popup.open()
					break;
				default:
					break;
			}
		},
		methods: {
			refresh(){
				setTimeout(()=>{
					this.msgList = getMsgList()
					//停止下拉刷新
					uni.stopPullDownRefresh()
				},2000)
			},
			
			popEvent(event){
				switch (event){
					case 'friend':
					uni.navigateTo({
						url: '../search/search?type=user',
					});
						break;
					case 'delete':
					console.log('shanchu');
						break;
					default:
						break;
				}
				//关闭弹出层
				this.$refs.popup.close()
			}
			
			
		}
	}
</script>

<style>

</style>
