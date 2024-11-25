const initState = {
  userId: undefined,
  accessToken: undefined,
  refreshToken: undefined,
  expiresTime: undefined,
  openid: undefined
}

export const useAppStore = defineStore('app', () => {
  const userInfo = ref({ ...initState }) // 登录用户信息
  const windowInfo = ref(null) // 窗口信息
  const capsuleInfo = ref(null) // 胶囊信息
  const setUserInfo = (data) => {
    userInfo.value = data
  }
  const clearUserInfo = () => {
    userInfo.value = { ...initState }
  }

  const setWindowInfo = (data) => {
    windowInfo.value = data
  }

  const setCapsuleInfo = (data) => {
    capsuleInfo.value = data
  }

  const isLogined = computed(() => !!userInfo.value.accessToken)

  return {
    isLogined,
    userInfo,
    windowInfo,
    capsuleInfo,
    setUserInfo,
    clearUserInfo,
    setWindowInfo,
    setCapsuleInfo
  }
}, {
  unistorage: true
})
