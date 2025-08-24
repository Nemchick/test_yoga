<template>
  <div>
    <button
      @click="openModal"
      to="/survey/"
      :class="['button', 'button--t4', pageClass]"
    >
      Попробовать бесплатно
    </button>
    <div v-if="modalOpen" class="kirill_modal_reg" @click="closeModal">
      <button
        v-if="modalOpen || passwordModalOpen || confirmModalOpen"
        @click="closeModal"
        class="close-all-button"
      ></button>
      <div class="kirill_modal_content" @click.stop>
        <img
          class="kirill_img_logo_modal"
          src="@/assets/img/logos/logo-green.svg"
        />
        <div class="kirill_title_modal">
          Зарегистрируйтесь и получите 7 дней бесплатного доступа
        </div>
        <!-- <div class="kirill_text_modal">
          Зарегистрируйтесь, чтобы получить бесплатный доступ к сервису на
          неделю.
        </div> -->
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
          class="button kirill_button--s1 button--t1"
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
        <div class="kirill_text_modal_social">
          или зарегистрируйтесь через соцсеть
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
          <!-- <li class="socials__item">
            <a class="socials__link" @click="loginYandex">
              <img src="@/assets/img/icons/yandex.svg" alt="" />
            </a>
          </li> -->
        </ul>
      </div>
    </div>
    <div v-if="passwordModalOpen" class="kirill_modal_reg" @click="closeModal">
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
          v-if="passwordModalOpen"
          @click.stop="goBackToEmailModal"
          class="back-button"
        ></button>
        <button
          v-if="modalOpen || passwordModalOpen || confirmModalOpen"
          @click="closeModal"
          class="close-all-button"
        ></button>
        <button
          :disabled="$v.$invalid"
          class="button button--s1 button--t1"
          @click.prevent.stop="doRegistration()"
        >
          <span>Зарегистрироваться</span>
        </button>
      </div>
    </div>
    <div v-if="confirmModalOpen" class="kirill_modal_reg" @click="closeModal">
      <div class="kirill_modal_content" @click.stop>
        <button class="kirill_button_back" @click="goBackToEmailModal">
          <i class="icon-back"></i>
          Назад
        </button>
        <img
          src="@/assets/img/icons/Message.svg"
          class="kirill_mogal_img_message"
        />
        <div class="kirill_text_modal_massage">
          Отправили письмо с ссылкой на ваш e-mail. Перейдите по ней, чтобы
          завершить регистрацию<br />
          {{ email }}
        </div>
        <div class="kirill_modal_buttons">
          <button
            class="button kirill_button--s1 button--t1 go_mail"
            @click="handleButtonClick"
          >
            {{ buttonText }}
          </button>
        </div>
      </div>
      <button
        v-if="modalOpen || passwordModalOpen || confirmModalOpen"
        @click="closeModal"
        class="close-all-button"
      ></button>
    </div>
  </div>
</template>

<script>
import { required, email, sameAs, minLength } from 'vuelidate/lib/validators'
import socialAuth from '@/mixins/socialAuth'

export default {
  name: 'RegistrationPage',
  // metaInfo() {
  //   return {
  //     title: 'Регистрация1',
  //     meta: [
  //       {
  //         vmid: 'description',
  //         name: 'description',
  //         content:
  //           'Добро пожаловать в Yoga Care - сервис онлайн-кундалини-йоги, где вы сможете получить доступ к своему личному кабинету и начать практиковать йогу у себя дома. Здесь вы найдете множество полезных материалов и видеоуроков, которые помогут вам улучшить свое физическое и духовное здоровье. Зарегистрируйтесь прямо сейчас и начните свой путь к гармонии и благополучию.',
  //       },
  //       {
  //         vmid: 'keywords',
  //         name: 'keywords',
  //         content:
  //           'регистрация йога онлайн, регистрация yoga care, регистрация yyc',
  //       },
  //     ],
  //   }
  // },
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      stayLogged: false,
      passwordShow: false,
      confirmPasswordShow: false,
      modalOpen: false,
      passwordModalOpen: false,
      savedEmail: '',
      confirmModalOpen: false,
      isAgreed: true,
      mailServiceLink: null,
      buttonText: 'Закрыть',
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
    checkEmailAndOpenPasswordModal() {
      if (!this.isAgreed) return
      // Проверка валидности email
      this.$v.$touch()
      if (this.$v.email.$invalid) {
        return // Ошибка уже отображается
      }
      // Email валидный, сохранить и открыть модальное окно для пароля
      this.savedEmail = this.email
      this.modalOpen = false
      this.passwordModalOpen = true
    },
    openModal() {
      this.modalOpen = true
      document.body.classList.add('modal-open')
      // Изменить z-index для .header
      document.querySelector('.header').style.display = 'none'
    },
    closeModal() {
      this.confirmModalOpen = false
      this.modalOpen = false
      this.passwordModalOpen = false
      document.body.classList.remove('modal-open')
      // Восстановить z-index для .header
      document.querySelector('.header').style.display = 'block'
    },
    doRegistration() {
      const payload = {
        email: this.email,
        password: this.password,
        utm: JSON.parse(localStorage.getItem('utm')) || {},
      }
      console.log('Отправка данных:', payload)
      this.$http.post('/api/signup/email', payload).then(() => {
        this.passwordModalOpen = false
        this.confirmModalOpen = true
        this.setMailServiceLink() // <-- добавили сюда
      })
    },

    goBackToEmailModal() {
      this.passwordModalOpen = false
      this.confirmModalOpen = false
      this.modalOpen = true
    },
    setMailServiceLink() {
      const emailServices = {
        'mail.ru': 'https://e.mail.ru',
        'gmail.com': 'https://mail.google.com',
        'yandex.ru': 'https://mail.yandex.ru',
        'bk.ru': 'https://e.mail.ru',
        'internet.ru': 'https://e.mail.ru',
        'inbox.ru': 'https://e.mail.ru',
        'rambler.ru': 'https://mail.rambler.ru',
        'icloud.com': 'https://www.icloud.com/mail',
        'outlook.com': 'https://outlook.live.com',
        'list.ru': 'https://e.mail.ru',
        'ya.ru': 'https://mail.yandex.ru',
      }
      const domain = this.email.split('@')[1] || ''
      if (emailServices[domain]) {
        this.mailServiceLink = emailServices[domain]
        this.buttonText = 'Перейти на почту'
      } else {
        this.mailServiceLink = null
        this.buttonText = 'Закрыть'
      }
    },

    handleButtonClick() {
      if (this.mailServiceLink) {
        window.open(this.mailServiceLink, '_blank')
      } else {
        this.closeModal()
      }
    },
  },
  computed: {
    pageClass() {
      const path = this.$route.path
      if (path === '/' || path === '') return 'pages_main'
      return 'pages_' + path.replace(/^\/+/, '').replace(/\/.*$/, '')
    },
    emailDomain() {
      return this.email.split('@')[1] || ''
    },
  },
}
</script>
<style scoped>
.kirill_modal_content i {
  font-size: 30px;
}
.kirill_button_back {
  position: absolute;
  left: 30px;
  top: 30px;
  display: flex;
  gap: 5px;
  color: #374957;
  opacity: 0.6;
  align-items: center;
}
.kirill_modal_content {
  position: relative;
}
@media (max-width: 767px) {
  .kirill_button_back {
    top: 10px;
    left: 10px;
  }
}
</style>
