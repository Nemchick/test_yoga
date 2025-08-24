<template>
  <div class="container">
    <div class="library-category__header">
      <h3>{{ title }}</h3>
    </div>
    <ul class="library-category__list">
      <VideoCard
        :video-info="item"
        v-for="item in items"
        :key="item.id"
        @on-set-favorite="setFavorite(item)"
        @on-go-to-lesson="goToLesson(item.id)"
      />
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import VideoCard from '@/components/Cabinet/Library/VideoCard.vue'

export default {
  name: 'VideoSliderShort',
  components: { VideoCard },
  props: {
    title: {
      type: String,
      required: true,
    },
    libID: {
      type: Number,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
  },
  methods: {
    ...mapActions('library', ['addToFavorite', 'removeFromFavorites']),
    goToLesson(lessonID) {
      this.$router.push({
        name: 'VideoLesson',
        params: { libID: this.libID, lessonID: lessonID },
      })
    },
    setFavorite(item) {
      if (item.isFavorite) {
        this.removeFromFavorites(item.id).then(() => {
          item.isFavorite = false
        })
      } else {
        this.addToFavorite(item.id).then(() => {
          item.isFavorite = true
        })
      }
    },
  },
}
</script>

<style scoped></style>
