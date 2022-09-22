import request from '@/utils/request'

const relativeUrl = 'directory'

export function getAll() {
  return request({
    url: relativeUrl,
    method: 'get'
  })
}
export function getByDirectoryName(directoryId) {
  return request({
    url: `${relativeUrl}/${directoryId}`,
    method: 'get'
  })
}

export function getAllByActive(isActive) {
  return request({
    url: `${relativeUrl}/getAllByActive/${isActive}`,
    method: 'get'
  })
}

export function add(directoryCreateDto) {
  return request({
    url: relativeUrl,
    method: 'post',
    data: directoryCreateDto
  })
}

export function update(directoryUpdateDto) {
  return request({
    url: relativeUrl,
    method: 'put',
    data: directoryUpdateDto
  })
}

export function remove(directoryId) {
  console.log('Directory Auth DirectorId')
  console.log(directoryId)
  return request({
    url: `${relativeUrl}/${directoryId}`,
    method: 'delete'
  })
}
