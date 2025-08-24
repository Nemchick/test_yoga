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
              <h2 class="form__title">Подтверждение E-mail</h2>
              <LoaderComponent v-if="localLoading" />
              <div class="form__subtitle" v-else>
                E-mail успешно подтвержден
              </div>
            </div>
            <div class="form__section">
              <button class="button button--s1 button--t1" @click="goToLogin">
                <span>Войти</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import LoaderComponent from '@/components/UI/Components/LoaderComponent.vue'
import { mapActions } from 'vuex'

export default {
  name: 'RegistrationConfirm',
  components: { LoaderComponent },
  data() {
    return {
      email: '',
      secret: '',
      localLoading: true,
    }
  },
  methods: {
    ...mapActions('user', ['setAuthToken', 'setUser']),
    verifyEmail() {
      const params = {
        email: this.email,
        secret: this.secret,
        utm: JSON.parse(localStorage.getItem('utm')) || {},
      }
      this.$http
        .get('/api/signup/email/accept', { params })
        .then((res) => res.json())
        .then(async (tokenInfo) => {
          await this.setAuthToken(tokenInfo)
          // get user info
          await this.$http
            .get('/api/user')
            .then((res) => res.json())
            .then((userInfo) => {
              this.setUser(userInfo)
            })
          this.$router.push('/cabinet/subscription-option')
        })
    },
    //     {
    //   "token": "string",
    //   "userId": 0,
    //   "exp": 0,
    //   "iat": 0,
    //   "refreshToken": "string"
    // }
    goToLogin() {
      this.$router.push({
        name: 'UserLogin',
      })
    },
  },
  mounted() {
    this.email = this.$route.query.email
    this.secret = this.$route.query.secret
    if (this.email === undefined || this.secret === undefined) {
      this.$router.push('/')
      return
    }
    this.verifyEmail()
  },
}
</script>
