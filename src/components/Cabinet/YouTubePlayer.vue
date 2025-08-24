<template>
  <div>
    <youtube
      v-if="switch_player === 'youtube'"
      :video-id="contentID"
      @playing="onLessonPlaying"
      @ended="onLessonEnded"
      :player-vars="playerVars"
      ref="youtube"
    />
    <iframe
      v-else-if="switch_player === 'vk'"
      class="vk-pl"
      :src="contentIDVk"
      allow="autoplay; encrypted-media; fullscreen; picture-in-picture;"
      frameborder="0"
      allowfullscreen
    ></iframe>
    <!-- @ready="onVideoReady"-->
    <!-- <iframe
      class="vk-pl"
      :src="contentLink"
      allow="autoplay; encrypted-media; fullscreen; picture-in-picture;"
      frameborder="0"
      allowfullscreen
    ></iframe> -->

    <Transition name="fade">
      <button
        class="button button--s4 button--t6"
        @click="skipIntro"
        v-if="showSkipButton"
      >
        Пропустить заставку
      </button>
    </Transition>

    <Transition name="fade">
      <button
        class="button button--s4 button--t6"
        @click="skipIntroVk"
        v-if="showSkipButtonVk"
      >
        Пропустить заставку
      </button>
    </Transition>
  </div>
</template>

<script>
export default {
  name: 'YoutubePlayer',
  components: {},
  props: {
    contentID: {
      type: String,
      required: true,
    },
    contentIDVk: {
      type: String,
      required: true,
    },
    contentLink: {
      type: String,
      required: true,
    },
    introDuration: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      switch_player: localStorage.getItem('switch_player') || 'vk',
      playerVars: {
        playsinline: 1,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
      },
      showSkipButton: false,
      showSkipButtonVk: false,
      skipButtonShowed: false,
      skipButtonShowedVk: false,
      player: {},
      playerOptions: {
        controls: true,
        autoplay: true,
        preload: 'auto',
        sources: [
          {
            src: `${this.contentLink}`,
            type: 'video/mp4',
          },
        ],
      },
    }
  },
  mounted() {
    this.initPlayer()
  },
  methods: {
    initPlayer() {
      const iframe = document.querySelector('.vk-pl')
      this.vkplayer = window.VK.VideoPlayer(iframe)
      this.vkplayer.on('started', this.onLessonPlayingVk)
      this.vkplayer.on('ended', this.onLessonEnded)
    },
    onLessonEnded() {
      this.$emit('on-lesson-ended')
    },
    onLessonPlaying() {
      if (this.introDuration !== 0 && this.skipButtonShowed == false) {
        this.showSkipButton = true
        this.skipButtonShowed = true
      }
    },

    onLessonPlayingVk() {
      if (this.introDuration !== 0 && this.skipButtonShowed == false) {
        this.showSkipButtonVk = true
        this.skipButtonShowedVk = true
      }
    },
    skipIntro() {
      this.$refs.youtube.player.seekTo(this.introDuration)
      this.showSkipButton = false
    },
    skipIntroVk() {
      this.vkplayer.seek(this.introDuration)
      this.showSkipButton = false
    },
  },
}
</script>
<style scoped>
.video-js {
  width: 100%;
  height: auto;
}
video {
  object-fit: cover !important;
}
</style>
