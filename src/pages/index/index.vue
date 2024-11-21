<template>
  首页
  <uv-button @click="toDetail">详情</uv-button>
</template>

<script setup>
const toDetail = () => uni.navigateTo({ url: '/pages/detail/index' })

</script>

<style lang="scss" scoped>

</style>
