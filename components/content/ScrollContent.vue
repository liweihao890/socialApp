<template>
	<swiper :duration="150" :current="tabIndex" :style="'height:' + scrollH + 'px'" @change="onChangeTab">
		<swiper-item v-for="(item, index) in newsList" :key="index">
			<scroll-view scroll-y="true" :style="'height:' + scrollH + 'px'" >
				<!-- 有数据 -->
				<template v-if="item.list.length">
					<!-- <block v-for="(item2, index2) in item.list" :key="index2"> -->
						<!-- 列表样式  @scrolltolower="loadmore(index)"-->
						<!-- <common-list :item="item2" :index="index2" @follow="follow" @doSupport="doSupport"></common-list> -->
						<!-- 全局分割线 -->
						<!-- <divider></divider> -->
					<!-- </block> -->
					<!-- <view style="height: 300rpx;"></view>
					<view>{{item.list}}</view> -->
					<view>{{item.list}}</view>
					<button type="primary" @click="loadmore(index)">ghaoioh</button>
					<!-- 上拉加载更多 -->
					<loadmore :loadmore="item.loadmore"></loadmore>
				</template>
				<!-- 没有数据 -->
				<template v-else>
					<nothing></nothing>
				</template>
			</scroll-view>
		</swiper-item>
	</swiper>
</template>

<script>
import CommonList from '@/components/common/CommList.vue';
import Nothing from '@/components/common/Nothing.vue';

export default {
	components: {
		CommonList,
		Nothing
	},
	props: {
		tabIndex: Number,
		tabHeight: Number,
		newsList: Array,
	},
	data() {
		return {
			scrollH: 800
		};
	},
	
	methods: {
		//获取高度
		getScrollHeight(){
			uni.getSystemInfo({
				success: res => {
					this.scrollH = res.windowHeight - res.statusBarHeight - uni.upx2px(this.tabHeight);
				}
			});
		},
		//关注功能实现
		follow(index) {
			//将子组件的index对应的item中isFollow改为true，将关注按钮隐藏
			this.newsList[this.tabIndex].list[index].isFollow = true;
			//弹出关注成功的提示
			uni.showToast({
				title: '关注成功'
			});
		},
		//点赞与取消赞功能实现
		doSupport(e) {
			//拿到当前对象
			let item = this.newsList[this.tabIndex].list[e.index];
			// 定义信息、
			let msg = e.type === 'support' ? '点赞' : '踩';
			//用户还没进行过操作
			if (item.support === '') {
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
		loadmore(index) {
			//拿到当前列表页
			let item = this.newsList[index];
			
			//判断是否处于可加载状态
			if (item.loadmore !== '上拉加载更多'){
				
				return;
			} 
			
			// 修改当前列表页加载状态为加载中
			item.loadmore = '加载中';
			// console.log(item );
			//模拟数据请求
			setTimeout(() => {
				
				//加载数据
				item.list = [...item.list, ...item.list];
				//回复加载状态
				item.loadmore = '上拉加载更多';
				this.newsList[index] = item
			}, 1000);
		},
		//滑动切换内容
		onChangeTab(e) {
			//将滑动后的index传入切换事件
			this.$emit('changeTab',e.detail.current)
		}
		
	}
};
</script>

<style></style>
