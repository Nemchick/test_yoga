<template>
  <div class="questionnaire questionnaire--step13">
    <div class="questionnaire__header">
      <div class="questionnaire__header--left">
        <a @click="$emit('on-prev-step')" class="back-link">
          <i class="icon-back" />
        </a>
      </div>
      <div class="questionnaire__header--center">
        <div class="questionnaire-progress__wrapper">
          <SurveyProgressBar
            :step-two-progress="100"
            :step-three-progress="100"
          />
        </div>
      </div>
      <div class="questionnaire__header--right">
        <button class="button--close" @click="$emit('on-go-home')">
          <i class="icon-close"></i>
        </button>
      </div>
    </div>
    <div class="questionnaire__content">
      <div class="questionnaire__content-wrapper">
        <div class="questionnaire__content">
          <div class="questionnaire__title">
            <h1>{{ stepTitle }}</h1>
          </div>
          <div class="questionnaire__description">
            <p>
              Задумайтесь, почему вы не в вашем целевом состоянии? Чего вам не
              хватает для того, чтобы вы были в своём целевом состоянии?
            </p>
          </div>
          <a @click="nextStep" class="button button--t1"
            ><span>Продолжить</span></a
          >
        </div>
        <div class="questionnaire__diagram">
          <ChartBalance :balance-data="balanceChartData" />
          <a @click="nextStep" class="button button--t1"
            ><span>Продолжить</span></a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ChartBalance from '@/components/Survey/ChartBalance.vue'
import stepProgressMixin from '@/mixins/stepProgressMixin'
import surveyMetaTags from '@/mixins/surveyMetaTags'
export default {
  name: 'SurveyBalanceWheel',
  mixins: [stepProgressMixin, surveyMetaTags],
  components: { ChartBalance },
  props: {
    currentStep: {
      type: Number,
      required: true,
    },
    stepType: {
      type: String,
      required: true,
    },
    stepTitle: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      level: 1,
    }
  },
  methods: {
    ...mapActions('survey', ['addSurveyResults', 'restoreSurveyResults']),
    nextStep() {
      this.$emit('on-next-step', '')
    },
  },
  beforeMount() {
    this.restoreSurveyResults()
  },
  computed: {
    ...mapGetters('survey', ['surveyResults']),
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

<style scoped></style>
