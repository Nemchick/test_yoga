<template>
  <li class="library-item" @click="goToLesson()">
    <div class="library-item__img">
      <div class="library-item__overlay">
        <a class="button-play" @click="goToLesson()">
          <i class="icon-arrow-link"></i>
        </a>
      </div>
      <img v-lazy="articleInfo.cover" alt="" />
    </div>
    <div class="library-item__content">
      <h3 class="library-item__name">
        {{ articleInfo.title }}
      </h3>
      <p class="library-item__description" v-html="articleInfo.description" />
      <div class="library__info">
        <a class="library-item__read-more" @click="goToLesson">Читать статью</a>
        <i
          :class="articleInfo.isFavorite ? 'icon-fav-filled' : 'icon-favorite'"
          @click.prevent.stop="setFavorite()"
        />
      </div>
    </div>
  </li>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ArticleCard',
  props: {
    articleInfo: {
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
