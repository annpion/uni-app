<template>
	<view class="container">
		<view class="feedback-body">
			<textarea placeholder="请输入反馈信息..." v-model="content" />
			</view>
		<button type="primary" class="feedback-submit" @tap="send">提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: ''
			}
		},
		onLoad() {},
		methods: {
			send() {
				if (this.content == '') {
					uni.showToast({
						icon: 'none',
						title: '请输入反馈信息'
					});
					return false;
				}
				let formdata = {
					content: this.content
				};
				this.$http.post('/feedback', formdata ).then(res => {
					uni.showToast({
						title: '提交成功',
						icon: 'success',
						duration: 1000,
						success: function() {
							setTimeout(function() {
								uni.navigateBack({
									delta: 1
								});
							}, 1000) //延迟时间
						}
					});
				}).catch(err => {
					
				})
			}
		}
	}
</script>

<style>
	.feedback-body {
		width: 100%;
	}

	.feedback-body textarea {
		width: 700rpx;
		margin: 0 auto;
		background-color: #FFFFFF;
		padding: 20rpx;
	}

	.feedback-submit {
		margin-top: 50rpx;
		width: 650rpx;
	}
</style>
