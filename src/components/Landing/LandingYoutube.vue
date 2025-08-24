<template>
  <section class="kirill_section_1">
    <div class="container">
      <div class="library-video__wrapper kirill_section_meditates_img">
        <div class="program-video" v-if="!videoStarted">
          <div class="program-video__content">
            <img
              class="program-video__overlay"
              src="@/assets/img/section/FrameVideo.webp"
              alt=""
              @click="startVideoLesson"
            />
          </div>
        </div>
        <div class="program-video" v-else>
          <div class="program-video__content">
            <youtube
              :video-id="'9RNFE8xv1PQ'"
              @ended="videoEnded"
              iframe-lazy
            />
          </div>
        </div>
      </div>
    </div>
    <div class="kirill_green_ball kirill_green_ball_position_v2"></div>
    <div class="kirill_green_ball kirill_green_ball_position_v3"></div>
  </section>
</template>
<script>
import 'vue-youtube-embed'
export default {
  methods: {
    startVideoLesson() {
      this.videoStarted = true
    },
    videoEnded() {
      this.videoStarted = false
    },
  },
  data() {
    return {
      showMobileMenu: false,
      videoStarted: false,
    }
  },
}
</script>
