<template>
  <view>登录成功后会跳转回拦截前的页面</view>
  <button open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
    <uv-avatar v-if="avatar" :src="avatar" shape="square"></uv-avatar>
    <uv-avatar v-else icon="account-fill" shape="square"></uv-avatar>
  </button>
  <input type="nickname" placeholder="请输入昵称" @change="onNickNameChange" />
  <button open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber">手机号</button>
  <uv-button @click="onLogin">登录</uv-button>

</template>

<script setup>
import { useAppStore } from '@/stores/modules/app'

const { setUserInfo } = useAppStore()
const redirect = ref(null)
const avatar = ref(null)
const nickname = ref(null)

const onChooseAvatar = (e) => {
  console.log('onChooseAvatar', e.detail.avatarUrl)
  // 拿到临时路径，走上传然后回显图片
  avatar.value = e.detail.avatarUrl
}
const onNickNameChange = (e) => {
  nickname.value = e.detail.value
}
const onGetPhoneNumber = (e) => {
  console.log('onGetPhoneNumber', e.detail)
  if (e.detail.errMsg === 'getPhoneNumber:ok') {
    // 拿参数去服务端 服务端去调微信查手机号，需要收费0.03元/次
    // const {code, encryptedData, iv} = e.detail
  }
}
const onLogin = () => {
  console.log(avatar.value, nickname.value)

  setUserInfo({ nickname: nickname.value, avatar: avatar.value, token: 'abcdef' })
  uni.redirectTo({ url: redirect.value })
}

onLoad(options => {
  redirect.value = options.redirect ? decodeURIComponent(options.redirect) : '/pages/index/index'
})
</script>

<style lang="scss" scoped>

</style>
