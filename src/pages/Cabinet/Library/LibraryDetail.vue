<template>
  <div class="page page-library">
    <LoaderComponent v-if="localLoading" />
    <template v-else-if="libraryDetails !== null">
      <div class="container">
        <div class="page__header page__header--link">
          <router-link to="/cabinet/library" class="back-link">
            <i class="icon-back"></i>
            Библиотека
          </router-link>
          <div class="page__title">
            <h1>{{ programTitle }}</h1>
          </div>
        </div>
      </div>
      <section class="section section--library" v-if="kriyasItems.length > 0">
        <VideoSlider
          title="Крийи"
          :items="kriyasItems"
          :libID="libID"
          v-if="kriyasItems.length > 3"
        />
        <VideoSliderShort
          title="Крийи"
          :libID="libID"
          :items="kriyasItems"
          v-else
        />
      </section>
      <section
        class="section section--library"
        v-if="meditationsItems.length > 0"
      >
        <VideoSlider
          title="Медитации"
          :libID="libID"
          :items="meditationsItems"
          v-if="meditationsItems.length > 3"
        />
        <VideoSliderShort
          title="Медитации"
          :libID="libID"
          :items="meditationsItems"
          v-else
        />
      </section>
      <section class="section section--library" v-if="songsItems.length > 0">
        <MusicSlider
          title="Музыка и мантры"
          :items="songsItems"
          v-if="songsItems.length > 3"
        />
        <MusicSliderShort title="Музыка и мантры" :items="songsItems" v-else />
      </section>
      <section class="section section--library" v-if="articlesItems.length > 0">
        <ArticleSlider
          title="Статьи"
          :items="articlesItems"
          :libID="libID"
          v-if="articlesItems.length > 3"
        />
        <ArticleSliderShort
          title="Статьи"
          :libID="libID"
          :items="articlesItems"
          v-else
        />
      </section>
    </template>
  </div>
</template>

<script>
import LoaderComponent from '@/components/UI/Components/LoaderComponent.vue'
import VideoSlider from '@/components/UI/Sliders/VideoSlider.vue'
import VideoSliderShort from '@/components/UI/Sliders/VideoSliderShort.vue'
import MusicSlider from '@/components/UI/Sliders/MusicSlider.vue'
import MusicSliderShort from '@/components/UI/Sliders/MusicSliderShort.vue'
import ArticleSlider from '@/components/UI/Sliders/ArticleSlider.vue'
import ArticleSliderShort from '@/components/UI/Sliders/ArticleSliderShort.vue'

export default {
  name: 'LibraryDetailFull',
  components: {
    ArticleSlider,
    ArticleSliderShort,
    MusicSlider,
    MusicSliderShort,
    VideoSlider,
    LoaderComponent,
    VideoSliderShort,
  },
  data() {
    return {
      libID: 0,
      localLoading: true,
      libraryDetails: null,
    }
  },
  methods: {
    getLibraryDetail() {
      this.localLoading = true
      this.$http
        .get(`/api/library/program/${this.libID}`)
        .then((res) => res.json())
        .then(
          (libraryDetails) => {
            this.libraryDetails = libraryDetails
          },
          (err) => {
            if (err.status === 404) {
              this.$router.push('/')
            }
          }
        )
        .finally(() => {
          this.localLoading = false
        })
    },
  },
  mounted() {
    this.libID = Number(this.$route.params.libID)
    this.getLibraryDetail()
  },
  computed: {
    programTitle() {
      return this.libraryDetails.about.title
    },
    kriyasItems() {
      const blockInfo = this.libraryDetails.blocks.find(
        (x) => x.type === 'kriyas'
      )
      return blockInfo.lessons
    },
    meditationsItems() {
      const blockInfo = this.libraryDetails.blocks.find(
        (x) => x.type === 'meditations'
      )
      return blockInfo.lessons
    },
    songsItems() {
      const blockInfo = this.libraryDetails.blocks.find(
        (x) => x.type === 'songs'
      )
      return blockInfo.lessons
    },
    articlesItems() {
      const blockInfo = this.libraryDetails.blocks.find(
        (x) => x.type === 'article'
      )
      return blockInfo.lessons
    },
  },
}
</script>
