import { login } from '@/api/auth'
import { getToken, setToken, removeToken, getTokenExpiration, setTokenExpiration, removeTokenExpiration, getTokenPayload } from '@/utils/auth'
import { Message } from 'element-ui'
import router, { resetRouter } from '@/router'

const alertSessionExpired = () => Message({
  message: 'Oturum süresi doldu',
  type: 'error',
  duration: 5 * 1000
})

const state = {
  token: getToken(),
  tokenPayload: getTokenPayload()
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_TOKEN_PAYLOAD: (state, tokenPayload) => {
    state.tokenPayload = tokenPayload
  }
}

const actions = {
  async initAuth({ dispatch }) {
    const token = getToken()

    if (token) {
      const tokenExpiration = getTokenExpiration()
      const now = new Date().getTime()

      if (now >= tokenExpiration) {
        await dispatch('logout')
        alertSessionExpired()
      } else {
        const expiresIn = tokenExpiration - now
        dispatch('logoutTimer', expiresIn)
      }
    }
  },
  login({ commit, dispatch }, employeeLoginDto) {
    return new Promise((resolve, reject) => {
      login(employeeLoginDto).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        commit('SET_TOKEN_PAYLOAD', getTokenPayload(data.token))
        const tokenExpiration = new Date(data.expiration).getTime()
        setTokenExpiration(tokenExpiration)
        const expiresIn = tokenExpiration - new Date().getTime()
        dispatch('logoutTimer', expiresIn)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  logout({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      commit('SET_TOKEN_PAYLOAD', {})
      commit('employee/SET_ROLES', [], { root: true })
      removeToken()
      removeTokenExpiration()
      resetRouter()
      dispatch('tagsView/delAllViews', null, { root: true })
        .then(() => {
          resolve()
        }).catch(error => {
          reject(error)
        })
    })
  },
  logoutTimer({ dispatch }, expiresIn) {
    setTimeout(async() => {
      await dispatch('logout')
      router.push(`/login?redirect=${router.currentRoute.fullPath}`)
      alertSessionExpired()
    }, expiresIn)
  },
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_TOKEN_PAYLOAD', {})
      commit('employee/SET_ROLES', [], { root: true })
      removeToken()
      removeTokenExpiration()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
