import request from '../../utils/request'

export function myOrder () {
  return request({
    url: 'order/myOrder',
    method: 'get'
  })
}

export function addOrder (params) {
  return request({
    url: 'order/addOrderList',
    method: 'post',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    data: JSON.stringify(params)
  })
}

export function receiveOrder (params) {
  return request({
    url: 'order/updateOrderStatusToReceived',
    method: 'post',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    data: JSON.stringify(params)
  })
}

export function cancelOrder (params) {
  return request({
    url: 'order/updateOrderStatusToCancel',
    method: 'post',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    data: JSON.stringify(params)
  })
}

export function getOrderDetail (params) {
  return request({
    url: 'order/getOrderDetail',
    method: 'get',
    params: params
  })
}
export function getSoldOrder () {
  return request({
    url: 'order/getOrderSold',
    method: 'get'
  })
}
