<template>
  <section class="section section--program">
    <div class="container">
      <div class="subscribes__wrapper">
        <h3 class="subscribes__title">
          Получите полный доступ к вашей программе
        </h3>
        <div class="program__description">
          Продолжайте заниматься по программе — только ежедвневная практика
          позволит достигнуть желаемых результатов.
        </div>
        <div class="subscribes">
          <template v-for="sub in subscriptions">
            <div
              class="subscribes__item add-pointer"
              :key="sub.id"
              :class="{ yearly: sub.title === '6 месяцев' }"
              @click="buySubscription(sub.id)"
            >
              <div class="subscribes__description">
                <div class="subscribes__term">{{ sub.title }}</div>
                <div class="subscribes__info">
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
              </div>
            </div>
          </template>
          <a class="promocode-link add-pointer" @click="goToSubscriptions">
            Ввести промокод
          </a>
        </div>
      </div>
      <FeedbackSwiper />
    </div>
    <img class="program__bg" src="@/assets/img/backgrounds/program-bg.webp" />
  </section>
</template>

<script>
import FeedbackSwiper from '@/components/UI/Sliders/FeedbackSlider.vue'
import { cloudPaymentsPay } from '@/utils'

export default {
  name: 'SubscriptionProgram',
  components: { FeedbackSwiper },
  data() {
    return {
      subscriptions: [],
    }
  },
  methods: {
    getSubscriptions() {
      this.$http
        .get('/api/purchase/subscriptions')
        .then((res) => res.json())
        .then((subscriptions) => {
          this.subscriptions = subscriptions
        })
    },
    buySubscription(id) {
      this.$http
        .get(`/api/purchase/pay/subscription/${id}`)
        .then((res) => res.json())
        .then((purchaseInfo) => {
          cloudPaymentsPay(purchaseInfo)
        })
    },
    goToSubscriptions() {
      this.$router.push({
        name: 'UserSubscription',
      })
    },
  },
  mounted() {
    this.getSubscriptions()
  },
}
</script>

<style scoped></style>
