<template>
  <div class="questionnaire questionnaire--step16">
    <div class="questionnaire__header">
      <div class="questionnaire__header--left">
        <a @click="$emit('on-prev-step')" class="back-link">
          <i class="icon-back" />
        </a>
      </div>
      <div class="questionnaire__header--center">
        <div class="questionnaire-progress__wrapper">
          <SurveyProgressBar
            :step-two-progress="100"
            :step-three-progress="stepPercentage"
          />
        </div>
      </div>
      <div class="questionnaire__header--right">
        <button class="button--close" @click="$emit('on-go-home')">
          <i class="icon-close"></i>
        </button>
      </div>
    </div>
    <div class="questionnaire__content">
      <div class="questionnaire__title"><span>Тест Люшера</span></div>
      <div class="questionnaire__description">
        <h3 v-if="luscherMultRes.length === 0">
          Выберите наиболее приятный для вас цвет
        </h3>
        <h3 v-else>Выберите из оставшихся цветов наиболее приятный</h3>
      </div>
      <div class="luscher__grid luscher__grid--four">
        <div
          class="luscher__item"
          :class="{ 'add-pointer': isColorSelectable(colorIndex) }"
          :style="{ background: getBgColor(colorIndex) }"
          v-for="(colorIndex, index) in luscherStepTwo"
          :key="`luscher_step_two_${index}`"
          @click="colorClick(colorIndex)"
        />
      </div>
      <div class="luscher__steps"><span>29 / 29</span></div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { luscherColorMap } from '@/utils'
import stepProgressMixin from '@/mixins/stepProgressMixin'
import surveyMetaTags from '@/mixins/surveyMetaTags'

export default {
  name: 'SurveyLuscher',
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
  },
  data() {
    return {
      luscherColorMap: luscherColorMap,
      luscherStepTwo: [1, 2, 3, 4, 5, 6, 7, 0],
      luscherMultRes: [],
    }
  },
  methods: {
    ...mapActions('survey', ['addSurveyResults']),
    isColorSelectable(colorIndex) {
      return !this.luscherMultRes.includes(colorIndex)
    },
    getBgColor(colorIndex) {
      if (this.luscherMultRes.includes(colorIndex)) {
        return 'transparent'
      } else {
        return this.luscherColorMap[colorIndex]
      }
    },
    colorClick(colorIndex) {
      if (this.isColorSelectable(colorIndex)) {
        this.luscherMultRes.push(colorIndex)
      }
    },
  },
  watch: {
    luscherMultRes() {
      if (this.luscherMultRes.length === this.luscherStepTwo.length) {
        const payload = {
          type: this.stepType,
          step: this.currentStep,
          result: this.luscherMultRes,
        }
        this.addSurveyResults(payload).then(() => {
          this.$emit('on-next-step', payload)
        })
      }
    },
  },
  computed: {
    ...mapGetters('survey', ['surveyResults']),
  },
}
</script>

<style scoped></style>
