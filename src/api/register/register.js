import request from '@/utils/request'

export function register (params) {
  return request({
    url: '/user/register',
    method: 'post',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    data: JSON.stringify(params)
  })
}

export function email (params) {
  return request({
    url: '/user/sendEmail',
    method: 'post',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    data: JSON.stringify(params)
  })
}

export function getBackPassword (params) {
  return request({
    url: '/user/changePassword',
    method: 'post',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    data: JSON.stringify(params)
  })
}
