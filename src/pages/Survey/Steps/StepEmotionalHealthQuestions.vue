<template>
  <div class="questionnaire questionnaire--step04">
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
      <EmotionalQuestion
        :question-type="currentQuestion.type"
        :icon="currentQuestion.icon"
        :text="currentQuestion.text"
        :levels="currentQuestion.levels"
        :prev-answers="prevAnswers"
        :key="currentQuestion.type"
        @on-select-answer="(payload) => saveEmotQuestionAnswer(payload)"
        v-if="currentQuestion !== null"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import EmotionalQuestion from '@/components/Survey/EmotionalQuestion.vue'
import stepProgressMixin from '@/mixins/stepProgressMixin'
import surveyMetaTags from '@/mixins/surveyMetaTags'
export default {
  name: 'StepEmotionalHealthQuestions',
  mixins: [stepProgressMixin, surveyMetaTags],
  components: { EmotionalQuestion },
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
      stepResult: {
        emotQuestionAnswers: [],
      },
      currentQuestion: null,
      answeredQuestions: [],
      prevAnswers: [],
      emotionalQuestions: [
        {
          type: 'Печаль',
          icon: 'sadness',
          text: 'Часто ли вы грустите? Бывает такое, что печаль накатывает волной, и вы погружаетесь в неё настолько, что чувствуете отчаяние? Оцените, что вы испытываете чаще всего',
          levels: [
            {
              value: 0,
              title: 'Нет такого',
            },
            {
              value: 1,
              title: 'Грусть',
            },
            {
              value: 2,
              title: 'Печаль',
            },
            {
              value: 3,
              title: 'Отчаяние',
            },
            {
              value: 4,
              title: 'Горе',
            },
            {
              value: 5,
              title: 'Апатия',
            },
          ],
        },
        {
          type: 'Страх',
          icon: 'fear',
          text: 'Как вы ощущаете себя в последнее время: присутствуют ли страх, беспокойство или  предчувствие опасности?',
          levels: [
            {
              value: 0,
              title: 'Нет такого',
            },
            {
              value: 1,
              title: 'Беспокойство',
            },
            {
              value: 2,
              title: 'Чувство опасности',
            },
            {
              value: 3,
              title: 'Тревога',
            },
            {
              value: 4,
              title: 'Страх',
            },
            {
              value: 5,
              title: 'Ужас',
            },
          ],
        },
        {
          type: 'Злость',
          icon: 'anger',
          text: 'В последние дни вы были раздражены или негодовали по поводу чего-либо? Насколько легко вас вывести из себя? Выберите чувство, которое испытываете чаще всего',
          levels: [
            {
              value: 0,
              title: 'Нет такого',
            },
            {
              value: 1,
              title: 'Раздражение',
            },
            {
              value: 2,
              title: 'Досада',
            },
            {
              value: 3,
              title: 'Негодование',
            },
            {
              value: 4,
              title: 'Гнев',
            },
            {
              value: 5,
              title: 'Ярость',
            },
          ],
        },
        {
          type: 'Радость',
          icon: 'joy',
          text: 'В последнее время вы счастливы? Вы чувствуете подъём, всепоглощающую радость или внутреннее спокойствие и приятные ощущения от жизни? Оцените своё состояние',
          levels: [
            {
              value: 0,
              title: 'Нет такого',
            },
            {
              value: 1,
              title: 'Спокойствие',
            },
            {
              value: 2,
              title: 'Приятные ощущения',
            },
            {
              value: 3,
              title: 'Радость',
            },
            {
              value: 4,
              title: 'Гиперактивность',
            },
            {
              value: 5,
              title: 'Экстаз',
            },
          ],
        },
      ],
    }
  },
  methods: {
    ...mapActions('survey', ['addSurveyResults']),
    getNextQuestion() {
      if (this.answeredQuestions.length === this.emotionalQuestions.length) {
        this.saveResultAndGoNext()
        return
      }
      this.currentQuestion =
        this.emotionalQuestions[this.answeredQuestions.length]
    },
    saveEmotQuestionAnswer(payload) {
      this.stepResult.emotQuestionAnswers.push({
        type: payload.type,
        level: payload.level,
      })
      this.answeredQuestions.push(payload.type)
      this.getNextQuestion()
    },
    saveResultAndGoNext() {
      const payload = {
        type: this.stepType,
        step: this.currentStep,
        result: this.stepResult.emotQuestionAnswers,
      }
      this.addSurveyResults(payload).then(() => {
        this.$emit('on-next-step', payload)
      })
    },
  },
  mounted() {
    const stepResult = this.surveyResults[this.stepType]
    if (stepResult) {
      this.prevAnswers = stepResult.result
    }
    this.getNextQuestion()
  },
  computed: {
    ...mapGetters('survey', ['surveyResults']),
  },
}
</script>

<style scoped></style>
