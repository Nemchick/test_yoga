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
              <h2 class="form__title">Подтверждение Mail.ru</h2>
              <LoaderComponent v-if="localLoading" />
              <div class="form__subtitle" v-else-if="errorLinking === false">
                Учетная запись Mail.ru успешно привязана
              </div>
              <div class="form__subtitle" v-else>
                При привязке учетной записи Mail.ru произошла ошибка
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
  name: 'AddMailRU',
  components: { LoaderComponent },
  data() {
    return {
      localLoading: false,
      token: '',
      uid: '',
      errorLinking: false,
    }
  },
  methods: {
    ...mapActions('user', ['setUser']),
    verifySocial() {
      const payload = {
        uid: this.uid,
        token: this.token,
      }
      this.localLoading = true
      this.$http
        .post('/api/user/add/mailru', payload)
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
      const pv = x.split('=')
      params[pv[0]] = pv[1]
    })
    this.token = params['access_token']
    this.uid = params['x_mailru_vid']
    if (this.token === undefined || this.uid === undefined) {
      this.$router.push('/')
      return
    }
    this.verifySocial()
  },
}
</script>
