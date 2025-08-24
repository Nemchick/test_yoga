<template>
  <li class="library-slider__item add-pointer" @click="goToLesson">
    <div class="library-slider__img">
      <div class="library-slider__overlay" v-if="lessonType !== 'article'">
        <a class="button-play">
          <i class="icon-play" />
        </a>
      </div>
      <img v-lazy="lessonInfo.cover" alt="" />
    </div>
    <div class="library-slider__info">
      <span class="library-slider__name">{{ lessonInfo.title }}</span>
      <span class="library-slider__duration" v-if="lessonInfo.duration > 0">
        {{ Math.round(lessonInfo.duration / 60) }} мин.
      </span>
    </div>
  </li>
</template>

<script>
export default {
  name: 'SearchLessonCard',
  props: {
    lessonType: {
      type: String,
      required: true,
      default: 'video',
    },
    lessonInfo: {
      type: Object,
      required: true,
    },
  },
  methods: {
    goToLesson() {
      if (this.lessonType === 'article') {
        this.$router.push({
          name: 'ArticleLessonSearch',
          params: { lessonID: this.lessonInfo.id },
        })
      } else {
        this.$router.push({
          name: 'VideoLessonSearch',
          params: { lessonID: this.lessonInfo.id },
        })
      }
    },
  },
}
</script>

<style scoped></style>
