import request from '@/utils/request'

export function addCart (params) {
  return request({
    url: '/shoppingCart/add',
    method: 'post',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    data: JSON.stringify(params)
  })
}

export function getCart () {
  return request({
    url: '/shoppingCart/get',
    method: 'get',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
  })
}
