<template>
  <BasePage>
    <view class="container-home">
      <BaseNavbar
        background="#f5f5f5 url('https://common-mzt-public.weicha88.com/distributor-mini/static/bg_home.png') no-repeat top center"
        theme="light"
        :showDefaultBack="false">首页-{{isLogined ? (userInfo.type === 1 ? '兼职' : '全职') : '未登录'}}</BaseNavbar>
      <view class="scroll-wrap">
        <scroll-view
          class="scroll"
          scroll-y="true"
          refresher-enabled="true"
          :refresher-triggered="triggered"
          @refresherrefresh="onRefresh"
          @scrolltolower="scrollLower">
          <up-button @click="toDetail">去详情</up-button>
          <Location @change="onChange"/>
          <up-button openType="share">分享</up-button>
          <view class="list-item" style="height: 300rpx;" v-for="item in dataSource?.list" :key="item">{{item}}</view>
          <up-empty v-if="isEmptyBoxShow" icon="http://cdn.uviewui.com/uview/empty/car.png"></up-empty>
          <up-loadmore v-if="isLoadingBarShow" :status="status" />
        </scroll-view>
      </view>
    </view>
  </BasePage>
</template>

<script setup>
import { useAppStore } from '@/stores/modules/app'
import { apiGetTaskList } from '@/api/task'
import useListQuery from '@/hooks/useListQuery'
import Location from './components/Location'

const appStore = useAppStore()

const {
  status,
  triggered,
  dataSource,
  searchParams,
  isEmptyBoxShow,
  isLoadingBarShow,
  onRefresh,
  scrollLower,
  fetchData
} = useListQuery(apiGetTaskList, {}, false)

const {
  isLogined,
  userInfo
} = storeToRefs(appStore)

searchParams.value.test = 111
fetchData()

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
