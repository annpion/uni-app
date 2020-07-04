<template>
	<view class="container">
		<view class="input-box">
			<view class="input-row">
				<text>旧密码</text>
				<input type="text" v-model="oldPassword" maxlength="36" placeholder="请输入旧密码" :password="!showPassword1" />
				<image class="icon-image" :src="showPassword1?'/static/login/op.png':'/static/login/cl.png'" @tap="display1"></image>
			</view>
			<view class="input-row">
				<text>新密码</text>
				<input type="text" v-model="newPassword1" maxlength="36" placeholder="请输入新密码" :password="!showPassword2" />
				<image class="icon-image" :src="showPassword2?'/static/login/op.png':'/static/login/cl.png'" @tap="display2"></image>
			</view>
			<view class="input-row">
				<text>确认新密码</text>
				<input type="text" v-model="newPassword2" maxlength="36" placeholder="请确认新密码" :password="!showPassword3" />
				<image class="icon-image" :src="showPassword3?'/static/login/op.png':'/static/login/cl.png'" @tap="display3"></image>
			</view>
		</view>
		<button class="button" type="primary" @tap="submit">提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				role:'',
				oldPassword: '',
				newPassword1: '',
				newPassword2: '',
				showPassword1: false,
				showPassword2: false,
				showPassword3: false,
			}
		},
		onLoad() {
			if (uni.getStorageSync('role')) {
				this.role = uni.getStorageSync('role');
			}
		},
		methods: {
			//显示/隐藏密码
			display1() {
				this.showPassword = !this.showPassword
			},
			display2() {
				this.showPassword = !this.showPassword
			},
			display3() {
				this.showPassword = !this.showPassword
			},
			submit() {
				if (this.oldPassword == '') {
					uni.showToast({
						icon: 'none',
						title: '请输入旧密码'
					});
					return false;
				}
				//验证密码强度
				let 小写 = 0;
				let 大写 = 0;
				let 数字 = 0;
				let 特殊 = 0;
				let 中文 = 0;
				for (let 字符 of this.newPassword1) {
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
				if (this.newPassword1.length < 8 || 中文 != 0 || [小写, 大写, 数字, 特殊].filter(x => x > 0).length < 2) {
					uni.showToast({
						icon: 'none',
						duration: 2500,
						title: '密码长度必须达到8位,包含大写字母、小写字母、数字、特殊符号中的2种及以上类型。'
					});
					return false;
				}
				if (this.newPassword1 != this.newPassword2) {
					uni.showToast({
						icon: 'none',
						title: '请输入相同的密码'
					});
					return false;
				}
				let formdata = {
					oldPassword: this.oldPassword,
					newPassword: this.newPassword1,
					role: this.role
				};
				this.$http.post('/resetPwd', formdata ).then(res => {
					uni.showToast({
						title: '密码修改成功,请重新登录',
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
	}
</script>

<style>
	.input-box {
		flex: none;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		margin-top: 50rpx;
	}
	
	.input-row {
		margin-top: 20rpx;
		width: 606rpx;
		height: 100rpx;
		display: flex;
		align-items: center;
		border-bottom: 1rpx solid rgba(136, 136, 136, 1);
		padding-bottom: 1rpx;
	}
	
	.input-row text {
		font-size: 30rpx;
		min-width: 5em;
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
	
	.button {
		width: 80%;
		margin: 0 auto;
		margin-top: 50rpx;
	}
</style>
