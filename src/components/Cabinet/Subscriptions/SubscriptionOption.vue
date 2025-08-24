<template>
  <div class="helper-simple">
    <main class="main">
      <div class="page-form kirill_aligen_center">
        <div class="page page-user">
          <div class="container kirill_pay_container">
            <router-link to="/" class="kirill_link_cross">
              <i class="icon-close"></i>
            </router-link>
            <h1 class="page__title">Выберите вариант подписки</h1>
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
                      Следующее списание
                      {{ getNextPayDate(user.subscriptionEnd) }}
                    </div>
                  </div>
                  <div class="subscribes__status">
                    <i class="icon-check" />Активна
                  </div>
                </div>
              </div>
            </template>
            <div class="subscribes">
              <LoaderComponent v-if="subscriptionsLoading" />
              <template v-for="sub in subscriptions" v-else>
                <div
                  class="subscribes__item"
                  :key="sub.id"
                  :class="{ yearly: sub.title === '12 месяцев' }"
                  v-if="sub.id !== userSubscription?.subscriptionId"
                >
                  <div class="subscribes__description">
                    <div class="kirill_box_title_pay">
                      <div class="subscribes__term">{{ sub.title }}</div>
                      <div
                        class="subscribes__discount"
                        v-if="sub.badgeDiscount !== ''"
                      >
                        {{ sub.badgeDiscount }}
                      </div>
                    </div>
                    <a
                      class="button button--s3 button--t2"
                      @click="buySubscription(sub.id)"
                      >Начать&nbsp;бесплатно</a
                    >
                    <div class="kirill_container_pay_text">
                      <div class="kirill_bay_text">7 дней бесплатно,</div>
                      <div class="kirill_box_pay_text">
                        <div class="kirill_bay_text">затем</div>
                        <div
                          class="kiril_pay_text_discount"
                          v-if="
                            subscriptionPrice !== null &&
                            selectedSubscriptionId === sub.id
                          "
                        >
                          {{ subscriptionPrice }} ₽
                        </div>
                        <div
                          class="subscribes__price"
                          :class="{
                            kirill_pay_text_delete:
                              subscriptionPrice !== null &&
                              selectedSubscriptionId === sub.id,
                          }"
                        >
                          {{ sub.price / 100 }}₽
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <div class="form form--promocode">
                <div class="form__section form__section--promocode">
                  <div
                    class="form__input form__input--text input"
                    :class="{
                      error: promocodeError,
                      success: promocodeSuccess,
                    }"
                  >
                    <input
                      type="text"
                      id="promo-code"
                      v-model="promocode"
                      placeholder="Введите промокод"
                      :class="{ 'success-input': promocodeSuccess }"
                    />
                    <div
                      class="form__notification"
                      :class="{
                        'form__notification--error': promocodeError,
                        'form__notification--success': promocodeSuccess,
                      }"
                    >
                      <template v-if="promocodeError">
                        {{ errDescription || 'Произошла ошибка' }}
                      </template>
                      <template v-else-if="promocodeSuccess"
                        >Промокод применен</template
                      >
                    </div>
                  </div>
                  <button
                    type="submit"
                    class="button button--s4 button--t3"
                    :disabled="!promocode"
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
            <div class="kirill_bay_text">
              Для активации подписки спишем 10 руб с вашей карты и сразу их
              вернем. Через 7 дней спишется полная стоимость. Отменить подписку
              можно в течение бесплатного периода в личном кабинете
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { parseJSON, format } from 'date-fns'
import LoaderComponent from '@/components/UI/Components/LoaderComponent.vue'
import { cloudPaymentsPay } from '@/utils'

export default {
  name: 'SubscriptionOption',
  components: { LoaderComponent },
  data() {
    return {
      subscriptionsLoading: true,
      subscriptions: [],
      promocode: '',
      promocodeError: false,
      promocodeSuccess: false,
      subscriptionPrice: null,
      selectedSubscriptionId: null,
      errDescription: '',
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
      if (this.userSubscription) {
        this.$router.push('/cabinet/my-program')
        window.ym(94506780, 'reachGoal', 'activtrial')
      }
    },
    // buySubscription(id) {
    //   this.$http
    //     .get(`/api/purchase/pay/subscription/${id}`)
    //     .then((res) => res.json())
    //     .then((purchaseInfo) => {
    //       let updatedPurchaseInfo = null
    //       if (
    //         this.selectedSubscriptionId === Number(purchaseInfo.data.itemId)
    //       ) {
    //         updatedPurchaseInfo = {
    //           ...purchaseInfo,
    //           amount: this.subscriptionPrice,
    //         }
    //       }

    //       this.selectedSubscriptionId === Number(purchaseInfo.data.itemId)
    //         ? cloudPaymentsPay(updatedPurchaseInfo)
    //         : cloudPaymentsPay(purchaseInfo)
    //     })
    // },
    buySubscription(id) {
      this.$http
        .get(`/api/purchase/pay/subscription/${id}`)
        .then((res) => res.json())
        .then((purchaseInfo) => {
          // Выводим информацию о цене и ID в консоль
          console.log('Original price:', purchaseInfo.amount)
          console.log('Subscription ID:', purchaseInfo.data.itemId)

          let updatedPurchaseInfo = null
          if (
            this.selectedSubscriptionId === Number(purchaseInfo.data.itemId)
          ) {
            updatedPurchaseInfo = {
              ...purchaseInfo,
              amount: this.subscriptionPrice,
            }
            console.log('Discounted price:', this.subscriptionPrice) // Выводим цену со скидкой
          }
          // Всегда отправляем 1 в cloudPaymentsPay
          cloudPaymentsPay({
            ...(updatedPurchaseInfo || purchaseInfo),
            amount: 10,
          }).then(() => {
            window.ym(94506780, 'reachGoal', 'startpay')
          })
        })
    },
    getNextPayDate(payDate) {
      const dateParsed = parseJSON(payDate)
      return format(dateParsed, 'dd.MM.yyyy')
    },
    applyPromocode() {
      this.promocodeError = false
      this.promocodeSuccess = false // Сбрасываем статус успеха при новой попытке
      const params = {
        promocode: this.promocode,
      }
      this.$http
        .get('/api/purchase/pay/subscription', { params })
        .then((res) => res.json())
        .then(
          (purchaseInfo) => {
            this.promocode = ''
            this.subscriptionPrice = purchaseInfo.amount
            this.selectedSubscriptionId = Number(purchaseInfo.data.itemId)
            this.promocodeSuccess = true // Устанавливаем статус успеха
          },
          (err) => {
            if (err.status === 404) {
              this.promocodeError = true
              this.errDescription = err.body.description
              // console.log(this.errDescription)
            } else {
              console.error('Ошибка сервера:', err)
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

<style scoped>
.form__notification--success {
  color: rgb(89, 202, 86);
  background: rgb(229, 252, 229);
}
.success-input {
  /* Стиль для input при успешном промокоде */
  border: 1px solid rgb(89, 202, 86);
}
</style>
