import request from '@/utils/request'

export function bookDetail (params) {
  return request({
    url: '/goods/detail',
    method: 'get',
    params
  })
}
