export default {
  namespaced: true,
  state: {
    error: null,
    success: null,
    info: null,
    isMobile: false,
  },
  mutations: {
    SET_ERROR(state, payload) {
      state.error = payload
    },
    SET_SUCCESS(state, payload) {
      state.success = payload
    },
    SET_INFO(state, payload) {
      state.info = payload
    },
    CLEAR_ERROR(state) {
      state.error = null
    },
    CLEAR_SUCCESS(state) {
      state.success = null
    },
    CLEAR_INFO(state) {
      state.info = null
    },
    SET_MOBILE(state, payload) {
      state.isMobile = payload
    },
  },
  actions: {
    setError({ commit }, payload) {
      commit('SET_ERROR', payload)
    },
    setSuccess({ commit }, payload) {
      commit('SET_SUCCESS', payload)
    },
    setInfo({ commit }, payload) {
      commit('SET_INFO', payload)
    },
    clearError({ commit }) {
      commit('CLEAR_ERROR')
    },
    clearSuccess({ commit }) {
      commit('CLEAR_SUCCESS')
    },
    clearInfo({ commit }) {
      commit('CLEAR_INFO')
    },
    setMobile({ commit }, payload) {
      commit('SET_MOBILE', payload)
    },
  },
  getters: {
    error: (state) => state.error,
    info: (state) => state.info,
    success: (state) => state.success,
    isMobile: (state) => state.isMobile,
  },
}
