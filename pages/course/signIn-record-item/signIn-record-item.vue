<template>
	<view class="container">
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//课程列表
				courseId: '',
				studentList: []
			}
		},
		onLoad(option) {
			if (option.id) {
				this.courseId = option.id
			}
			this.getRecordItem();
		},
		onPullDownRefresh() {
			this.getRecordItem();
		},
		methods: {
			//获取该为同学该门课的所有签到记录
			getRecordItem() {
				this.$http.get('/getRecordItem', {
					params: {
						courseId: this.courseId
					}
				}).then(res => {
					this.studentList = res.list
				}).catch(err => {

				})
			}
		}
	}
</script>

<style>
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
</style>
