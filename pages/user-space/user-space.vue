<template>
	<view>
		<!-- 头部 -->
		<view class="flex align-center p-3 border-bottom border-light-secondary">
			<image src="/static/default.jpg" style="width: 180rpx;height: 180rpx;" class="rounded-circle"></image>
			<view class="pl-3 flex flex-column flex-1">
				<view class="flex align-center">
					<view class="flex-1 flex flex-column align-center justify-center">
						<text class="font-lg font-weight-bold">1</text>
						<text class="font text-muted">粉丝</text>
					</view>
					<view class="flex-1 flex flex-column align-center justify-center">
						<text class="font-lg font-weight-bold">1</text>
						<text class="font text-muted">粉丝</text>
					</view>
					<view class="flex-1 flex flex-column align-center justify-center">
						<text class="font-lg font-weight-bold">1</text>
						<text class="font text-muted">粉丝</text>
					</view>
				</view>
				<view class="flex align-center justify-center">
					<button type="primary" size="mini" class="bg-main" style="width: 400rpx;">关注</button>
				</view>
			</view>
		</view>
		<!-- tab -->
		<view class="flex align-center " style="height: 100rpx;" >
			<view class="flex-1 flex align-center justify-center " 
			v-for="(item,index) in tabBar" :key="index" @click="changeTab(index)"
			:class="tabIndex === index ? 'font-lg font-weight-bold text-main '  : 'font-md '  ">
				{{item.name}}
			</view>
		</view>
		
		<!-- 主题内容 -->
		<!-- 主页部分 -->
		<template v-if="tabIndex === 0">
			
			<view class="animated fast fadeIn">
				<view class="p-3 border-bottom">
					<view class="font-md">
						账号信息
					</view>
					<view class="font">
						账号年龄： 12个月
					</view>
					<view class="font">
						账号ID: 1
					</view>
				</view>
				<view class="p-3 border-bottom">
					<view class="font-md">
						个人信息
					</view>
					<view class="font">
						星座： 12个月
					</view>
					<view class="font">
						职业: 1
					</view>
					<view class="font">
						故乡: 1
					</view>
					<view class="font">
						情感: 1
					</view>
				</view>
			</view>
		</template>
		
		<!-- 帖子部分和动态部分 -->
		<template v-else>
			<view class="animated fast fadeInRight">
				<block v-for="(item,index) in listByIndex" :key="index" >
					<!-- 列表样式 -->
					<common-list :item="item" :index="index" @follow="follow" @doSupport="doSupport"></common-list>
					<!-- 全局分割线 -->
					<divider></divider>
				</block>
				<!-- 上拉加载更多 -->
				<loadmore :loadmore="loadmoreText"></loadmore>
			</view>
		</template>
		
		<!-- 弹出层 -->
		<uni-popup ref="popup" type="top" >
			<view class="flex align-center justify-center font-md border-bottom py-2" hover-class="bg-light" style="background-color: #FFFFFF;">
				<text class="iconfont icon-shanchu mr-2"></text> 加入黑名单
			</view>
			<view class="flex align-center justify-center font-md py-2" hover-class="bg-light" style="background-color: #FFFFFF;">
				<text class="iconfont icon-sousuo mr-2"></text> 聊天
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {getPostList} from '@/network/getData.js';
	import CommonList from '@/components/common/CommList.vue';
	import uniPopup from '../../components/uni-ui/uni-popup/uni-popup.vue';
	let demo = getPostList();
	export default {
		components: {
			CommonList,
			uniPopup
			
		},
		data() {
			return {
				tabIndex: 0,
				tabBar: [{name: ' 主页' },{name: '帖子',list:demo,loadmore:'上拉加载更多'},{name: '动态',list:demo,loadmore:'上拉加载更多'}],
				postData: []
			}
		},
		computed: {
			listByIndex() {
				return this.tabBar[this.tabIndex].list 
			},
			loadmoreText(){
				return this.tabBar[this.tabIndex].loadmore
			},
			
		},
		//监听页面滚动到底部
		onReachBottom(){
			if(this.tabIndex > 0){
				this.loadmore()
			}
		},
		//点击菜单按钮
		onNavigationBarButtonTap(){
			this.$refs.popup.open()
		},
		methods: {
			//切换导航栏
			changeTab(index){
				this.tabIndex = index;
			},
			//关注功能实现
			follow(index) {
				//将子组件的index对应的item中isFollow改为true，将关注按钮隐藏
				this.tabBar[this.tabIndex].list[index].isFollow = true;
				//弹出关注成功的提示
				uni.showToast({
					title: '关注成功'
				});
			},
			//点赞与取消赞功能实现
			doSupport(e) {
				//拿到当前对象
				let item = this.tabBar[this.tabIndex].list[e.index];
				// 定义信息、
				let msg = e.type === 'support' ? '点赞' : '踩';
				//用户已经操作过
				if (item.support.type === e.type) {
					return  uni.showToast({
						title: '你已经操作过了',
						icon: 'none'
					});
					
				}//用户还没进行过操作
				else if(item.support === '') {
					item.support[e.type + '_count']++;
				} else if (item.support.type === 'unsupport' && e.type === 'support') {
					// 用户进行过操作
					// 点赞操作，点赞数加一，取消赞数-1
					item.support.support_count++;
					item.support.unsupport_count--;
				} else if (item.support.type === 'support' && e.type === 'unsupport') {
					//反之亦然
					item.support.support_count--;
					item.support.unsupport_count++;
				}
				//保存用户点击的支持类型
				item.support.type = e.type;
				uni.showToast({
					title: msg + '成功'
				});
			},
			
			//上拉加载更多功能实现
			loadmore() {
				//拿到当前列表页
				let item = this.tabBar[this.tabIndex];
				//判断是否处于可加载状态
				if (item.loadmore !== '上拉加载更多') return;
				// 修改当前列表页加载状态为加载中
				item.loadmore = '加载中';
				//模拟数据请求
				setTimeout(() => {
					//加载数据
					item.list = [...item.list, ...item.list];
					//回复加载状态
					item.loadmore = '上拉加载更多';
				}, 1000);
			}
			
			
		}
	}
</script>

<style>

</style>
