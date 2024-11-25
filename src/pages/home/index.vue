<template>
  <view>
    <uv-button @click="toDetail">详情</uv-button>
    <uv-button @click="toLocation">常用地址</uv-button>
  </view>
</template>

<script setup>
const toDetail = () => uni.navigateTo({ url: '/pages/detail/index' })

const toLocation = () => {
  uni.getLocation({
    type: 'wgs84',
    success (res) {
      console.log('当前位置的经度：' + res.longitude)
      console.log('当前位置的纬度：' + res.latitude)
    },
    fail (err) {
      console.log(err)
    },
    complete () {
      uni.navigateTo({ url: '/pages/location/index' })
    }
  })
}
</script>

<style lang="scss" scoped>

</style>
