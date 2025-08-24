<template>
  <div class="player-wrapper">
    <div class="player">
      <audio
        @timeupdate="onTimeUpdateListener"
        @canplay="onCanPlay"
        @ended="onSongEnded"
        ref="audio"
        :src="audioPlaylist[currentTrack].audio"
      />
      <div class="controls-wrapper">
        <div class="controls">
          <div
            class="prev"
            :class="{ disabled: currentTrack === 0 }"
            @click="prev"
          >
            <i class="icon-prev"></i>
          </div>
          <div class="play" @click="togglePlay">
            <i class="icon-play" v-if="!isPlaying"></i>
            <i class="icon-pause" v-else></i>
          </div>
          <div
            class="next"
            :class="{ disabled: currentTrack === audioPlaylist.length - 1 }"
            @click="next"
          >
            <i class="icon-next"></i>
          </div>
        </div>
        <div class="volume-control">
          <div class="volume" @click="setMute">
            <i :class="volume > 0 ? 'icon-volume' : 'icon-volume-mute'" />
          </div>
          <input
            class="range"
            ref="volumeRange"
            id="volume"
            type="range"
            min="0"
            max="1"
            step="0.01"
            v-model="volume"
          />
        </div>
      </div>
      <div class="record-wrapper">
        <div
          class="record__img"
          v-if="audioPlaylist[currentTrack].cover !== ''"
        >
          <img :src="audioPlaylist[currentTrack].cover" />
        </div>
        <div class="record-info">
          <div class="record-name__wrapper">
            <span class="record-author">&nbsp;</span>
            <span class="record-name">
              {{ audioPlaylist[currentTrack].title }}
            </span>
          </div>
          <div class="timeline__wrapper">
            <div class="track__time">{{ currentPlayTime }}</div>
            <div class="timeline" @click="jumpTo" ref="timeline">
              <div
                :style="{ width: percentage + '%', transition: 'width 0.5s' }"
              ></div>
            </div>
            <div class="track__time">{{ playtime }}</div>
          </div>
        </div>
      </div>
      <div class="controls-extra">
        <div class="repeat" :class="{ active: this.repeat }" @click="setRepeat">
          <i class="icon-repeat" />
        </div>
        <div class="heart" @click="setFavorite">
          <i
            :class="
              currentAudioItem.isFavorite ? 'icon-fav-filled' : 'icon-favorite'
            "
          />
        </div>
        <div class="close" @click="closeAudioPlayer">
          <i class="icon-close" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AudioPlayer',
  data() {
    return {
      currentTime: 0,
      duration: 0,
      isPlaying: false,
      volume: 0.75,
      repeat: false,
    }
  },
  watch: {
    volume() {
      this.$refs.audio.volume = this.volume
    },
    currentTrack() {
      if (this.$refs.audio.paused) {
        this.$refs.audio.play()
        this.isPlaying = true
      }
    },
    identifier() {
      if (!this.$refs.audio.paused) {
        this.$refs.audio.pause()
        this.isPlaying = false
      }
    },
  },
  methods: {
    ...mapActions('audioPlayer', [
      'setPlaylist',
      'nextSong',
      'prevSong',
      'clearPlaylist',
    ]),
    ...mapActions('library', ['addToFavorite', 'removeFromFavorites']),
    setRepeat() {
      this.repeat = !this.repeat
    },
    setMute() {
      if (this.volume > 0) {
        this.volume = 0
      } else {
        this.volume = 0.75
      }
    },
    setFavorite() {
      if (this.currentAudioItem.isFavorite) {
        this.removeFromFavorites(this.currentAudioItem.id).then(() => {
          this.currentAudioItem.isFavorite = false
        })
      } else {
        this.addToFavorite(this.currentAudioItem.id).then(() => {
          this.currentAudioItem.isFavorite = true
        })
      }
    },
    closeAudioPlayer() {
      this.$refs.audio.pause()
      this.isPlaying = false
      this.clearPlaylist()
    },
    onSongEnded() {
      if (this.repeat) {
        this.playAt(0)
        setTimeout(() => {
          this.$refs.audio.play()
        }, 1000)
      } else {
        this.next()
      }
    },
    onCanPlay() {
      this.duration = this.$refs.audio.duration
      this.$refs.audio.play()
      this.isPlaying = true
    },
    onTimeUpdateListener(e) {
      const { srcElement } = e
      this.currentTime = srcElement.currentTime
    },
    prev() {
      if (this.currentTrack === 0) {
        return
      }
      this.isPlaying = false
      this.$refs.audio.pause()
      this.prevSong()
      this.$nextTick(() => {
        this.$refs.audio.play()
        this.isPlaying = true
      })
    },
    next() {
      if (this.currentTrack === this.audioPlaylist.length) {
        return
      }
      this.isPlaying = false
      this.$refs.audio.pause()
      this.nextSong()
      this.$nextTick(() => {
        this.$refs.audio.play()
        this.isPlaying = true
      })
    },
    jumpTo(e) {
      const trackPercentage = (e.layerX / this.$refs.timeline.offsetWidth) * 100

      this.playAt((this.duration / 100) * trackPercentage)
    },
    playAt(seconds) {
      this.$refs.audio.currentTime = seconds
      this.currentTime = seconds

      if (!this.isPlaying) {
        this.togglePlay()
      }
    },
    getMinutes(seconds) {
      const m = Math.floor((seconds % 3600) / 60)
      return m
    },
    getSeconds(seconds) {
      const s = Math.floor((seconds % 3600) % 60)
      return (s <= 9 ? '0' : '') + s
    },
    togglePlay() {
      if (!this.isPlaying) {
        this.$refs.audio.play()
      } else {
        this.$refs.audio.pause()
      }
      this.isPlaying = !this.isPlaying
    },
  },
  mounted() {
    const target = this.$refs.volumeRange
    target.style.backgroundSize = '100% auto'
  },
  computed: {
    ...mapGetters('audioPlayer', [
      'audioPlaylist',
      'currentTrack',
      'identifier',
    ]),
    percentage() {
      return (this.currentTime / this.duration) * 100
    },
    playtime() {
      const m = this.getMinutes(this.duration)
      const s = this.getSeconds(this.duration)
      return `${m}:${s}`
    },
    currentPlayTime() {
      const m = this.getMinutes(this.currentTime)
      const s = this.getSeconds(this.currentTime)
      return `${m}:${s}`
    },
    currentAudioItem() {
      return this.audioPlaylist[this.currentTrack]
    },
  },
}
</script>
