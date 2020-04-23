import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/deal/list',
    method: 'get',
    params
  })
}
