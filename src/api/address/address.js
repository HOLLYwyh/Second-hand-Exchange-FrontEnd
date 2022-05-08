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
