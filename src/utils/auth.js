import Cookies from 'js-cookie'

const TokenKey = 'Employee-Token'

export function getToken() {
  return localStorage.getItem(TokenKey)
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return localStorage.removeItem(TokenKey)
}

export function getTokenExpiration() {
  return Cookies.get(`${TokenKey}-Expiration`)
}

export function setTokenExpiration(token) {
  return Cookies.set(`${TokenKey}-Expiration`, token)
}

export function removeTokenExpiration() {
  return Cookies.remove(`${TokenKey}-Expiration`)
}

export const getTokenPayload = () =>
  getToken() ? JSON.parse(Buffer.from(
    getToken().split('.')[1], 'base64')
  ) : {}
