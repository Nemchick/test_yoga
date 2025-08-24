<template>
  <div class="container">
    <div class="library-category__header">
      <h3>{{ title }}</h3>
    </div>
    <ul class="library-category__list">
      <ArticleCard
        :article-info="item"
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
import ArticleCard from '@/components/Cabinet/Library/ArticleCard.vue'

export default {
  name: 'ArticleSliderShort',
  components: { ArticleCard },
  props: {
    title: {
      required: true,
      type: String,
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
    ...mapActions('shared', ['setSuccess']),
    goToLesson(lessonID) {
      this.$router.push({
        name: 'ArticleLesson',
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
