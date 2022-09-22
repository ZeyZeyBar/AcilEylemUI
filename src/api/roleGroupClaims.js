import request from '@/utils/request'

const relativeUrl = 'roleGroupClaims'

export function add(roleGroupClaimCreateDto) {
  return request({
    url: relativeUrl,
    method: 'post',
    data: roleGroupClaimCreateDto
  })
}

export function update(roleGroupClaimUpdateDto) {
  return request({
    url: relativeUrl,
    method: 'put',
    data: roleGroupClaimUpdateDto
  })
}

export function remove(roleGroupClaimId) {
  return request({
    url: `${relativeUrl}/${roleGroupClaimId}`,
    method: 'delete'
  })
}

export function getAll() {
  return request({
    url: relativeUrl,
    method: 'get'
  })
}

export function getAllByRoleGroupId(roleGroupId) {
  return request({
    url: `${relativeUrl}/getAllByRoleGroupId/${roleGroupId}`,
    method: 'get'
  })
}

export function getAllByRoleGroupIdAndRoleId(roleGroupId, roleId) {
  return request({
    url: `${relativeUrl}/getAllByRoleGroupIdAndRoleId/${roleGroupId}/${roleId}`,
    method: 'get'
  })
}

export function getAllWithRoleClaimsByRoleGroupIdAndRoleId(roleGroupId, roleId) {
  return request({
    url: `${relativeUrl}/getAllWithRoleClaimsByRoleGroupIdAndRoleId/${roleGroupId}/${roleId}`,
    method: 'get'
  })
}
