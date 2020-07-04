<template>
	<view class="container">
		<view class="list-container">
			<view class="list-item" v-for="(item,index) in recordList" :key="index" @tap="toRecordItem(item.id)">
				<image src="../../../static/course/record.png"></image>
				<text class="text2">item.time</text>
				<text class="text3">签到人数：item.people</text>
			</view>
			<view class="list-item">
				<image src="../../../static/course/record.png"></image>
				<text class="text2">2020/6/29</text>
				<text class="text3">签到人数：10人</text>
			</view>
			<view class="list-item">
				<image src="../../../static/course/record.png"></image>
				<text class="text2">2020/6/29</text>
				<text class="text3">签到人数：20人</text>
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
				recordList: []
			}
		},
		onLoad(option) {
			if (option.id) {
				this.courseId = option.id
			}
			this.getRecordList();
		},
		onPullDownRefresh() {
			this.getRecordList();
		},
		methods: {
			//获取该为同学该门课的所有签到记录
			getRecordList() {
				this.$http.get('/getRecordList', {
					params: {
						courseId: this.courseId
					}
				}).then(res => {
					this.recordList = res
				}).catch(err => {

				})
			},
			toRecordItem(id) {
				uni.navigateTo({
					url: '/pages/course/signIn-record-item/signIn-record-item?recordId=' + id + '&signIn=0'
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
		width: 80rpx;
		height: 80rpx;
		flex: none;
		margin: 0 20rpx 0 20rpx;
	}

	.list-item .text2 {
		width: 400rpx;
		line-height: 120rpx;
		flex: auto;
	}

	.list-item .text3 {
		width: 200rpx;
		line-height: 120rpx;
		flex: auto;
	}
</style>
