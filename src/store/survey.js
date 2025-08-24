export default {
  namespaced: true,
  state: {
    surveyResults: {},
  },
  mutations: {
    ADD_SURVEY_RESULTS(
      state,
      { result, type, emotQuestionAnswers, relQuestionAnswers }
    ) {
      state.surveyResults[type] = {}
      state.surveyResults[type]['result'] = result
      if (emotQuestionAnswers) {
        state.surveyResults[type]['emotQuestionAnswers'] = emotQuestionAnswers
      }
      if (relQuestionAnswers) {
        state.surveyResults[type]['relQuestionAnswers'] = relQuestionAnswers
      }
      // save result
      localStorage.setItem('surveyResult', JSON.stringify(state.surveyResults))
    },
    SET_SURVEY_RESULTS(state) {
      const res = localStorage.getItem('surveyResult')
      if (res !== null) {
        state.surveyResults = JSON.parse(res)
      }
    },
    CLEAR_SURVEY_RESULT(state) {
      localStorage.removeItem('surveyResult')
      state.surveyResults = {}
    },
  },
  actions: {
    addSurveyResults({ commit }, payload) {
      commit('ADD_SURVEY_RESULTS', payload)
    },
    restoreSurveyResults({ commit }) {
      commit('SET_SURVEY_RESULTS')
    },
    clearSurveyResults({ commit }) {
      commit('CLEAR_SURVEY_RESULT')
    },
  },
  getters: {
    surveyResults: (state) => state.surveyResults,
    physicalHealthResult(state) {
      return state.surveyResults['physicalHealth'].result
    },
  },
}
