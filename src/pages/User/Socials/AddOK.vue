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
              <h2 class="form__title">Подтверждение OK</h2>
              <LoaderComponent v-if="localLoading" />
              <div class="form__subtitle" v-else-if="errorLinking === false">
                Учетная запись OK успешно привязана
              </div>
              <div class="form__subtitle" v-else>
                При привязке учетной записи OK произошла ошибка
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
  name: 'AddOK',
  components: { LoaderComponent },
  data() {
    return {
      localLoading: false,
      code: '',
      errorLinking: false,
    }
  },
  methods: {
    ...mapActions('user', ['setUser']),
    verifySocial() {
      const payload = {
        code: this.code,
      }
      this.localLoading = true
      this.$http
        .post('/api/user/add/ok', payload)
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
    this.code = this.$route.query.code
    if (this.code === undefined) {
      this.$router.push('/')
      return
    }
    this.verifySocial()
  },
}
</script>
