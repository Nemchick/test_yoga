<template>
  <div class="library-slider" data-lazy>
    <div ref="musicSwiper" class="swiper" data-slider-library-audio>
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
          class="swiper-slide library-slider__audio"
          v-for="(item, id) in items"
          :key="item.id"
        >
          <div class="library-item__audio">
            <button class="button--play" @click="playPlaylist(id)">
              <i
                :class="{
                  'icon-play': item.availability === true,
                  'icon-lock': item.availability === false,
                }"
              ></i>
            </button>
            <span class="library-slider__name">{{ item.title }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Swiper, { Navigation, Pagination } from 'swiper'
import { mapActions } from 'vuex'
import { register } from 'swiper/element/bundle'

register()

export default {
  name: 'MusicSlider',
  props: {
    title: {
      required: true,
      type: String,
    },
    items: {
      required: true,
      type: Array,
    },
  },
  data() {
    return {}
  },
  methods: {
    ...mapActions('audioPlayer', ['setPlaylist']),
    playPlaylist(id) {
      const payload = {
        playlist: this.items,
        currentTrack: id,
      }
      this.setPlaylist(payload)
    },
  },
  mounted() {
    new Swiper(this.$refs.musicSwiper, {
      loop: false,
      speed: 1000,
      freeMode: true,
      spaceBetween: 12,
      slidesPerView: 'auto',
      grid: {
        rows: 4,
        fill: 'row',
      },
      // If we need pagination
      pagination: {
        el: '.lessons-slider__pagination',
      },
      breakpoints: {
        980: {
          spaceBetween: 30,
          grid: {
            rows: 4,
            fill: 'row',
          },
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
