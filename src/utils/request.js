import { useAppStore } from '@/stores/modules/app'
export const request = (options) => {
  return new Promise((resolve, reject) => {
    uni.request({
      ...options,
      header: {
        'Content-Type': 'application/json'
      },
      success (res) {
        if (res.statusCode !== 200) {
          uni.showToast({
            icon: 'none',
            title: res.message || '接口异常'
          })
          reject(res.message || '接口异常')
        } else if (res.data && res.data.code === 401) {
          const userStore = useAppStore()
          userStore.clearLoginInfo()
          uni.navigateTo({ url: '/pages/login/login' })
        } else if (res.data && res.data.code !== 0) {
          uni.showToast({
            icon: 'none',
            title: res.data.msg
          })
          reject(res.data.msg)
        }
        // 返回消息
        resolve(res.data)
      },
      fail (err) {
        uni.showToast({
          icon: 'none',
          title: err.errMsg
        })
        reject(err)
      }
    })
  })
}

export const uploadFile = (options) => {
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      ...options,
      success: (res) => {
        if (res.statusCode !== 200 || !res.data) {
          uni.showToast({
            icon: 'none',
            title: res.message || '接口异常'
          })
          reject(res.message || '接口异常')
        } else {
          const data = JSON.parse(res.data)
          // 处理消息码
          if (data.code !== 0) {
            uni.showToast({
              icon: 'none',
              title: data.msg
            })
            if (data.code === 401) {
            // 登录失效，跳转登录页
              uni.reLaunch({
                url: '/pages/login/index'
              })
            }
            reject(data.msg)
          }
          // 返回消息
          resolve(data.data)
        }
      },
      fail: err => {
        uni.showToast({
          icon: 'none',
          title: err.errMsg
        })
        return reject(err)
      }
    })
  })
}
