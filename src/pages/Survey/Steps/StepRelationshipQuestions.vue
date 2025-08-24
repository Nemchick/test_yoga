<template>
  <div class="questionnaire questionnaire--step09">
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
        <img src="@/assets/img/icons/relations.svg" alt="" />
        <h1>{{ stepTitle }}</h1>
      </div>
      <div class="questionnaire__description">
        <RelationQuestion
          :rel-question="currentQuestion"
          @on-select-answer="(payload) => saveRelQuestionAnswer(payload)"
          :key="`question_${currentQuestion.id}`"
          v-if="currentQuestion !== null"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import stepProgressMixin from '@/mixins/stepProgressMixin'
import RelationQuestion from '@/components/Survey/RelationQuestion.vue'
import surveyMetaTags from '@/mixins/surveyMetaTags'
export default {
  name: 'StepRelationshipQuestions',
  mixins: [stepProgressMixin, surveyMetaTags],
  components: { RelationQuestion },
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
      answeredQuestions: [],
      currentQuestion: {},
      stepResult: {
        relQuestionAnswers: [],
      },
      relationshipQuestions: [
        {
          id: '4.1',
          question: 'Вы испытываете снижение сексуального влечения?',
        },
        {
          id: '4.2',
          question: 'Вы часто испытываете чувство одиночества?',
        },
        {
          id: '4.3',
          question: 'Возможно, вы проходите через сложный этап в отношениях?',
        },
        {
          id: '4.4',
          question: 'Вы хотите улучшить отношения с супругом?',
        },
        {
          id: '4.5',
          question: 'Вы хотите открыться новой любви?',
        },
        {
          id: '4.6',
          question:
            'Вы хотите повысить свою привлекательность и сделать отношения с людьми более гармоничными?',
        },
        {
          id: '4.7',
          question: 'Вы хотите улучшить свои коммуникативные навыки?',
        },
        {
          id: '4.8',
          question: 'Хотите улучшить отношения с ребёнком?',
        },
      ],
    }
  },
  methods: {
    ...mapActions('survey', ['addSurveyResults']),
    randomItem(items) {
      return items[Math.floor(Math.random() * items.length)]
    },
    getNextQuestion() {
      // check if we already two times answered YES (true)
      const trueAnswered = this.stepResult.relQuestionAnswers.filter(
        (x) => x.answer === true
      )
      if (
        trueAnswered.length === 2 ||
        this.answeredQuestions.length === this.relationshipQuestions.length
      ) {
        this.saveResultAndGoNext()
        return
      }
      const questions = this.relationshipQuestions.map((x) => x.id)
      const answeredQuestions = this.answeredQuestions
      const remainingQuestions = []
      questions.forEach((x) => {
        if (!answeredQuestions.includes(x)) {
          remainingQuestions.push(x)
        }
      })
      const nextQuestionID = this.randomItem(remainingQuestions)
      this.currentQuestion = this.relationshipQuestions.find(
        (x) => x.id === nextQuestionID
      )
    },
    saveRelQuestionAnswer(payload) {
      this.stepResult.relQuestionAnswers.push({
        id: payload.relQuestion.id,
        question: payload.relQuestion.question,
        answer: payload.answer,
      })
      this.answeredQuestions.push(payload.relQuestion.id)
      this.getNextQuestion()
    },
    saveResultAndGoNext() {
      const payload = {
        type: this.stepType,
        step: this.currentStep,
        result: this.stepResult.relQuestionAnswers,
      }
      this.addSurveyResults(payload).then(() => {
        this.$emit('on-next-step', payload)
      })
    },
  },
  mounted() {
    this.getNextQuestion()
  },
  computed: {
    ...mapGetters('survey', ['surveyResults']),
  },
}
</script>

<style scoped></style>
