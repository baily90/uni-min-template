<template>
  是否登录：{{isLogined}}
  <uv-button @click="logout">退出登录</uv-button>
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

</style>
