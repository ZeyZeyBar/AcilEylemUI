import { getAll } from '@/api/localization'

const state = {
  _localizer: {}
}

const mutations = {
  SET_LOCALIZER: (state, localizedStrings) => {
    const _localizer = {}
    for (
      const localizedString
      of localizedStrings
    ) {
      _localizer[localizedString.name] =
        localizedString.value
    }
    state._localizer = _localizer
  }
}

const actions = {
  getAll({ commit }) {
    return new Promise((resolve, reject) => {
      getAll().then(response => {
        const { data } = response
        const localizedStrings = data
        commit('SET_LOCALIZER', localizedStrings)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
