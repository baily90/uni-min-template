<template>
  <Page class="test">
    <uv-button @click="toDetail">详情</uv-button>
    <Location @change="onChange"/>
  </Page>
</template>

<script setup>
import Location from './components/Location'
const toDetail = () => uni.navigateTo({ url: '/pages/detail/index' })

const onChange = (res) => {
  console.log('onChange', res)
}
</script>

<style lang="scss" scoped>
@import './index.scss'
</style>
