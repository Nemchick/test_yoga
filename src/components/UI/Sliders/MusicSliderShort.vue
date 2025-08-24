<template>
  <div class="container">
    <div class="library-category__header">
      <h3>{{ title }}</h3>
    </div>
    <ul class="library-category__list audio">
      <li
        class="library-item__audio"
        v-for="(item, id) in items"
        :key="item.id"
        @click="playPlaylist(item, id)"
      >
        <button
          class="button--play"
          :class="{ 'remove-pointer': !item.availability }"
        >
          <i
            :class="{
              'icon-play': item.availability,
              'icon-lock': !item.availability,
            }"
          />
        </button>
        <span class="library-slider__name">{{ item.title }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'MusicSlider',
  props: {
    title: {
      required: true,
      type: String,
    },
    items: {
      type: Array,
      required: true,
    },
  },
  methods: {
    ...mapActions('audioPlayer', ['setPlaylist']),
    playPlaylist(item, id) {
      if (item.availability === false) {
        return
      }
      const payload = {
        playlist: this.items,
        currentTrack: id,
      }
      this.setPlaylist(payload)
    },
  },
}
</script>
