<template>
  位置信息： {{location}}
  <uv-button v-if="!isLocationEnabled" @click="openLocationSetting">去开启定位</uv-button>
</template>

<script setup>

const location = ref(null)
const isLocationEnabled = ref(true)

const { locationEnabled } = uni.getSystemSetting()

uni.chooseLocation({
  success (res) {
    console.log(res)
  },
  fail (err) {
    console.log(err)
  }
})

if (!locationEnabled) {
  uni.showToast({
    title: '请先开启定位权限',
    icon: 'none'
  })
  isLocationEnabled.value = false
} else {
  uni.getSetting({
    success (res) {
      console.log(res.authSetting)

      const scopeUserLocation = res.authSetting['scope.userLocation']
      if (scopeUserLocation) {
        uni.getLocation({
          type: 'wgs84',
          success (res) {
            location.value = { longitude: res.longitude, latitude: res.latitude }
            console.log('当前位置的经度：' + res.longitude)
            console.log('当前位置的纬度：' + res.latitude)
            isLocationEnabled.value = true
          },
          fail (err) {
            console.log(err)
            isLocationEnabled.value = false
          }
        })
      } else {
        uni.showToast({
          title: '请允许使用位置信息',
          icon: 'none'
        })
        isLocationEnabled.value = false
      }
    }
  })
}

const openLocationSetting = () => {
  uni.openSetting({
    success (res) {
      if (res.authSetting['scope.userLocation']) {
        uni.getLocation({
          type: 'wgs84',
          success (res) {
            console.log('当前位置的经度：' + res.longitude)
            console.log('当前位置的纬度：' + res.latitude)
            location.value = { longitude: res.longitude, latitude: res.latitude }
            isLocationEnabled.value = true
          }
        })
      } else {
        uni.showToast({
          title: '您拒绝了授权，无法获取定位信息',
          icon: 'none'
        })
      }
    }
  })
}

</script>

<style lang="scss" scoped>

</style>
