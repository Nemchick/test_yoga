<template>
  <div class="helper landing">
    <ModalPayment v-if="isModalVisible" @close="isModalVisible = false" />
    <main class="main">
      <template>
        <div class="library-video__grid" v-if="lessonInfo.availability">
          <div class="library-video__wrapper">
            <div class="program-video" v-if="!lessonIsStarted">
              <div class="program-video__content">
                <img
                  class="program-video__overlay"
                  v-lazy="lessonInfo.cover"
                  alt=""
                />
              </div>
              <div
                class="program-video__controls program-video__controls--top"
              ></div>
              <div class="program-video__controls">
                <button
                  class="button button--s2 button--t1"
                  @click="startLesson"
                >
                  <i class="icon-play"></i><span>Начать занятие</span>
                </button>
              </div>
            </div>

            <div class="program-video" v-else>
              <div class="program-video__content">
                <VideoPlayer
                  :content-link="lessonInfo.contentLink"
                  :intro-duration="lessonInfo.introDuration"
                  @on-lesson-ended="lessonEnded"
                />
              </div>
            </div>

            <div class="program-video__title">
              <h3>
                {{ lessonInfo.title }}<br />
                Пробное занятие
              </h3>
              <div class="program-video__info">
                <span class="program-video__duration">
                  {{ Math.round(lessonInfo.duration / 60) }} мин.
                </span>
              </div>
            </div>
            <p
              class="library-video__description"
              v-html="lessonInfo.description"
            />
          </div>
        </div>

        <div class="library-video__grid" v-else>
          <div class="library-video__wrapper">
            <div class="program-video">
              <div class="program-video__content">
                <img
                  class="program-video__overlay"
                  v-lazy="lessonInfo.cover"
                  alt=""
                />
              </div>
              <div class="program-video__blocked">
                <i class="icon-lock"></i>
              </div>
            </div>
            <div class="program-video__title">
              <h3>{{ lessonInfo.title }}</h3>
              <div class="program-video__info">
                <span class="program-video__duration"
                  >{{ Math.round(lessonInfo.duration / 60) }} мин.</span
                >
              </div>
            </div>
            <p
              class="library-video__description"
              v-html="lessonInfo.description"
            />
          </div>
          <MySubscriptionLesson :lesson-info="lessonInfo" />
        </div>
      </template>
    </main>
  </div>
</template>

<script>
import MySubscriptionLesson from '@/components/Cabinet/Subscriptions/SubscriptionLesson.vue'
import VideoPlayer from '@/components/Cabinet/VideoPlayer.vue'
import ModalPayment from '@/components/Cabinet/Subscriptions/ModalPayment.vue'
import {
  canShowModalOncePerDay,
  saveModalShownTime,
} from '@/mixins/modalFrequency'
import { mapActions } from 'vuex'

export default {
  name: 'LandingArticle',
  components: {
    MySubscriptionLesson,
    VideoPlayer,
    ModalPayment,
  },
  data() {
    return {
      lessonIsStarted: false,
      lessonID: 14, // жестко заданный ID
      lessonInfo: null,
      localLoading: true,
      isModalVisible: false,
    }
  },
  methods: {
    ...mapActions('library', ['incrementLessonRepeats']),
    startLesson() {
      this.lessonIsStarted = true
    },
    async lessonEnded() {
      this.lessonIsStarted = false

      // 👉 вот этот запрос
      await this.incrementLessonRepeats(this.lessonInfo.id)

      if (canShowModalOncePerDay()) {
        this.isModalVisible = true
        saveModalShownTime()
      }
    },

    setFavorite(item) {
      item.isFavorite = !item.isFavorite
    },
    getLessonInfo() {
      this.localLoading = true
      this.$http
        .get(`/api/library/free/${this.lessonID}`)
        .then((res) => res.json())
        .then(
          (lessonInfo) => {
            this.lessonInfo = lessonInfo
          },
          (err) => {
            if (err.status === 404) {
              this.$router.push({ name: 'Error404' })
            }
          }
        )
        .finally(() => {
          this.localLoading = false
        })
    },
  },
  mounted() {
    this.getLessonInfo()
  },
}
</script>
<style scoped>
.helper {
  padding: 0px;
  min-height: fit-content;
}
.library-video__grid {
  display: flex;
}
.library-video__wrapper {
  width: 100%;
}
</style>
