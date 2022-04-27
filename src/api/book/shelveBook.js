import request from '@/utils/request'

export function shelveBook (params) {
  return request({
    url: '/goods/add',
    method: 'post',
    headers: {'Content-Type': 'multipart/form-data'},
    data: params
  })
}
