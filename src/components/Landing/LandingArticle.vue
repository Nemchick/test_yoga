<template>
  <div class="helper landing">
    <LandingHeader />
    <main class="main">
      <div class="page page-library">
        <LoaderComponent v-if="localLoading" />
        <template v-else>
          <div class="container">
            <div class="library-article__header">
              <h1 class="library-article__title">{{ lessonInfo.title }}</h1>
              <div
                class="library-article__short"
                v-html="lessonInfo.description"
              />
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
      <div class="container">
        <div class="kirill_section_button_lending">
          <div class="kirill_section_description_lending">
            Заполните анкету, получите персональную программу тренировок
            кундалини-йогой и бесплатный доступ на 7 дней к видеобиблиотеке
            практик и медитаций.
          </div>
          <div class="kirill_conteiner_vector_button">
            <div class="kirill_conteiner_vector_text">
              <img
                class="kirill_conteiner_vector_two"
                src="@/assets/img/elements/Vector 2.svg"
                alt="arrow button"
              />
            </div>
            <router-link
              to="/survey/"
              class="button kirill_button--s1 button--t1"
            >
              Подобрать программу
            </router-link>
          </div>
        </div>
      </div>
      <LandingFooter />
    </main>
  </div>
</template>

<script>
import LandingHeader from '@/components/Landing/LandingHeader.vue'
import LoaderComponent from '@/components/UI/Components/LoaderComponent.vue'
import getLessonInfoLanding from '@/mixins/getLessonInfoLanding'
import LandingFooter from '@/components/Landing/LandingFooter.vue'
// import RegisterModal from '@/pages/User/RegisterModal.vue'

export default {
  name: 'LandingArticle',
  components: { LoaderComponent, LandingHeader, LandingFooter },
  mixins: [getLessonInfoLanding],
  data() {
    return {}
  },
}
</script>
<style scoped>
.kirill_section_button_lending {
  justify-content: center;
  padding: 0px 0px 40px 0px;
  gap: 40px;
  flex-direction: column;
  max-width: 844px;
  margin: auto;
  align-items: center;
}
.kirill_section_description_lending {
  max-width: 100%;
}
</style>
