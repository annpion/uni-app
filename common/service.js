import Request from '@/utils/luch-request/index.js'

const getTokenStorage = () => {
	let token = ''
	try {
		token = uni.getStorageSync('token')
	} catch (e) {
		//TODO handle the exception
	}
	return token
}

const http = new Request()

http.setConfig((config) => { /* 设置全局配置 */
	config.baseURL = 'http://47.92.226.135:7001/app' /* 根域名不同 */
	config.header['Content-Type'] = 'application/json;charset=utf-8'
	config.custom = {
		loading: true // 默认有loading
	}
	return config
})

http.interceptors.request.use((config) => { /* 请求之前拦截器。可以使用async await 做异步操作 */
	if (getTokenStorage()) {
		config.header['Authorization'] = 'Bearer ' + getTokenStorage()
	}
	if (config.custom.loading) {
		uni.showLoading()
	}
	return config
}, (error) => {
	return Promise.reject(error)
})

// 必须使用异步函数，注意
http.interceptors.response.use(async (response) => { /* 请求之后拦截器。可以使用async await 做异步操作  */
	console(response)
	if (response.config.custom.loading) {
		uni.hideLoading()
	}
	if (response.data.code === 401) {
		uni.showModal({ //提醒用户重新登录
			title: '提示',
			content: '用户信息已过期，请重新登录!',
			confirmText: '确定',
			showCancel: false,
			success: res => {
				uni.redirectTo({
					url: '/pages/login/login'
				});
			}
		});
	} else if (response.data.code !== 1) {
		uni.showToast({
			title: response.data.msg || 'error',
			icon: 'none'
		})
		return Promise.reject('error')
	} else {
		return response.data
	}
}, (error) => { // 请求错误做点什么。可以使用async await 做异步操作
	if (error.config.custom.loading) {
		uni.hideLoading()
	}
	uni.showToast({
		title: 'error',
		icon: 'none'
	})
	return Promise.reject(error)
})

export {
	http
}
