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
          <form class="form form--restore">
            <div class="form__heading">
              <h2 class="form__title">Восстановление пароля</h2>
              <div class="form__subtitle">
                Введите e-mail, который вы<br />использовали при регистрации
              </div>
            </div>
            <fieldset class="form__section">
              <div
                class="form__input form__input--text input"
                :class="{ error: $v.email.$error }"
              >
                <label class="label-input" for="login">E-mail</label>
                <input
                  type="text"
                  id="login"
                  v-model.lazy="$v.email.$model"
                  placeholder="Введите e-mail"
                />
                <div
                  class="form__notification form__notification--error"
                  v-if="!$v.email.emailCorrect"
                >
                  Укажите корректный E-mail
                </div>
              </div>
              <button
                class="button button--s1 button--t1"
                @click.prevent.stop="restorePassword"
                :class="{ disabled: $v.$invalid }"
                :disabled="$v.$invalid"
              >
                <span>Восстановить</span>
              </button>
            </fieldset>
          </form>
          <div class="form__links">
            <router-link to="/login">Войти</router-link>
            <router-link to="/register">Зарегистрироваться</router-link>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
  name: 'ForgotPassword',
  data() {
    return {
      email: '',
    }
  },
  validations: {
    email: {
      required,
      emailCorrect: email,
    },
  },
  methods: {
    restorePassword() {
      const payload = {
        email: this.email,
      }
      this.$http.put('/api/restore/request', payload).then(() => {
        this.$router.push('/password-restore/confirm')
      })
    },
  },
}
</script>

<style scoped></style>
