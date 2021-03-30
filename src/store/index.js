import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: false,
  plugins: [
    createPersistedState()
  ],
  state: {
    user: null,
    token: null,
    statuses: null,
    isUserLoggedIn: false
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      state.isUserLoggedIn = !!(token)
    },
    setUser(state, user) {
      state.user = user
    },
    setStatuses(state, statuses) {
      state.statuses = statuses
    }

  },
  actions: {
    setUser({
      commit
    }, user) {
      commit('setUser', user)
    },
    setToken({
      commit
    }, token) {
      commit('setToken', token)
    },
    setStatuses({commit}, statuses) {
      commit('setStatuses', statuses)
    }
  },

})

