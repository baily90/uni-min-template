const initState = { nickname: '', avatar: '' }

export const useAppStore = defineStore('app', () => {
  const userInfo = ref({ ...initState }) // 登录用户信息
  const setUserInfo = (data) => {
    userInfo.value = data
  }
  const clearUserInfo = () => {
    userInfo.value = { ...initState }
  }

  const isLogined = computed(() => !!userInfo.value.token)

  return { isLogined, userInfo, setUserInfo, clearUserInfo }
}, {
  unistorage: true
})
