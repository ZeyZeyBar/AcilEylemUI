import request from '@/utils/request'

const relativeUrl = 'roleClaims'

export function add(roleClaimCreateDto) {
  return request({
    url: relativeUrl,
    method: 'post',
    data: roleClaimCreateDto
  })
}

export function addMultiple(roleClaimCreateDtos) {
  return request({
    url: `${relativeUrl}/addMultiple/`,
    method: 'post',
    data: roleClaimCreateDtos
  })
}

export function update(roleClaimUpdateDto) {
  return request({
    url: relativeUrl,
    method: 'put',
    data: roleClaimUpdateDto
  })
}

export function remove(roleClaimId) {
  return request({
    url: `${relativeUrl}/${roleClaimId}`,
    method: 'delete'
  })
}

export function removeMultipleByIds(roleClaimIds) {
  return request({
    url: `${relativeUrl}/deleteMultipleByIds/`,
    method: 'delete',
    data: roleClaimIds
  })
}

export function getAll() {
  return request({
    url: relativeUrl,
    method: 'get'
  })
}
