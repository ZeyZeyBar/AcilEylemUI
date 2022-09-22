import request from '@/utils/request'

const relativeUrl = 'localization'

export function getAll() {
  return request({
    url: relativeUrl,
    method: 'get'
  })
}
