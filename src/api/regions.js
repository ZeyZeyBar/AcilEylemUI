import request from '@/utils/request'

const relativeUrl = 'regions'

export function get(regionId) {
  return request({
    url: `${relativeUrl}/${regionId}`,
    method: 'get'
  })
}

export function getAllByActive(isActive) {
  return request({
    url: `${relativeUrl}/getAllByActive/${isActive}`,
    method: 'get'
  })
}
