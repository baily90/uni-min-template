<template>
  <up-button @click="onChooseLocation">
    {{locationName ? `${locationName}` : '常用地址'}}
  </up-button>
</template>

<script setup>
const emit = defineEmits(['change'])

const locationName = ref(null)
const location = ref(null)

const onChooseLocation = () => {
  const { locationEnabled } = uni.getSystemSetting()
  if (!locationEnabled) {
    uni.showToast({
      title: '请先开启手机定位权限',
      icon: 'none'
    })
  } else {
    uni.getSetting({
      success (res) {
        const scopeUserLocation = res.authSetting['scope.userLocation']
        if (scopeUserLocation !== false) {
          if (location.value) {
            chooseLocation(location.value)
          } else {
            uni.getLocation({
              isHighAccuracy: true,
              type: 'gcj02',
              success (res) {
                location.value = { longitude: res.longitude, latitude: res.latitude }
                chooseLocation(location.value)
              },
              fail (err) {
                console.log(err)
              }
            })
          }
        } else {
          openLocationSetting()
          // uni.showToast({
          //   title: '请允许使用位置信息',
          //   icon: 'none'
          // })
        }
      }
    })
  }
}

const openLocationSetting = () => {
  uni.openSetting({
    success (res) {
      if (res.authSetting['scope.userLocation']) {
        uni.getLocation({
          isHighAccuracy: true,
          type: 'gcj02',
          success (res) {
            location.value = { longitude: res.longitude, latitude: res.latitude }
            chooseLocation(location.value)
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

const chooseLocation = ({ longitude, latitude }) => {
  uni.chooseLocation({
    latitude,
    longitude,
    success (res) {
      location.value = { longitude: res.longitude, latitude: res.latitude }
      locationName.value = res.name
      emit('change', res)
    },
    fail (err) {
      console.log(err)
    }
  })
}
</script>

<style lang="scss" scoped>

</style>
