<template>
  <div class="library-slider" data-lazy>
    <div ref="articleSwiper" class="swiper" data-slider-library>
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
            @click="goToLesson(item.id)"
          >
            <div class="library-slider__overlay">
              <a class="button-play"><i class="icon-arrow-link" /></a>
            </div>
            <img v-lazy="item.cover" alt="" />
          </div>
          <div class="library-slider__info">
            <span class="library-slider__name">{{ item.title }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Swiper, { Navigation, Pagination } from 'swiper'
export default {
  name: 'ArticleSlider',
  props: {
    title: {
      type: String,
      required: true,
    },
    libID: {
      type: Number,
    },
    items: {
      type: Array,
      required: true,
    },
  },
  methods: {
    goToLesson(lessonID) {
      if (this.libID !== undefined) {
        this.$router.push({
          name: 'ArticleLesson',
          params: { libID: this.libID, lessonID: lessonID },
        })
      } else {
        this.$router.push({
          name: 'ArticleLessonFavorites',
          params: { lessonID: lessonID },
        })
      }
    },
  },
  mounted() {
    new Swiper(this.$refs.articleSwiper, {
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
