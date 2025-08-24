<template>
  <div class="helper-simple">
    <main class="main">
      <div class="page-form kirill_aligen_center">
        <div class="page page-user">
          <div class="kirill_main_secton_pay_new">
            <div class="kirill_container_new_text_pay">
              <div class="kirill_text_new_pay_women">
                Начните заниматься по<span v-if="programTitle"> программе</span>
              </div>
              <div class="kirill_text_new_pay_women_program">
                {{ programTitle
                }}<span v-if="!programTitle">
                  видеобиблиотеке медитаций и крий</span
                >
              </div>
              <img
                src="@/assets/img/elements/women_pay.png"
                class="img_women_pay"
              />
              <img
                src="@/assets/img/elements/women_pay_v2.png"
                class="img_women_pay_v2"
              />
              <router-link to="/" class="kirill_link_cross mobile_block">
                <i class="icon-close"></i>
              </router-link>
            </div>
            <div class="container kirill_pay_container_new">
              <router-link to="/" class="kirill_link_cross non_mobil">
                <i class="icon-close"></i>
              </router-link>
              <div class="kirill_title_pay">
                Выберите подходящий вам тариф и нажмите «Начать заниматься»
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
                <div v-else class="box_subscribes_new">
                  <template v-for="sub in subscriptions">
                    <div
                      class="kirill_border_box_item_pay"
                      :key="sub.id"
                      :class="{
                        yearly: sub.id === 2,
                        yearly_v2: sub.id === 3 || sub.id === 1,
                        active: selectedSubscriptionId === sub.id,
                      }"
                      v-if="sub.id !== userSubscription?.subscriptionId"
                      @click="selectSubscription(sub.id)"
                    >
                      <div
                        v-if="sub.id === 2 || sub.id === 3"
                        class="kirill_text_new_title_pay"
                      >
                        {{ sub.id === 2 ? 'Популярное' : 'Лучшая цена' }}
                      </div>

                      <div class="subscribes__item">
                        <div class="subscribes__description">
                          <div class="kirill_box_title_pay">
                            <div class="subscribes__term">{{ sub.title }}</div>
                            <!-- <div
                              class="subscribes__discount"
                              v-if="sub.badgeDiscount !== ''"
                            >
                              {{ sub.badgeDiscount }}
                            </div> -->
                          </div>
                          <!-- <a
                            class="button button--s3 button--t2"
                            @click="buySubscription(sub.id)"
                            >Начать&nbsp;бесплатно</a
                          > -->
                          <div class="kirill_container_pay_text">
                            <div class="kirill_box_pay_text">
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
                            <div
                              class="subscribes__discount"
                              v-if="sub.badgeDiscount !== ''"
                            >
                              {{ sub.badgeDiscount }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                </div>
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
                        :class="{
                          'success-input': promocodeSuccess,
                          'error-input': promocodeError,
                        }"
                      />
                      <i
                        v-show="promocodeSuccess"
                        class="icon-check color_green"
                      ></i>
                      <i
                        v-show="promocodeError"
                        class="icon-close color_red"
                      ></i>
                      <!-- <div
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
                      </div> -->
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
                <div class="kirill_box_button_pay">
                  <button
                    class="button button--t4_v2"
                    @click="buySubscription(selectedSubscriptionId)"
                  >
                    <div>
                      Начать заниматься<br />
                      <span class="kirill_bay_text_buuton_pay">
                        7 дней бесплатно</span
                      >
                    </div>
                  </button>
                </div>
              </div>
              <div class="kirill_bay_text">
                Для подтверждения вашей карты будет списано 10 рублей, которые
                мы сразу вернем. Сумма тарифа оплачивается через 7 дней. В любой
                момент можно будет отменить подписку
              </div>
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
      selectedSubscriptionId: 3,
      errDescription: '',
      programInfo: {},
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
            console.log('Discounted pirce:', this.subscriptionPrice) // Выводим цену со скидкой
          }

          const finalAmount = Number(purchaseInfo.amount)
          // Всегда отправляем 1 в cloudPaymentsPay
          cloudPaymentsPay({
            ...(updatedPurchaseInfo || purchaseInfo),
            amount: finalAmount,
          }).then(() => {
            window.ym(94506780, 'reachGoal', 'startpay')
          })
        })
    },
    getMyProgram() {
      return this.$http
        .get('/api/program/my')
        .then((res) => res.json())
        .then((programInfo) => {
          this.programInfo = programInfo
        })
        .finally(() => {
          this.localLoading = false
        })
    },
    getNextPayDate(payDate) {
      const dateParsed = parseJSON(payDate)
      return format(dateParsed, 'dd.MM.yyyy')
    },
    selectSubscription(id) {
      this.selectedSubscriptionId = id
    },
    applyPromocode() {
      this.promocodeError = false
      this.promocodeSuccess = false
      const params = { promocode: this.promocode }

      this.$http
        .get('/api/purchase/pay/subscription', { params })
        .then((res) => res.json())
        .then(
          (purchaseInfo) => {
            this.promocode = ''
            this.subscriptionPrice = purchaseInfo.amount
            this.selectedSubscriptionId = Number(purchaseInfo.data.itemId)
            this.promocodeSuccess = true
          },
          (err) => {
            if (err.status === 404) {
              this.promocodeError = true
              this.errDescription = err.body.description
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
  beforeMount() {
    this.getMyProgram()
  },
  computed: {
    ...mapGetters('user', ['user']),
    userSubscription() {
      return this.user.subscriptionInfo
    },
    programTitle() {
      return this.programInfo?.about?.title
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
.kirill_pay_container_new {
  position: relative;
  border-top-right-radius: 24px;
  border-bottom-right-radius: 24px;
  background: rgba(255, 255, 255, 0.4);
  padding: 40px 22px !important;
  max-width: 400px !important;
  height: 100%;
}
.box_subscribes_new {
  display: flex;
  gap: 15px;
  justify-content: space-between;
  align-items: flex-end;
}
.box_subscribes_new .subscribes__item {
  width: 97%;
  height: 100px;
  padding: 8px 21px;
  position: relative;
  margin: 0px;
  border-radius: 12px;
}
.box_subscribes_new .kirill_box_title_pay {
  flex-direction: column;
  margin-bottom: 6px;
}
.box_subscribes_new .subscribes__term {
  font-size: 20px;
  font-weight: 700;
  line-height: 20px;
  text-align: center;
  transition: 0.5s ease;
}
.subscribes__description {
  flex-direction: column;
  /* align-items: flex-start; */
  justify-content: center;
  height: 100%;
}
.subscribes__discount {
  /* position: absolute;
  right: 6px;
  bottom: 18px; */
  width: 40px;
  height: 40px;
  margin: 0px;
  font-size: 12px;
  font-weight: 700;
  line-height: 12px;
  margin-right: -22px;
}
.subscribes__price {
  font-size: 16px;
  font-weight: 700;
  line-height: 16px;
  text-align: left;
}
.kirill_box_pay_text {
  flex-direction: column;
  gap: 0;
  align-items: center;
}
.kirill_container_pay_text {
  flex-direction: row;
  gap: 6px;
  align-items: center;
}
.kiril_pay_text_discount {
  font-size: 11px;
  font-weight: 700;
  line-height: 16px;
}
.kirill_border_box_item_pay {
  border-radius: 12px;
  padding: 3px;
  display: flex;
  gap: 4px;
  flex-direction: column;
  align-items: center;
  transition: 0.5s ease;
  cursor: pointer;
  width: 48%;
  height: fit-content;
}

.kirill_text_new_title_pay {
  color: rgb(255, 255, 255);
  font-size: 12px;
  font-weight: 600;
  line-height: 20px;
  z-index: 1;
}
.kirill_border_box_item_pay.yearly {
  background: linear-gradient(71.92deg, #009ff5 0%, #59ca56 100%);
  transition: 0.5s ease;
}
.kirill_border_box_item_pay.yearly_v2 {
  background: linear-gradient(1deg, #009ff5 100%, #59ca56 0%);
}
.kirill_border_box_item_pay.yearly,
.kirill_border_box_item_pay.yearly_v2 {
  position: relative;
  overflow: hidden;
}

.kirill_border_box_item_pay.yearly::before,
.kirill_border_box_item_pay.yearly_v2::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  background: linear-gradient(45deg, #009ff5 0%, #59ca56 100%);
  transition: all 0.5s ease;
  z-index: 0;
}

.kirill_border_box_item_pay.yearly:hover::before,
.kirill_border_box_item_pay.yearly_v2:hover::before {
  opacity: 1;
}
.kirill_border_box_item_pay.yearly:hover .subscribes__item,
.kirill_border_box_item_pay.yearly_v2:hover .subscribes__item {
  background: transparent;
  transition: all 0.3s ease;
}
.kirill_border_box_item_pay.yearly:hover .subscribes__term,
.kirill_border_box_item_pay.yearly_v2:hover .subscribes__term,
.kirill_border_box_item_pay.yearly_v2:hover .subscribes__price,
.kirill_border_box_item_pay.yearly:hover .subscribes__price {
  color: rgb(255, 255, 255);
  transition: all 0.5s ease;
}
.kirill_bay_text {
  margin-top: 10px;
  font-size: 11px;
  font-weight: 400;
  line-height: 18px;
}
.kirill_title_pay {
  font-size: 20px;
  font-weight: 700;
  line-height: 26px;
  margin-bottom: 24px;
}
.kirill_link_cross {
  width: 14px;
  height: 14px;
  top: 17px;
  right: 17px;
  overflow: hidden;
}
.icon-close {
  max-width: 14px;
  max-height: 14px;
}
.form__section {
  width: 100%;
}
.form__input {
  width: 70%;
}
.form__section--promocode {
  gap: 12px;
}
.kirill_box_button_pay {
  height: 54px;
  width: 100%;
}
.kirill_bay_text_buuton_pay {
  font-size: 11px;
  font-weight: 400;
  line-height: 13px;
}
.kirill_border_box_item_pay.active .subscribes__item,
.kirill_border_box_item_pay.active .subscribes__term,
.kirill_border_box_item_pay.active .subscribes__price {
  /* Применяем стили ховера */
  opacity: 1;
  background: transparent;
  color: rgb(255, 255, 255);
}
.kirill_border_box_item_pay.yearly.active .subscribes__item,
.kirill_border_box_item_pay.yearly_v2.active .subscribes__item {
  background: transparent;
}
.kirill_border_box_item_pay.active .subscribes__item {
  background: linear-gradient(45deg, #009ff5 0%, #59ca56 100%);
}
.kirill_border_box_item_pay.active::before {
  opacity: 1;
}
.kirill_main_secton_pay_new {
  display: flex;
  height: fit-content;
  width: 720px;
}
.kirill_container_new_text_pay {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-height: 100%;
  width: 320px;
  background: linear-gradient(
    45deg,
    rgb(217, 241, 254) 0%,
    rgb(230, 247, 230) 100%
  );
  border-top-left-radius: 24px;
  border-bottom-left-radius: 24px;
  overflow: hidden;
  position: relative;
  padding: 40px 27px;
}
.img_women_pay_v2 {
  display: none;
}
.img_women_pay {
  position: absolute;
  bottom: 0px;
  left: 0px;
  z-index: 0;
}
.kirill_text_new_pay_women {
  color: rgb(55, 73, 87);
  font-size: 28px;
  font-weight: 700;
  line-height: 36px;
  z-index: 1;
}
.kirill_text_new_pay_women_program {
  color: rgb(0, 159, 245);
  font-size: 28px;
  font-weight: 700;
  line-height: 32px;
  border-radius: 6px 6px 6px 6px;
  background: rgb(255, 255, 255);
  height: fit-content;
  padding: 6px 4px 6px 4px;
  width: fit-content;
  z-index: 1;
}
.color_green {
  color: rgb(89, 202, 86);
  position: absolute;
  right: 16px;
}
.color_red {
  color: #e6434f;
  position: absolute;
  right: 16px;
}
.mobile_block {
  display: none;
}
@media (max-width: 767px) {
  .kirill_main_secton_pay_new {
    width: 100%;
    height: 100%;
    flex-direction: column;
  }
  .kirill_pay_container_new {
    max-width: 100% !important;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    padding: 22px 22px !important;
  }
  .page-form {
    padding: 0px;
    justify-content: flex-start !important;
  }
  .page-user {
    padding: 0px;
  }
  .kirill_container_new_text_pay {
    width: 100%;
    height: 240px;
    border-radius: 0px;
    justify-content: center;
  }
  .img_women_pay {
    display: none;
  }
  .img_women_pay_v2 {
    display: block;
    position: absolute;
    bottom: 0px;
    right: 15px;
    z-index: 0;
  }
  .kirill_title_pay {
    margin-bottom: 24px;
  }
  .non_mobil {
    display: none;
  }
  .mobile_block {
    display: flex;
  }
  .kirill_link_cross {
    right: 25px;
    top: 16px;
  }
  .kirill_text_new_pay_women_program,
  .kirill_text_new_pay_women {
    font-size: 20px;
    font-weight: 700;
    line-height: 24px;
    max-width: 58%;
  }
  .kirill_title_pay {
    font-size: 16px;
    font-weight: 700;
    line-height: 20px;
    text-align: center;
  }
  .box_subscribes_new .subscribes__item {
    width: 100%;
    height: 100px;
    padding: 8px 13px;
    border-radius: 12px;
  }
  .kirill_container_pay_text {
    padding: 0px;
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 576px) {
  .subscribes__price {
    font-size: 16px;
    font-weight: 700;
    line-height: 16px;
    text-align: left;
    margin: 0px;
  }
}
</style>
