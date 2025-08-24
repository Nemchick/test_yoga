<template>
  <div class="payment-history">
    <h3 class="payment-history__title">История платежей</h3>
    <LoaderComponent v-if="paymentsHistoryLoading" />
    <template v-else>
      <ul class="payment-history__header">
        <li>Дата</li>
        <li>Подписка</li>
        <li>Тип платежа</li>
        <li>Сумма</li>
        <li>Статус</li>
      </ul>
      <ul
        class="payment-history__row"
        v-for="purchaseInfo in purchaseHistory"
        :key="purchaseInfo.id"
      >
        <li class="payment-history__date">
          {{ getNextPayDate(purchaseInfo.ect) }}
        </li>
        <li class="payment-history__name">
          {{ purchaseInfo.description }}
        </li>
        <li class="payment-history__type">
          {{ purchaseInfo.type === 'lesson' ? 'Урок' : 'Регулярный' }}
        </li>
        <li class="payment-history__price">
          {{ purchaseInfo.amount / 100 }} руб.
        </li>
        <li v-if="purchaseInfo.status === 'Completed'">
          <span class="payment-status success">
            <i class="icon-success" />Успешно
          </span>
        </li>
        <li v-else>
          <span class="payment-status error">
            <i class="icon-error" />Ошибка
          </span>
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
import LoaderComponent from '@/components/UI/Components/LoaderComponent.vue'
import { parseJSON, format } from 'date-fns'

export default {
  name: 'PaymentsHistory',
  components: { LoaderComponent },
  data() {
    return {
      paymentsHistoryLoading: true,
      purchaseHistory: [],
    }
  },
  methods: {
    getPaymentsHistory() {
      this.paymentsHistoryLoading = true
      this.$http
        .get('/api/purchase/transactions')
        .then((res) => res.json())
        .then((purchaseHistory) => {
          this.purchaseHistory = purchaseHistory
        })
        .finally(() => (this.paymentsHistoryLoading = false))
    },
    getNextPayDate(payDate) {
      const dateParsed = parseJSON(payDate)
      return format(dateParsed, 'dd.MM.yyyy')
    },
  },
  mounted() {
    this.getPaymentsHistory()
  },
}
</script>
