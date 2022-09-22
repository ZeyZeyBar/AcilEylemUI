import { getMe } from '@/api/employees'

const state = {
  me: '',
  avatar: '',
  roles: []
}

const mutations = {
  SET_ME: (state, me) => {
    state.me = me
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  getMe({ commit }) {
    return new Promise((resolve, reject) => {
      getMe().then(response => {
        const { data } = response
        const me = data
        commit('SET_ME', me)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getMyClaims({ commit, rootState }) {
    const roles = rootState.auth.tokenPayload.roles
    commit('SET_ROLES', roles)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
