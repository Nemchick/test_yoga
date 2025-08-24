<template>
  <div class="page page-library">
    <LoaderComponent v-if="localLoading" />
    <template v-else>
      <div class="container">
        <div class="page__header page__header--link">
          <a class="back-link add-pointer" @click.prevent.stop="goBack">
            <i class="icon-back"></i>
            {{ header }}
          </a>
        </div>
        <div class="library-video__grid" v-if="lessonInfo.availability">
          <div class="library-video__wrapper">
            <div class="program-video" v-if="lessonIsStarted === false">
              <div class="program-video__content">
                <img
                  class="program-video__overlay"
                  v-lazy="lessonInfo.cover"
                  alt=""
                />
              </div>
              <div class="program-video__controls program-video__controls--top">
                <div class="program-video__favorite">
                  <i
                    :class="
                      lessonInfo.isFavorite
                        ? 'icon-fav-filled'
                        : 'icon-favorite'
                    "
                    @click.prevent.stop="setFavorite(lessonInfo)"
                  />
                </div>
              </div>
              <div class="program-video__controls">
                <button
                  class="button button--s2 button--t1"
                  @click="startLesson"
                >
                  <i class="icon-play"></i><span>Начать занятие</span>
                </button>
                <div
                  class="program-video__status"
                  v-if="lessonInfo.repeats !== undefined"
                >
                  <i
                    class="icon-calendar"
                    @click="showLessonRepeatsSetter"
                    v-if="lessonInfo.userRepeats === 0"
                  />
                  <template v-else>
                    <div
                      class="lessons__count add-pointer"
                      @click="showLessonRepeatsSetter"
                    >
                      {{ lessonInfo.repeatsCompleted }}/{{
                        lessonInfo.userRepeats
                      }}
                    </div>
                    <span class="tooltip">
                      {{ repeatsRepresent }}
                    </span>
                  </template>
                </div>
              </div>
            </div>
            <div class="program-video" v-else>
              <div class="program-video__content">
                <!-- <YoutubePlayer
                  :content-i-d-vk="lessonInfo.contentIdVk"
                  :content-i-d="lessonInfo.contentId"
                  :content-link="lessonInfo.contentLink"
                  :intro-duration="lessonInfo.introDuration"
                  @on-lesson-ended="lessonEnded"
                /> -->
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
                <span class="program-video__duration"
                  >{{ Math.round(lessonInfo.duration / 60) }} мин.</span
                >
                <i
                  :class="
                    lessonInfo.isFavorite ? 'icon-fav-filled' : 'icon-favorite'
                  "
                  @click.prevent.stop="setFavorite(lessonInfo)"
                />
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
    <SharingComponent
      :lesson-i-d="lessonInfo.id"
      @on-close-modal="(payload) => closeSharingModal(payload)"
      v-if="showSharing"
    />
    <LessonRepeatsSetter
      :lessonID="lessonInfo.id"
      :current-repeats-count="lessonInfo.repeats"
      @on-close-modal="(payload) => closeLessonRepeats(payload)"
      v-if="showLessonRepeatSetter"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import LoaderComponent from '@/components/UI/Components/LoaderComponent.vue'
import getLessonInfo from '@/mixins/getLessonInfo'
import MySubscriptionLesson from '@/components/Cabinet/Subscriptions/SubscriptionLesson.vue'
// import YoutubePlayer from '@/components/Cabinet/YouTubePlayer.vue'
import VideoPlayer from '@/components/Cabinet/VideoPlayer.vue'
import SharingComponent from '@/components/UI/Components/SharingComponent.vue'
import LessonRepeatsSetter from '@/components/Cabinet/Library/LessonRepeatsSetter.vue'
import { declOfNum } from '@/utils'
import user from '@/store/user'
export default {
  name: 'VideoLesson',
  components: {
    LessonRepeatsSetter,
    SharingComponent,
    // YoutubePlayer,
    VideoPlayer,
    MySubscriptionLesson,
    LoaderComponent,
  },
  mixins: [getLessonInfo],
  data() {
    return {
      lessonInfo: null,
      localLoading: true,
      libID: 0,
      lessonID: '',
      lessonIsStarted: false,
      showSharing: false,
      showLessonRepeatSetter: false,
      repeatsRepeatsCount: 0,
    }
  },
  methods: {
    ...mapActions('library', [
      'incrementLessonRepeats',
      'addToFavorite',
      'removeFromFavorites',
    ]),
    ...mapActions('shared', ['setSuccess']),
    ...mapActions('audioPlayer', ['pauseSong']),
    showLessonRepeatsSetter() {
      this.repeatsRepeatsCount =
        this.lessonInfo.userRepeats === 0
          ? this.lessonInfo.repeats
          : this.lessonInfo.userRepeats
      this.showLessonRepeatSetter = true
    },
    closeLessonRepeats(payload) {
      if (payload !== false) {
        this.lessonInfo.userRepeats = payload
      }
      this.showLessonRepeatSetter = false
    },
    startLesson() {
      this.pauseSong()
      this.lessonIsStarted = true
    },
    closeSharingModal() {
      this.showSharing = false
    },
    async lessonEnded() {
      await this.incrementLessonRepeats(this.lessonID).then(() => {
        this.lessonInfo.repeatsCompleted += 1
      })
      this.showSharing = true
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
  computed: {
    user() {
      return user
    },
    ...mapGetters('user', ['isTrialPeriod']),
    repeats() {
      return this.lessonInfo?.repeats
    },
    userRepeats() {
      return this.lessonInfo?.userRepeats
    },
    repeatsRepresent() {
      const repeatsCompleted = this.lessonInfo.repeatsCompleted
      const part1 = `Вы занимаетесь ${repeatsCompleted} ${declOfNum(
        repeatsCompleted,
        ['день', 'дня', 'дней']
      )}`
      const part2 = ` из ${this.userRepeats}`
      return part1 + part2
    },
  },
}
</script>
