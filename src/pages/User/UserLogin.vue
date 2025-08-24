<template>
  <div class="helper-simple">
    <main class="main">
      <div class="page-form">
        <div class="logo">
          <router-link to="/">
            <i class="icon-logo" />
          </router-link>
        </div>
        <div class="form-wrapper">
          <form class="form form--login">
            <div class="form__heading">
              <h2 class="form__title">Авторизация</h2>
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
                  placeholder="e-mail"
                />
                <div
                  class="form__notification form__notification--error"
                  v-if="!$v.email.emailCorrect"
                >
                  Укажите корректный E-mail
                </div>
              </div>
              <div class="form__input form__input--password input">
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
                  v-model="$v.password.$model"
                  placeholder="Введите пароль"
                />
              </div>
              <router-link :to="{ name: 'RestorePassword' }" class="forgot-link"
                >Забыли пароль?</router-link
              >
            </fieldset>
            <fieldset class="form__section form__section--submit">
              <div class="form__input form__input--checkbox checkbox">
                <input type="checkbox" id="agree2" />
                <label for="agree2">Запомнить меня</label>
              </div>
              <button
                :class="{ disabled: $v.$invalid }"
                :disabled="$v.$invalid"
                class="button button--s1 button--t1"
                @click.prevent.stop="login"
              >
                <span>Войти</span>
              </button>
            </fieldset>
          </form>
          <div class="socials__description">
            <p>Или авторизуйтесь через соц.сеть</p>
          </div>
          <ul class="socials">
            <li class="socials__item">
              <a class="socials__link" @click="loginGoogle">
                <img src="@/assets/img/icons/google.svg" alt="" />
              </a>
            </li>
            <!--            <li class="socials__item">-->
            <!--              <a class="socials__link" href="#"-->
            <!--                ><img src="@/assets/img/icons/yandex.svg" alt=""-->
            <!--              /></a>-->
            <!--            </li>-->
            <li class="socials__item">
              <a class="socials__link" @click="loginVK">
                <img src="@/assets/img/icons/vk.svg" alt="" />
              </a>
            </li>
            <li class="socials__item">
              <a class="socials__link" @click="loginMailRU">
                <img src="@/assets/img/icons/mailru.svg" alt="" />
              </a>
            </li>
            <li class="socials__item">
              <a class="socials__link" @click="loginOK">
                <img src="@/assets/img/icons/ok.svg" alt="" />
              </a>
            </li>
          </ul>
          <div class="form__addition">
            Нет аккаунта?
            <router-link to="/register"> Зарегистрируйтесь</router-link>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
import socialAuth from '@/mixins/socialAuth'

export default {
  name: 'LoginPage',
  metaInfo() {
    return {
      title: 'Вход в личный кабинет',
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content:
            'Ваш персональный кабинет сервиса Yoga Care для управления программой занятий и подпиской. Занимайтесь регулярно и отслеживайте свой прогресс',
        },
        {
          vmid: 'keywords',
          name: 'keywords',
          content:
            'личный кабинет йога онлайн, личный кабинет yoga care, личный кабинет yyc',
        },
      ],
    }
  },
  data() {
    return {
      email: '',
      password: '',
      passwordShow: false,
    }
  },
  mixins: [socialAuth],
  validations: {
    email: {
      required,
      emailCorrect: email,
    },
    password: {
      required,
      minLength: minLength(8),
    },
  },
  methods: {
    ...mapActions('user', ['setAuthToken', 'setUser']),
    login() {
      const payload = {
        email: this.email,
        password: this.password,
      }
      this.$http
        .post('/api/signin/email', payload)
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
          this.$router.push('/')
        })
    },
  },
}
</script>

<style scoped></style>
