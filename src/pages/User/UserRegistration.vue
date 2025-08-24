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
          <form class="form form--registration">
            <div class="form__heading">
              <h2 class="form__title">Регистрация</h2>
              <!--              <div class="form__subtitle">-->
              <!--                Мы подобрали для вас практику, которая поможет в достижении-->
              <!--                ваших целей. Чтобы начать заниматься зарегистрируйтесь.-->
              <!--              </div>-->
            </div>
            <fieldset class="form__section">
              <div
                class="form__input form__input--email input"
                :class="{ error: $v.email.$error }"
              >
                <label class="label-input" for="email">E-mail</label>
                <input
                  type="email"
                  id="email"
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
                  v-model="$v.password.$model"
                  placeholder="Введите пароль"
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
                <label class="label-input" for="pass1">Повторить пароль</label>
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
                  id="pass1"
                  v-model="$v.confirmPassword.$model"
                  placeholder="Повторите пароль"
                />
              </div>
              <div
                class="form__notification form__notification--error"
                v-if="
                  !$v.confirmPassword.sameAsPassword && confirmPassword !== ''
                "
              >
                Пароли не совпадают
              </div>
            </fieldset>
            <fieldset
              class="form__section form__section--submit form__section--underline"
            >
              <div class="form__input form__input--checkbox checkbox">
                <input type="checkbox" id="agree2" v-model="stayLogged" />
                <label for="agree2">Запомнить меня</label>
              </div>
              <button
                :disabled="$v.$invalid || !isAgreed"
                class="button button--s1 button--t1"
                @click.prevent.stop="doRegistration()"
              >
                <span>Зарегистрироваться</span>
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
            <li class="socials__item">
              <a class="socials__link" @click="loginVK">
                <img src="@/assets/img/icons/vk.svg" alt="" />
              </a>
            </li>
            <li class="socials__item">
              <a class="socials__link" @click="loginOK">
                <img src="@/assets/img/icons/ok.svg" alt="" />
              </a>
            </li>
            <li class="socials__item">
              <a class="socials__link" @click="loginMailRU">
                <img src="@/assets/img/icons/mailru.svg" alt="" />
              </a>
            </li>
          </ul>
          <div class="kirill_offer_checkbox">
            <label class="styled-checkbox">
              <input type="checkbox" v-model="isAgreed" />
              <span class="checkbox-custom"></span>
            </label>

            <div class="kirill_offer_text">
              Я
              <span style="text-decoration: underline">
                <a
                  href="https://storage.yandexcloud.net/yyc-images/%D0%A1%D0%BE%D0%B3%D0%BB%D0%B0%D1%81%D0%B8%D0%B5%20%D0%BD%D0%B0%20%D0%BE%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D1%83%20%D0%9F%D0%94%20%D0%93%D0%B0%D1%80%D0%BC%D0%BE%D0%BD%D0%B8%D1%8F.pdf"
                  target="_blank"
                  >соглашаюсь на обработку персональных данных</a
                ></span
              >,
              <span style="text-decoration: underline">
                <a
                  href="https://storage.yandexcloud.net/yyc-images/%D0%A1%D0%BE%D0%B3%D0%BB%D0%B0%D1%81%D0%B8%D0%B5%20%D0%BD%D0%B0%20%D0%BE%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D1%83%20%D0%9F%D0%94%20%D0%93%D0%B0%D1%80%D0%BC%D0%BE%D0%BD%D0%B8%D1%8F.pdf"
                  target="_blank"
                  >правилами обработки персональных данных</a
                ></span
              >
              и
              <span style="text-decoration: underline">
                <a
                  href="https://storage.yandexcloud.net/yyc-images/Terms_of_use_06.01.25.pdf"
                  target="_blank"
                  >публичной офертой</a
                ></span
              >
            </div>
          </div>
          <div class="form__addition">
            Уже есть аккаунт?
            <router-link to="/login">Авторизуйтесь</router-link>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { required, email, sameAs, minLength } from 'vuelidate/lib/validators'
import socialAuth from '@/mixins/socialAuth'

export default {
  name: 'RegistrationPage',
  metaInfo() {
    return {
      title: 'Регистрация',
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content:
            'Добро пожаловать в Yoga Care - сервис онлайн-кундалини-йоги, где вы сможете получить доступ к своему личному кабинету и начать практиковать йогу у себя дома. Здесь вы найдете множество полезных материалов и видеоуроков, которые помогут вам улучшить свое физическое и духовное здоровье. Зарегистрируйтесь прямо сейчас и начните свой путь к гармонии и благополучию.',
        },
        {
          vmid: 'keywords',
          name: 'keywords',
          content:
            'регистрация йога онлайн, регистрация yoga care, регистрация yyc',
        },
      ],
    }
  },
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      stayLogged: false,
      passwordShow: false,
      confirmPasswordShow: false,
      isAgreed: true,
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
    confirmPassword: {
      required,
      minLength: minLength(8),
      sameAsPassword: sameAs('password'),
    },
  },
  methods: {
    doRegistration() {
      if (!this.isAgreed) return
      const payload = {
        email: this.email,
        password: this.password,
        utm: JSON.parse(localStorage.getItem('utm')) || {},
      }
      this.$http.post('/api/signup/email', payload).then(() => {
        this.$router.push({
          name: 'RegistrationConfirm',
          query: { email: this.email },
        })
      })
    },
  },
}
</script>
