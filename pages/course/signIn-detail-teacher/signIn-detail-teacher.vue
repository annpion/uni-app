<template>
	<view class="container">
		<view class="count-box">
			<text style="margin-left: 20rpx;">未签到成员</text>
			<text style="margin-right: 20rpx;">0人</text>
		</view>
		<view class="list-item" v-for="(item,index) in studentList" :key="index">
			<image src="../../../static/course/avatar.png"></image>
			<text class="text1">item.name</text>
			<text class="text2">item.time</text>
			<text class="text3">item.distance</text>
			<text class="text4">item.SignState</text>
		</view>
		<view class="list-item">
			<image src="../../../static/course/avatar.png"></image>
			<text class="text1">小明明</text>
			<text class="text2">2020/6/29</text>
			<text class="text3">100m</text>
			<text class="text4">正常</text>
		</view>
		
		<view class="count-box">
			<text style="margin-left: 20rpx;">已签到成员</text>
			<text style="margin-right: 20rpx;">0人</text>
		</view>
		<view class="list-container">
			<view class="list-item" v-for="(item,index) in studentList" :key="index">
				<image src="../../../static/course/avatar.png"></image>
				<text class="text1">item.name</text>
				<text class="text2">item.time</text>
				<text class="text3">item.distance</text>
				<text class="text4">item.SignState</text>
			</view>
			<view class="list-item">
				<image src="../../../static/course/avatar.png"></image>
				<text class="text1">小明明</text>
				<text class="text2">2020/6/29</text>
				<text class="text3">100m</text>
				<text class="text4">正常</text>
			</view>
			<view class="list-item">
				<image src="../../../static/course/avatar.png"></image>
				<text class="text1">小明明</text>
				<text class="text2">2020/6/29</text>
				<text class="text3">100m</text>
				<text class="text4">正常</text>
			</view>
		</view>
		<view class="button-box">
			<button type="primary" class="button-body" @tap="endSignIn" v-if="signIn">结束签到</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//课程列表
				courseId: '',
				recordId:'',
				signIn:1,
				studentList: [],
				signInCount:0, //签到次数
				noSignInCount: 0 //未签到次数
			}
		},
		onLoad(option) {
			if (option.id) {
				this.courseId = option.id
			}
			if(option.recordId){
				this.recordId = option.recordId
			}
			this.signIn = option.signIn
			if(this.signIn ===1){
				this.getStudentList_signIn();
			} else {
				this.getStudentList_record();
			}
			
		},
		onPullDownRefresh() {
			if(this.signIn ===1){
				this.getStudentList_signIn();
			} else {
				this.getStudentList_record();
			}
		},
		methods: {
			//获取该为同学该门课的所有签到记录
			getStudentList_signIn() {
				this.$http.get('/teachrerSignInInfo', {
					params: {
						courseId: this.courseId
					}
				}).then(res => {
					this.studentList = res.list
				}).catch(err => {

				})
			},
			getStudentList_record() {
				this.$http.get('/teachrerSignInInfo', {
					params: {
						recordId: this.recordId
					}
				}).then(res => {
					this.studentList = res.list
				}).catch(err => {
			
				})
			},
			endSignIn() {
				let formdata = {
					'courseId': this.courseId
				}
				this.$http.post('/signInEnd', formdata).then(res => {
					uni.showToast({
						title: '成功结束签到',
						icon: 'success',
						duration: 1500,
					});
					// this.isEnd = true
				}).catch(err => {})
			}
		}
	}
</script>

<style>
	.count-box {
		width: 100%;
		height: 90rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #FFFFFF;
		margin-bottom: 20rpx;
		font-size: 32rpx;
	}

	.list-container {
		width: 100%;
	}

	.list-item {
		width: 100%;
		height: 120rpx;
		margin-bottom: 10rpx;
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		font-size: 30rpx;
	}

	.list-item image {
		width: 90rpx;
		height: 90rpx;
		flex: none;
		margin: 0 20rpx 0 20rpx;
	}

	.list-item .text1 {
		width: 120rpx;
		line-height: 120rpx;
		flex: none;
	}
	.list-item .text2 {
		width: 300rpx;
		line-height: 120rpx;
		flex: auto;
	}
	.list-item .text3 {
		width: 120rpx;
		line-height: 120rpx;
		flex: auto;
	}
	.list-item .text4 {
		width: 80rpx;
		line-height: 120rpx;
		flex: auto;
	}
	
	/* 按钮容器 */
	.button-box {
		flex: auto;
		width: 100%;
		height: 240rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		/* border-bottom: 1rpx dashed rgba(199, 199, 199, 1); */
		padding-bottom: 10rpx;
	}
	
	.button-box .button-body {
		margin-top: 25rpx;
		flex: none;
		width: 585rpx;
		height: 94rpx;
	}
	
	.button-box .policy {
		margin-top: 20rpx;
		flex: none;
		width: auto;
		height: 74rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.button-box .policy image {
		flex: none;
		width: 45rpx;
		height: 45rpx;
	}
	
	.button-box .policy .policy-text {
		height: 36rpx;
		flex: auto;
		font-size: 25rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #1296db;
		opacity: 1;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
</style>
