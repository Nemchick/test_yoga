<template>
  <div class="questionnaire questionnaire--step04">
    <div v-if="showModal" class="kirill_modal_reg">
      <div class="modal_survey">
        <div class="title_modal_survey">
          Расскажите нам больше про ваш <br />
          эмоциональный фон
        </div>
        <div class="text_modal_survey">
          Пожалуйста, ответите на пару дополнительных вопросов?
        </div>
        <button
          class="button_madal_survey kirill_button_orange"
          @click="closeSurveyModal"
        >
          Хорошо
        </button>
      </div>
    </div>
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
        <img src="@/assets/img/icons/emotional.svg" alt="" />
        <h1>{{ stepTitle }}</h1>
      </div>
      <div class="questionnaire__description">
        <p>
          Эмоциональное здоровье означает, что приятные и нейтральные эмоции
          являются привычным фоном жизни. А если происходят какие-то плохие
          события, то вы умеете быстро избавляться от негативных эмоций.
          Насколько вы довольны своим эмоциональным фоном в целом?
        </p>
        <SurveyLevelSelector
          v-model="level"
          @on-next-step="saveResultAndGoNext"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import SurveyLevelSelector from '@/components/Survey/SurveyLevelSelector.vue'
import stepProgressMixin from '@/mixins/stepProgressMixin'
import surveyMetaTags from '@/mixins/surveyMetaTags'
export default {
  name: 'SurveyStep04',
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
      stepResult: {},
      showModal: localStorage.getItem('showModal3') === null,
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
    closeSurveyModal() {
      localStorage.setItem('showModal3', true)
      this.showModal = false
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
