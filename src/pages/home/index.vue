<template>
  <BasePage>
    <view class="container-home">
      <BaseNavbar
        background="#f5f5f5 url('https://common-mzt-public.weicha88.com/distributor-mini/static/bg_home.png') no-repeat top center"
        theme="light"
        :showDefaultBack="false">首页</BaseNavbar>
      <view class="scroll-wrap">
        <scroll-view
          class="scroll"
          scroll-y="true"
          refresher-enabled="true"
          :refresher-triggered="triggered"
          @refresherrefresh="onRefresh">
          <up-button @click="toDetail">详情</up-button>
          <Location @change="onChange"/>
          <up-button openType="share">分享</up-button>
        </scroll-view>
      </view>
    </view>

  </BasePage>
</template>

<script setup>
import Location from './components/Location'

const triggered = ref(false)

const onRefresh = () => {
  triggered.value = true
  setTimeout(() => {
    triggered.value = false
  }, 1000)
}
const toDetail = () => uni.navigateTo({ url: '/pages/detail/index' })

const onChange = (res) => {
  console.log('onChange', res)
}

onShareAppMessage(res => {
  console.log(res)
  const promise = new Promise(resolve => {
    setTimeout(() => {
      resolve({
        path: '/pages/my/index',
        title: '测试标题1',
        // imageUrl可以用uniapp的canvas，参考canvasToTempFilePath
        imageUrl: 'https://sit-common-mzt-public.weicha88.com/7ce0a999533be56bf2b085956f342630afb19538d5a43aec974ca5e61c0dee8f.png'
      })
    }, 2000)
  })
  return {
    path: '/pages/my/index',
    title: '测试标题',
    imageUrl: 'https://sit-common-mzt-public.weicha88.com/7ce0a999533be56bf2b085956f342630afb19538d5a43aec974ca5e61c0dee8f.png',
    promise
  }
})
</script>

<style lang="scss" scoped>
@import './index.scss'
</style>
