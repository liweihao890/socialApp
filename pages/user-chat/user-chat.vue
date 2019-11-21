<template>
	<view>
		<!-- 聊天列表 -->
		<scroll-view scroll-y="true" 
		style="position: absolute;top: 0;bottom: 100rpx;left: 0;right: 0;"
		:scroll-into-view="scrollInto" scroll-with-animation>
			<block v-for="(item, index) in chatList" :key="index">
				<view :id="'chat'+index">
					<user-chat-list :item="item" :index="index" :pre_time="index > 0 ? chatList[index -1].create_time : 0"></user-chat-list>
				</view>
			</block>
		</scroll-view>
		<!-- 底部操作条 -->
		<view class="fixed-bottom flex align-center border-top bg-white" style="height: 100rpx;">
			<input type="text" value="" placeholder="文明发言" 
			class=" flex-1 rounded bg-light ml-2 p-2 " 
			v-model="content" :adjust-position="false" @confirm="submit"/>
			<view class="iconfont icon-fabu flex justify-center align-center font-lg animated " style="width: 100rpx;" 
			hover-class="jello text-main"
			@click="submit" ></view>
		</view>
	</view>
</template>

<script>
let list = [
	{
		user_id: 2,
		avatar: '/static/default.jpg',
		username: '昵称',
		data: '你好啊',
		type: 'text',
		create_time: 1574300086
	},
	{
		user_id: 1,
		avatar: '/static/default.jpg',
		username: '昵称',
		data: '你好啊',
		type: 'text',
		create_time: 1574300086
	},
	{
		user_id: 2,
		avatar: '/static/default.jpg',
		username: '昵称',
		data: '你好啊',
		type: 'text',
		create_time: 1574300086
	},
	{
		user_id: 1,
		avatar: '/static/default.jpg',
		username: '昵称',
		data: '你好啊',
		type: 'text',
		create_time: 1574300086
	},
	{
		user_id: 2,
		avatar: '/static/default.jpg',
		username: '昵称',
		data: '你好啊',
		type: 'text',
		create_time: 1574300086
	},
	{
		user_id: 1,
		avatar: '/static/default.jpg',
		username: '昵称',
		data: '你好啊',
		type: 'text',
		create_time: 1574300086
	},
	
	{
		user_id: 2,
		avatar: '/static/default.jpg',
		username: '昵称',
		data: '你好啊',
		type: 'text',
		create_time: 1574300086
	},
	{
		user_id: 1,
		avatar: '/static/default.jpg',
		username: '昵称',
		data: '你好啊',
		type: 'text',
		create_time: 1574300086
	},{
		user_id: 2,
		avatar: '/static/default.jpg',
		username: '昵称',
		data: '你好啊',
		type: 'text',
		create_time: 1574300086
	},
	{
		user_id: 1,
		avatar: '/static/default.jpg',
		username: '昵称',
		data: '你好啊',
		type: 'text',
		create_time: 1574300086
	},
	{
		user_id: 2,
		avatar: '/static/default.jpg',
		username: '昵称',
		data: '你好啊',
		type: 'text',
		create_time: 1574300086
	},
	{
		user_id: 1,
		avatar: '/static/default.jpg',
		username: '昵称',
		data: '你好啊',
		type: 'text',
		create_time: 1574300086
	},
	{
		user_id: 2,
		avatar: '/static/default.jpg',
		username: '昵称',
		data: '你好啊',
		type: 'text',
		create_time: 1574300086
	},
	{
		user_id: 1,
		avatar: '/static/default.jpg',
		username: '昵称',
		data: '你好啊',
		type: 'text',
		create_time: 1574300086
	},
	{
		user_id: 2,
		avatar: '/static/default.jpg',
		username: '昵称',
		data: '你好啊',
		type: 'text',
		create_time: 1574300086
	},
	{
		user_id: 1,
		avatar: '/static/default.jpg',
		username: '昵称',
		data: '你好啊',
		type: 'text',
		create_time: 1574300086
	},
	{
		user_id: 2,
		avatar: '/static/default.jpg',
		username: '昵称',
		data: '你好啊',
		type: 'text',
		create_time: 1574300086
	},
	{
		user_id: 1,
		avatar: '/static/default.jpg',
		username: '昵称',
		data: '你好啊',
		type: 'text',
		create_time: 1574300086
	},
];

import userChatList from '@/components/content/user-chat/user-chat-list.vue';

export default {
	components: {
		userChatList
	},
	data() {
		return {
			chatList: list,
			content : '',
			scrollInto: ''
		};
	},
	
	onReady() {
		this.pageToBottom()
	},
	methods: {
		//发送消息	
		submit(){
			let obj = {
				user_id: 2,
				avatar: '/static/default.jpg',
				username: '昵称',
				data: this.content,
				type: 'text',
				create_time: (new Date()).getTime()
			};
			
			if (this.content === '') {
				uni.showToast({
					title:'消息不能为空',
					icon: 'none'
				})
			}else{
				this.chatList.push(obj)
			}
			//清空输入框
			this.content = ''
			//滚动到底部
			this.pageToBottom()
		},
		//滚动到底部
		pageToBottom(){
			let lastIndex = this.chatList.length -1
			if (lastIndex < 0) {
				return 
			}
			this.scrollInto = 'chat' + lastIndex
			
		}
		
	}
};
</script>

<style></style>
