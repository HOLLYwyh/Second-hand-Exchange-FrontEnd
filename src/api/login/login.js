import request from '@/utils/request'

export function loginAPI (params) {
  return request({
    url: '/user/login',
    method: 'post',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    data: JSON.stringify(params)
  })
}
