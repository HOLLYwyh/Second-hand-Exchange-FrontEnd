import request from '@/utils/request'

export function allBarAPI (params) {
  return request({
    url: '/bar/allBar',
    method: 'get',
    params
  })
}

export function myBarAPI (params) {
  return request({
    url: '/bar/myBar',
    method: 'get',
    params
  })
}

export function addBarAPI (params) {
  return request({
    url: '/bar/add',
    method: 'post',
    headers: {'Content-Type': 'multipart/form-data'},
    data: params
  })
}
