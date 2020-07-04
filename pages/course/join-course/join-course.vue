<template>
	<view class="container">
			<view class="list">
				<view class="title">老师：</view>
				<input v-model="teacher" placeholder="" disabled=""></input>
			</view>
			<view class="list">
				<view class="title">课程号：</view>
				<input v-model="courseId" placeholder="" disabled=""></input>
			</view>
			<view class="list">
				<view class="title">学校：</view>
				<input v-model="school" placeholder="" disabled=""></input>
			</view>
			<button type="primary" class="button-body" @tap="submit()">加入班课</button>
	</view>
</template>

<script>
	export default{
		data() {
			return{
				teacher: '123',
				courseId: '123',
				school: '123'
			}
		},
		onLoad(option) {
			if(option.val) {
				this.getCourseInfo(option.val);
			}
		},
		methods: {
			getCourseInfo(val) {
				let formdata = {
					'courseId': val
				}
				this.$http.get('/getCourseInfo', {
					params: formdata
				}).then(res => {
					this.teacher = res.data.data.teacher
					this.courseId = res.data.data.courseId
					this.school = res.data.data.school
				}).catch(err => {
					
				})
			},
			submit() {
				let formdata = {
					'courseId': val
				}
				this.$http.post('/addCourse', formdata ).then(res => {
					uni.showToast({
						title: '成功加入班课',
						icon: 'none',
						duration: 1500,
						success: function() {
							setTimeout(function() {
								uni.navigateBack({
									delta: 1
								})
							}, 1500) //延迟时间
						}
					});
				}).catch(err => {
					
				})
			}
		}
	}
</script>

<style>
	.list .title {
		min-width: calc(4em + 15px);
	}
	.list {
		background-color: #FFFFFF;
		border-bottom: 1rpx solid #BABABA;
		display: flex;
		align-items: center;
		background-color: #FFFFFF;
		padding: 0 30rpx;
		height: 90rpx;
		width: 100%;
	}
	.button-body {
		width: 80%;
		margin: 0 auto;
		margin-top: 50rpx;
	}
</style>