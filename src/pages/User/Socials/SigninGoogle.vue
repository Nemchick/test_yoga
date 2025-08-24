<template>
  <div class="helper-simple">
    <main class="main">
      <div class="page page-form">
        <div class="logo">
          <router-link to="/">
            <i class="icon-logo" />
          </router-link>
        </div>
        <div class="form-wrapper">
          <div class="form form--confirm">
            <div class="form__heading">
              <h2 class="form__title">Авторизация Google</h2>
              <LoaderComponent v-if="localLoading" />
              <div class="form__subtitle" v-else-if="errorLinking === false">
                Выполняется авторизация через учетную запись Google
              </div>
              <div class="form__subtitle" v-else>
                При попытке авторизации через учетную запись Google произошла
                ошибка
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import LoaderComponent from '@/components/UI/Components/LoaderComponent.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'SigninGoogle',
  components: { LoaderComponent },
  data() {
    return {
      localLoading: false,
      token: '',
      errorLinking: false,
    }
  },
  methods: {
    ...mapActions('user', ['setUser', 'setAuthToken']),
    ...mapActions('survey', ['restoreSurveyResults', 'clearSurveyResults']),
    verifySocial() {
      const payload = {
        token: this.token,
        utm: JSON.parse(localStorage.getItem('utm')) || {},
      }
      this.localLoading = true
      this.$http
        .post('/api/signin/google', payload)
        .then((res) => res.json())
        .then(
          async (tokenInfo) => {
            await this.setAuthToken(tokenInfo)
            await this.$http
              .get('/api/user')
              .then((res) => res.json())
              .then((userInfo) => {
                this.setUser(userInfo)
              })
            if (Object.keys(this.surveyResults).length > 0) {
              const payload = {
                uid: this.email,
                answers: this.surveyResults,
              }
              await this.$http.post('/api/program/survey', payload).then(() => {
                this.clearSurveyResults()
              })
            }
            setTimeout(() => {
              this.$router.push('/cabinet/subscription-option')
            }, 1000)
          },
          () => {
            this.errorLinking = true
          }
        )
        .finally(() => {
          this.localLoading = false
        })
    },
  },
  mounted() {
    const { hash } = this.$route
    const hashParams = hash.split('&')
    const params = {}
    hashParams.forEach((x) => {
      let pv = x.split('=')
      const param = pv[0].replace('#', '')
      const value = pv[1]
      params[param] = value
    })
    this.token = params['access_token']
    if (this.token === undefined) {
      this.$router.push('/')
      return
    }
    this.verifySocial()
  },
  beforeMount() {
    // restore results
    this.restoreSurveyResults()
  },
  computed: {
    ...mapGetters('survey', ['surveyResults']),
    ...mapGetters('user', ['user']),
  },
}
</script>
