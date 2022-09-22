import request from '@/utils/request'

const relativeUrl = 'employeeTypes'

export function getAll() {
  return request({
    url: relativeUrl,
    method: 'get'
  })
}
