<template>
  <li class="library-item" @click="goToLesson(videoInfo.id)">
    <div class="library-item__img" v-if="videoInfo.availability">
      <div class="library-item__overlay">
        <a class="button-play" @click="goToLesson(videoInfo.id)">
          <i class="icon-play" />
        </a>
      </div>
      <img v-lazy="videoInfo.cover" alt="" />
    </div>
    <div class="library-item__img" v-else>
      <div class="library-item__img">
        <div class="program-video__blocked">
          <i class="icon-lock" />
        </div>
        <img v-lazy="videoInfo.cover" alt="" />
      </div>
    </div>
    <div class="library-item__content">
      <h3 class="library-item__name">
        {{ videoInfo.title }}
      </h3>
      <p class="library-item__description" v-html="videoInfo.description" />
      <div class="library__info">
        <span class="library-item__duration"
          >{{ Math.round(videoInfo.duration / 60) }} мин.</span
        >
        <i
          :class="videoInfo.isFavorite ? 'icon-fav-filled' : 'icon-favorite'"
          @click.prevent.stop="setFavorite(videoInfo)"
        />
      </div>
    </div>
  </li>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'VideoCard',
  props: {
    videoInfo: {
      type: Object,
      required: true,
    },
  },
  methods: {
    setFavorite() {
      this.$emit('on-set-favorite')
    },
    goToLesson() {
      this.$emit('on-go-to-lesson')
    },
  },
  computed: {
    ...mapGetters('user', ['isTrialPeriod']),
  },
}
</script>

<style scoped></style>
