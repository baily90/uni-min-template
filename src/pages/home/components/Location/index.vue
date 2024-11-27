<template>
  <up-button @click="onChooseLocation">
    {{locationInfo?.locationName ? `常用位置：${locationInfo?.locationName}` : '常用地址'}}
  </up-button>
</template>

<script setup>
import { useAppStore } from '@/stores/modules/app'

const emit = defineEmits(['change'])

const appStore = useAppStore()
const { setLocationInfo } = appStore
const {
  locationInfo
} = storeToRefs(appStore)

const onChooseLocation = () => {
  uni.showModal({
    title: '温馨提示',
    content: '我们会依据该地址为您推荐附近的巡诊，且一周只能修改一次请谨慎选择',
    success: function (res) {
      if (res.confirm) {
        const { locationEnabled } = uni.getSystemSetting()
        if (!locationEnabled) {
          uni.showToast({
            title: '请先开启手机定位权限',
            icon: 'none'
          })
        } else {
          onGetSetting()
        }
      }
    }
  })
}

const onGetSetting = () => {
  uni.getSetting({
    success (res) {
      const scopeUserLocation = res.authSetting['scope.userLocation']
      if (scopeUserLocation !== false) {
        if (locationInfo.value.locationName) {
          chooseLocation({ longitude: locationInfo.value.longitude, latitude: locationInfo.value.latitude })
        } else {
          uni.getLocation({
            isHighAccuracy: true,
            type: 'gcj02',
            success (res) {
              chooseLocation({ longitude: res.longitude, latitude: res.latitude })
            },
            fail (err) {
              console.log(err)
            }
          })
        }
      } else {
        onOpenLocationSetting()
      }
    }
  })
}

const onOpenLocationSetting = () => {
  uni.openSetting({
    success (res) {
      if (res.authSetting['scope.userLocation']) {
        uni.getLocation({
          isHighAccuracy: true,
          type: 'gcj02',
          success (res) {
            chooseLocation({ longitude: res.longitude, latitude: res.latitude })
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
      // 1、调用接口设置常用地址
      // 2、地址逆解析
      getRgeocInfoByServiceMarket(res)
    },
    fail (err) {
      console.log(err)
    }
  })
}

const getRgeocInfoByServiceMarket = async ({ longitude, latitude, name }) => {
  try {
    const invokeRes = await wx.serviceMarket.invokeService({
      service: 'wxc1c68623b7bdea7b',
      api: 'rgeoc',
      data: {
        location: `${latitude},${longitude}`,
        get_poi: 0
      }
    })
    const { status, result } = invokeRes.data
    if (status === 0) {
      setLocationInfo({
        longitude,
        latitude,
        locationName: `${result.ad_info?.province}${name ? `-${name}` : ''}`,
        adcode: result.ad_info?.adcode,
        district: result.ad_info?.district
      })
      emit('change', result)
    }
  } catch (err) {
    uni.showModal({
      title: 'fail',
      content: err
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
