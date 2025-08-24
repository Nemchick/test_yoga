<template>
  <div class="questionnaire questionnaire--step14">
    <div class="questionnaire__header">
      <div class="questionnaire__header--left">
        <a @click="$emit('on-prev-step')" class="back-link">
          <i class="icon-back" />
        </a>
      </div>
      <div class="questionnaire__header--center">
        <div class="questionnaire-progress__wrapper">
          <SurveyProgressBar :step-two-progress="100" />
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
          <div class="questionnaire__title" style="text-align: center">
            <h1>{{ stepTitle }}</h1>
          </div>
          <div class="questionnaire__description">
            <p>
              Он поможет нам дополнительно убедиться в вашем физическом и
              психическом состоянии, а также определить уровень стресса и
              жизненной энергии. Продолжим?
            </p>
          </div>
          <div class="form form--level">
            <div class="form__section form__section--submit">
              <a @click="nextStep" class="button button--s1 button--t1">
                <span>Хорошо</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import stepProgressMixin from '@/mixins/stepProgressMixin'
import surveyMetaTags from '@/mixins/surveyMetaTags'
export default {
  name: 'SurveyPreLuscher',
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
  methods: {
    nextStep() {
      this.$emit('on-next-step', '')
    },
  },
}
</script>

<style scoped></style>
