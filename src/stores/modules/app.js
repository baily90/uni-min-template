const initLoginState = {
  userId: undefined,
  accessToken: undefined,
  refreshToken: undefined,
  expiresTime: undefined,
  openid: undefined
}
const initUserState = {
  nickName: undefined, // 昵称
  avatarUrl: undefined, // 头像
  type: 1 // 1-兼职 2-全职
}

const locationState = {
  longitude: undefined, // 经度
  latitude: undefined, // 纬度
  locationName: undefined, // 常用地址选点名称
  adcode: undefined, // 区县行政编码
  district: undefined // 区县名称
}

export const useAppStore = defineStore('app', () => {
  const loginInfo = ref({ ...initLoginState }) // 登录信息
  const userInfo = ref({ ...initUserState }) // 用户信息
  const locationInfo = ref({ ...locationState })
  const windowInfo = ref(null) // 窗口信息
  const capsuleInfo = ref(null) // 胶囊信息
  const setLoginInfo = (data) => {
    loginInfo.value = data
  }
  const clearLoginInfo = () => {
    loginInfo.value = { ...initLoginState }
    userInfo.value = { ...initUserState }
  }

  const setWindowInfo = (data) => {
    windowInfo.value = data
  }

  const setCapsuleInfo = (data) => {
    capsuleInfo.value = data
  }

  const setUserInfo = (data) => {
    userInfo.value = data
  }

  const setLocationInfo = (data) => {
    locationInfo.value = data
  }

  const isLogined = computed(() => !!loginInfo.value.accessToken)

  return {
    isLogined,
    loginInfo,
    userInfo,
    locationInfo,
    windowInfo,
    capsuleInfo,
    setLoginInfo,
    setUserInfo,
    setLocationInfo,
    clearLoginInfo,
    setWindowInfo,
    setCapsuleInfo
  }
}, {
  unistorage: true
})
