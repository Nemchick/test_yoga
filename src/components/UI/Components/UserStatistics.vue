<template>
  <LoaderComponent v-if="localLoading" />
  <div class="container" v-else-if="!userStatisticEmpty">
    <div class="sharing__wrapper">
      <h3 class="sharing__title">Мои результаты</h3>
      <div class="sharing__statistic">
        <div class="statistic__row">
          <div class="statistic__value">{{ userStatistics.days }}</div>
          <p class="statistic__desc">
            {{ declOfNum(userStatistics.days, ['день', 'дня', 'дней']) }}
            подряд
          </p>
        </div>
        <div class="statistic__row">
          <div class="statistic__value">{{ userStatistics.minutes }}</div>
          <p class="statistic__desc">
            {{
              declOfNum(userStatistics.minutes, ['минуту', 'минуты', 'минут'])
            }}
          </p>
        </div>
        <div class="statistic__row">
          <div class="statistic__value">{{ userStatistics.complete }}</div>
          <p class="statistic__desc">
            {{
              declOfNum(userStatistics.complete, [
                'занятие',
                'занятия',
                'занятий',
              ])
            }}
            завершено
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { declOfNum } from '@/utils/'
import LoaderComponent from '@/components/UI/Components/LoaderComponent.vue'
export default {
  name: 'UserStatistics',
  components: { LoaderComponent },
  data() {
    return {
      localLoading: true,
      userStatistics: null,
    }
  },
  methods: {
    declOfNum,
    getData() {
      this.localLoading = true
      this.$http
        .get('/api/user/statistic')
        .then((res) => res.json())
        .then((userStatistics) => {
          this.userStatistics = userStatistics
        })
        .finally(() => {
          this.localLoading = false
        })
    },
  },
  mounted() {
    this.getData()
  },
  computed: {
    userStatisticEmpty() {
      const { days, minutes, complete } = this.userStatistics
      return days == 0 && minutes == 0 && complete == 0
    },
  },
}
</script>
