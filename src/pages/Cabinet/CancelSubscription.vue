<template>
  <div class="page page-user">
    <div class="container">
      <div class="page__header">
        <router-link to="/cabinet/my-subscription" class="back-link">
          <i class="icon-back"></i> Моя подписка
        </router-link>
      </div>
      <div class="form form--unsubscribe">
        <div class="form__heading">
          <h2 class="form__title">Почему вы хотите отменить подписку</h2>
        </div>
        <div class="form__description">
          Обратная связь поможет нам улучшить сервис
        </div>
        <fieldset class="form__section">
          <div
            class="form__input form__input--checkbox checkbox checkbox--circle"
          >
            <input
              type="checkbox"
              id="variant01"
              value="Слишком высокая цена подписки"
              v-model="reasons"
            />
            <label for="variant01">Слишком высокая цена подписки</label>
          </div>
          <div
            class="form__input form__input--checkbox checkbox checkbox--circle"
          >
            <input
              type="checkbox"
              id="variant02"
              value="Не устраивает качество контента"
              v-model="reasons"
            />
            <label for="variant02">Не устраивает качество контента</label>
          </div>
          <div
            class="form__input form__input--checkbox checkbox checkbox--circle"
          >
            <input
              type="checkbox"
              id="variant03"
              value="Нет времени на занятия"
              v-model="reasons"
            />
            <label for="variant03">Нет времени на занятия</label>
          </div>
          <div class="form__input form__input--text input">
            <input
              type="text"
              id="text"
              v-model="customReason"
              placeholder="Свой вариант"
            />
          </div>
        </fieldset>
        <fieldset class="form__section form__section--submit">
          <button
            type="submit"
            class="button button--s1 button--t3"
            :class="{ disabled: !formIsCorrect }"
            :disabled="!formIsCorrect"
            @click="cancelSubscription"
          >
            <span>Отменить подписку</span>
          </button>
          <router-link
            :to="{ name: 'UserSubscription' }"
            class="button button--s1 button--t1"
          >
            <span>Я передумал(а), оставить подписку</span>
          </router-link>
        </fieldset>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'CancelSubscription',
  data() {
    return {
      reasons: [],
      customReason: '',
    }
  },
  methods: {
    ...mapActions('shared', ['setSuccess']),
    ...mapActions('user', ['setUser']),
    cancelSubscription() {
      const payload = {
        reasons: [...this.reasons, this.customReason],
      }
      this.$http
        .post('/api/purchase/subscriptions/delete', payload)
        .then(async () => {
          this.setSuccess('Подписка успешно отменена')
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
  computed: {
    formIsCorrect() {
      return this.reasons.length > 0 || this.customReason !== ''
    },
  },
}
</script>

<style scoped></style>
