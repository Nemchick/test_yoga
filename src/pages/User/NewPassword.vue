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
          <form class="form form--reset">
            <div class="form__heading">
              <h2 class="form__title">Придумайте новый пароль</h2>
            </div>
            <fieldset class="form__section">
              <div
                class="form__input form__input--password input"
                :class="{ error: $v.password.$error }"
              >
                <label class="label-input" for="pass">Пароль</label>
                <span
                  class="pass-switch"
                  :class="{
                    'icon-hide': passwordShow === true,
                    'icon-view': passwordShow === false,
                  }"
                  @click="passwordShow = !passwordShow"
                />
                <input
                  :type="passwordShow ? 'text' : 'password'"
                  id="pass"
                  v-model.lazy="$v.password.$model"
                  placeholder="Введите не менее 8 символов"
                />
                <div
                  class="form__notification form__notification--error"
                  v-if="!$v.password.minLength"
                >
                  Введите не менее 8 символов
                </div>
              </div>
              <div
                class="form__input form__input--password input"
                :class="{ error: $v.confirmPassword.error }"
              >
                <label class="label-input" for="pass2">Повторить пароль</label>
                <span
                  class="pass-switch"
                  :class="{
                    'icon-hide': confirmPasswordShow === true,
                    'icon-view': confirmPasswordShow === false,
                  }"
                  @click="confirmPasswordShow = !confirmPasswordShow"
                />
                <input
                  :type="confirmPasswordShow ? 'text' : 'password'"
                  id="pass2"
                  v-model.lazy="$v.confirmPassword.$model"
                  placeholder="Повторите пароль"
                />
                <div
                  class="form__notification form__notification--error"
                  v-if="
                    !$v.confirmPassword.sameAsPassword &&
                    confirmPasswordShow.length > 0
                  "
                >
                  Пароли не совпадают
                </div>
                <div
                  class="form__notification form__notification--error"
                  v-if="!$v.confirmPassword.minLength"
                >
                  Введите не менее 8 символов
                </div>
              </div>
            </fieldset>
            <fieldset class="form__section form__section--submit">
              <button
                class="button button--s1 button--t1"
                :class="{ disabled: $v.$invalid }"
                :disabled="$v.$invalid"
                @click.prevent.stop="changePassword"
              >
                <span>Сохранить пароль</span>
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { required, minLength, sameAs } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'

export default {
  name: 'NewPassword',
  data() {
    return {
      password: '',
      confirmPassword: '',
      passwordShow: false,
      confirmPasswordShow: false,
      email: '',
      secret: '',
    }
  },
  validations: {
    password: {
      required,
      minLength: minLength(8),
    },
    confirmPassword: {
      required,
      minLength: minLength(8),
      sameAsPassword: sameAs('password'),
    },
  },
  methods: {
    ...mapActions('shared', ['setSuccess']),
    changePassword() {
      const payload = {
        email: this.email,
        password: this.password,
        secret: this.secret,
      }
      this.$http.put('/api/restore', payload).then(() => {
        this.setSuccess('Пароль успешно установлен')
        this.$router.push('/login')
      })
    },
  },
  mounted() {
    this.email = this.$route.query.email
    this.secret = this.$route.query.secret
    if (this.email === undefined || this.secret === undefined) {
      this.$router.push('/')
    }
  },
}
</script>
