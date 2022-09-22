import request from '@/utils/request'

const relativeUrl = 'employees'

export function add(employeeCreateDto) {
  return request({
    url: relativeUrl,
    method: 'post',
    data: employeeCreateDto
  })
}

export function update(employeeUpdateDto) {
  return request({
    url: relativeUrl,
    method: 'put',
    data: employeeUpdateDto
  })
}

export function updateMe(employeeUpdateMeDto) {
  return request({
    url: `${relativeUrl}/updateMe/`,
    method: 'put',
    data: employeeUpdateMeDto
  })
}

export function get(username) {
  return request({
    url: `${relativeUrl}/${username}`,
    method: 'get'
  })
}
export function getMe() {
  return request({
    url: `${relativeUrl}/getMe/`,
    method: 'get'
  })
}

export function getMyClaims() {
  return request({
    url: `${relativeUrl}/getMyClaims/`,
    method: 'get'
  })
}

export function getAllByActive(isActive) {
  return request({
    url: `${relativeUrl}/getAllByActive/${isActive}`,
    method: 'get'
  })
}

export function getAllByFilter(employeeFilterDto) {
  return request({
    url: `${relativeUrl}/getAllByFilter/`,
    method: 'post',
    data: employeeFilterDto
  })
}

export function getAllByRegionId(regionId) {
  return request({
    url: `${relativeUrl}/getAllByRegionId/${regionId}`,
    method: 'get'
  })
}

export function getAllByRegionIdAndRoleId(regionId, roleId) {
  return request({
    url: `${relativeUrl}/getAllByRegionIdAndRoleId/${regionId}/${roleId}`,
    method: 'get'
  })
}

export function getAllTrackings() {
  return request({
    url: `${relativeUrl}/getAllTrackings/`,
    method: 'get'
  })
}
