<template>
  <div class="page page-library">
    <LoaderComponent v-if="localLoading" />
    <template v-else>
      <div class="container">
        <div class="page__header page__header--link">
          <a class="back-link add-pointer" @click.prevent.stop="goBack">
            <i class="icon-back"></i>
            {{ customBackText || header }}
          </a>
        </div>
        <div class="library-article__header">
          <h1 class="library-article__title">
            {{ lessonInfo.title }}
          </h1>
          <div class="library-article__short" v-html="lessonInfo.description" />
          <button
            class="button--favorite"
            @click.prevent.stop="setFavorite(lessonInfo)"
          >
            <i
              :class="
                lessonInfo.isFavorite ? 'icon-fav-filled' : 'icon-favorite'
              "
            />
            В избранное
          </button>
        </div>
      </div>
      <div class="library-article__img">
        <img :src="lessonInfo.cover" alt="" />
      </div>
      <div class="container">
        <article class="library-article" v-html="lessonInfo.body" />
        <div class="library-article__footer"></div>
      </div>
    </template>
  </div>
</template>

<script>
import LoaderComponent from '@/components/UI/Components/LoaderComponent.vue'
import getLessonInfo from '@/mixins/getLessonInfo'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ArticleLesson',
  mixins: [getLessonInfo],
  components: { LoaderComponent },
  data() {
    return {
      localLoading: true,
      lessonInfo: null,
      libID: 0,
      lessonId: '',
      customBackText: null, // ← добавлено
    }
  },
  methods: {
    ...mapActions('library', [
      'incrementLessonRepeats',
      'addToFavorite',
      'removeFromFavorites',
    ]),
    ...mapActions('shared', ['setSuccess']),
    goBack() {
      this.$router.go(-1)
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
  computed: {
    ...mapGetters('user', ['isTrialPeriod']),
  },
  mounted() {
    this.customBackText = this.$route.query.customBackText || null
  },
}
</script>

<style scoped></style>
