<template>
  <div class="kirill_questionnaire__diagram" v-if="localLoading === false">
    <ChartBalance :balance-data="balanceChartData" />
  </div>
  <LoaderComponent v-else />
</template>

<script>
import LoaderComponent from '@/components/UI/Components/LoaderComponent.vue'
import ChartBalance from '@/components/Survey/ChartBalance.vue'

export default {
  name: 'BalanceWheel',
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
