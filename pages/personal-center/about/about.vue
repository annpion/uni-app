<template>
	<view class="container">
			<view class="list">
				<view class="title">组长:	</view>
				<view class="name">连思璜</view>
			</view>
			<view class="list">
				<view class="title">组员:</view>
				<view class="name">王耀鹏</view>
			</view>
			<view class="list">
				<view class="title">组员:</view>
				<view class="name">刘灵清</view>
			</view>
			<view class="list">
				<view class="title">组员:</view>
				<view class="name">李胜亮</view>
			</view>
			<view class="list">
				<view class="title">组员:</view>
				<view class="name">李豪</view>
			</view>
	</view>
</template>

<script>
</script>

<style>
	.container {
		background-color: #FFFFFF;
	}
	.list {
		border-bottom: 1rpx solid #BABABA;
		display: flex;
		align-items: center;
		background-color: #FFFFFF;
		padding: 0 30rpx;
		height: 90rpx;
		width: 100%;
	}
	.list .title {
		min-width: calc(2em + 20px);
		margin-right: 30rpx;
	}
	.list .name {
		font-size: 30rpx;
		color: #333333;
	}
</style>