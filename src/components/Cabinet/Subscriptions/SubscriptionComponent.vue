<template>
  <div class="page page-user">
    <div class="container">
      <div class="page__header">
        <h1 class="page__title">Моя подписка</h1>
      </div>
      <template v-if="userSubscription">
        <div class="subscribes">
          <div class="subscribes__item current">
            <div class="subscribes__description">
              <div class="subscribes__info">
                <div class="subscribes__term">
                  {{ userSubscription.title }}
                </div>
                <div class="subscribes__price">
                  {{ userSubscription.price / 100 }} ₽
                </div>
              </div>
              <div class="subscribes__notice">
                <template v-if="userSubscription.status === 'Active'">
                  Следующее списание {{ getNextPayDate(user.subscriptionEnd) }}
                </template>
                <template v-else>
                  Подписка закончится {{ getNextPayDate(user.subscriptionEnd) }}
                </template>
              </div>
            </div>
            <div class="subscribes__status">
              <i class="icon-check" />Активна
            </div>
          </div>
        </div>
      </template>
      <div class="subscribes">
        <span class="subscribes__subtitle">Другие варианты</span>
        <LoaderComponent v-if="subscriptionsLoading" />
        <template v-for="sub in subscriptions" v-else>
          <div
            class="subscribes__item"
            :key="sub.id"
            :class="{ yearly: sub.title === '12 месяцев' }"
            v-if="sub.id !== userSubscription?.subscriptionId"
          >
            <div class="subscribes__description">
              <div class="subscribes__info">
                <div class="subscribes__term">{{ sub.title }}</div>
                <div
                  class="subscribes__discount"
                  v-if="sub.badgeDiscount !== ''"
                >
                  {{ sub.badgeDiscount }}
                </div>
                <div
                  class="subscribes__notice"
                  v-if="sub.badgePricePerMonth !== ''"
                >
                  {{ sub.badgePricePerMonth }}
                </div>
                <div class="subscribes__price">{{ sub.price / 100 }}₽</div>
              </div>
              <a
                class="button button--s3 button--t2"
                @click="buySubscription(sub.id)"
                >Перейти</a
              >
            </div>
          </div>
        </template>
        <div class="form form--promocode">
          <div class="form__section form__section--promocode">
            <div
              class="form__input form__input--text input"
              :class="{ error: promocodeError }"
            >
              <input
                type="text"
                id="promo-code"
                v-model="promocode"
                placeholder="Введите промокод"
              />
              <div
                class="form__notification form__notification--error"
                v-if="promocodeError"
              >
                Неверный промокод
              </div>
            </div>
            <button
              type="submit"
              class="button button--s4 button--t3"
              @click="applyPromocode"
            >
              <span>Применить</span>
            </button>
          </div>
        </div>
        <router-link
          to="/cabinet/cancel-subscription"
          class="button button--s1 button--t3"
          v-if="user.subscription"
        >
          Отменить подписку
        </router-link>
      </div>
      <PaymentsHistory />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { parseJSON, format } from 'date-fns'
import LoaderComponent from '@/components/UI/Components/LoaderComponent.vue'
import { cloudPaymentsPay } from '@/utils'
import PaymentsHistory from '@/components/Cabinet/Subscriptions/PaymentsHistory.vue'

export default {
  name: 'MySubscription',
  components: { PaymentsHistory, LoaderComponent },
  data() {
    return {
      subscriptionsLoading: true,
      subscriptions: [],
      promocode: '',
      promocodeError: false,
    }
  },
  methods: {
    ...mapActions('shared', ['setSuccess']),
    getSubscriptions() {
      this.subscriptionsLoading = true
      this.$http
        .get('/api/purchase/subscriptions')
        .then((res) => res.json())
        .then((subscriptions) => {
          this.subscriptions = subscriptions
        })
        .finally(() => (this.subscriptionsLoading = false))
    },
    buySubscription(id) {
      this.$http
        .get(`/api/purchase/pay/subscription/${id}`)
        .then((res) => res.json())
        .then((purchaseInfo) => {
          cloudPaymentsPay(purchaseInfo)
        })
    },
    getNextPayDate(payDate) {
      const dateParsed = parseJSON(payDate)
      return format(dateParsed, 'dd.MM.yyyy')
    },
    applyPromocode() {
      this.promocodeError = false
      const params = {
        promocode: this.promocode,
      }
      this.$http
        .get('/api/purchase/pay/subscription', { params })
        .then((res) => res.json())
        .then(
          (purchaseInfo) => {
            this.promocode = ''
            cloudPaymentsPay(purchaseInfo)
          },
          (err) => {
            if (err.status === 404) {
              this.promocodeError = true
            }
          }
        )
    },
  },
  mounted() {
    this.getSubscriptions()
  },
  computed: {
    ...mapGetters('user', ['user']),
    userSubscription() {
      return this.user.subscriptionInfo
    },
  },
}
</script>

<style scoped></style>
