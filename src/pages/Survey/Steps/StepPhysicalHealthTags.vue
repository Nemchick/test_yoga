<template>
  <div class="questionnaire questionnaire--step03">
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
        <img src="@/assets/img/icons/physical.svg" alt="" />
        <h1>{{ stepTitle }}</h1>
      </div>
      <div class="questionnaire__description">
        <p>Выберите все темы физического здоровья, которые вас беспокоят.</p>
      </div>
      <form method="post" action="#" class="form form--tags">
        <fieldset class="form__section">
          <div
            class="form__input form__input--checkbox checkbox checkbox--tag"
            v-for="(tag, id) in tags"
            :key="id"
          >
            <input
              type="checkbox"
              :value="tag"
              v-model="selectedTags"
              :id="`tag_${id}`"
            />
            <label :for="`tag_${id}`">{{ tag }}</label>
          </div>
        </fieldset>
        <fieldset class="form__section form__section--submit">
          <a class="button button--t5" @click="saveResultAndGoNext">
            <span>Продолжить</span>
          </a>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import stepProgressMixin from '@/mixins/stepProgressMixin'
import surveyMetaTags from '@/mixins/surveyMetaTags'

export default {
  name: 'SurveyStep03',
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
      selectedTags: [],
      tags: [
        'Гибкий позвоночник',
        'Пищеварение',
        'Лишний вес',
        'Обмен веществ',
        'Иммунитет',
        'Дыхательная система',
        'Здоровая сексуальность',
        'Проблемы со сном',
        'Нервная система',
        'Головная боль',
      ],
    }
  },
  methods: {
    ...mapActions('survey', ['addSurveyResults']),
    saveResultAndGoNext() {
      const payload = {
        type: this.stepType,
        step: this.currentStep,
        result: this.selectedTags,
      }
      this.addSurveyResults(payload).then(() => {
        this.$emit('on-next-step', payload)
      })
    },
  },
  mounted() {
    const stepResult = this.surveyResults[this.stepType]
    if (stepResult) {
      this.selectedTags = stepResult.result
    } else {
      this.selectedTags = []
    }
  },
  computed: {
    ...mapGetters('survey', ['surveyResults']),
  },
}
</script>

<style scoped></style>
