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

export function relatedBar () {
  return request({
    url: '/bar/relatedToMe',
    method: 'get'
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

export function getBarInfo (params) {
  return request({
    url: '/bar/barForum',
    method: 'get',
    params
  })
}

export function uploadForum (params) {
  return request({
    url: '/forum/add',
    method: 'post',
    headers: {'Content-Type': 'multipart/form-data'},
    data: params
  })
}

export function deleteForum (params) {
  return request({
    url: '/forum/delete',
    method: 'post',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    data: JSON.stringify(params)
  })
}
