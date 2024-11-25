import { request } from '@/utils/request'

export const login = (data) => request({
  url: '/app-api/distributor/auth/weixin-mini-app-login',
  method: 'POST',
  data
})
