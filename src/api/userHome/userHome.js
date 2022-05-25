import request from '@/utils/request'

export function changeEmail (params) {
  return request({
    url: 'user/changeEmail',
    method: 'post',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    data: JSON.stringify(params)
  })
}
export function resetPassword (params) {
  return request({
    url: 'user/changePasswordWithLogin',
    method: 'post',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    data: JSON.stringify(params)
  })
}

export function getUserInfo () {
  return request({
    url: 'user/getUserInfo',
    method: 'get',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
  })
}

export function changeAvatar (params) {
  return request({
    url: 'user/changeImage',
    method: 'post',
    data: params,
    headers: {'Content-Type': 'multipart/form-data'}
  })
}
