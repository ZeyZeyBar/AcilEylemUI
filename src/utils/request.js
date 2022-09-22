import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
import { getToken } from '@/utils/auth'
import { getLanguage } from '@/utils/setting'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = `Bearer ${getToken()}`
    }
    config.headers['Accept-Language'] = getLanguage()
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.headers?.['x-pagination']
      ? Object.assign({
        pagination: JSON.parse(
          response.headers['x-pagination']
        )
      }, response.data) : response.data

    if (res.message) {
      Message({
        message: res.message,
        type: res.success ? 'success' : 'error',
        duration: 5 * 1000
      })
    }

    return res.success ? res : Promise.reject(new Error(res.message || 'Error'))
  },
  async error => {
    const res = error.response.data

    if (error.response.status === 401) {
      await store.dispatch('auth/logout')
      router.push(`/login?redirect=${router.currentRoute.fullPath}`)
    }

    Message({
      message: error.response.status !== 401
        ? (res.message || res || error.message || 'Error')
        : 'Güvenlik sebebiyle oturumunuz sonlandırıldı! Tekrar giriş yapınız!',
      type: 'error',
      duration: 5 * 1000
    })

    return Promise.reject(error)
  }
)

export default service
