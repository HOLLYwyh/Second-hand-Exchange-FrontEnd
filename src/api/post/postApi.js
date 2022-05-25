import request from '@/utils/request'

export function allPostAPI (params) {
  return request({
    url: '/post/allPost',
    method: 'get',
    params
  })
}

export function myPostAPI (params) {
  return request({
    url: '/post/myPost',
    method: 'get',
    params
  })
}

export function addPostAPI (params) {
  return request({
    url: '/post/add',
    method: 'post',
    headers: {'Content-Type': 'multipart/form-data'},
    data: params
  })
}
