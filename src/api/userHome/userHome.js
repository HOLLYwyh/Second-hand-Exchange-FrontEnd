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
