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
        <h1>{{ stepType }}</h1>
      </div>
      <div class="questionnaire__description">
        <p>Вы хотите улучшить свои коммуникативные навыки?</p>
      </div>
      <form method="post" action="#" class="form form--level">
        <fieldset class="form__section form__section--submit">
          <a class="button button--t1" @click="saveResultAndGoNext(true)">
            <span>Да</span>
          </a>
          <a class="button button--t1" @click="saveResultAndGoNext(false)">
            <span>Нет</span>
          </a>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import stepProgressMixin from '@/mixins/stepProgressMixin'
export default {
  name: 'SurveyStep09',
  mixins: [stepProgressMixin],
  props: {
    currentStep: {
      type: Number,
      required: true,
    },
    stepType: {
      type: String,
      required: true,
    },
  },
  methods: {
    ...mapActions('survey', ['addSurveyResults']),
    saveResultAndGoNext(res) {
      const payload = {
        type: this.stepType,
        step: this.currentStep,
        result: res,
      }
      this.addSurveyResults(payload).then(() => {
        this.$emit('on-next-step')
      })
    },
  },
  computed: {
    ...mapGetters('survey', ['surveyResults']),
  },
}
</script>

<style scoped></style>
