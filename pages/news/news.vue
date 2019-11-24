<template>
	<view>
		<!-- 自定义导航栏 -->
		<uni-nav-bar :border="false" :fixed="true" :statusBar="true">
			<view class="flex align-center justify-center font-weight-bold w-100">
				<!-- <view class="font-lg text-main mx-1">关注</view> -->
				<view
					class=" mx-1 "
					v-for="(item, index) in tabBar"
					:key="index"
					:class="tabIndex === index ? ' font-lg text-main ' : ' font-md text-light-muted '"
					@click="changeTab(index)"
				>
					{{ item.name }}
				</view>
			</view>
			<text slot="right" class="iconfont icon-fatie_icon " @click="openAddInput"></text>
		</uni-nav-bar>
		<!-- 内容区域 -->
		<swiper :duration="150" :current="tabIndex" :style="'height:' + scrollH + 'px'" @change="onChangeTab">
			<!-- 关注 -->
			<swiper-item>
				<scroll-view scroll-y="true" :style="'height:' + scrollH + 'px'" @scrolltolower="loadmore">
					<block v-for="(item, index) in newsList" :key="index">
						<comm-list :item="item" :index="index" @follow="follow" @doSupport="doSupport"></comm-list>
						<divider></divider>
					</block>
					<loadmore :loadmore="loadmoreText"></loadmore>
				</scroll-view>
			</swiper-item>
			<!-- 话题 -->
			<swiper-item>
				<scroll-view scroll-y="true" :style="'height:' + scrollH + 'px'">
					<!-- 热门分类 -->
					<hot-cate :hotCate="hotCate"></hot-cate>
					<!-- 搜索框 -->
					<view class="p-2">
						<view class="bg-light rounded flex align-center justify-center py-2" @click="openSearch">
							<text class="iconfont icon-sousuo mr-2 text-secondary"></text>
							搜索话题
						</view>
					</view>
					<!-- 轮播图 -->
					<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" class="px-2 pb-2">
						<swiper-item><image src="/static/demo/banner2.jpg" mode="" style="height: 300rpx;" class="w-100 rounded"></image></swiper-item>
					</swiper>
					<divider></divider>
					<!-- 最近更新 -->
					<view class="p-2 font-md">最近更新</view>
					<!-- 话题列表组件 -->
					<block v-for="(item,index) in topicList" :key="index">
						<topic-list :item="item" :index="index"></topic-list>
						</block>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
import uniNavBar from '@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue';
import CommList from '@/components/common/CommList.vue';
import Divider from '@/components/common/Divider.vue';
import hotCate from '@/components/content/new/hot-cate.vue';
import topicList from '@/components/content/new/topic-list.vue';
import {getTopicList,getFollowList} from '@/network/getData.js';

let hot = [{ name: '关注' }, { name: '推荐' }, { name: '体育' }, { name: '热点' }, { name: '财经' }, { name: '娱乐' }];


export default {
	components: {
		uniNavBar,
		CommList,
		Divider,
		hotCate,
		topicList
	},
	data() {
		return {
			//记录上一次被选中的选项
			tabIndex: 0,
			tabBar: [{ name: '关注' }, { name: '话题' }],
			scrollH: 800,
			newsList: [],
			loadmoreText: '上拉加载更多',
			hotCate: hot,
			topicList: []
		};
	},
	onLoad() {
		//获取窗口高度信息
		uni.getSystemInfo({
			success: res => {
				this.scrollH = res.windowHeight - res.statusBarHeight - 44;
			}
		});
		// 获取数据
		this.newsList = getFollowList();
		this.topicList = getTopicList()
	},
	methods: {
		//打开搜索页
		openSearch(){
			uni.navigateTo({
				url: '../search/search?type=topic',
				
			});
		},
		//修改切换选项卡
		changeTab(index) {
			this.tabIndex = index;
		},
		//滑动修改选项卡
		onChangeTab(e) {
			this.tabIndex = e.detail.current;
		},
		//打开发布页
		openAddInput() {
			uni.navigateTo({
				url: '../add-input/add-input'
			});
		},
		//点赞与取消赞功能实现
		doSupport(e) {
			console.log(e);
			//拿到当前对象
			let item = this.newsList[e.index];
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
		//上拉加载
		loadmore() {
			//判断是否处于可加载状态
			if (this.loadmoreText !== '上拉加载更多') return;
			// 修改当前列表页加载状态为加载中
			this.loadmoreText = '加载中';
			//模拟数据请求
			setTimeout(() => {
				//加载数据
				this.newsList = [...this.newsList, ...this.newsList];
				//回复加载状态
				this.loadmoreText = '上拉加载更多';
			}, 1000);
		}
	}
};
</script>

<style></style>
