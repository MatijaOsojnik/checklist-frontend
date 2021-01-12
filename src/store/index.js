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
    isUserLoggedIn: false
  },
  mutations: {
    setUser(state, user) {
      state.user = user
      state.isUserLoggedIn = true
    },

  },
  actions: {
    setUser({
      commit
    }, user) {
      commit('setUser', user)
    },
  },

})