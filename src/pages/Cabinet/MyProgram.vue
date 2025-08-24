<template>
  <LoaderComponent v-if="localLoading" />
  <div
    class="page page-program"
    v-else-if="Object.keys(programInfo).length !== 0"
  >
    <!-- <ModalPayment v-if="modalOpen" @close="modalOpen = false" /> -->
    <section class="section section--video">
      <div class="container">
        <TrialLesson v-if="user.subscription === false" />
        <div class="program-video__wrapper" v-if="user.subscription === true">
          <div class="progress">
            <p class="progress__title">Мой путь к цели</p>
            <div class="progress-bar__wrapper">
              <div class="progress-bar"></div>
              <div
                class="progress-bar__mask"
                :style="{ left: `${programInfo.progress}%` }"
              ></div>
              <div class="kirill_progress_bar_division">
                <div class="kirill_line"></div>
                <div class="kirill_line"></div>
                <div class="kirill_line"></div>
                <div class="kirill_line"></div>
                <div class="kirill_line"></div>
                <div class="kirill_line"></div>
                <div class="kirill_line"></div>
                <div class="kirill_line"></div>
                <div class="kirill_line"></div>
                <div class="kirill_line d_none"></div>
              </div>
            </div>
          </div>
          <div class="program-video__notice" v-if="isTrialPeriod">
            <i class="icon-info"></i>
            <p v-if="isTrialEnded === false">
              Действует пробный период.
              <span>{{ trialDayRepresent }} </span>
            </p>
            <p v-else>
              Срок пробного периода истек.
              <a
                class="add-pointer"
                @click="$router.push({ name: 'UserSubscription' })"
              >
                Приобретите доступ к программе.
              </a>
            </p>
          </div>
          <div
            class="program-video"
            v-if="
              lessonIsStarted === false && currentLesson.availability === true
            "
          >
            <div class="program-video__content">
              <img v-lazy="currentLesson.cover" alt="" />
            </div>
            <div class="program-video__controls program-video__controls--top">
              <div class="program-video__favorite">
                <i
                  :class="
                    currentLesson.isFavorite
                      ? 'icon-fav-filled'
                      : 'icon-favorite'
                  "
                  @click.prevent.stop="setFavorite(currentLesson)"
                />
              </div>
            </div>
            <div class="program-video__controls">
              <button class="button button--s2 button--t1" @click="startLesson">
                <i class="icon-play"></i>
                Начать занятие
              </button>
              <div class="program-video__status">
                <div
                  class="lessons__count add-pointer"
                  @click="openLessonRepeatsSetter(currentLesson.id)"
                >
                  {{ repeatsCompleted }}/{{
                    userRepeats === 0 ? repeats : userRepeats
                  }}
                </div>
                <span class="tooltip">{{ repeatsRepresent }}</span>
              </div>
            </div>
          </div>
          <div
            class="program-video"
            v-if="currentLesson.availability === false"
          >
            <div class="program-video__content"></div>
            <div class="program-video__blocked"><i class="icon-lock"></i></div>
          </div>
          <div class="program-video" v-else-if="lessonIsStarted">
            <div class="program-video__content">
              <!-- <YoutubePlayer
                :content-i-d="currentLesson.contentId"
                :content-i-d-vk="currentLesson.contentIdVk"
                :content-link="currentLesson.contentLink"
                :intro-duration="currentLesson.introDuration"
                @on-lesson-ended="lessonEnded"
              /> -->
              <VideoPlayer
                :content-link="currentLesson.contentLink"
                :intro-duration="currentLesson.introDuration"
                @on-lesson-ended="lessonEnded"
              />
            </div>
          </div>
          <div class="program-video__title">
            <h2>Практика «{{ currentLesson.title }}»</h2>
            <div class="program-video__info">
              <div class="program-video__duration">{{ lessonDuration }}</div>
              <i
                :class="
                  currentLesson.isFavorite ? 'icon-fav-filled' : 'icon-favorite'
                "
                @click.prevent.stop="setFavorite(currentLesson)"
              />
            </div>
          </div>
          <div class="program-video__description">
            <!-- <p v-html="currentLesson.description" /> -->
            <div class="kirill_program_description__name">
              из программы «{{ programTitle }}»
            </div>
          </div>
        </div>
      </div>
    </section>
    <StartSection />
    <SubscriptionProgram v-if="user.subscription === false" />
    <section class="section section--program-description">
      <!-- <img
        src="@/assets/img/backgrounds/program-description-bg.jpg"
        class="program-description__img"
        alt=""
      /> -->
      <div class="kirill_container_program_lessons">
        <div class="program-description" v-if="localLoading === false">
          <div>
            <div class="program-description__name">Моя программа</div>
            <h3 class="program-description__title">{{ programTitle }}</h3>
            <div
              class="program-description__text"
              :class="{ active: showAllDescription }"
            >
              <p v-html="programBody" />
              <div class="kirill_box_questionnaire__diagram_v2">
                <div class="kirill_section_questionnaire__diagram">
                  <div class="kirill_questionnaire_text">
                    Ваше колесо баланса
                  </div>
                  <BalanceWheel />
                </div>
              </div>
            </div>
          </div>
          <div class="kirill_box_questionnaire__diagram">
            <div class="kirill_section_questionnaire__diagram">
              <div class="kirill_questionnaire_text">Ваше колесо баланса</div>
              <BalanceWheel />
            </div>
          </div>
        </div>
        <div
          class="read-more__text"
          :class="{ active: showAllDescription }"
          @click="toggleShowDescription"
        >
          {{ showAllDescription ? 'Скрыть' : 'Показать полностью' }}
          <i class="icon-arrow-down" />
        </div>
        <div class="kirill_title_practice">
          Начните заниматься по любой из практик ниже
        </div>
        <section class="section section--lessons">
          <LessonsSlider :items="programInfo.lessons.items" />
        </section>
      </div>
    </section>
    <MySharings :key="sharingID" />
    <section class="section section--sharing">
      <UserStatistics :key="sharingID" />
      <div class="container" v-if="!isTrialPeriod">
        <div class="sharing__wrapper">
          <div class="sharing__choose">
            <p>Хотите улучшить другую сферу вашей жизни?</p>
            <router-link to="/survey/" class="button button--s2 button--t1">
              Подобрать новую программу
            </router-link>
          </div>
        </div>
      </div>
    </section>
    <!-- <RecommendedArticle
      :article-info="recommendedArticle"
      @on-close-recommendation="recommendedArticle = null"
      @on-read-article="(articleID) => goToArticle(articleID)"
      v-if="recommendedArticle !== null"
    /> -->
    <SharingComponent
      :lesson-i-d="currentLesson.id"
      @on-close-modal="(payload) => closeSharingModal(payload)"
      v-if="showSharing"
    />
    <LessonRepeatsSetter
      :lessonID="repeatsLessonID"
      :current-repeats-count="repeatsRepeatsCount"
      @on-close-modal="(payload) => closeLessonRepeats(payload)"
      v-if="showLessonRepeatSetter"
    />
    <SurveyFinalQuestionModal
      :program-title="programInfo.about.title"
      @on-close-modal="showSurveyFinalQuestionModal = false"
      @on-select-answer="(answer) => closeSurveyFinalQuestion(answer)"
      v-if="showSurveyFinalQuestionModal"
    />
    <div class="kirill_footer_nav">
      <div class="kirill_advantage_online_text">Задайте нам вопрос</div>
      <div class="kirill_box_button_nav">
        <a href="https://t.me/YYCareLife" class="kirill_button_nav"
          ><img src="@/assets/img/icons/telegram.svg"
        /></a>
        <a href="https://wa.me/message/AKZBY44543YRD1" class="kirill_button_nav"
          ><img src="@/assets/img/icons/whatsapp.svg"
        /></a>
      </div>
    </div>
  </div>
  <div class="page page-program" v-else>
    <div class="container">
      <TrialLesson v-if="user.subscription === false" />
    </div>
    <div class="container kirill_section_popular_program">
      <h1 class="section__title kirill_text_align_center">
        Начните занятие с наших самых популярных программ
      </h1>
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
      <router-link class="kirill_link_library" to="/cabinet/library"
        >Посмотреть все программы</router-link
      >
    </div>
    <section class="section section--01">
      <div class="container">
        <div class="section__content">
          <h1 class="section__title">Ваша индивидуальная программа</h1>
          <div class="section__description">
            Сделайте занятия по Кундалини йоги максимально эффективными,
            подобрав индивидуальную программу отвечающую вашим потребностям и
            возможностям.
          </div>
          <router-link to="/survey/" class="button button--s1 button--t1">
            <span>Подобрать программу</span>
          </router-link>
        </div>
        <img
          class="section__pic"
          src="@/assets/img/section/pic07.webp"
          alt="Yoga Care"
        />
      </div>
    </section>
    <SubscriptionProgram v-if="user.subscription === false" />
    <MySharings />
    <section class="section section--sharing">
      <UserStatistics />
    </section>
    <div class="kirill_footer_nav">
      <div class="kirill_advantage_online_text">Задайте нам вопрос</div>
      <div class="kirill_box_button_nav">
        <a href="https://t.me/YYCareLife" class="kirill_button_nav"
          ><img src="@/assets/img/icons/telegram.svg"
        /></a>
        <a href="https://wa.me/message/AKZBY44543YRD1" class="kirill_button_nav"
          ><img src="@/assets/img/icons/whatsapp.svg"
        /></a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import LessonsSlider from '@/components/UI/Sliders/LessonsSlider.vue'
import LoaderComponent from '@/components/UI/Components/LoaderComponent.vue'
import SubscriptionProgram from '@/components/Cabinet/Subscriptions/SubscriptionProgram.vue'
// import YoutubePlayer from '@/components/Cabinet/YouTubePlayer.vue'
import VideoPlayer from '@/components/Cabinet/VideoPlayer.vue'
import SharingComponent from '@/components/UI/Components/SharingComponent.vue'
import LessonRepeatsSetter from '@/components/Cabinet/Library/LessonRepeatsSetter.vue'
import SurveyFinalQuestionModal from '@/components/Cabinet/SurveyFinalQuestionModal.vue'
import { differenceInCalendarDays, parseJSON } from 'date-fns'
import { declOfNum } from '@/utils/'
import MySharings from '@/components/UI/Components/MySharings.vue'
// import RecommendedArticle from '@/components/Cabinet/Library/RecommendedArticle.vue'
import UserStatistics from '@/components/UI/Components/UserStatistics.vue'
import StartSection from '@/components/UI/Components/StartSection.vue'
import TrialLesson from '@/components/UI/Components/TrialLesson.vue'
import BalanceWheel from '@/components/Cabinet/BalanceWheel.vue'
// import ModalPayment from '@/components/Cabinet/Subscriptions/ModalPayment.vue'
// import ChartBalance from '@/components/Survey/ChartBalance.vue'

export default {
  name: 'MyProgram',
  components: {
    UserStatistics,
    // RecommendedArticle,
    MySharings,
    LessonRepeatsSetter,
    SharingComponent,
    // YoutubePlayer,
    VideoPlayer,
    SubscriptionProgram,
    LoaderComponent,
    LessonsSlider,
    SurveyFinalQuestionModal,
    // ChartBalance,
    StartSection,
    BalanceWheel,
    TrialLesson,
    // ModalPayment,
  },
  metaInfo() {
    return {
      title: 'Моя программа',
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: 'Ваша персональная программа практик Кундалини-йоги.',
        },
      ],
    }
  },
  data() {
    return {
      localLoading: true,
      programInfo: {},
      lessonIsStarted: false,
      showSharing: false,
      showLessonRepeatSetter: false,
      repeatsLessonID: 0,
      repeatsRepeatsCount: 0,
      showAllDescription: true,
      showSurveyFinalQuestionModal: false,
      recommendedArticle: null,
      sharingID: 0,
      libraryInfo: null,
      isSearching: false,
      searchQuery: '',
      modalOpen: false,
    }
  },
  methods: {
    closeModal() {
      this.$emit('on-close-modal')
    },
    declOfNum,
    ...mapActions('library', [
      'incrementLessonRepeats',
      'addToFavorite',
      'removeFromFavorites',
    ]),
    ...mapActions('user', ['setMotivation', 'setSurveyStatus']),
    ...mapActions('audioPlayer', ['pauseSong']),
    openLessonRepeatsSetter(id) {
      this.repeatsLessonID = id
      this.repeatsRepeatsCount =
        this.userRepeats === 0 ? this.repeats : this.userRepeats
      this.showLessonRepeatSetter = true
    },
    closeLessonRepeats(payload) {
      if (payload !== false) {
        this.programInfo.lessons.current.userRepeats = payload
      }
      this.showLessonRepeatSetter = false
    },
    startLesson() {
      this.pauseSong()
      this.lessonIsStarted = true
    },
    async lessonEnded() {
      this.incrementLessonRepeats(this.currentLesson.id)
      this.showSharing = true
      this.lessonIsStarted = false
      document.querySelector('.header').style.zIndex = '1'
      document.querySelector('.menu-mobile').style.zIndex = '1'
    },
    getRecommendedArticle() {
      this.$http
        .get('/api/library/recommendation')
        .then((res) => res.json())
        .then((articleInfo) => {
          if (articleInfo?.id !== 0) {
            this.recommendedArticle = articleInfo
          }
        })
    },
    closeSharingModal() {
      this.showSharing = false
      document.querySelector('.header').style.zIndex = '3'
      document.querySelector('.menu-mobile').style.zIndex = '3'
      this.getMyProgram().then(() => {
        this.getRecommendedArticle()
      })
    },
    getMyProgram() {
      return this.$http
        .get('/api/program/my')
        .then((res) => res.json())
        .then((programInfo) => {
          this.programInfo = programInfo
          if (programInfo.progress == 100) {
            this.$router.push({
              name: 'MyProgramFinal',
            })
            return
          }
          this.sharingID += 1
          if (
            programInfo?.motivation &&
            programInfo?.motivation?.body !== '' &&
            this.user.surveyStatus.accepted !== null
          ) {
            this.setMotivation(programInfo.motivation)
          }
        })
        .finally(() => {
          this.localLoading = false
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
    closeSurveyFinalQuestion(answer) {
      let result = ''
      if (answer === true) {
        result = 'accept'
      } else {
        result = 'decline'
      }
      this.$http.post(`/api/program/survey/${result}`).finally(() => {
        const surveyStatus = {
          passed: true,
          accepted: result,
        }
        this.setSurveyStatus(surveyStatus)
        this.showSurveyFinalQuestionModal = false
      })
    },
    goToArticle(articleID) {
      this.recommendedArticle = null
      // increment article view count
      this.$http.post(`/api/library/lesson/${articleID}/repeats`).then(() => {
        this.$router.push({
          name: 'ArticleLessonS',
          params: { lessonID: articleID },
        })
      })
    },
    getLibraryContent() {
      this.localLoading = true
      this.$http
        .get('/api/library/program/popular')
        .then((res) => res.json())
        .then((libraryInfo) => {
          this.libraryInfo = libraryInfo
        })
        .finally(() => {
          this.localLoading = false
        })
    },
    toggleShowDescription() {
      this.showAllDescription = !this.showAllDescription
      // Сохраняем значение в localStorage
      localStorage.setItem('showAllDescription', this.showAllDescription)
    },
  },

  beforeMount() {
    this.getMyProgram()
  },
  mounted() {
    if (this.user?.surveyStatus?.accepted === null) {
      this.showSurveyFinalQuestionModal = true
    }
    this.getLibraryContent()
    const storedShowDescription = localStorage.getItem('showAllDescription')
    if (storedShowDescription !== null) {
      this.showAllDescription = JSON.parse(storedShowDescription)
    }
  },
  computed: {
    ...mapGetters('user', ['isTrialPeriod', 'user', 'isTrialEnded']),
    userStatistics() {
      return this.programInfo?.statistic
    },
    programTitle() {
      return this.programInfo?.about?.title
    },
    programBody() {
      return this.programInfo?.about?.body
    },
    currentLesson() {
      return this.programInfo?.lessons?.current
    },
    repeatsCompleted() {
      return this.currentLesson?.repeatsCompleted
    },
    repeats() {
      return this.currentLesson?.repeats
    },
    userRepeats() {
      return this.currentLesson?.userRepeats
    },
    lessonDuration() {
      const duration = Math.round(this.currentLesson.duration / 60)
      return `${duration} ${declOfNum(duration, ['минута', 'минуты', 'минут'])}`
    },
    repeatsRepresent() {
      const repeatsCompleted = this.currentLesson.repeatsCompleted
      const part1 = `Вы занимаетесь ${repeatsCompleted} ${declOfNum(
        repeatsCompleted,
        ['день', 'дня', 'дней']
      )}`
      const part2 = ` из ${
        this.userRepeats === 0 ? this.repeats : this.userRepeats
      }`
      return part1 + part2
    },
    trialDayRepresent() {
      const subscriptionEnd = parseJSON(this.user.subscriptionEnd)
      let diff = differenceInCalendarDays(subscriptionEnd, new Date())
      if (diff === 0) {
        diff = 1
      }
      return `${declOfNum(diff, [
        'Остался',
        'Осталось',
        'Осталось',
      ])} ${diff} ${declOfNum(diff, ['день', 'дня', 'дней'])}`
    },
  },
}
</script>
