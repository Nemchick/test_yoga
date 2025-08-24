<template>
  <div class="questionnaire questionnaire--step10">
    <div v-if="showModal" class="kirill_modal_reg">
      <div class="modal_survey">
        <div class="title_modal_survey">Большая часть пути пройдена!</div>
        <div class="text_modal_survey">
          Спасибо за ваши ответы. Мы уже начали формировать результаты и
          заполнять ваше колесо баланса. Продолжим?
        </div>
        <button
          class="button_madal_survey kirill_button_blue"
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
        <img src="@/assets/img/icons/brightness.svg" alt="" />
        <h1>{{ stepTitle }}</h1>
      </div>
      <div class="questionnaire__description">
        <p>
          Можете ли сказать, что полноценно отдыхаете, занимаетесь любимым делом
          и считаете свою жизнь яркой? Оцените состояние этой части вашей жизни
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
  name: 'SurveyStep10',
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
      showModal: localStorage.getItem('showModal2') === null,
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
      localStorage.setItem('showModal2', true)
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
