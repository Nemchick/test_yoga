<template>
  <div class="subscribes">
    <h3 class="subscribes__title">
      Получите доступ к видео и библиотеке крий и медитаций
    </h3>
    <LoaderComponent v-if="localLoading" />
    <template v-for="sub in subscriptions" v-else>
      <div
        class="subscribes__item"
        :key="sub.id"
        :class="{ yearly: sub.title === '6 месяцев' }"
      >
        <div
          class="subscribes__description add-pointer"
          @click="buySubscription(sub.id)"
        >
          <div class="subscribes__info">
            <div class="subscribes__term">{{ sub.title }}</div>
            <div class="subscribes__discount" v-if="sub.badgeDiscount !== ''">
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
    <span class="subscribes__subtitle">или приобретите одно видео</span>
    <div class="subscribes__item add-pointer" @click="buyLesson">
      <div class="subscribes__description">
        <div class="subscribes__info">
          <div class="subscribes__term">{{ lessonInfo.title }}</div>
          <div class="subscribes__price">{{ lessonInfo.price / 100 }} ₽</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { cloudPaymentsPay } from '@/utils'
import LoaderComponent from '@/components/UI/Components/LoaderComponent.vue'

export default {
  name: 'MySubscriptionLesson',
  components: { LoaderComponent },
  data() {
    return {
      subscriptions: [],
      localLoading: true,
    }
  },
  props: {
    lessonInfo: {
      type: Object,
    },
  },
  methods: {
    ...mapActions('shared', ['setSuccess']),
    getSubscriptions() {
      this.localLoading = true
      this.$http
        .get('/api/purchase/subscriptions')
        .then((res) => res.json())
        .then((subscriptions) => {
          this.subscriptions = subscriptions
        })
        .finally(() => {
          this.localLoading = false
        })
    },
    buySubscription(id) {
      if (this.user === null) {
        this.$router.push({ name: 'UserLogin' })
      } else {
        this.$http
          .get(`/api/purchase/pay/subscription/${id}`)
          .then((res) => res.json())
          .then((purchaseInfo) => {
            cloudPaymentsPay(purchaseInfo)
          })
      }
    },
    buyLesson() {
      if (this.user === null) {
        this.$router.push({ name: 'UserLogin' })
      } else {
        this.$http
          .get(`/api/purchase/pay/lesson/${this.lessonInfo.id}`)
          .then((res) => res.json())
          .then((purchaseInfo) => {
            cloudPaymentsPay(purchaseInfo)
          })
      }
    },
  },
  mounted() {
    this.getSubscriptions()
  },
  computed: {
    ...mapGetters('user', ['user']),
  },
}
</script>

<style scoped></style>
