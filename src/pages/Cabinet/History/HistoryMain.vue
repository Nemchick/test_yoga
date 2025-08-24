<template>
  <LoaderComponent v-if="localLoading" />
  <div class="page page-library" v-else>
    <div class="container">
      <div class="page__header page__header--link">
        <router-link to="/cabinet/library" class="back-link">
          <i class="icon-back"></i>
          Библиотека
        </router-link>
        <div class="page__title">
          <h1>История просмотров</h1>
          <div class="search">
            <button
              type="submit"
              value=""
              class="search__button"
              @click="doSearch"
            >
              <i class="icon-search"></i>
            </button>
            <span
              class="pass-switch icon-close"
              @click="searchQuery = ''"
              v-if="searchQuery.length > 0"
            />
            <input
              type="text"
              id="search-library"
              name="search-library"
              v-model="searchQuery"
              placeholder="Поиск"
              @keydown.enter="doSearch"
            />
          </div>
        </div>
      </div>
    </div>
    <section class="section section--library">
      <div class="container">
        <ul class="library-category__list">
          <template v-for="(item, index) in historyInfo">
            <div
              class="library-history__header"
              v-if="isNewDay(item, index)"
              :key="`header_${item.viewDateTime}_${item.id}`"
            >
              <h3>{{ getDateRepresent(item.viewDateTime) }}</h3>
            </div>
            <VideoCard
              :video-info="item"
              v-if="item.type === 'meditations' || item.type === 'kriyas'"
              @on-set-favorite="setFavorite(item)"
              @on-go-to-lesson="goToVideoLesson(item.id)"
              :key="`video_${item.viewDateTime}_${item.id}`"
            />
            <ArticleCard
              :article-info="item"
              v-if="item.type === 'article'"
              @on-set-favorite="setFavorite(item)"
              @on-go-to-lesson="goToArticleLesson(item.id)"
              :key="`article_${item.viewDateTime}_${item.id}`"
            />
          </template>
          <infinite-loading
            :identifier="infiniteID"
            @infinite="infiniteHandler"
          >
            <div slot="spinner"><LoaderComponent /></div>
            <div slot="no-results">Ничего не найдено</div>
            <div slot="no-more"></div>
          </infinite-loading>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import LoaderComponent from '@/components/UI/Components/LoaderComponent.vue'
import { getDate } from '@/utils'
import { parseJSON, format, differenceInDays } from 'date-fns'
import { mapActions } from 'vuex'
import VideoCard from '@/components/Cabinet/Library/VideoCard.vue'
import ArticleCard from '@/components/Cabinet/Library/ArticleCard.vue'

export default {
  name: 'HistoryMain',
  components: { ArticleCard, VideoCard, LoaderComponent },
  data() {
    return {
      localLoading: false,
      historyInfo: [],
      infiniteID: 0,
      currentPage: 0,
      limit: 2,
      searchQuery: '',
    }
  },
  methods: {
    ...mapActions('library', ['addToFavorite', 'removeFromFavorites']),
    isNewDay(itemHistory, index) {
      const { historyInfo } = this
      return (
        !historyInfo[index - 1] ||
        (historyInfo[index - 1] &&
          getDate(historyInfo[index - 1].viewDateTime) !==
            getDate(itemHistory.viewDateTime))
      )
    },
    infiniteHandler($state) {
      this.getViewHistory().then((loadedCount) => {
        if (loadedCount >= this.limit) {
          $state.loaded()
        } else {
          if (loadedCount > 0) {
            $state.loaded()
          }
          $state.complete()
        }
      })
    },
    getViewHistory() {
      const params = {
        limit: this.limit,
        offset: this.currentPage * this.limit,
        q: this.searchQuery,
      }
      return this.$http
        .get('/api/library/history/lesson', { params })
        .then((res) => res.json())
        .then((historyInfo) => {
          this.historyInfo = this.historyInfo.concat(historyInfo)
          this.currentPage++
          return historyInfo.length
        })
        .finally(() => {})
    },
    getDateRepresent(dt) {
      const videoDatetime = parseJSON(dt)
      const now = new Date()
      if (format(videoDatetime, 'dd.MM.yyyy') === format(now, 'dd.MM.yyyy')) {
        return 'Сегодня'
      }
      if (differenceInDays(videoDatetime, now) === 1) {
        return 'Вчера'
      }
      return this.$date(videoDatetime, 'dd MMMM')
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
    goToVideoLesson(lessonID) {
      this.$router.push({
        name: 'VideoLessonHistory',
        props: { isHistory: true },
        params: { lessonID: lessonID },
      })
    },
    goToArticleLesson(lessonID) {
      this.$router.push({
        name: 'ArticleLessonHistory',
        props: { isHistory: true },
        params: { lessonID: lessonID },
      })
    },
    doSearch() {
      this.historyInfo = []
      this.currentPage = 0
      this.infiniteID += 1
    },
  },
}
</script>
