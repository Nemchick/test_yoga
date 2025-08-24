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
          <div class="questionnaire__header--right" @click="$router.push('/')">
            <button class="button--close">
              <i class="icon-close"></i>
            </button>
          </div>
        </div>
        <div
          v-if="modalOpen"
          class="kirill_box_100_center questionnaire__content"
        >
          <div class="questionnaire-form">
            <div class="questionnaire-form__wrapper">
              <div class="form">
                <div class="questionnaire__title">
                  <img src="@/assets/img/icons/accept.svg" alt="" />
                  <h1>Ваша программа готова</h1>
                </div>
                <div class="questionnaire__description">
                  <p>
                    Укажите e-mail, и мы отправим подробности программы вам на
                    почту. Бесплатный 7-дневный период будет доступен сразу
                    после регистрации
                    <!-- <br />
                    <span class="kirill_bolt_text"
                      >Бесплатный 7-дневный период будет доступен сразу после
                      регистрации</span
                    > -->
                  </p>
                </div>
                <div
                  class="form__input form__input--email input"
                  :class="{ error: $v.email.$error }"
                >
                  <!-- <label class="label-input" for="email">E-mail</label> -->
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

                <button
                  @click="checkEmailAndOpenPasswordModal"
                  class="button kirill_button--s1 button--t1 registration_anketa"
                  :disabled="!isAgreed"
                >
                  Продолжить
                </button>
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
              </div>
              <div class="socials__description">
                <p>или зарегистрируйтесь через соцсеть</p>
              </div>
              <ul class="socials">
                <li class="socials__item">
                  <a class="socials__link" @click="loginGoogle">
                    <img src="@/assets/img/icons/google.svg" alt="" />
                  </a>
                </li>
                <!--                <li class="socials__item">-->
                <!--                  <a class="socials__link" href="#"-->
                <!--                    ><img src="@/assets/img/icons/yandex.svg" alt=""-->
                <!--                  /></a>-->
                <!--                </li>-->
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
        <div
          v-if="passwordModalOpen"
          class="kirill_box_100_center questionnaire__content"
        >
          <div class="kirill_modal_content" @click.stop>
            <div class="kirill_title_modal kirill_margen_pas">
              Придумайте пароль
            </div>
            <div
              class="form__input form__input--password input"
              :class="{
                error: $v.password.$error && $v.password.$model.length > 0,
              }"
            >
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
            <button
              :disabled="$v.$invalid"
              class="button button--s1 button--t1"
              @click.prevent.stop="doRegistration()"
            >
              <span>Зарегистрироваться</span>
            </button>
          </div>
        </div>
        <div v-if="confirmModalOpen" class="kirill_modal_reg">
          <div class="kirill_modal_content" @click.stop>
            <img
              src="@/assets/img/icons/Message.svg"
              class="kirill_mogal_img_message"
            />
            <div class="kirill_text_modal_massage">
              Перейдите по ссылке в письме, отправленном на ваш email, чтобы
              завершить регистрацию.
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { required, email, sameAs, minLength } from 'vuelidate/lib/validators'
import { mapGetters, mapActions } from 'vuex'
import socialAuth from '@/mixins/socialAuth'

export default {
  metaInfo() {
    return {
      meta: [
        {
          vmid: 'surveyStepTitle',
          name: 'surveyStepTitle',
          content: 'Финал анкеты',
        },
        {
          vmid: 'surveyStepType',
          name: 'surveyStepType',
          content: 'surveyFinal',
        },
        {
          vmid: 'description',
          name: 'description',
          content:
            'Колесо баланса показывает вам текущее состояние и приоритет. Перейдите в личный кабинет и начните заниматься по подобранной программе занятий.',
        },
        {
          vmid: 'keywords',
          name: 'keywords',
          content: 'колесо баланса состояния организма',
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
      modalOpen: true,
      passwordModalOpen: false,
      savedEmail: '',
      confirmModalOpen: false,
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
    ...mapActions('survey', ['restoreSurveyResults', 'clearSurveyResults']),
    // sendResults() {
    //   const payload = {
    //     uid: this.email,
    //     answers: this.surveyResults,
    //   }
    //   this.$http.post('/api/program/survey', payload).then(() => {
    //     this.clearSurveyResults()
    //     this.$router.push({
    //       name: 'SurveyAfterFinal',
    //     })
    //   })
    // },
    toggleAgreement() {
      this.isAgreed = !this.isAgreed
    },
    doRegistration() {
      const payload = {
        email: this.email,
        password: this.password,
        answers: this.surveyResults,
        utm: JSON.parse(localStorage.getItem('utm')) || {},
      }
      this.$http.post('/api/program/survey', payload).then(() => {
        // this.clearSurveyResults()
        this.$router.push({
          name: 'SurveyAfterFinal',
          query: { email: this.email },
        })
      })
    },
    checkEmailAndOpenPasswordModal() {
      if (!this.isAgreed) return

      this.$v.$touch() // активируем все поля, включая password и confirmPassword

      if (this.$v.email.$invalid) return

      this.savedEmail = this.email
      this.modalOpen = false
      this.passwordModalOpen = true
    },
  },
  beforeMount() {
    // restore results
    this.restoreSurveyResults()
  },
  computed: {
    ...mapGetters('survey', ['surveyResults']),
  },
}
</script>

<style scoped></style>
