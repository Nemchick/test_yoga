<template>
  <div class="page page-library" v-if="isSearching === false">
    <div class="container">
      <div class="page__header">
        <div class="page__title">
          <h1>Библиотека</h1>
          <div class="library--pro" v-if="false">Pro</div>
        </div>
        <div class="search">
          <button class="search__button" @click="doSearch">
            <i class="icon-search" />
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
            placeholder="Поиск"
            v-model="searchQuery"
            @keydown.enter="doSearch"
          />
        </div>
      </div>
      <div class="library__wrapper">
        <LoaderComponent v-if="localLoading" />
        <template v-else>
          <div class="library__header">
            <router-link
              to="/cabinet/history"
              class="button button--history button--t3"
            >
              <i class="icon-refresh"></i> История просмотров
            </router-link>
          </div>
          <ul class="library__list">
            <li
              class="library-item"
              v-for="item in libraryInfo"
              :key="item.id"
              @click="
                $router.push({
                  name: 'LibDetails',
                  params: { libID: item.id },
                })
              "
            >
              <div class="library-item__img">
                <img v-lazy="item.about.cover" :alt="item.about.title" />
              </div>
              <div class="library-item__name">
                <a href="" class="library-item__link"
                  >{{ item.about.title }}<i class="icon-arrow-link"></i
                ></a>
              </div>
            </li>
          </ul>
        </template>
      </div>
    </div>
  </div>
  <LibrarySearchResult :search-query="searchQuery" v-else />
</template>

<script>
import LoaderComponent from '@/components/UI/Components/LoaderComponent.vue'
import { mapGetters } from 'vuex'
import LibrarySearchResult from '@/components/Cabinet/Library/LibrarySearch.vue'

export default {
  name: 'LibraryMain',
  components: { LibrarySearchResult, LoaderComponent },
  metaInfo() {
    return {
      title: 'Библиотека медитаций и крий для занятия Йогой',
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content:
            'Выбирайте видео-уроки из обширной библиотеки крийи и медитаций. Музыка и полезные статьи, крийи и медитации - найдите материалы из собранной библиотеки сервиса Yoga Care. Воспользуйтесь поиском по вашему вопросу.',
        },
        {
          vmid: 'keywords',
          name: 'keywords',
          content:
            'библиотека медитация, библиотека крий, библиотека йога, библиотека кундалили йога',
        },
      ],
    }
  },
  data() {
    return {
      localLoading: false,
      libraryInfo: null,
      isSearching: false,
      searchQuery: '',
    }
  },
  methods: {
    getLibraryContent() {
      this.localLoading = true
      this.$http
        .get('/api/library/program')
        .then((res) => res.json())
        .then((libraryInfo) => {
          this.libraryInfo = libraryInfo
        })
        .finally(() => {
          this.localLoading = false
        })
    },
    doSearch() {
      this.$router.push({
        name: 'LibrarySearch',
        query: {
          q: this.searchQuery,
        },
      })
    },
  },
  mounted() {
    this.getLibraryContent()
  },
  computed: {
    ...mapGetters('user', ['isTrialPeriod']),
  },
}
</script>
