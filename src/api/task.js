import { request } from '@/utils/request'

export const apiGetTaskList = (data) => request({
  url: '/app-api/distributor/auth/weixin-mini-app-login',
  method: 'POST',
  data
})
