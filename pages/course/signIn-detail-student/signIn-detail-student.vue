<template>
	<view class="container">
		<view class="count-box">
			{{signInCount}}签到次数  {{noSignInCount}}未签到次数
		</view>
		<view class="list-container">
			<view class="list-item" v-for="(item,index) in studentList" :key="index">
				<text class="text2">item.time</text>
				<text class="text3">item.distance</text>
				<text class="text4">item.SignState</text>
			</view>
			<view class="list-item">
				<text class="text2">2020/6/29</text>
				<text class="text3">100m</text>
				<text class="text4">正常</text>
			</view>
			<view class="list-item">
				<text class="text2">2020/6/29</text>
				<text class="text3">100m</text>
				<text class="text4">正常</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//课程列表
				courseId: '',
				studentList: [],
				signInCount:0, //签到次数
				noSignInCount: 0 //未签到次数
			}
		},
		onLoad(option) {
			if (option.id) {
				this.courseId = option.id
			}
			this.getStudentList();
		},
		onPullDownRefresh() {
			this.getStudentList();
		},
		methods: {
			//获取该为同学该门课的所有签到记录
			getStudentList() {
				this.$http.get('/getStudentList', {
					params: {
						courseId: this.courseId
					}
				}).then(res => {
					this.studentList = res.list
					this.signInCount = res.signInCount
					this.noSignInCount = res.noSignInCount
				}).catch(err => {

				})
			}
		}
	}
</script>

<style>
	.count-box {
		height: 90rpx;
		width: 100%;
		background-color: #FFFFFF;
		line-height: 90rpx;
		font-size: 30rpx;
		text-align: center;
		margin-bottom: 20rpx;
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

	.list-item .text2 {
		width: 300rpx;
		line-height: 120rpx;
		flex: auto;
		margin: 30rpx;
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
</style>
