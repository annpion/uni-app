<template>
	<view class="container">
		<!-- 输入容器 -->
		<view class="input-box">
			<view class="input-row">
				<text>班级</text>
				<input v-model="classes" placeholder="请输入班级" />
			</view>
			<view class="input-row">
				<text>课程名</text>
				<input v-model="course" placeholder="请输入课程名" />
			</view>
		</view>
		<!-- 按钮容器 -->
		<view class="button-box">
			<button type="primary" class="button-body" @tap="submit()">创建</button>
		</view>
	</view>
</template>

<script>
	var graceChecker = require('../../../common/graceui-dataChecker/graceChecker.js');
	export default {
		data() {
			return {
				classes: '',
				course: '',
			};
		},
		methods: {
			submit() {
				var formdata = {
					classes: this.classes,
					course: this.course,
				};
				var rule = [
					{
						name: "classes",
						checkType: "notnull",
						errorMsg: "请输入班级"
					},
					{
						name: "course",
						checkType: "notnull",
						errorMsg: "请输入课程名"
					}
					
				];
				var checkRes = graceChecker.check(formdata, rule);
				if (checkRes) {
					this.formdata = formdata;
					this.request();
				} else {
					uni.showToast({
						icon: 'none',
						title: graceChecker.error
					});
				}
			},
			request() {
				this.$http.post('/createCourse', this.formdata ).then(res => {
					uni.showToast({
						title: '成功创建班课',
						icon: 'none',
						duration: 1500,
						success: function() {
							setTimeout(function() {
								uni.redirectTo({
									url: '/pages/course/qrcode/qrcode?val=' + res
								})
							}, 1500) //延迟时间
						}
					});
				}).catch(err => {
					
				})
			}
		}
	};
</script>

<style>
	/* 整个页面 */
	.content {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		width: 100vw;
		height: 100vh;
	}

	/* 登录容器 */
	.title-box {
		flex: auto;
		width: 100%;
		height: 114rpx;
		display: flex;
		align-items: center;
		position: relative;
	}

	.title-box text {
		width: 140rpx;
		height: 47rpx;
		font-size: 33rpx;
		font-family: PingFang SC;
		font-weight: 800;
		position: absolute;
		left: 78rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: rgba(0, 0, 0, 1);
		opacity: 1;
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
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(102, 102, 102, 1);
		opacity: 1;
		display: flex;
		justify-content: flex-start;
		align-items: center;
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

</style>
