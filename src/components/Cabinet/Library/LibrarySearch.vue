<template>
  <div class="page page-library">
    <div class="container">
      <div class="page__header page__header--link">
        <router-link :to="{ name: 'LibraryMain' }" class="back-link">
          <i class="icon-back"></i> Библиотека
        </router-link>
        <div class="page__title">
          <h1>Поиск</h1>
          <div class="search">
            <button class="search__button" @click="getSearchResults">
              <i class="icon-search"></i>
            </button>
            <span class="pass-switch icon-close" @click="goToLibrary" />
            <input
              type="text"
              id="search-library"
              name="search-library"
              v-model="searchQuery"
              placeholder="Поиск по истории"
              @keydown.enter="getSearchResults"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="container" v-if="localLoading"><LoaderComponent /></div>
    <div class="container" v-else>
      <div class="search-filter__wrapper">
        <ul class="search-filter__category">
          <li
            v-for="blockInfo in blocks"
            :key="blockInfo.type"
            @click="selectedResultType = blockInfo.type"
          >
            <p
              class="search-filter__link add-pointer"
              :class="{ active: selectedResultType === blockInfo.type }"
            >
              {{ blockInfo.title }}
              <span class="counter">({{ blockInfo.count }})</span>
            </p>
          </li>
        </ul>
        <div class="search-filter__sort">
          <div
            class="search-filter__title"
            @click="sortSelectIsOpened = !sortSelectIsOpened"
            v-click-outside="vcoConfig"
          >
            Сортировка: <span>{{ selectedSortingItem.title }}</span>
            <i class="icon-arrow-down" />
          </div>
          <ul class="search-filter__list" :class="{ open: sortSelectIsOpened }">
            <li
              v-for="(item, id) in sortingItems"
              :key="id"
              @click="setSorting(item)"
            >
              <span
                :class="{ selected: selectedSortingItem.title == item.title }"
              >
                {{ item.title }}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="search-filter__wrapper">
        <div class="search-filter__tags" v-if="selectedResultType === 'video'">
          <div
            class="search-filter__tag"
            :class="{ active: timeFilterInfo.id === selectedTimeFilter.id }"
            v-for="timeFilterInfo in timeFilters"
            :key="timeFilterInfo.id"
            @click="setTimeFilter(timeFilterInfo)"
          >
            {{ timeFilterInfo.title }}
          </div>
        </div>
      </div>
    </div>
    <div class="container" v-if="!localLoading">
      <template>
        <div v-if="selectedResultType === 'video'">
          <span v-if="videoResults.count === 0">
            Ваш запрос не дал результатов
          </span>
          <ul class="search-result__list" v-else>
            <SearchLessonCard
              lesson-type="video"
              :lesson-info="lessonInfo"
              v-for="lessonInfo in videoResults.lessons"
              :key="lessonInfo.id"
            />
          </ul>
        </div>
        <div v-if="selectedResultType === 'audio'">
          <span v-if="audioResults.count === 0">
            Ваш запрос не дал результатов
          </span>
          <MusicSliderShort title="" :items="audioResults.lessons" />
        </div>
        <div v-if="selectedResultType === 'article'">
          <span v-if="articleResults.count === 0">
            Ваш запрос не дал результатов
          </span>
          <ul class="search-result__list" v-else>
            <SearchLessonCard
              lesson-type="article"
              :lesson-info="lessonInfo"
              v-for="lessonInfo in articleResults.lessons"
              :key="lessonInfo.id"
            />
          </ul>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import LoaderComponent from '@/components/UI/Components/LoaderComponent.vue'
import SearchLessonCard from '@/components/UI/Library/SearchLessonCard.vue'
import MusicSliderShort from '@/components/UI/Sliders/MusicSliderShort.vue'
import { mapActions } from 'vuex'

export default {
  name: 'LibrarySearchResult',
  components: { MusicSliderShort, SearchLessonCard, LoaderComponent },
  data() {
    return {
      vcoConfig: {
        handler: this.closeSortSelect,
        events: ['dblclick', 'click'],
      },
      searchQuery: '',
      localLoading: true,
      searchResults: null,
      selectedResultType: 'video',
      selectedTimeFilter: {},
      sortSelectIsOpened: false,
      selectedSortingItem: {},
      sortingItems: [
        {
          title: 'по релевантности (уб.)',
          field: 'sml',
          sortType: 'DESC',
        },
        {
          title: 'по релевантности (возр.)',
          field: 'sml',
          sortType: 'ASC',
        },
        {
          title: 'по названию (уб.)',
          field: 'title',
          sortType: 'DESC',
        },
        {
          title: 'по названию (возр.)',
          field: 'title',
          sortType: 'ASC',
        },
      ],
      timeFilters: [
        {
          id: 1,
          title: 'до 15 минут',
          gt: null,
          le: 900,
        },
        {
          id: 2,
          title: 'до 30 минут',
          gt: null,
          le: 1800,
        },
        {
          id: 3,
          title: 'до 60 минут',
          gt: null,
          le: 3600,
        },
        {
          id: 4,
          title: 'до 90 минут',
          gt: null,
          le: 5400,
        },
        {
          id: 5,
          title: '> 90 минут',
          gt: 5400,
          le: null,
        },
      ],
    }
  },
  methods: {
    ...mapActions('shared', ['setInfo']),
    middleware(event) {
      return event.target.className !== 'modal'
    },
    closeSortSelect() {
      this.sortSelectIsOpened = false
    },
    setSorting(item) {
      this.sortSelectIsOpened = false
      this.selectedSortingItem = item
      this.getSearchResults()
    },
    setTimeFilter(tf) {
      if (this.selectedTimeFilter === tf) {
        this.selectedTimeFilter = {}
      } else {
        this.selectedTimeFilter = tf
      }
      this.getSearchResults()
    },
    getSearchResults() {
      if (this.searchQuery === '') {
        this.setInfo('Заполните строку поиска')
        return
      }
      this.localLoading = true
      const params = {
        q: this.searchQuery,
        gt: this.selectedTimeFilter.gt,
        le: this.selectedTimeFilter.le,
        orderKey: this.selectedSortingItem.field,
        order: this.selectedSortingItem.sortType,
      }
      this.$http
        .get('/api/library/find', { params })
        .then((res) => res.json())
        .then((searchResults) => {
          this.searchResults = searchResults
        })
        .finally(() => {
          this.$nextTick(() => {
            this.localLoading = false
          })
        })
    },
    goToLibrary() {
      this.$router.push({ name: 'LibraryMain' })
    },
  },
  mounted() {
    this.searchQuery = this.$route.query.q
    this.selectedSortingItem = this.sortingItems[0]
    this.getSearchResults()
  },
  computed: {
    emptyResults() {
      return (
        this.videoResults.count === 0 &&
        this.articleResults.count === 0 &&
        this.audioResults.count === 0
      )
    },
    videoResults() {
      const kriays = this.searchResults?.blocks.find((x) => x.type === 'kriyas')
      const meditations = this.searchResults?.blocks.find(
        (x) => x.type === 'meditations'
      )
      const videoLessons = [...kriays.lessons, ...meditations.lessons]
      return {
        title: 'Крийи и медитации',
        type: 'video',
        count: videoLessons.length,
        lessons: videoLessons,
      }
    },
    audioResults() {
      const songs = this.searchResults?.blocks.find(
        (x) => x.type === 'songs'
      ).lessons
      return {
        title: 'Музыка и мантры',
        type: 'audio',
        count: songs.length,
        lessons: songs,
      }
    },
    articleResults() {
      const arcticles = this.searchResults?.blocks.find(
        (x) => x.type === 'article'
      ).lessons
      return {
        title: 'Статьи',
        type: 'article',
        count: arcticles.length,
        lessons: arcticles,
      }
    },
    blocks() {
      return [this.videoResults, this.audioResults, this.articleResults].map(
        (x) => {
          return {
            title: x.title,
            type: x.type,
            count: x.count,
          }
        }
      )
    },
  },
}
</script>
