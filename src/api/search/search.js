import request from '@/utils/request'

export function searchAPI (params) {
  return request({
    url: '/goods/searchGoods',
    method: 'get',
    params
  })
}
