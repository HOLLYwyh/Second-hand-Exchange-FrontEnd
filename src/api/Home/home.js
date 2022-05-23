import request from '@/utils/request'

export function getBookAPI (params) {
  return request({
    url: '/goods/homeGoods',
    method: 'get',
    params
  })
}
export function getUserInfo (params) {
  return request({
    url: 'user/getUserInfoById',
    method: 'get',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    params
  })
}
