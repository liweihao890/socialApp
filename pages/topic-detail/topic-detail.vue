<template>
	<view>
		<topic-info :topicDetailInfo="topicDetailInfo"></topic-info>
		<divider></divider>
		
		<view class="flex p-2 align-center border-bottom" hover-class="bg-light" v-for="(item,index) in hotList">
			<text class="iconfont icon-xihuan text-main mr-1"></text>
			<text class="font text-dark text-ellipsis">{{item.title}}</text>
		</view>
		
		<!-- tab -->
		<view class="flex align-center py-2">
			<view class="flex-1 flex align-center justify-center " 
			v-for="(item,index) in tabBar" :key="index" @click="changeTab(index)"
			:class="tabIndex === index ? 'font-lg font-weight-bold text-main '  : 'font-md '  ">
				{{item.name}}
			</view>
		</view>
		<!-- 列表 -->
		<template v-if="listData.length">
			<block v-for="(item,index) in listData">
				<comm-list :item="item" :index="index"></comm-list>
			</block>
		</template>
		<template v-else>
			<nothing></nothing>
		</template>
		<!-- 上拉加载 -->
		<load-more :loadmore="loadText"></load-more>
	</view>
</template>

<script>

	import topicInfo from '@/components/content/new/topic-info.vue';
	import CommList from '@/components/common/CommList.vue';
	import{getList} from '@/network/getData.js';
	import LoadMore from '@/components/common/LoadMore.vue';
	export default {
		components: {
			topicInfo,
			CommList,
			LoadMore
		},
		data() {
			return {
				topicDetailInfo:'',
				hotList: [
					{title: '[新人必读] uniapp实战第二季商城项目开发'},
					{title: '[新人必读] uniapp实战第二季商城项目开发'},
				],
				tabIndex: 0,
				tabBar: [{name: ' 默认'},{name: '最新'}],
				list1:[],
				loadText1: '上拉加载更多',
				list2:[],
				loadText2: '上拉加载更多',
			}
		},
		computed:{
			//当前列表数据
			listData(){
				if (this.tabIndex === 0) {
					return this.list1
				}
				return this.list2 
			},
			//当前加载文本
			loadText(){
				if (this.tabIndex === 0) {
					return this.loadText1
				}
				return this.loadText2 
			}
			
		},
		onLoad(e) {
			//获取最新列表数据
			this.list1= getList()
			//获取默认列表数据
			this.list2 = []
			//获取点击的具体详情
			if (e.detail) {
				this.topicDetailInfo = JSON.parse(e.detail)
			}
		},
		//触底事件
		onReachBottom() {
			this.loadmore()
		},
		methods: {
			changeTab(index){
				this.tabIndex = index
			},
			//上拉加载
			loadmore(){
				let index = this.tabIndex
				if(this.loadText !=='上拉加载更多'){
					return 
				}
				this['loadText'+ (index + 1)] = '加载中...'
				setTimeout(() => {
					this['list' + (index + 1)] = [...this['list' + (index + 1)],...this['list' + (index + 1)]]
					this['loadText'+ (index + 1)] = '上拉加载更多'
				},2000)
			}
		}
	}
</script>

<style>

</style>
