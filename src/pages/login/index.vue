<template>
  <view>登录成功后会跳转回拦截前的页面</view>
  <uv-button open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
    <uv-avatar src="https://via.placeholder.com/200x200.png/2878ff" shape="square"></uv-avatar>
  </uv-button>
  <uv-input type="nickname" placeholder="请输入昵称" ></uv-input>
  <uv-button open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber">手机号</uv-button>

  <uv-button @click="onLogin">登录</uv-button>

</template>

<script setup>
import { useAppStore } from '@/stores/modules/app'

const { setUserInfo } = useAppStore()
const redirect = ref(null)

const onChooseAvatar = (res) => {
  console.log('onChooseAvatar', res)
}
const onGetPhoneNumber = (res) => {
  console.log('onGetPhoneNumber', res)
}
const onLogin = () => {
  setUserInfo({ nickname: '燕龙', avatar: '', token: 'abcdef' })
  uni.redirectTo({ url: redirect.value })
}

onLoad(options => {
  redirect.value = options.redirect ? decodeURIComponent(options.redirect) : '/pages/index/index'
})
</script>

<style lang="scss" scoped>

</style>
