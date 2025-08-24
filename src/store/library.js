import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)
export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    incrementLessonRepeats(store, lessonID) {
      Vue.http.post(`/api/library/lesson/${lessonID}/repeats`)
    },
    addToFavorite({ dispatch }, lessonID) {
      Vue.http.put(`/api/library/favorites/lesson/${lessonID}`).then(() => {
        dispatch('shared/setSuccess', 'Занятие добавлено в избранное', {
          root: true,
        })
      })
    },
    removeFromFavorites({ dispatch }, lessonID) {
      Vue.http.delete(`/api/library/favorites/lesson/${lessonID}`).then(() => {
        dispatch('shared/setSuccess', 'Занятие удалено из избранного', {
          root: true,
        })
      })
    },
  },
  getters: {},
}
