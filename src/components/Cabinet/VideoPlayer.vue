<template>
  <div>
    <video
      ref="videoPlayer"
      :src="contentLink"
      @play="onLessonPlaying"
      @ended="onLessonEnded"
      controls
      width="100%"
      height="auto"
      class="test_v5"
      autoplay
      controlsList="nodownload"
      playsinline
      webkit-playsinline
    ></video>

    <Transition name="fade">
      <button
        class="button button--s4 button--t6"
        @click="skipIntro"
        v-if="showSkipButton"
      >
        Пропустить заставку
      </button>
    </Transition>
  </div>
</template>

<script>
export default {
  name: 'CustomVideoPlayer',
  props: {
    contentLink: {
      type: String,
      required: true,
    },
    introDuration: {
      type: Number,
      required: false,
      default: 0,
    },
    autoplay: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showSkipButton: false,
      skipButtonShowed: false,
    }
  },
  mounted() {
    this.initPlayer()
  },
  methods: {
    initPlayer() {
      const videoPlayer = this.$refs.videoPlayer
      if (videoPlayer) {
        videoPlayer.addEventListener('timeupdate', this.onTimeUpdate)
      }
    },
    onLessonEnded() {
      this.$emit('on-lesson-ended')
    },
    onLessonPlaying() {
      if (this.introDuration !== 0 && !this.skipButtonShowed) {
        this.showSkipButton = true
        this.skipButtonShowed = true
      }
    },
    onTimeUpdate() {
      const videoPlayer = this.$refs.videoPlayer
      if (
        videoPlayer.currentTime >= this.introDuration &&
        this.showSkipButton
      ) {
        this.showSkipButton = false
      }
    },
    skipIntro() {
      const videoPlayer = this.$refs.videoPlayer
      if (videoPlayer) {
        videoPlayer.currentTime = this.introDuration
        this.showSkipButton = false
      }
    },
  },
  beforeDestroy() {
    const videoPlayer = this.$refs.videoPlayer
    if (videoPlayer) {
      videoPlayer.removeEventListener('timeupdate', this.onTimeUpdate)
    }
  },
}
</script>

<style scoped>
.test_v5 {
  position: absolute;
  top: 0px;
}
</style>
