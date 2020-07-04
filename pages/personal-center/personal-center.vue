<template>
	<view class="container">
		<view class="list-content">
			<view class="list" v-for="(item, index) in List1" :key="index" @tap="toPage(item.path)">
				<view class="left">
					<image class="icon" :src="item.cuIcon"></image>
					<view class="text">{{item.name}}</view>
				</view>
				<image class="to" src="/static/personal-center/to.png"></image>
			</view>
		</view>
		<view class="list-content">
			<view class="list" v-for="(item, index) in List2" :key="index" @tap="toPage(item.path)">
				<view class="left">
					<image class="icon" :src="item.cuIcon"></image>
					<view class="text">{{item.name}}</view>
				</view>
				<image class="to" src="/static/personal-center/to.png"></image>
			</view>
		</view>
		<view class="button-container">
			<button class="cu-btn block margin-tb-sm lg" style="background-color: #4191ea; color: #FFFFFF;" @tap="toLogout">退出登录</button>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				List1: [{
						cuIcon: '/static/personal-center/user.png',
						name: '个人信息',
						path: 'userinfo/userinfo'
					},
					{
						cuIcon: '/static/personal-center/phone.png',
						name: '修改手机',
						path: 'modifyphone/modifyphone'
					},
					{
						cuIcon: '/static/personal-center/password.png',
						name: '修改密码',
						path: 'modifypassword/modifypassword'
					}
				],
				List2: [
					{
						cuIcon: '/static/personal-center/feedback.png',
						name: '用户反馈',
						path: 'feedback/feedback'
					},
					{
						cuIcon: '/static/personal-center/aboutus.png',
						name: '关于我们',
						path: 'about/about'
					}
				]
			}
		},
		methods: {
			//用户点击联系客服/投诉反馈等列表
			toPage(path) {
				uni.navigateTo({
					url: '/pages/personal-center/' + path
				})
			},
			//退出登录
			toLogout() {
				uni.showModal({
					content: '确定要退出登录么',
					success: (e) => {
						if (e.confirm) {
							uni.removeStorageSync('token');
							uni.removeStorageSync('role');
							uni.removeStorageSync('phone');
							uni.removeStorageSync('userInfo');
							uni.reLaunch({
								url: "/pages/login/login"
							});
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.container {
		width: 750rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: hidden;
	}
	.list-content {
		width: 90%;
		margin-top: 30rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		
		.list {
			height: 100rpx;
			width: 100%;
			border-bottom: 1rpx solid #f4f4f4;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-right: 300rpx;
			.left {
				display: flex;
				align-items: center;
				.icon {
					height: 50rpx;
					width: 50rpx;
					margin-left: 30rpx;
					margin-right: 30rpx;
				}
				.text {
				}
			}
			.to {
				height: 40rpx;
				width: 40rpx;
				margin-right: 30rpx;
			}
		}
	}
	.button-container {
		margin-top: 100rpx;
		width: 80%;
	}
</style>
