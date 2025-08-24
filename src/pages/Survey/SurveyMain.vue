<template>
  <div class="helper-simple">
    <main class="main">
      <StepPhysicalHealth
        :current-step="currentStep"
        step-title="Физическое здоровье"
        step-type="physicalHealth"
        @on-go-home="goHome"
        @on-next-step="(stepResult) => nextStep(stepResult)"
        @on-prev-step="(stepType) => prevStep(stepType)"
        v-if="currentStep === 1"
      />
      <StepPhysicalHealthTags
        :current-step="currentStep"
        step-title="Физическое здоровье"
        step-type="physicalHealthTags"
        @on-go-home="goHome"
        @on-next-step="(stepResult) => nextStep(stepResult)"
        @on-prev-step="(stepType) => prevStep(stepType)"
        v-if="currentStep === 2"
      />
      <StepFinancials
        :current-step="currentStep"
        step-title="Финансы"
        step-type="financials"
        @on-go-home="goHome"
        @on-next-step="(stepResult) => nextStep(stepResult)"
        @on-prev-step="(stepType) => prevStep(stepType)"
        v-if="currentStep === 3"
      />
      <StepSocialImplementation
        :current-step="currentStep"
        step-title="Социальная реализация"
        step-type="socialImplementation"
        @on-go-home="goHome"
        @on-next-step="(stepResult) => nextStep(stepResult)"
        @on-prev-step="(stepType) => prevStep(stepType)"
        v-if="currentStep === 4"
      />
      <StepRelationship
        :current-step="currentStep"
        step-title="Отношения"
        step-type="relationship"
        @on-go-home="goHome"
        @on-next-step="(stepResult) => nextStep(stepResult)"
        @on-prev-step="(stepType) => prevStep(stepType)"
        v-if="currentStep === 5"
      />
      <StepRelationshipQuestions
        :current-step="currentStep"
        step-title="Отношения"
        step-type="relationshipQuestions"
        @on-go-home="goHome"
        @on-next-step="(stepResult) => nextStep(stepResult)"
        @on-prev-step="(stepType) => prevStep(stepType)"
        v-if="currentStep === 6"
      />
      <StepBrightnessOfLife
        :current-step="currentStep"
        step-title="Развлечения и отдых"
        step-type="brightnessOfLife"
        @on-go-home="goHome"
        @on-next-step="(stepResult) => nextStep(stepResult)"
        @on-prev-step="(stepType) => prevStep(stepType)"
        v-if="currentStep === 7"
      />
      <StepPersonalGrowth
        :current-step="currentStep"
        step-title="Личностный рост"
        step-type="personalGrowth"
        @on-go-home="goHome"
        @on-next-step="(stepResult) => nextStep(stepResult)"
        @on-prev-step="(stepType) => prevStep(stepType)"
        v-if="currentStep === 8"
      />
      <StepSpiritualGrowth
        :current-step="currentStep"
        step-title="Духовный рост"
        step-type="spiritualGrowth"
        @on-go-home="goHome"
        @on-next-step="(stepResult) => nextStep(stepResult)"
        @on-prev-step="(stepType) => prevStep(stepType)"
        v-if="currentStep === 9"
      />
      <StepEmotionalHealth
        :current-step="currentStep"
        step-title="Эмоциональное здоровье"
        step-type="emotionalHealth"
        @on-go-home="goHome"
        @on-next-step="(stepResult) => nextStep(stepResult)"
        @on-prev-step="(stepType) => prevStep(stepType)"
        v-if="currentStep === 10"
      />
      <StepEmotionalHealthQuestions
        :current-step="currentStep"
        step-title="Эмоциональное здоровье"
        step-type="emotionalHealthQuestions"
        @on-go-home="goHome"
        @on-next-step="(stepResult) => nextStep(stepResult)"
        @on-prev-step="(stepType) => prevStep(stepType)"
        v-if="currentStep === 11"
      />
      <StepPreLuscher
        :current-step="currentStep"
        step-title="Осталось пройти тест Люшера"
        step-type="preLuscher"
        @on-go-home="goHome"
        @on-next-step="(stepResult) => nextStep(stepResult)"
        @on-prev-step="(stepType) => prevStep(stepType)"
        v-if="currentStep === 12"
      />
      <SurveyLuscherPairColor
        :current-step="currentStep"
        step-type="luscherPairColor"
        @on-go-home="goHome"
        @on-next-step="(stepResult) => nextStep(stepResult)"
        @on-prev-step="(stepType) => prevStep(stepType)"
        v-if="currentStep === 13"
      />
      <SurveyLuscherMultipleColor
        :current-step="currentStep"
        step-type="luscherMultColor"
        @on-go-home="goHome"
        @on-next-step="(stepResult) => nextStep(stepResult)"
        @on-prev-step="(stepType) => prevStep(stepType)"
        v-if="currentStep === 14"
      />
      <StepBalanceWheel
        :current-step="currentStep"
        step-title="Ваше колесо баланса"
        step-type="balanceWheel"
        @on-go-home="goHome"
        @on-next-step="(stepResult) => nextStep(stepResult)"
        @on-prev-step="(stepType) => prevStep(stepType)"
        v-if="currentStep === 15"
      />
      <StepPersonInfo
        :current-step="currentStep"
        step-title="Остался всего 1 шаг"
        step-type="personInfo"
        @on-go-home="goHome"
        @on-next-step="(stepResult) => nextStep(stepResult)"
        @on-prev-step="(stepType) => prevStep(stepType)"
        v-if="currentStep === 16"
      />
    </main>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import StepPersonInfo from '@/pages/Survey/Steps/StepPersonInfo.vue'
import StepPhysicalHealth from '@/pages/Survey/Steps/StepPhysicalHealth.vue'
import StepPhysicalHealthTags from '@/pages/Survey/Steps/StepPhysicalHealthTags.vue'
import StepFinancials from '@/pages/Survey/Steps/StepFinancials.vue'
import StepSocialImplementation from '@/pages/Survey/Steps/StepSocialImplementation.vue'
import StepRelationship from '@/pages/Survey/Steps/StepRelationship.vue'
import StepRelationshipQuestions from '@/pages/Survey/Steps/StepRelationshipQuestions.vue'
import StepBrightnessOfLife from '@/pages/Survey/Steps/StepBrightnessOfLife.vue'
import StepPersonalGrowth from '@/pages/Survey/Steps/StepPersonalGrowth.vue'
import StepSpiritualGrowth from '@/pages/Survey/Steps/StepSpiritualGrowth.vue'
import StepEmotionalHealth from '@/pages/Survey/Steps/StepEmotionalHealth.vue'
import StepEmotionalHealthQuestions from '@/pages/Survey/Steps/StepEmotionalHealthQuestions.vue'
import StepBalanceWheel from '@/pages/Survey/Steps/StepBalanceWheel.vue'
import StepPreLuscher from '@/pages/Survey/Steps/StepPreLuscher.vue'
import SurveyLuscherPairColor from '@/pages/Survey/Steps/SurveyLuscherPairColor.vue'
import SurveyLuscherMultipleColor from '@/pages/Survey/Steps/SurveyLuscherMultipleColor.vue'

export default {
  name: 'SurveySteps',
  components: {
    StepPersonInfo,
    StepPhysicalHealth,
    StepPhysicalHealthTags,
    StepFinancials,
    StepSocialImplementation,
    StepRelationship,
    StepRelationshipQuestions,
    StepBrightnessOfLife,
    StepPersonalGrowth,
    StepSpiritualGrowth,
    StepEmotionalHealth,
    StepEmotionalHealthQuestions,
    StepBalanceWheel,
    StepPreLuscher,
    SurveyLuscherPairColor,
    SurveyLuscherMultipleColor,
  },
  metaInfo() {
    return {
      title:
        'Пройдите анкету и уникальный алгоритм подберет вам программу занятий',
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content:
            'Пройдите уникальную анкету, и мы определим ваше текущее состояние с максимальной точностью и поможем вам подобрать именно ту практику Кундалини-йоги, которую вы искали. Она поможет вам решить ваши жизненные вопросы и достичь невероятных результатов.',
        },
        {
          vmid: 'keywords',
          name: 'keywords',
          content:
            'подбор программы занятий кундалини йога, анкета для подбора занятий кундалини йога, тест люшера',
        },
      ],
    }
  },
  data() {
    return {
      currentStep: 1,
      surveySteps: [
        // {
        //   id: 1,
        //   type: 'personInfo',
        // },
        {
          id: 2,
          type: 'physicalHealth',
        },
        {
          id: 3,
          type: 'physicalHealthTags',
        },
        {
          id: 4,
          type: 'financials',
        },
        {
          id: 5,
          type: 'socialImplementation',
        },
        {
          id: 6,
          type: 'relationship',
        },
        {
          id: 7,
          type: 'relationshipSubQuestions',
        },
        {
          id: 8,
          type: 'brightnessOfLife',
        },
        {
          id: 9,
          type: 'personalGrowth',
        },
        {
          id: 10,
          type: 'spiritualGrowth',
        },
        {
          id: 11,
          type: 'emotionalHealth',
        },
        {
          id: 12,
          type: 'emotionalHealthSubQueries',
        },
        {
          id: 13,
          type: 'personInfo',
        },
      ],
    }
  },
  methods: {
    ...mapActions('survey', ['restoreSurveyResults']),
    goHome() {
      this.$router.push('/')
    },
    nextStep(stepResult) {
      if (stepResult === 'final') {
        if (this.user !== null) {
          this.$router.push('/survey/final-registered')
          return
        }
        this.$router.push('/survey/final')
      }
      const { type, result } = stepResult
      if (type === 'physicalHealth' && result > 6) {
        this.currentStep += 2
      } else {
        this.currentStep += 1
      }
    },
    prevStep(stepType) {
      if (stepType === 'financials') {
        if (this.physicalHealthResult > 6) {
          this.currentStep -= 2
        } else {
          this.currentStep -= 1
        }
        return
      }
      this.currentStep -= 1
    },
  },
  beforeMount() {
    // restore results
    this.restoreSurveyResults()
  },
  computed: {
    ...mapGetters('survey', ['surveyResults', 'physicalHealthResult']),
    ...mapGetters('user', ['user']),
  },
}
</script>

<style scoped></style>
