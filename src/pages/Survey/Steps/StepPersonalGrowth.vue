<template>
  <div class="questionnaire questionnaire--step11">
    <div class="questionnaire__header">
      <div class="questionnaire__header--left">
        <a @click="$emit('on-prev-step')" class="back-link">
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
        <img src="@/assets/img/icons/grothe.svg" alt="" />
        <h1>{{ stepTitle }}</h1>
      </div>
      <div class="questionnaire__description">
        <p>
          Личностный рост – это приобретение новых навыков и знаний,
          саморазвитие и самообразование. Наполнена ли ваша жизнь новым или
          напоминает рутину изо дня в день? Достигаете ли вы поставленных целей?
          Постарайтесь честно ответить себе и оцените эту часть своей жизни.
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
import SurveyLevelSelector from '@/components/Survey/SurveyLevelSelector.vue'
import stepProgressMixin from '@/mixins/stepProgressMixin'
import surveyMetaTags from '@/mixins/surveyMetaTags'
export default {
  name: 'SurveyStep11',
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
