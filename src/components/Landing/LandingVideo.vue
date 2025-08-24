<template>
  <div class="helper landing">
    <LandingHeader />
    <main class="main">
      <div class="page page-library">
        <LoaderComponent v-if="localLoading" />
        <template v-else>
          <div class="container">
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
                  <h3>{{ lessonInfo.title }}</h3>
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
          </div>
        </template>
      </div>
    </main>
  </div>
</template>

<script>
import LandingHeader from '@/components/Landing/LandingHeader.vue'
import LoaderComponent from '@/components/UI/Components/LoaderComponent.vue'
import getFreeLessonInfo from '@/mixins/getFreeLessonInfo'
import MySubscriptionLesson from '@/components/Cabinet/Subscriptions/SubscriptionLesson.vue'
import VideoPlayer from '@/components/Cabinet/VideoPlayer.vue'
import { mapActions } from 'vuex'

export default {
  name: 'LandingArticle',
  components: {
    MySubscriptionLesson,
    LoaderComponent,
    LandingHeader,
    VideoPlayer,
  },
  mixins: [getFreeLessonInfo],
  data() {
    return {
      lessonIsStarted: false,
    }
  },
  methods: {
    ...mapActions('library', ['addToFavorite', 'removeFromFavorites']),
    startLesson() {
      this.lessonIsStarted = true
    },
    lessonEnded() {
      this.lessonIsStarted = false
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
}
</script>
