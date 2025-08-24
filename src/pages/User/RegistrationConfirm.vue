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
          <form method="post" action="#" class="form form--confirm">
            <button
              class="kirill_button_back"
              @click.prevent="goBackToEmailForm"
            >
              <i class="icon-back"></i>
              Назад
            </button>
            <div class="form__heading">
              <h2 class="form__title">Регистрация</h2>
              <div class="form__subtitle">
                Мы отправили ссылку для<br />подтверждения регистрации на ваш
                E-mail.<br />
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
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
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
    goBackToEmailForm() {
      this.$router.push('/registration')
    },
    handleButtonClick() {
      if (this.mailServiceLink) {
        window.open(this.mailServiceLink, '_blank')
      } else {
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
.kirill_button_back {
  position: absolute;
  left: -10px;
  top: -30px;
  display: flex;
  gap: 5px;
  color: #374957;
  opacity: 0.6;
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
}
.form-wrapper {
  position: relative;
}
@media (max-width: 767px) {
  .kirill_button_back {
    top: -10px;
    left: -10px;
  }
}
</style>
