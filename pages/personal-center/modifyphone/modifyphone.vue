<template>
	<view class="container">
		<view class="input-box">
			<view class="input-row">
				<text>登录密码</text>
				<input type="text" v-model="password" maxlength="36" placeholder="请输入登录密码" :password="!showPassword" />
				<image class="icon-image" :src="showPassword?'/static/login/op.png':'/static/login/cl.png'" @tap="display"></image>
			</view>
			<view class="input-row">
				<text>新手机号</text>
				<input type="number" v-model="phone" maxlength="11" placeholder="请输入新手机号" />
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
				password: '',
				phone: '',
				showPassword: false
			}
		},
		onLoad() {
			if (uni.getStorageSync('role')) {
				this.role = uni.getStorageSync('role');
			}
		},
		methods: {
			//显示/隐藏密码
			display() {
				this.showPassword = !this.showPassword
			},
			submit() {
				if (this.password == '') {
					uni.showToast({
						icon: 'none',
						title: '请输入密码'
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
				let formdata = {
					password: this.password,
					phone: this.phone,
					role: this.role
				};
				this.$http.post('/changePhone', formdata ).then(res => {
					uni.showToast({
						title: '手机号修改成功',
						icon: 'none',
						duration: 1500,
						success: function() {
							setTimeout(function() {
								uni.navigateBack({
									delta: 1
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
	
	.button {
		width: 80%;
		margin: 0 auto;
		margin-top: 50rpx;
	}
</style>
