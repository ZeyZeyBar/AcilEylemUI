import Cookies from 'js-cookie'

export function setLanguage(value) {
  return Cookies.set('Accept-Language', value)
}

export function getLanguage() {
  return Cookies.get('Accept-Language')
}
