import Vue from 'vue'
import Vuex from 'vuex'
import shared from '@/store/shared'
import user from '@/store/user'
import survey from '@/store/survey'
import library from '@/store/library'
import audioPlayer from '@/store/audioPlayer.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    shared,
    user,
    survey,
    library,
    audioPlayer,
  },
})
