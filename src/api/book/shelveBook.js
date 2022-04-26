import request from '@/utils/request'

export function shelveBook (params) {
  // const tokenValue = window.sessionStorage.getItem('tokenValue')
  return request({
    url: '/goods/add',
    method: 'post',
    headers: {'Content-Type': 'multipart/form-data'},
    data: params
  })
}
