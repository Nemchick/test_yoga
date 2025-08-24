<template>
  <div class="questionnaire questionnaire--step13">
    <div class="questionnaire__content" v-if="localLoading === false">
      <div class="questionnaire__content-wrapper">
        <div class="questionnaire__content">
          <div class="questionnaire__title">
            <h1>Ваше колесо баланса</h1>
          </div>
          <div class="questionnaire__description">
            <p>
              Задумайтесь, почему вы не в вашем целевом состоянии? Чего вам не
              хватает для того, чтобы вы были в своём целевом состоянии?
            </p>
          </div>
        </div>
        <div class="questionnaire__diagram">
          <ChartBalance :balance-data="balanceChartData" />
        </div>
      </div>
    </div>
    <LoaderComponent v-else />
  </div>
</template>

<script>
import LoaderComponent from '@/components/UI/Components/LoaderComponent.vue'
import ChartBalance from '@/components/Survey/ChartBalance.vue'

export default {
  name: 'BalanceWheelPage',
  components: { LoaderComponent, ChartBalance },
  data() {
    return {
      localLoading: true,
      surveyResults: null,
    }
  },
  methods: {
    closeModal() {
      this.$emit('on-close-modal')
    },
    getLastSurveyResult() {
      this.localLoading = true
      this.$http
        .get('/api/program/survey')
        .then((res) => res.json())
        .then(({ answers }) => {
          if (answers === undefined) {
            this.$router.push({ name: 'MyProgram' })
          } else {
            this.surveyResults = answers
          }
        })
        .finally(() => {
          this.localLoading = false
        })
    },
  },
  mounted() {
    this.getLastSurveyResult()
  },
  computed: {
    balanceChartData() {
      const balanceWheelStepsTypesOrder = [
        'physicalHealth',
        'emotionalHealth',
        'financials',
        'socialImplementation',
        'relationship',
        'brightnessOfLife',
        'personalGrowth',
        'spiritualGrowth',
      ]
      const res = []
      balanceWheelStepsTypesOrder.forEach((x) => {
        const stepResult = this.surveyResults[x]
        if (typeof stepResult.result === 'number') {
          res.push(stepResult.result)
        }
      })
      return res
    },
  },
}
</script>
