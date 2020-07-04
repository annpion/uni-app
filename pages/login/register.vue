<template>
	<view class="container">
		<!-- 登录容器 -->
		<view class="title-box"><text>注册账号</text></view>
		<!-- 输入容器 -->
		<view class="input-box">
			<view class="input-row">
				<text>姓名</text>
				<input v-model="name" maxlength="11" placeholder="请输入姓名" />
			</view>
			<view class="input-row">
				<text>角色</text>
				<radio-group @change="radioChange" style="margin-left: 30rpx;">
					<text style="font-size: 25rpx;margin-right: 10rpx;">老师</text><radio value="老师" />
					<text style="font-size: 25rpx;margin-right: 10rpx;">学生</text><radio value="学生" />
				</radio-group>
			</view>
			<view class="input-row">
				<text>学/工号</text>
				<input type="number" v-model="identity" maxlength="20" placeholder="请输入学/工号" />
			</view>
			<view class="input-row">
				<text>手机号</text>
				<input type="number" v-model="phone" maxlength="11" placeholder="请输入注册手机号码" />
			</view>
			<view class="input-row">
				<text>密码</text>
				<input type="text" v-model="passData1" maxlength="36" placeholder="请输入登录密码" :password="!showPassword1" />
				<image class="icon-image" :src="showPassword1 ? '/static/login/op.png' : '/static/login/cl.png'" @tap="display1"></image>
			</view>
			<view class="input-row">
				<text>确认密码</text>
				<input type="text" v-model="passData2" maxlength="36" placeholder="请再次确认登录密码" :password="!showPassword2" />
				<image class="icon-image" :src="showPassword2 ? '/static/login/op.png' : '/static/login/cl.png'" @tap="display2"></image>
			</view>
			<view class="input-row">
				<text>验证码</text>
				<input type="number" v-model="verCode" maxlength="6" placeholder="请输入短信验证码" />
				<view class="yzm" :class="{ yzms: second > 0 }" @tap="getVerCode">{{ getVerCodeSecond }}</view>
			</view>
		</view>

		<!-- 按钮容器 -->
		<view class="button-box">
			<button type="primary" class="button-body" @tap="startRePass()">注册</button>
		</view>
	</view>
</template>

<script>
	var tha, js;
	var graceChecker = require('../../common/graceui-dataChecker/graceChecker.js');
	export default {
		data() {
			return {
				name: '',
				role: '',
				identity: '',
				phone: '',
				//密码1
				passData1: '',
				showPassword1: false,
				//密码2
				passData2: '',
				showPassword2: false,
				//验证码
				verCode: '',
				codeText: '获取验证码',
				second: 0, //倒计时时间
				sendBool: false //判断是否发送
				
			};
		},
		computed: {
			getVerCodeSecond() {
				//验证码倒计时计算
				if (this.second <= 0) {
					return this.codeText;
				} else {
					if (this.second < 10) {
						return '0' + this.second + 's后重试';
					} else {
						return this.second + 's后重试';
					}
				}
			}
		},
		onLoad() {
			tha = this;
		},
		methods: {
			radioChange(e) {
				this.role = e.detail.value;
			},
			display1() {
				this.showPassword1 = !this.showPassword1;
			},
			display2() {
				this.showPassword2 = !this.showPassword2;
			},
			//获取手机验证码
			getVerCode: async function() {
				if (this.phone.length != 11) {
					uni.showToast({
						icon: 'none',
						title: '手机号不正确'
					});
					return false;
				}
				if (this.sendBool) {
					//判断是否短信已发送，避免重复点击请求
					return false;
				}
				this.sendBool = true;

				tha.second = 60;
				uni.showToast({
					icon: 'none',
					duration: 2500,
					title: '验证码为：1234'
				})
				js = setInterval(function() {
					tha.second--;
					if (tha.second == 0) {
						tha.sendBool = false;
						clearInterval(js);
					}
				}, 1000);
			},
			// 立即注册
			startRePass() {
				if (this.name == '') {
					uni.showToast({
						icon: 'none',
						title: '请输入姓名'
					});
					return false;
				}
				if (this.role == '') {
					uni.showToast({
						icon: 'none',
						title: '请选择角色'
					});
					return false;
				}
				if (this.identity == '') {
					uni.showToast({
						icon: 'none',
						title: '请输入学/工号'
					});
					return false;
				}
				if (this.phone.length != 11) {
					uni.showToast({
						icon: 'none',
						title: '手机号不正确'
					});
					return false;
				}
				//验证密码强度
				let 小写 = 0;
				let 大写 = 0;
				let 数字 = 0;
				let 特殊 = 0;
				let 中文 = 0;
				for (let 字符 of this.passData1) {
					if (字符 >= 'a' && 字符 <= 'z') {
						小写 += 1;
					} else if (字符 >= 'A' && 字符 <= 'Z') {
						大写 += 1;
					} else if (字符 >= '0' && 字符 <= '9') {
						数字 += 1;
					} else if (字符 >= '\u4e00' && 字符 <= '\u9fa5') {
						中文 += 1;
					} else {
						特殊 += 1;
					}
				};
				if (this.passData1.length < 8 || 中文 != 0 || [小写, 大写, 数字, 特殊].filter(x => x > 0).length < 2) {
					uni.showToast({
						icon: 'none',
						duration: 2500,
						title: '密码长度必须达到8位,包含大写字母、小写字母、数字、特殊符号中的2种及以上类型。'
					});
					return false;
				}
				if (this.passData1 != this.passData2) {
					uni.showToast({
						icon: 'none',
						title: '请输入相同的密码'
					});
					return false;
				}
				if (this.verCode.length != 4) {
					uni.showToast({
						icon: 'none',
						title: '验证码不正确'
					});
					return false;
				}

				var formdata = {
					name: this.name,
					role: this.role,
					identity: this.identity,
					phone: this.phone,
					password: this.passData1,
					// code: this.verCode
				};
				this.$http.post('/regist', formdata ).then(res => {
					uni.showToast({
						title: '注册成功,请重新登录',
						icon: 'none',
						duration: 1500,
						success: function() {
							setTimeout(function() {
								uni.redirectTo({
									url: '/pages/login/login'
								});
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
		background: linear-gradient(224deg, rgba(41, 120, 209, 1) 0%, rgba(56, 156, 193, 1) 70%, rgba(75, 204, 173, 1) 100%);
		opacity: 1;
		display: flex;
		justify-content: space-between;
		align-items: center;
		/* border-radius: 0 0 375rpx -40rpx/0 0 375rpx -40rpx; */
		position: relative;
		border: none;
	}

	.cover {
		height: 40rpx;
		width: 100%;
		position: absolute;
		bottom: -1rpx;
		background-color: #ffffff;
		border-radius: 375rpx 375rpx 0 0/40rpx 40rpx 0 0;
	}

	.logo-image {
		margin-left: 17%;
		width: 160rpx;
		height: 166rpx;
	}

	.logo-image image {
		width: 100%;
		height: 100%;
	}

	.logo-text {
		margin-right: 17%;
		width: 320rpx;
		height: 132rpx;
		font-size: 50rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(255, 255, 255, 1);
		opacity: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	.logo-text text {
		width: 100%;
		height: 63rpx;
		display: flex;
		justify-content: center;
		align-items: center;
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

	/* 底部容器 */
	.footer-box {
		flex: auto;
		width: 100%;
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

	/* 验证码 */
	.yzm {
		flex: auto;
		color: #4191ea;
		font-size: 24rpx;
		width: auto;
		height: 60rpx;
		flex: none;
		border: 1upx solid rgba(65, 145, 234, 1);
		border-radius: 50upx;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: nowrap;
		padding: 8rpx;
	}

	.yzms {
		color: #999999 !important;
		border: 1upx solid #999999 !important;
	}
</style>
