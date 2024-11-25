<template>
  <view>登录成功后会跳转回拦截前的页面</view>
  <button  class="uv-reset-button" open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber">登录</button>
</template>

<script setup>
import { wxlogin } from '@/utils/login'

const redirect = ref(null)

const onGetPhoneNumber = (e) => {
  console.log('onGetPhoneNumber', e.detail)
  if (e.detail.errMsg === 'getPhoneNumber:ok') {
    // 拿参数去服务端 服务端去调微信查手机号，需要收费0.03元/次
    const { code: phoneCode, encryptedData, iv } = e.detail
    wxlogin(phoneCode).then(res => {
      console.log(res)
      // 已登录
    })
  }
}

onLoad(options => {
  redirect.value = options.redirect ? decodeURIComponent(options.redirect) : '/pages/index/index'
})
</script>

<style lang="scss" scoped>
button {

}
</style>
