import { request } from '@/utils/request'
export const getCaptcha = (data) => request({
  url: '/app-api/distributor/auth/send-sms-code',
  method: 'POST',
  data
})
export const login = (data) => request({
  url: '/app-api/distributor/auth/sms-login',
  method: 'POST',
  data
})
export const getAccountInfo = () => request({
  url: '/app-api/distributor/userCenter/accountInfo',
  method: 'POST'
})
