<template>
	<view class="container">
		<!-- 头部logo -->
		<view class="header-box">
			<view class="header-text">课程打卡系统</view>
		</view>
		<!-- 登录容器 -->
		<view class="title-box">
			<text>登录</text>
		</view>
		<!-- 输入容器 -->
		<view class="input-box">
			<view class="input-row" v-if="userType">
				<image class="icon-image" src="/static/login/user.png"></image>
				<input type="number" v-model="phone" maxlength="11" placeholder="请输入手机号码" />
			</view>
			<view class="input-row" v-else>
				<image class="icon-image" src="/static/login/user.png"></image>
				<input type="text" v-model="email" placeholder="请输入邮箱地址" />
			</view>
			<view class="input-row">
				<image class="icon-image" src="/static/login/password.png"></image>
				<input type="text" v-model="password" maxlength="36" placeholder="请输入密码" :password="!showPassword" />
				<image class="icon-image" :src="showPassword?'/static/login/op.png':'/static/login/cl.png'" @tap="display"></image>
			</view>
		</view>
		<view>
			<text class="user-text" @tap="changeUser">{{userText}}</text>
		</view>
		<radio-group @change="radioChange" class="radio-container">
			<view>
				<text style="font-size: 25rpx;margin-right: 10rpx;">老师</text>
				<radio value="老师" />
			</view>
			<view>
				<text style="font-size: 25rpx;margin-right: 10rpx;">学生</text>
				<radio value="学生" />
			</view>
		</radio-group>
		<!-- 按钮容器 -->
		<view class="button-box">
			<button type="primary" class="button-body" @tap="startLogin()">立即登录</button>
		</view>
		<!-- 底部容器 -->
		<view class="footer-box">
			<view class="footer-body" @tap="findPsw">
				<image src="/static/login/forget.png"></image>
				<text>找回密码</text>
			</view>
			<view class="footer-body" @tap="register">
				<image src="/static/login/register.png"></image>
				<text>注册账号</text>
			</view>
		</view>
	</view>
</template>

<script>
	var graceChecker = require("../../common/graceui-dataChecker/graceChecker.js")
	export default {
		data() {
			return {
				userText:'使用邮箱登录',
				userType:1,
				showPassword: false,
				phone: '',
				email:'',
				password: '',
				role: '',
				formdata: {}
			};
		},
		onLoad() {
			if(uni.getStorageSync('phone')) {
				this.phone = uni.getStorageSync('phone');
			}
		},
		methods: {
			changeUser(){
				if(this.userType){
					this.userType = !this.userType
					this.userText = '使用手机登录'
				} else {
					this.userText = '使用邮箱登录'
					this.userType = !this.userType
				}
				
			},
			display() {
				this.showPassword = !this.showPassword
			},
			radioChange(e) {
				this.role = e.detail.value;
			},
			findPsw() {
				uni.navigateTo({
					url: '/pages/login/forget'
				});
			},
			register() {
				uni.navigateTo({
					url: '/pages/login/register'
				});
			},
			startLogin() {
				
				//定义表单规则
				if(this.userType){
					var formdata = {
						phone: this.phone,
						password: this.password,
						role: this.role
					}
					var rule = [{
							name: "phone",
							checkType: "notnull",
							errorMsg: "请输入手机号码"
						},
						{
							name: "phone",
							checkType: "phoneno",
							errorMsg: "手机号码格式错误"
						},
						{
							name: "password",
							checkType: "notnull",
							checkRule: "6,20",
							errorMsg: "请输入密码"
						},
						{
							name: "role",
							checkType: "notnull",
							errorMsg: "请选择角色"
						}
					];
				} else {
					var formdata = {
						email: this.email,
						password: this.password,
						role: this.role
					}
					var rule = [
						{
							name: "email",
							checkType: "notnull",
							errorMsg: "请输入邮箱地址"
						},
						{
							name: "email",
							checkType: "email",
							errorMsg: "邮箱地址格式错误"
						},
						{
							name: "password",
							checkType: "notnull",
							checkRule: "6,20",
							errorMsg: "请输入密码"
						},
						{
							name: "role",
							checkType: "notnull",
							errorMsg: "请选择角色"
						}
					];
				}
				
				//进行表单检查
				var checkRes = graceChecker.check(formdata, rule);
				if (checkRes) {
					//进行密码登录
					this.formdata = formdata;
					uni.setStorageSync('phone', this.phone);
					this.Login();
				} else {
					uni.showToast({
						icon: 'none',
						title: graceChecker.error
					});
				}
			},
			Login() {
				if(!this.userType){
					this.formdata.phone = this.email
				}
				this.$http.post('/login', this.formdata ).then(res => {
					console.log(res);
					uni.setStorageSync('token', res.token);
					uni.setStorageSync('userInfo', res.userInfo);
					uni.setStorageSync('role', res.userInfo.role);
					uni.setStorageSync('phone', res.userInfo.phone);
					uni.showToast({
						title: '登录成功',
						icon: 'success',
						duration: 1500,
						success: function() {
							setTimeout(function() {
								uni.switchTab({
									url: '/pages/index/index'
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
	page {
		background: rgba(255, 255, 255, 1);
		opacity: 1;
	}

	/* 整个页面 */
	.content {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		width: 100vw;
		height: 100vh;
	}

	/* 头部容器 */
	.header-box {
		flex: auto;
		height: 400rpx;
		width: 100%;
		background: rgba(56, 156, 193, 1);
		opacity: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		border: none;
	}

	.header-text {
		color: #FFFFFF;
		font-size: 90rpx;
		font-weight: 600;
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
		width: 67rpx;
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
		height: 200rpx;
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

	/* 按钮容器 */
	.button-box {
		flex: auto;
		width: 100%;
		height: 150rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		border-bottom: 1rpx dashed rgba(199, 199, 199, 1);
		padding-bottom: 10rpx;
	}

	.button-box .button-body {
		margin-top: 50rpx;
		flex: none;
		width: 585rpx;
		height: 94rpx;
	}

	.button-box .noLogin {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 30rpx;
		text-decoration: underline;
		color: #0079FE;
		height: 100rpx;
		margin-top: 10rpx;
	}

	/* 底部容器 */
	.footer-box {
		flex: auto;
		width: 100%;
		height: 220rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		/* padding: 20rpx 0; */
		margin: 30rpx 0;
	}

	.footer-box .footer-body {
		width: 212rpx;
		height: 150rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		margin: 0rpx 40rpx;
	}

	.footer-box .footer-body image {
		width: 81rpx;
		height: 81rpx;
	}

	.footer-box .footer-body text {
		width: 100%;
		height: 35rpx;
		font-size: 25rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(63, 131, 255, 1);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.radio-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 300rpx;
		margin: 0 auto;
		margin-top: 40rpx;
	}
	
	.user-text {
		display: flex;
		font-size: 20rpx;
		margin-left:560rpx;
		margin-top: 20rpx;
		text-decoration: underline;
		color: #1296DB;
	}
</style>
