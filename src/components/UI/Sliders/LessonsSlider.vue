<template>
  <div class="lessons-slider">
    <div ref="swiper" class="swiper" data-slider-program>
      <ul class="swiper-wrapper">
        <li
          class="swiper-slide lessons-slider__item"
          v-for="item in items"
          :key="item.id"
        >
          <div
            class="lessons__status"
            :class="{ viewed: item.repeatsCompleted >= item.repeats }"
          >
            <i class="icon-check"></i>
          </div>
          <div
            class="lessons-slider__img"
            @click="goToLesson(item, item.type, item.id)"
            v-if="item.availability === true"
          >
            <div class="lessons-slider__overlay">
              <button class="button-play"><i class="icon-play"></i></button>
            </div>
            <div class="lessons-slider__status">
              <span>
                {{ item.repeatsCompleted }}/{{
                  item.userRepeats === 0 ? item.repeats : item.userRepeats
                }}
              </span>
            </div>
            <img v-lazy="item.cover" lazy="error" />
          </div>
          <div class="lessons-slider__img" v-else>
            <div class="lessons-slider__blocked">
              <i class="icon-lock" />
            </div>
            <img src="@/assets/img/elements/lesson.png" alt="" />
          </div>
          <div class="lessons-slider__info">
            <span
              class="lessons-slider__name"
              :class="{ 'add-pointer': item.availability === true }"
              @click="goToLesson(item, item.type, item.id)"
            >
              {{ item.title }}
            </span>
            <span class="lessons-slider__duration" v-if="item.duration > 0">
              {{ getDurationRepresent(item.duration) }}
            </span>
          </div>
        </li>
      </ul>
      <!-- navigation buttons -->
      <div class="lessons-slider__controls">
        <div class="slider-button slider-button__prev">
          <i class="icon-arrow-left"></i>
        </div>
        <div class="slider-button slider-button__next">
          <i class="icon-arrow-right"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper, { Navigation, Pagination } from 'swiper'
import { declOfNum } from '@/utils'

export default {
  name: 'LessonsSlider',
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  methods: {
    getDurationRepresent(durationSrc) {
      const duration = Math.round(durationSrc / 60)
      return `${duration} ${declOfNum(duration, ['минута', 'минуты', 'минут'])}`
    },
    goToLesson(item, type, lessonID) {
      if (item.availability === false) {
        return
      }
      if (type === 'article') {
        this.$router.push({
          name: 'ArticleLessonProgram',
          params: { lessonID: lessonID },
        })
      } else {
        this.$router.push({
          name: 'VideoLessonProgram',
          params: { lessonID: lessonID },
        })
      }
    },
  },
  mounted() {
    new Swiper(this.$refs.swiper, {
      loop: false,
      speed: 1000,
      slidesPerView: 'auto',
      freeMode: true,
      slidesPerGroup: 1,
      spaceBetween: 12,
      // If we need pagination
      pagination: {
        el: '.lessons-slider__pagination',
      },
      breakpoints: {
        980: {
          slidesPerView: 'auto',
          slidesPerGroup: 4,
          spaceBetween: 30,
          // Navigation arrows
          navigation: {
            nextEl: '.slider-button__next',
            prevEl: '.slider-button__prev',
          },
        },
      },
      modules: [Navigation, Pagination],
    })
  },
}
</script>

<style scoped></style>
