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

export function delCart (params) {
  return request({
    url: '/shoppingCart/change',
    method: 'post',
    data: JSON.stringify(params),
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
  })
}
