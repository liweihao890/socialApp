<template>
	<view>
		<!-- 帖子详情 -->
		<comm-list :item="info" isDetail @follow="follow" 
		@doComment="doComment" @doShare="doShare" @doSupport="doSupport">
			<view>{{info.content}}</view>
			<view>
				<image v-for="(item,index) in info.images" @click="preview(index)"
				:src="item.url" class="w-100" mode="widthFix"></image>
			</view>
		</comm-list>
		<divider></divider>
		<view class="p-2 font-md font-weight-bold">
			最新评论3
		</view>
		<view class="px-2">
			<view class="uni-comment-list">
				<view class="uni-comment-face"><image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png" mode="widthFix"></image></view>
				<view class="uni-comment-body">
					<view class="uni-comment-top">
						<text>小猫咪</text>
					</view>
					<view class="uni-comment-content">支持国产，支持DCloud!</view>
					<view class="uni-comment-date">
						<view>2天前</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 点击分享按钮 -->
		<more-share ref="share"></more-share>
		<!-- 占位 -->
		<view style="height: 100rpx;"></view>
		<bottom-input @submit="submit"></bottom-input>
	</view>
</template>

<script>
	import CommList from '@/components/common/CommList.vue';
	import bottomInput from '@/components/content/bottom-input/bottom-input.vue';
	import moreShare from '@/components/content/more-share/more-share.vue';
	export default {
		components: {
			CommList,
			bottomInput,
			moreShare
		},
		data() {
			return {
				info:{
					username:"昵称",
					userpic:"/static/default.jpg",
					newstime:"2019-10-20 下午04:30",
					isFollow:false,
					title:"我是标题",
					titlepic:"/static/demo/datapic/11.jpg",
					support:{
						type:"support", // 顶
						support_count:1,
						unsupport_count:2
					},
					comment_count:2,
					share_num:2,
					content:"帝莎编程学院：uni-app第二季仿商城类实战项目开发，uni-app第二季仿微信实战项目开发",
					images:[{
						url:"https://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/Appstatic/qsbk/demo/datapic/4.jpg"
					},{
						url:"https://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/Appstatic/qsbk/demo/datapic/5.jpg"
					}],
					
				},
							
			}
		},
		
		computed: {
			imagesList() {
				return this.info.images.map(item=>item.url) 
			}
		},
		
		onLoad(e) {
			//初始化
			this.initData(JSON.parse(e.detail))
		},	
		onNavigationBarButtonTap() {
			this.$refs.share.open()
		},
		onBackPress() {
			this.$refs.share.close()
		},
		methods: {
			initData(data){
				//修改标题
				uni.setNavigationBarTitle({
					title: data.title
				})
				//请求数据库
			},
			//点击评论
			doComment(){
				
			},
			
			//点击分享
			doShare(){
				
			},
			
			//关注功能
			follow(){
				this.info.isFollow = true,
				uni.showToast({
					title: '关注成功'
				})
			},
			
			//点赞功能
			doSupport(e){
				//拿到当前对象
				let item = this.info;
				// 定义信息、
				let msg = e.type === 'support' ? '点赞' : '踩';
				//用户已经操作过
				if (item.support.type === e.type) {
					return uni.showToast({
						title: '你已经操作过了',
						icon: 'none'
					});
				}//用户还没进行过操作
				else if (item.support === '') {
					item.support[e.type + '_count']++;
				} else if (item.support.type === 'unsupport' && e.type === 'support') {
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
			
			// 预览图片
			preview(index){
				// 预览图片
				uni.previewImage({
					current:index,
					urls:this.imagesList
				});
			},
			
			
			
		}
	}
</script>

<style>

</style>
