import request from '@/utils/request'

export function getSoldGoods (params) {
  return request({
    url: '/goods/getGoodsSold',
    method: 'get',
    params
  })
}
