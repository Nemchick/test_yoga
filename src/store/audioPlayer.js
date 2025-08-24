export default {
  namespaced: true,
  state: {
    audioPlaylist: [],
    currentTrack: 0,
    identifier: 0,
  },
  mutations: {
    SET_PLAYLIST(state, payload) {
      state.audioPlaylist = payload
    },
    SET_CURRENT_TRACK(state, payload) {
      state.currentTrack = payload
    },
    NEXT_SONG(state) {
      state.currentTrack += 1
    },
    PREV_SONG(state) {
      state.currentTrack -= 1
    },
    CLEAR_PLAYLIST(state) {
      state.audioPlaylist = []
    },
    PAUSE_SONG(state) {
      state.identifier += 1
    },
  },
  actions: {
    setPlaylist({ commit }, { playlist, currentTrack }) {
      const filteredPlaylist = playlist.filter((x) => x.availability === true)
      commit('SET_PLAYLIST', filteredPlaylist)
      commit('SET_CURRENT_TRACK', currentTrack)
    },
    clearPlaylist({ commit }) {
      commit('CLEAR_PLAYLIST')
    },
    nextSong({ commit }) {
      commit('NEXT_SONG')
    },
    prevSong({ commit }) {
      commit('PREV_SONG')
    },
    pauseSong({ commit }) {
      commit('PAUSE_SONG')
    },
  },
  getters: {
    audioPlaylist: (state) => state.audioPlaylist,
    showAudioPlayer: (state) => state.audioPlaylist.length > 0,
    currentTrack: (state) => state.currentTrack,
    identifier: (state) => state.identifier,
  },
}
