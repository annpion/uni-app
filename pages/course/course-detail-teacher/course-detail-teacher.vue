<template>
	<view class="container">
		<wuc-tab :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange" :textFlex="true"></wuc-tab>
		<view v-show="TabCur === 0">
			<view class="button-box">
				<!-- <view class="button" @tap="startSignIn" v-if="isEnd"> -->
				<view class="button" @tap="startSignIn">
					<image src="/static/course/sign.png"></image>
					<text>发起签到</text>
				</view>
				<!-- <view class="button" @tap="endSignIn" v-else>
					<image src="/static/course/end-sign.png"></image>
					<text>结束签到</text>
				</view> -->
				<view class="button" @tap="toDetail">
					<image src="/static/course/eye.png"></image>
					<text>签到详情</text>
				</view>
				<view class="button" @tap="toQrcode">
					<image src="/static/course/qrcode.png"></image>
					<text>二维码</text>
				</view>
			</view>
			<view class="count-box">
				<text style="margin-left: 20rpx;">成员总数</text>
				<text style="margin-right: 20rpx;">{{count}}人</text>
			</view>
			<view class="list-container">
				<view class="list-item" v-for="(item,index) in studentList" :key="index">
					<image src="../../../static/course/avatar.png"></image>
					<text class="text1">item.name</text>
					<text class="text2">item.userId</text>
				</view>
				<view class="list-item">
					<image src="../../../static/course/avatar.png"></image>
					<text class="text1">小明</text>
					<text class="text2">123456</text>
				</view>
				<view class="list-item">
					<image src="../../../static/course/avatar.png"></image>
					<text class="text1">小明</text>
					<text class="text2">123456</text>
				</view>
			</view>
		</view>
		<view v-show="TabCur === 1">
			<view class="input-box">
				<view class="input-row">
					<text>班级</text>
					<input v-model="classes" placeholder="请输入班级" disabled />
				</view>
				<view class="input-row">
					<text>课程</text>
					<input v-model="course" placeholder="请输入课程" disabled />
				</view>
				<view class="input-row">
					<text>学校院系</text>
					<input v-model="departmet" placeholder="请输入学校院系" disabled />
				</view>
				<view class="input-row">
					<text>所属学期</text>
					<input v-model="term" placeholder="请输入所属学期" disabled />
				</view>
				<view class="input-row">
					<text>课程周数</text>
					<input v-model="week" placeholder="请输入课程周数" disabled />
				</view>
				<view class="input-row">
					<text>上课地点</text>
					<input v-model="location" placeholder="请输入上课地点" disabled />
				</view>
				<view class="input-row">
					<text>授课教师</text>
					<input v-model="teacher" placeholder="请输入授课教师" disabled />
				</view>
				<view class="input-row">
					<text>学习要求</text>
					<input v-model="demand" placeholder="请输入学习要求" disabled />
				</view>
				<view class="input-row">
					<text>教学进度</text>
					<input v-model="progress" placeholder="请输入教学进度" disabled />
				</view>
				<view class="input-row">
					<text>考试安排</text>
					<input v-model="exam" placeholder="请输入考试安排" disabled />
				</view>
			</view>
			<!-- 按钮容器 -->
			<!-- <view class="button-box">
				<button type="primary" class="button-body" @tap="modify()">修改班课</button>
			</view> -->
		</view>
	</view>
</template>

<script>
	import WucTab from '@/components/wuc-tab/wuc-tab.vue';

	export default {
		data() {
			return {
				//课程列表
				courseId: '',
				// isEnd: true,
				studentList: [],
				count: 0,

				//tab
				TabCur: 0,
				tabList: [{
					name: '成员'
				}, {
					name: '详情'
				}],
				
				//详情
				classes: '你好',
				course: '123',
				departmet: '123',
				term: '123',
				week: '123',
				location: '123',
				teacher: '123',
				demand: '123',
				progress: '123',
				exam: '123'
			}
		},
		components: {
			WucTab
		},
		onLoad(option) {
			if (option.id) {
				this.courseId = option.id
			}
			this.getStudentList();
			this.getCourseInfo();
			// this.getIfEnd();
		},
		onPullDownRefresh() {
			this.getStudentList();
			this.getCourseInfo();
			// this.getIfEnd();
		},
		methods: {
			tabChange(index) {
				this.TabCur = index;
			},
			// getIfEnd() {
			// 	this.$http.get('/getIfEnd', {
			// 		params: {
			// 			courseId: this.courseId
			// 		}
			// 	}).then(res => {
			// 		this.isEnd = res
			// 	}).catch(err => {
				
			// 	})
			// },
			getStudentList() {
				this.$http.get('/getStudentList', {
					params: {
						courseId: this.courseId
					}
				}).then(res => {
					this.studentList = res.list
					this.count = res.count
				}).catch(err => {

				})
			},
			getCourseInfo() {
				this.$http.get('/getCourseInfo', {
					params: {
						courseId: this.courseId
					}
				}).then(res => {
					this.classes = res.class
					this.course = res.course
					this.departmet = res.departmet
					this.term = res.term
					this.week = res.week
					this.location = res.location
					this.teacher = res.teacher
					this.demand = res.demand
					this.progress = res.progress
					this.exam = res.exam
				}).catch(err => {
			
				})
			},
			startSignIn() {
				let formdata = {
					'courseId': this.courseId
				}
				uni.getLocation({
					type: 'wgs84',
					success: function(res) {
						formdata['longitude'] = res.longitude
						formdata['latitude'] = res.latitude
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
					}
				});
				this.$http.post('/launchSignIn', formdata).then(res => {
					uni.showToast({
						title: '发起签到成功',
						icon: 'success',
						duration: 1500
					});
					toSingleDetail()
					// this.isEnd = false
				}).catch(err => {})
				
			},
			// endSignIn() {
			// 	let formdata = {
			// 		'courseId': this.courseId
			// 	}
			// 	this.$http.post('/signInEnd', formdata).then(res => {
			// 		uni.showToast({
			// 			title: '成功结束签到',
			// 			icon: 'success',
			// 			duration: 1500,
			// 		});
			// 		// this.isEnd = true
			// 	}).catch(err => {})
			// },
			toDetail() {
				uni.navigateTo({
					url: '/pages/course/signIn-record-list/signIn-record-list?id=' + this.courseId
				})
			},
			toSingleDetail(){
				uni.navigateTo({
					url:'/pages/course/signIn-detail-teacher/signIn-detail-teacher?id=' + this.courseId +'&signIn=1'
				})
			},
			// toDetail() {
			// 	uni.navigateTo({
			// 		url: '/pages/course/signIn-detail-teacher/signIn-detail-teacher?id=' + this.courseId
			// 	})
			// },
			// toSingleDetail(){
			// 	uni.navigateTo({
			// 		url:'/pages/course/signIn-record-list/signIn-record-list'
			// 	})
			// },
			toQrcode() {
				uni.navigateTo({
					url: '/pages/course/qrcode/qrcode?val=' + this.courseId
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

	.list-item image{
		width: 90rpx;
		height: 90rpx;
		flex: none;
		margin: 0 40rpx 0 20rpx;
	}
	.list-item .text1{
		width: 200rpx;
		line-height: 120rpx;
		flex: none;
	}
	.list-item .text2{
		line-height: 120rpx;
		flex: auto;
	}
	
	.button-box {
		width: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 250rpx;
	}

	.button {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 200rpx;
	}

	.button text {
		font-size: 30rpx;
		color: #333333;
		margin-top: 20rpx;
	}

	.button-box image {
		width: 90rpx;
		height: 90rpx;
	}

	.count-box {
		width: 100%;
		height: 90rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #FFFFFF;
		margin-bottom: 20rpx;
	}
	
	/* 输入容器 */
	.input-box {
		flex: none;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		min-height: 400rpx;
	}
	
	.input-row {
		margin-top: 20rpx;
		width: 606rpx;
		height: 90rpx;
		display: flex;
		align-items: center;
		border-bottom: 1rpx solid rgba(136, 136, 136, 1);
		padding-bottom: 1rpx;
	}
	
	.input-row text {
		font-size: 30rpx;
		min-width: 4em;
	}
	
	.input-row .icon-image {
		flex: none;
		width: 36rpx;
		height: 36rpx;
		margin-left: 10rpx;
	}
	
	.input-row .image-code {
		flex: none;
		width: 138rpx;
		height: 64rpx;
	}
	
	.input-row input {
		height: 36rpx;
		flex: auto;
		margin-left: 30rpx;
		font-size: 25rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(102, 102, 102, 1);
		opacity: 1;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	
	.button-body {
		width: 80%;
	}
</style>
