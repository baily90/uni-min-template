import { login } from '@/api/login'
import { useAppStore } from '@/stores/modules/app'
const getLoginCode = () => new Promise(resolve => {
  uni.login({
    success (res) {
      resolve(res.code)
    },
    fail (err) {
      console.log('登录失败！' + err)
    }
  })
})

export const wxlogin = (phoneCode) => new Promise(resolve => {
  getLoginCode().then(loginCode => {
    login({ phoneCode, loginCode }).then(res => {
      if (res.code === 0) {
        const appStore = useAppStore()
        appStore.setUserInfo(res.data)
        resolve(res.data)
      }
    })
  })
})
