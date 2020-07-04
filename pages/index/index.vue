<template>
	<view class="container">
		<view class="modal-container" :class="{'modal-container--show':isOpen}">
			<view class="modal__mask" @click="clickMask"></view>
			<view class="select-container">
				<view class="select-item" v-for="(item,index) in selectList" :key="index" @tap="chooseSelect(item.text)">
					<image :src="item.imgUrl"></image>
					<view class="select-text">{{item.text}}</view>
				</view>
			</view>
		</view>
		<!-- 提交信息 -->
		<uni-popup ref="dialogInput" type="dialog" @change="change">
			<uni-popup-dialog mode="input" title="班课号" placeholder="请输入班课号" @confirm="dialogInputConfirm"></uni-popup-dialog>
		</uni-popup>
		<view class="list-container">
			<view class="list-item" v-for="(item,index) in courseList" :key="index" @tap="toCourseDetail(item.course_id,item.course_number)">
				<view class="list-item">
					<image src="../../static/index/kecheng.png"></image>
					<view class="text-box">
						<view class="top">
							<text>item.courseName</text>
							<text>item.classes</text>
						</view>
						<view class="bottom">
							<text>教师：{{item.teacher}}</text>
							<text>学期：{{item.term}}</text>
						</view>
					</view>
				</view>
			</view>
<!-- 			<view class="list-item">
				<image src="../../static/index/kecheng.png"></image>
				<view class="text-box">
					<view class="top">
						<text>计算机科学与技术</text>
						<text>2014012班</text>
					</view>
					<view class="bottom">
						<text>教师：小小明</text>
						<text>学期：2014上学期</text>
					</view>
				</view>
			</view>
			<view class="list-item">
				<image src="../../static/index/kecheng.png"></image>
				<view class="text-box">
					<view class="top">
						<text>计算机科学与技术</text>
						<text>2014012班</text>
					</view>
					<view class="bottom">
						<text>教师：小小明</text>
						<text>学期：2014上学期</text>
					</view>
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	export default {
		components: {
			uniPopupDialog
		},
		data() {
			return {
				role: '',
				//右上角选择框相关数据
				isOpen: false,
				selectList: [],
				//课程列表
				courseList: []
			}
		},
		onLoad() {
			if (uni.getStorageSync('role')) {
				this.role = uni.getStorageSync('role');
			}
			if (this.role == "teacher") {
				this.selectList = [{
					imgUrl: "/static/index/write.png",
					text: "创建课程"
				}];
			} else {
				this.selectList = [{
						imgUrl: "/static/index/saoyisao.png",
						text: "扫一扫"
					},
					{
						imgUrl: "/static/index/write.png",
						text: "课程号"
					}
				];
			}
			this.getCourseList();
		},
		//监听导航栏icon
		onNavigationBarButtonTap(e) {
			if (e.index == 0) {
				this.isOpen = !this.isOpen;
			}
		},
		onPullDownRefresh() {
			this.getCourseList();
		},
		methods: {
			getCourseList() {
				this.$http.get('/courseList').then(res => {
					this.courseList = res
				}).catch(err => {

				})
			},
			toCourseDetail(id,number) {
				if(this.role == "teacher"){
					uni.navigateTo({
						url: '/pages/course/course-detail-teacher/course-detail-teacher?id=' + id + '&number' + number
					})
				} else {
					url: '/pages/course/course-detail-student/course-detail-student?id=' + id + '&number' + number
				}
				// uni.navigateTo({
				// 	url: '/pages/course/course-detail/course-detail?id=' + id
				// });
			},
			change(e) {
				console.log('popup ' + e.type + ' 状态', e.show)
			},
			dialogInputConfirm: async function(done, val) {
				if (val === '' || val === null) {
					uni.showToast({
						icon: 'none',
						title: '课程号不能为空'
					});
					return false;
				}
				let temp = await this.isCourseIdTure(val)
				if (temp) {
					uni.navigateTo({
						url: '/pages/course/join-course/join-course?val=' + temp
					});
				} else {
					uni.showToast({
						title: '请输入正确的课程号',
						icon: 'none'
					});
				}
			},
			handleResult: async function(val) {
				let temp = await this.isCourseIdTure(val)
				if (temp) {
					uni.navigateTo({
						url: '/pages/course/join-course/join-course?val=' + temp
					});
				} else {
					uni.showToast({
						title: '二维码无效',
						icon: 'none'
					});
				}
			},
			chooseSelect(text) {
				this.closeModal()
				switch (text) {
					case '扫一扫':
						uni.scanCode({
							onlyFromCamera: false,
							scanType: 'qrCode',
							success: function(res) {
								this.handleResult(res.result);
							}
						})
						break;
					case '课程号':
						this.$refs.dialogInput.open()
						break;
					case '创建课程':
						//跳转到创建课程页面
						uni.navigateTo({
							url: '/pages/course/create-course/create-course'
						});
						break;
					default:
						break;
				}
			},
			closeModal() {
				this.isOpen = false
			},
			clickMask() {
				this.closeModal()
			},
			isCourseIdTure(val) {
				this.$http.get('/selectCourse', {
					params: {
						course_number: val
					}
				}).then(res => {
					return res
				}).catch(err => {
					return 0
				})
			}
		}
	}
</script>

<style>
	.modal-container {
		position: fixed;
		visibility: hidden;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: 1000;
	}

	.modal-container--show {
		visibility: visible;
	}

	.modal__mask {
		display: block;
		position: absolute;
		z-index: 998;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}

	.select-container {
		position: absolute;
		z-index: 999;
		top: 10rpx;
		right: 20rpx;
		width: 260rpx;
		border-radius: 5rpx;
		background-color: #514b4b;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
	}

	.select-item {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 90rpx;
		width: 100%;
		color: #FFFFFF;
	}

	.select-item image {
		height: 40rpx;
		width: 40rpx;
	}

	.select-item .select-text {
		font-size: 30rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 160rpx;
		height: 100%;
	}

	.list-container {
		width: 100%;
	}
	.list-item {
		width: 100%;
		height: 160rpx;
		margin-bottom: 10rpx;
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
	}
	.list-item image{
		width: 90rpx;
		height: 90rpx;
		margin-left: 20rpx;
		margin-right: 30rpx;
		flex: none;
	}
	.list-item .text-box{
		height: 100%;
		flex: auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-right: 20rpx;
	}
	.list-item .top{
		height: 75rpx;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 34rpx;
		line-height: 75rpx;
	}
	.list-item .bottom{
		height: 55rpx;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #BABABA;
		font-size: 30rpx;
		line-height: 55rpx;
	}
</style>
