import Vue from 'vue'
import { parseJSON } from 'date-fns'
import VueResource from 'vue-resource'

Vue.use(VueResource)
export default {
  namespaced: true,
  state: {
    user: null,
    token: '',
    citation: null,
    motivation: null,
  },
  mutations: {
    SET_USER(state, userInfo) {
      state.user = userInfo
      if (userInfo.citationEnabled) {
        Vue.http
          .get('/api/citation')
          .then((res) => res.json())
          .then((citation) => {
            if (citation.id !== 0 && userInfo.surveyStatus.accepted !== null) {
              state.citation = citation
            }
          })
      }
    },
    SET_AUTH_TOKEN(state, tokenInfo) {
      state.token = tokenInfo.token
      localStorage.setItem('token', tokenInfo.token)
    },
    LOGOUT(state) {
      state.user = null
      state.token = ''
      delete Vue.http.headers.common.Authorization
      localStorage.clear()
    },
    SET_MOTIVATION(state, motivation) {
      state.motivation = motivation
    },
    CLEAR_MOTIVATION(state) {
      state.motivation = null
    },
    CLEAR_CITATION(state) {
      state.citation = null
    },
    SET_SURVEY_STATUS(state, surveyStatus) {
      state.user['surveyStatus'] = surveyStatus
    },
  },
  actions: {
    setUser({ commit }, payload) {
      commit('SET_USER', payload)
    },
    setAuthToken({ commit }, payload) {
      commit('SET_AUTH_TOKEN', payload)
    },
    logout({ commit }) {
      commit('LOGOUT')
    },
    clearCitation({ commit }) {
      commit('CLEAR_CITATION')
    },
    setMotivation({ commit }, motivation) {
      commit('SET_MOTIVATION', motivation)
    },
    clearMotivation({ commit }) {
      commit('CLEAR_MOTIVATION')
    },
    setSurveyStatus({ commit }, surveyStatus) {
      commit('SET_SURVEY_STATUS', surveyStatus)
    },
  },
  getters: {
    user: (state) => state.user,
    citation: (state) => state.citation,
    motivation: (state) => state.motivation,
    isTrialPeriod: (state) => {
      if (state.user) {
        return (
          state.user.subscriptionType === 'Trial' ||
          state.user.subscriptionType === ''
        )
      }
      return false
    },
    isTrialEnded: (state) => {
      if (state.user.subscriptionEnd === '') {
        return true
      }
      if (state.user) {
        const subscriptionEndDate = parseJSON(state.user.subscriptionEnd)
        return subscriptionEndDate < new Date()
      }
      return true
    },
    token: (state) => state.token,
  },
}
