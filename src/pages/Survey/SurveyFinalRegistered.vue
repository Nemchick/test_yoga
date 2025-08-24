<template>
  <div class="helper-simple">
    <main class="main">
      <div class="questionnaire questionnaire--step18">
        <div class="questionnaire__header">
          <div class="questionnaire__header--left">
            <div class="logo">
              <a @click="$router.push('/')">
                <img src="@/assets/img/logos/logo-white.svg" alt="" />
              </a>
            </div>
          </div>
        </div>
        <div class="questionnaire__content">
          <div class="questionnaire-form">
            <div class="questionnaire-form__wrapper">
              <LoaderComponent v-if="localLoading" />
              <template v-else>
                <div class="form">
                  <div class="questionnaire__title">
                    <img src="@/assets/img/icons/accept.svg" alt="" />
                    <h1>Вам подобрана персональная программа</h1>
                  </div>
                  <div class="questionnaire__description">
                    <p>
                      Мы подобрали для вас практику, которая поможет в
                      достижении ваших целей.
                    </p>
                  </div>
                  <button
                    class="button button--t1"
                    @click.prevent.stop="$router.push('/')"
                  >
                    <span>Приступить к занятиям</span>
                  </button>
                </div>
              </template>
            </div>
            <div class="form__img">
              <picture>
                <source
                  srcset="@/assets/img/elements/form-img.jpg"
                  media="(min-width: 680px)"
                />
                <img src="@/assets/img/elements/form-img-mob.jpg" alt="" />
              </picture>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import LoaderComponent from '@/components/UI/Components/LoaderComponent.vue'

export default {
  name: 'SurveyFinalRegistered',
  components: { LoaderComponent },
  data() {
    return {
      localLoading: true,
      programInfo: null,
    }
  },
  methods: {
    ...mapActions('survey', ['restoreSurveyResults', 'clearSurveyResults']),
    ...mapActions('user', ['setUser']),
    sendResults() {
      this.localLoading = true
      const payload = {
        uid: this.user.email,
        answers: this.surveyResults,
        utm: JSON.parse(localStorage.getItem('utm')) || {},
      }
      this.$http
        .post('/api/program/survey', payload)
        .then((res) => res.json())
        .then(async (programInfo) => {
          this.programInfo = programInfo
          this.clearSurveyResults()
          // get updated user info
          await this.$http
            .get('/api/user')
            .then((res) => res.json())
            .then((userInfo) => {
              this.setUser(userInfo)
            })
        })
        .finally(() => {
          this.localLoading = false
        })
    },
  },
  beforeMount() {
    // restore results
    this.restoreSurveyResults()
  },
  mounted() {
    if (!this.surveyResults) {
      this.$router.push('/')
      return
    }
    this.sendResults()
  },
  computed: {
    ...mapGetters('survey', ['surveyResults']),
    ...mapGetters('user', ['user']),
  },
}
</script>

<style scoped></style>
