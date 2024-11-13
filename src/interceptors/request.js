import { useAppStore } from '@/stores/modules/app'

const httpInterceptor = {
  // 拦截前触发
  invoke (options) {
    options.url = `${import.meta.env.VITE_BASE_URL}${options.url}`
    options.header = {
      ...options.header,
      platform: 'mp-weixin'
    }
    const { isLogined, userInfo } = useAppStore()
    if (isLogined) {
      const { token } = userInfo
      options.header.Authorization = `Bearer ${token}`
    }
  }
}

export const requestInterceptor = {
  install () {
    // 拦截 request 请求
    uni.addInterceptor('request', httpInterceptor)
    // 拦截 uploadFile 文件上传
    uni.addInterceptor('uploadFile', httpInterceptor)
  }
}
