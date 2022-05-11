import request from '@/utils/request'

export function addAddress (params) {
  return request({
    url: 'address/add',
    method: 'post',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    data: JSON.stringify(params)
  })
}

export function getAddress (params) {
  return request({
    url: 'address/getAll',
    method: 'get'
  })
}

export function delAddress (params) {
  return request({
    url: 'address/delete',
    method: 'post',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    data: JSON.stringify(params)
  })
}

export function updateAddress (params) {
  return request({
    url: 'address/update',
    method: 'post',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    data: JSON.stringify(params)
  })
}
