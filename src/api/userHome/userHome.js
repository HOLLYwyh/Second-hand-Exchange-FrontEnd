import request from '@/utils/request'

export function changeEmail (params) {
  return request({
    url: 'user/changeEmail',
    method: 'post',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    data: JSON.stringify(params)
  })
}
