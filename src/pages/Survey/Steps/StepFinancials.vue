<template>
  <div class="questionnaire questionnaire--step06">
    <div class="questionnaire__header">
      <div class="questionnaire__header--left">
        <a @click="$emit('on-prev-step', stepType)" class="back-link">
          <i class="icon-back" />
        </a>
      </div>
      <div class="questionnaire__header--center">
        <div class="questionnaire-progress__wrapper">
          <SurveyProgressBar :step-two-progress="stepPercentage" />
        </div>
      </div>
      <div class="questionnaire__header--right">
        <button class="button--close" @click="$emit('on-go-home')">
          <i class="icon-close"></i>
        </button>
      </div>
    </div>
    <div class="questionnaire__content">
      <div class="questionnaire__title">
        <img src="@/assets/img/icons/finance.svg" alt="" />
        <h1>{{ stepTitle }}</h1>
      </div>
      <div class="questionnaire__description">
        <p>
          Важная часть жизни любого человека. Насколько вы удовлетворены доходом
          в последнее время? Оцените своё текущее финансовое положение
        </p>
      </div>
      <SurveyLevelSelector
        v-model="level"
        @on-next-step="saveResultAndGoNext"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import stepProgressMixin from '@/mixins/stepProgressMixin'
import SurveyLevelSelector from '@/components/Survey/SurveyLevelSelector.vue'
import surveyMetaTags from '@/mixins/surveyMetaTags'
export default {
  name: 'SurveyStep06',
  mixins: [stepProgressMixin, surveyMetaTags],
  components: { SurveyLevelSelector },
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
      level: 0,
    }
  },
  methods: {
    ...mapActions('survey', ['addSurveyResults']),
    saveResultAndGoNext() {
      const payload = {
        type: this.stepType,
        step: this.currentStep,
        result: Number(this.level),
      }
      this.addSurveyResults(payload).then(() => {
        this.$emit('on-next-step', payload)
      })
    },
  },
  mounted() {
    const stepResult = this.surveyResults[this.stepType]
    if (stepResult) {
      this.level = stepResult.result
    } else {
      this.level = 0
    }
  },
  computed: {
    ...mapGetters('survey', ['surveyResults']),
  },
}
</script>

<style scoped></style>
