<template>
  是否登录：{{isLogined}}
  <view>{{userInfo.nickname}}</view>
  <uv-avatar :src="userInfo.avatar" shape="square"></uv-avatar>
  <uv-button @click="logout">退出登录</uv-button>
</template>

<script setup>
import { useAppStore } from '@/stores/modules/app'

const appStore = useAppStore()

const { isLogined, userInfo } = storeToRefs(appStore)

const logout = () => {
  appStore.clearUserInfo()
}
</script>

<style lang="scss" scoped>

</style>
