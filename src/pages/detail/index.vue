<template>
  <BasePage>
    <view class="container-detail">
      <BaseNavbar>详情</BaseNavbar>
      <up-button @click="toRec">去认证</up-button>
    </view>
  </BasePage>
</template>

<script setup>
const toRec = () => {
  wx.navigateToMiniProgram({
    appId: 'wx1cf2708c2de46337', // 上链公证签小程序APPID
    path: '/pages/index/index', // 上链公证签页面地址
    extraData: {
      requestObj: { // 必填，入参
        flowId: '3655320500978585127', // 必填，认证流程Id
        type: 'REALNAME', // 必填，业务类型：实名 REALNAME
        env: 'sml' // 非必填，对接环境：线上 prod(默认）, 模拟 sml(用于对接调试阶段）
      },
      callbackObj: { // 非必填，回传数据：签署完成后会将此数据完整回传
        from: 'esign'
      }
    },
    success (res) {
      // 根据自身需要
      console.log('success', res)
    },
    fail (res) {
      // 根据自身需要
      console.log('fail', res)
    }
  })
}

onShow(options => {
  console.log('detail onShow', options)
})
</script>

<style lang="scss" scoped>
@import './index.scss'
</style>
