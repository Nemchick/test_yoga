<template>
  <div class="helper landing">
    <LandingHeader />
    <main class="main">
      <div class="page page-library">
        <div class="container">
          <h1>Библиотека статей</h1>
          <LoaderComponent v-if="localLoading" />
          <ul v-else class="library__list">
            <li class="library-item" v-for="item in libraryInfo" :key="item.id">
              <router-link
                class="library-item__link-wrapper"
                :to="`/article/${item.id}`"
              >
                <div class="library-item__img">
                  <img v-lazy="item.about.cover" :alt="item.about.title" />
                </div>
                <div class="library-item__name">
                  <span class="library-item__link">
                    {{ item.about.title }}
                    <i class="icon-arrow-link"></i>
                  </span>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </main>
    <LandingFooter />
  </div>
</template>

<script>
import LandingHeader from '@/components/Landing/LandingHeader.vue'
import LandingFooter from '@/components/Landing/LandingFooter.vue'
import LoaderComponent from '@/components/UI/Components/LoaderComponent.vue'

export default {
  name: 'LandingArticles',
  components: { LandingHeader, LoaderComponent, LandingFooter },
  data() {
    return {
      localLoading: true,
      libraryInfo: [], // вместо articles
    }
  },
  mounted() {
    console.log('LandingArticles mounted')
    this.fetchArticles()
  },
  methods: {
    fetchArticles() {
      this.localLoading = true
      console.log('Начинаю запрос статей...')

      this.$http
        .get('/api/library/program/articles')
        .then((res) => {
          console.log('Ответ от сервера:', res)

          // Проверим, что это объект и есть blocks
          const blocks = res.data?.blocks || []

          // Извлекаем все lessons из всех блоков
          const allLessons = blocks.flatMap((block) => block.lessons || [])

          // Мапим lessons в формат, подходящий под компонент
          this.libraryInfo = allLessons.map((lesson) => ({
            id: lesson.id,
            about: {
              title: lesson.title,
              cover: lesson.cover,
            },
          }))
        })
        .catch((err) => {
          console.error('Ошибка загрузки статей:', err)
        })
        .finally(() => {
          console.log('Загрузка завершена')
          this.localLoading = false
        })
    },
  },
}
</script>

<style scoped></style>
