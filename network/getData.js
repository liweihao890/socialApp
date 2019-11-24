import {
	postList,topicList,followList,msgList,userList,chatList
} from '@/network/data.js'

//获取首页数据模板
export function getPostList(){
	return postList
}

//获取首页所有数据
export function getPostData(length) {
	let arr = [];
	for (let i = 0; i < length; i++) {
		//根据tabBar生成需要的数据模板
		let obj = {
			loadmore: '上拉加载更多',
			list: []
		};
		if (i < 2) {
			obj.list = postList;
		}
		arr.push(obj);
	}
	return arr
}

//获取话题数据模板
export function getTopicList(){
	return topicList
}

//获取话题详情所有信息
export function getTopicData(){
	let arr = [];
	for (let i = 0; i < topicList.length; i++) {
		//根据tabBar生成需要的数据模板
		let obj = {
			loadmore: '上拉加载更多',
			list: []
		};
		if (i < 2) {
			obj.list = topicList;
		}
		arr.push(obj);
	}
	return arr
}

//获取关注数据模板
export function getFollowList(){
	return followList
}

//获取用户模板
export function getUserList(){
	return userList
}
//获取所有关注的朋友数据模板
export function getUserData(length){
	let arr = [];
	for (let i = 0; i < length; i++) {
		//根据tabBar生成需要的数据模板
		let obj = {
			loadmore: '上拉加载更多',
			list: []
		};
		if (i < 2) {
			obj.list = userList;
		}
		arr.push(obj);
	}
	return arr
}

//获取信息数据模板
export function getMsgList(){
	return msgList
}

//获取聊天信息
	
export function getChatList(){
	return chatList
}