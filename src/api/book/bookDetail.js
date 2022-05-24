import request from '@/utils/request'

export function bookDetail (params) {
  return request({
    url: '/goods/detail',
    method: 'get',
    params
  })
}

export function bookFavorite (params) {
  return request({
    url: '/likeGoods/like',
    method: 'post',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    data: JSON.stringify(params)
  })
}
