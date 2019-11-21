<template>
	<view>
		<!-- 顶部选项卡 -->
		<scroll-view scroll-x="true" :scroll-into-view="scrollInto" class="scroll-row border-bottom border-light-secondary" style="height: 100rpx;" scroll-with-animation>
			<view
				v-for="(item, index) in tabBar"
				:key="index"
				class="scroll-row-item px-3 py-2 font-md"
				:class="tabIndex === index ? 'text-main font-lg font-weight-blod ' : ''"
				@click="changeTab(index)"
				:id="'tab' + index"
			>
				{{ item.name }}
			</view>
		</scroll-view>

		<swiper :duration="150" :current="tabIndex" :style="'height:' + scrollH + 'px'" @change="onChangeTab">
			<swiper-item v-for="(item, index) in newsList" :key="index">
				<scroll-view scroll-y="true" :style="'height:' + scrollH + 'px'" @scrolltolower="loadmore(index)">
					<!-- 有数据 -->
					<template v-if="item.list.length">
						<block v-for="(item2, index2) in item.list" :key="index2">
							<!-- 列表样式 -->
							<common-list :item="item2" :index="index2" @follow="follow" @doSupport="doSupport"></common-list>
							<!-- 全局分割线 -->
							<divider></divider>
						</block>
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
	</view>
</template>

<script>
// 模拟选项卡数据
const tab = [{ name: '关注' }, { name: '推荐' }, { name: '体育' }, { name: '热点' }, { name: '财经' }, { name: '娱乐' }, { name: '军事' }, { name: '历史' }, { name: '本地' }];
import {getHomeData} from '@/network/getData.js';
import CommonList from '@/components/common/CommList.vue';
import Nothing from '@/components/common/Nothing.vue'
export default {
	components: {
		CommonList,
		Nothing
	},
	data() {
		return {
			scrollInto: '',
			//顶部选项卡
			tabIndex: 0,
			tabBar: tab,
			//初始化可滚动高度
			scrollH: 800,
			//保存所有列表数据
			newsList: [],
		};
	},
	onLoad() {
		uni.getSystemInfo({
			success: res => {
				this.scrollH = res.windowHeight - uni.upx2px(101);
			}
		});
		//获取数据
		this.newsList = getHomeData(this.tabBar.length)
	},
	// 监听点击导航栏搜索框
	onNavigationBarSearchInputClicked() {
		uni.navigateTo({
			url: '../search/search?type=post'
		});
	},
	onNavigationBarButtonTap() {
		uni.navigateTo({
			url: '../add-input/add-input',
			
		});
	}
	methods: {
		
		//滑动切换内容
		onChangeTab(e) {
			//将滑动后的index传入切换事件
			this.changeTab(e.detail.current);
		},
		//顶部选项卡
		changeTab(index) {
			//当前选项就是要点击的
			if (this.tabIndex === index) {
				return;
			}
			//将点击的index赋值给当前index,
			this.tabIndex = index;
			//滚动到对应的Index
			this.scrollInto = 'tab' + index;
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
};
</script>

<style></style>
