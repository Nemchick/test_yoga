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
        <div class="kirill_100_center">
          <div class="kirill_modal_content" @click.stop>
            <button class="kirill_button_back" @click="goBackToEmailForm">
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
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

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

export default {
  name: 'RegistrationConfirm',
  computed: {
    email() {
      return this.$route.query.email || ''
    },
    mailServiceLink() {
      const domain = this.email.split('@')[1] || ''
      return emailServices[domain] || null
    },
    buttonText() {
      return this.mailServiceLink ? 'Перейти на почту' : 'Закрыть'
    },
  },
  methods: {
    ...mapActions('survey', ['clearSurveyResults']),
    goBackToEmailForm() {
      this.$router.go(-1)
    },
    handleButtonClick() {
      if (this.mailServiceLink) {
        window.open(this.mailServiceLink, '_blank')
      } else {
        this.clearSurveyResults()
        this.$router.push('/')
      }
    },
  },
}
</script>

<style scoped>
.kirill_modal_buttons {
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 20px;
}
.kirill_modal_buttons button {
  width: 100%;
}
.kirill_modal_content {
  position: relative;
}
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

@media (max-width: 767px) {
  .kirill_button_back {
    top: 10px;
    left: 10px;
  }
}
</style>
