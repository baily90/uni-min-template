import { useAppStore } from '@/stores/modules/app'
import { needLoginPages } from '@/utils'

// 路由拦截器
const navigateInterceptor = {
  invoke ({ url }) {
    const path = url.split('?')[0]
    const { isLogined } = useAppStore()
    // 需要登录并且没有登录
    if (needLoginPages.includes(path) && !isLogined) {
      uni.navigateTo({
        url: `/pages/login/index?redirect=${encodeURIComponent(url)}`
      })
      return false
    }
    return true
  }
}

export const routeInterceptor = {
  install () {
    ['navigateTo', 'redirectTo', 'reLaunch', 'switchTab'].forEach(item => {
      uni.addInterceptor(item, navigateInterceptor)
    })
  }
}
