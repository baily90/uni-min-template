<template>
  <view>
    <uv-button @click="toDetail">详情</uv-button>
    <Location @change="onChange"/>
  </view>
</template>

<script setup>
import Location from './components/Location'
const toDetail = () => uni.navigateTo({ url: '/pages/detail/index' })

const onChange = (res) => {
  console.log('onChange', res)
}
</script>

<style lang="scss" scoped>

</style>
