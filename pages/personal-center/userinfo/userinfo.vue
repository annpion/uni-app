<template>
	<view class="container">
			<view class="list">
				<view class="title">姓名</view>
				<input v-model="name" placeholder="" name="name"></input>
			</view>
			<view class="list">
				<view class="title">手机号</view>
				<input v-model="phone" placeholder="" name="phone"></input>
			</view>
			<view class="list">
				<view class="title">性别</view>
				<input v-model="sex" placeholder="" name="sex"></input>
			</view>
			<view class="list">
				<view class="title">出生年月</view>
				<input v-model="birthday" placeholder="" name="birthday"></input>
			</view>
			<view class="list">
				<view class="title">学/工号</view>
				<input v-model="id" placeholder="" name="id"></input>
			</view>
	</view>
</template>

<script>
	export default{
		data() {
			return{
				userInfo:'',
				role:'',
				name:'大大',
				phone:'11111111111',
				sex:'男',
				birthday:'2000/1/1',
				id:'12',
				token: ''
			}
		},
		onLoad() {
			if (uni.getStorageSync('userInfo')) {
				this.userInfo = uni.getStorageSync('userInfo');
			}
		},
		methods: {
		}
	}
</script>

<style>
	.container {
		background-color: #FFFFFF;
	}
	.list .title {
		min-width: calc(4em + 15px);
		margin-right: 30rpx;
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
</style>