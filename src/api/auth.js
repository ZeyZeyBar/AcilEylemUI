import request from '@/utils/request'

const relativeUrl = 'auth'

export function login(employeeLoginDto) {
  return request({
    url: `${relativeUrl}/login/`,
    method: 'post',
    data: employeeLoginDto
  })
}

export function register(employeeRegisterDto) {
  return request({
    url: `${relativeUrl}/register/`,
    method: 'post',
    data: employeeRegisterDto
  })
}
