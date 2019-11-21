import {
	list,topicList,followList,msgList,followFriendInfo
} from '@/network/data.js'

export function getList(){
	return list
}
//获取首页数据数据
export function getHomeData(length) {
	let arr = [];
	for (let i = 0; i < length; i++) {
		//根据tabBar生成需要的数据模板
		let obj = {
			loadmore: '上拉加载更多',
			list: []
		};
		if (i < 2) {
			obj.list = list;
		}
		arr.push(obj);
	}
	return arr
}
export function getFollowData(){
	return followList
}
//获取列表信息
export function getTopicData(){
	return topicList
}
//获取话题详情列表列表信息
export function getTopicList(){
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


export function getMsgList(){
	return msgList
}

export function getFollowFriendInfo(length){
	let arr = [];
	for (let i = 0; i < length; i++) {
		//根据tabBar生成需要的数据模板
		let obj = {
			loadmore: '上拉加载更多',
			list: []
		};
		if (i < 2) {
			obj.list = followFriendInfo;
		}
		arr.push(obj);
	}
	return arr
}