<script>
	export default {
		onLaunch: function() {
			// console.log('App Launch')
			// 检测更新
			// 网络监听
				this.$U.onNetWork()
			// 初始化数据
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	/* 官方css库 */
	@import "./common/css/uni.css";
	/* 自定义图标库 */
	@import "./common/css/icon.css";
	/* 动画库 */
	@import "./common/css/animate.css";
	/* 引入自定义css库 */
	@import "./common/css/free.css";
	/* 引入项目公共样式 */
	@import "./common/css/common.css";
</style>
