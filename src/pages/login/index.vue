<template>
  <BasePage>
    <view class="container-login">
      <BaseNavbar>登录</BaseNavbar>
      <view>登录成功后会跳转回拦截前的页面</view>
      <up-button openType="getPhoneNumber" @getphonenumber="onGetPhoneNumber">登录</up-button>
    </view>
  </BasePage>

</template>

<script setup>
import { useAppStore } from '@/stores/modules/app'
import { wxlogin } from '@/utils/login'

const redirect = ref(null)
const appStore = useAppStore()

const onGetPhoneNumber = (e) => {
  console.log('onGetPhoneNumber', e.detail)
  if (e.detail.errMsg === 'getPhoneNumber:ok') {
    // 拿参数去服务端 服务端去调微信查手机号，需要收费0.03元/次
    const { code: phoneCode, encryptedData, iv } = e.detail
    // wxlogin(phoneCode).then(res => {
    //   appStore.setUserInfo(res)
    //   uni.redirectTo({ url: redirect.value })
    // })
    appStore.setUserInfo({
      userId: '000',
      accessToken: '111',
      refreshToken: '222',
      expiresTime: '333',
      openid: '444'
    })
    uni.redirectTo({ url: redirect.value })
  }
}

onLoad(options => {
  redirect.value = options.redirect ? decodeURIComponent(options.redirect) : '/pages/index/index'
})
</script>

<style lang="scss" scoped>
@import './index.scss'
</style>
