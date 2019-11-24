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
		<view style="height: 100rpx;"></view>
		<bottom-input @submit="submit"></bottom-input>
		
		
	</view>
</template>

<script>
import userChatList from '@/components/content/user-chat/user-chat-list.vue';
import bottomInput from '@/components/content/bottom-input/bottom-input.vue';
import {getChatList} from '@/network/getData.js';
export default {
	components: {
		userChatList,
		bottomInput
	},
	data() {
		return {
			chatList: [],
			scrollInto: "",
		};
	},
	onLoad() {
		this.chatList = getChatList()
	},
	onReady() {
		this.pageToBottom()
	},
	methods: {
		//发送消息	
		submit(content){
			let obj = {
				user_id: 2,
				avatar: '/static/default.jpg',
				username: '昵称',
				data: content,
				type: 'text',
				create_time: (new Date()).getTime()
			};
			this.chatList.push(obj);
			//清空输入框
			// this.content = '';
			//滚动到底部
			this.pageToBottom();
		},
		//滚动到底部
		pageToBottom(){
			let lastIndex = this.chatList.length -1
			if (lastIndex < 0) return;
			this.scrollInto = 'chat' + lastIndex;
		}
		
	}
};
</script>

<style></style>
