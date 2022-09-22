import request from '@/utils/request'

const relativeUrl = 'employeeRoles'

export function add(employeeRoleCreateDto) {
  return request({
    url: relativeUrl,
    method: 'post',
    data: employeeRoleCreateDto
  })
}

export function update(employeeRoleUpdateDto) {
  return request({
    url: relativeUrl,
    method: 'put',
    data: employeeRoleUpdateDto
  })
}

export function remove(employeeRoleId) {
  return request({
    url: `${relativeUrl}/${employeeRoleId}`,
    method: 'delete'
  })
}

export function getAll() {
  return request({
    url: relativeUrl,
    method: 'get'
  })
}

export function getAllWithEmployeeByRoleId(roleId) {
  return request({
    url: `${relativeUrl}/getAllWithEmployeeByRoleId/${roleId}`,
    method: 'get'
  })
}
