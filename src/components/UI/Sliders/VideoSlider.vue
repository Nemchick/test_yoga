<template>
  <div class="library-slider" data-lazy>
    <div ref="swiper" class="swiper" data-slider-library>
      <div class="container">
        <div class="library-category__header">
          <h3>{{ title }}</h3>
          <div class="library-slider__controls">
            <div class="slider-button slider-button__prev">
              <i class="icon-arrow-left"></i>
            </div>
            <div class="slider-button slider-button__next">
              <i class="icon-arrow-right"></i>
            </div>
          </div>
        </div>
      </div>
      <ul class="swiper-wrapper">
        <li
          class="swiper-slide library-slider__item"
          v-for="item in items"
          :key="item.id"
        >
          <div
            class="library-slider__img add-pointer"
            @click="goToLesson(libID, item.id)"
          >
            <div
              :class="{
                'library-slider__overlay': item.availability === true,
                'library-slider__blocked': item.availability === false,
              }"
            >
              <i class="icon-lock" v-if="item.availability === false" />
              <a class="button-play" v-else><i class="icon-play" /></a>
            </div>
            <img v-lazy="item.cover" alt="" />
          </div>
          <div class="library-slider__info">
            <span class="library-slider__name">
              {{ item.title }}
            </span>
            <span class="library-slider__duration"
              >{{ Math.round(item.duration / 60) }} мин.
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Swiper, { Navigation, Pagination } from 'swiper'

export default {
  name: 'VideoSlider',
  props: {
    title: {
      required: true,
      type: String,
    },
    libID: {
      type: Number,
      default: 0,
    },
    items: {
      required: true,
      type: Array,
    },
  },
  methods: {
    goToLesson(libID, itemID) {
      if (libID !== 0) {
        this.$router.push({
          name: 'VideoLesson',
          params: { libID: libID, lessonID: itemID },
        })
      } else {
        this.$router.push({
          name: 'VideoLessonFavorites',
          params: { lessonID: itemID },
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
