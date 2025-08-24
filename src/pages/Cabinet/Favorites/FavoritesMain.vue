<template>
  <div class="page page-library">
    <div class="container">
      <LoaderComponent v-if="localLoading" />
      <template v-else-if="favoritesInfo !== null">
        <div class="library-empty" v-if="favoritesIsEmpty">
          <div class="library-empty__img">
            <img src="@/assets/img/elements/favorite-img.svg" alt="" />
          </div>
          <div class="library-empty__content">
            <h2 class="library-empty__title">Избранное</h2>
            <p class="library-empty__description">
              Здесь будут храниться крийи, медитации и статьи, которые вы
              добавили из библиотеки
            </p>
            <router-link
              :to="{ name: 'LibraryMain' }"
              class="button button--s1 button--t1"
            >
              В библиотеку
            </router-link>
          </div>
        </div>
        <div v-else>
          <div class="page__header page__header--link">
            <div class="page__title">
              <h1>Избранное</h1>
            </div>
          </div>
          <section class="section section--library" v-if="favKriyas.length > 0">
            <VideoSlider title="Крийи" :items="favKriyas" />
          </section>
          <section
            class="section section--library"
            v-if="favMeditations.length > 0"
          >
            <VideoSlider title="Медитации" :items="favMeditations" />
          </section>
          <section class="section section--library" v-if="favSongs.length > 0">
            <MusicSlider title="Музыка и мантры" :items="favSongs" />
          </section>
          <section
            class="section section--library"
            v-if="favArticles.length > 0"
          >
            <ArticleSlider title="Статьи" :items="favArticles" />
          </section>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import LoaderComponent from '@/components/UI/Components/LoaderComponent.vue'
import VideoSlider from '@/components/UI/Sliders/VideoSlider.vue'
import ArticleSlider from '@/components/UI/Sliders/ArticleSlider.vue'
import MusicSlider from '@/components/UI/Sliders/MusicSliderShort.vue'
export default {
  name: 'FavoritesMain',
  components: { MusicSlider, ArticleSlider, VideoSlider, LoaderComponent },
  data() {
    return {
      localLoading: false,
      favoritesInfo: null,
    }
  },
  methods: {
    getFavorites() {
      this.localLoading = true
      this.$http
        .get('/api/library/favorites/lesson/')
        .then((res) => res.json())
        .then((favoritesInfo) => {
          this.favoritesInfo = favoritesInfo
        })
        .finally(() => {
          this.localLoading = false
        })
    },
  },
  computed: {
    favKriyas() {
      return this.favoritesInfo.blocks.find((x) => x.type === 'kriyas').lessons
    },
    favMeditations() {
      return this.favoritesInfo.blocks.find((x) => x.type === 'meditations')
        .lessons
    },
    favSongs() {
      return this.favoritesInfo.blocks.find((x) => x.type === 'songs').lessons
    },
    favArticles() {
      return this.favoritesInfo.blocks.find((x) => x.type === 'article').lessons
    },
    favoritesIsEmpty() {
      const { favKriyas, favMeditations, favSongs, favArticles } = this
      return (
        favKriyas.length +
          favMeditations.length +
          favSongs.length +
          favArticles.length ===
        0
      )
    },
  },
  mounted() {
    this.getFavorites()
  },
}
</script>

<style scoped></style>
