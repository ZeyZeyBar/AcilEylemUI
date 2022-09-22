import request from '@/utils/request'

const relativeUrl = 'chiefs'
export function getAll() {
  return request({
    url: relativeUrl,
    method: 'get'
  })
}
export function getAllByActive(isActive) {
  return request({
    url: `${relativeUrl}/getAllByActive/${isActive}`,
    method: 'get'
  })
}
export function getAllChiefByDirectoryId(directoryId) {
  return request({
    url: `${relativeUrl}/getAllChiefByDirectory/${directoryId}`,
    method: 'get'
  })
}
export function add(chiefCreateDto) {
    return request({
      url: relativeUrl,
      method: 'post',
      data: chiefCreateDto
    })
  }
  
export function update(chiefUpdateDto) {
  return request({
    url: relativeUrl,
    method: 'put',
    data: chiefUpdateDto
  })
}
  
export function remove(chiefId) {
  return request({
    url: `${relativeUrl}/${chiefId}`,
    method: 'delete'
  })
}