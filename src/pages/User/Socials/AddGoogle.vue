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
              <h2 class="form__title">Подтверждение Google</h2>
              <LoaderComponent v-if="localLoading" />
              <div class="form__subtitle" v-else-if="errorLinking === false">
                Учетная запись Google успешно привязана
              </div>
              <div class="form__subtitle" v-else>
                При привязке учетной записи Google произошла ошибка
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
import { mapActions } from 'vuex'

export default {
  name: 'AddGoogle',
  components: { LoaderComponent },
  data() {
    return {
      localLoading: false,
      token: '',
      errorLinking: false,
    }
  },
  methods: {
    ...mapActions('user', ['setUser']),
    async verifySocial() {
      const payload = {
        token: this.token,
      }
      this.localLoading = true
      await this.$http
        .post('/api/user/add/google', payload)
        .then(
          async () => {
            await this.$http
              .get('/api/user')
              .then((res) => res.json())
              .then((userInfo) => {
                this.setUser(userInfo)
              })
            setTimeout(() => {
              this.$router.push('/')
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
}
</script>
