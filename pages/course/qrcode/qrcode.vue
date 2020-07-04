<template>
	<view class="content">
		<view class="container">
			<view class="my-image">
				<canvas canvas-id="qrcode" :style="{width: `${qrcodeSize}px`, height: `${qrcodeSize}px`}" />
			</view>
			<view class="my-text">扫一扫上面的二维码图案，加入班课</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				qrcodeSize: 300
			}
		},
		onLoad(option) {
			if(option.val) {
				this.make(option.val);
			}
		},
		methods: {
			make(val) {
				uni.showLoading({
					title: '二维码生成中',
					mask: true
				})

				uQRCode.make({
					canvasId: 'qrcode',
					text: val,
					size: this.qrcodeSize,
					margin: 10,
					success: res => {
					},
					complete: () => {
						uni.hideLoading()
					}
				})
			}
		}
	}
</script>

<style>
	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	
	.my-image {
		width: 600rpx;
		height: 600rpx;
		margin-top: 200rpx;
	}
	.my-text {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 30rpx;
		margin-top: 100rpx;
	}
</style>
