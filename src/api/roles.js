import request from '@/utils/request'

const relativeUrl = 'roles'

export function add(roleCreateDto) {
  return request({
    url: relativeUrl,
    method: 'post',
    data: roleCreateDto
  })
}

export function update(roleUpdateDto) {
  return request({
    url: relativeUrl,
    method: 'put',
    data: roleUpdateDto
  })
}

export function remove(roleId) {
  return request({
    url: `${relativeUrl}/${roleId}`,
    method: 'delete'
  })
}

export function getAll() {
  return request({
    url: relativeUrl,
    method: 'get'
  })
}

export function getAllByRoleName(roleName) {
  return request({
    url: `${relativeUrl}/getAllByRoleName/${roleName}`,
    method: 'get'
  })
}

export function getAllByRoleDescription(roleDescription) {
  return request({
    url: `${relativeUrl}/getAllByRoleDescription/${roleDescription}`,
    method: 'get'
  })
}
