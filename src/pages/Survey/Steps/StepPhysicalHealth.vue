<template>
  <div class="questionnaire questionnaire--step02">
    <div v-if="showModal" class="kirill_modal_reg">
      <div class="modal_survey">
        <div class="title_modal_survey">Пройдите небольшую анкету</div>
        <div class="text_modal_survey">
          Отвечайте на вопросы максимально честно. Так мы сможем более точно
          определить ваше состояние и подберем для вас программу занятий
        </div>
        <button class="button_madal_survey" @click="closeSurveyModal">
          Вперёд
        </button>
      </div>
    </div>
    <div class="questionnaire__header">
      <div class="questionnaire__header--left">
        <button class="back-link" @click="$router.back()">
          <i class="icon-back" />
        </button>
      </div>
      <div class="questionnaire-progress__wrapper">
        <SurveyProgressBar :step-two-progress="stepPercentage" />
      </div>
      <div class="questionnaire__header--right">
        <button class="button--close" @click="$emit('on-go-home')">
          <i class="icon-close"></i>
        </button>
      </div>
    </div>
    <div class="questionnaire__content">
      <div class="questionnaire__title">
        <img src="@/assets/img/icons/physical.svg" alt="" />
        <h1>{{ stepTitle }}</h1>
      </div>
      <div class="questionnaire__description">
        <p>Как бы вы оценили своё физическое здоровье на текущий момент?</p>
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
  name: 'SurveyStep02',
  components: { SurveyLevelSelector },
  mixins: [stepProgressMixin, surveyMetaTags],
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
      showModal: localStorage.getItem('showModal') === null,
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
      localStorage.setItem('showModal', true)
      this.showModal = false
    },
  },
  mounted() {
    // window.scrollTo(0, 0)

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
