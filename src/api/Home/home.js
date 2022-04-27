import request from '@/utils/request'

export function getBookAPI (params) {
  return request({
    url: '/goods/homeGoods',
    method: 'get',
    params
  })
}
