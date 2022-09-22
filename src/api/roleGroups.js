import request from '@/utils/request'

const relativeUrl = 'roleGroups'

export function add(roleGroupCreateDto) {
  return request({
    url: relativeUrl,
    method: 'post',
    data: roleGroupCreateDto
  })
}

export function update(roleGroupUpdateDto) {
  return request({
    url: relativeUrl,
    method: 'put',
    data: roleGroupUpdateDto
  })
}

export function remove(roleGroupId) {
  return request({
    url: `${relativeUrl}/${roleGroupId}`,
    method: 'delete'
  })
}

export function getAll() {
  return request({
    url: relativeUrl,
    method: 'get'
  })
}
