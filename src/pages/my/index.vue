<template>
  <BasePage>
    <view class="container-my">
      <BaseNavbar>个人中心</BaseNavbar>
      是否登录：{{isLogined}}
      <up-button v-if="isLogined" @click="logout">退出登录</up-button>
    </view>
  </BasePage>
</template>

<script setup>
import { useAppStore } from '@/stores/modules/app'

const appStore = useAppStore()

const { isLogined } = storeToRefs(appStore)

const logout = () => {
  appStore.clearUserInfo()
}
</script>

<style lang="scss" scoped>
@import './index.scss'
</style>
