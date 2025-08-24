<template>
  <div class="questionnaire questionnaire--step15">
    <div class="questionnaire__header">
      <div class="questionnaire__header--left">
        <a @click="prevStep" class="back-link">
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
        <h3>Выберите наиболее приятный для вас цвет</h3>
      </div>
      <div v-if="luscherStep !== luscherPairColors.length">
        <template v-for="(step, index) in luscherPairColors">
          <LusherColorPairSelector
            :luscher-step="luscherStep"
            :color-pair="step"
            v-if="luscherStep === index"
            @on-color-select="(payload) => saveLuscherRes(payload)"
            :key="`luscher_${index}`"
          />
        </template>
      </div>
      <div class="luscher__steps">
        <span>{{ luscherStep + 1 }} / {{ luscherPairColors.length + 1 }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import LusherColorPairSelector from '@/components/Survey/LusherColorPairSelector.vue'
import stepProgressMixin from '@/mixins/stepProgressMixin'
import surveyMetaTags from '@/mixins/surveyMetaTags'
export default {
  name: 'SurveyLuscher',
  mixins: [stepProgressMixin, surveyMetaTags],
  components: { LusherColorPairSelector },
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
      luscherStep: 0,
      luscherPairColors: [
        [3, 4],
        [2, 5],
        [1, 6],
        [0, 7],
        [4, 2],
        [5, 1],
        [7, 3],
        [6, 0],
        [3, 2],
        [4, 5],
        [2, 1],
        [5, 6],
        [1, 0],
        [6, 7],
        [5, 3],
        [1, 4],
        [6, 2],
        [0, 5],
        [7, 1],
        [4, 6],
        [3, 1],
        [2, 0],
        [5, 7],
        [6, 3],
        [0, 4],
        [7, 2],
        [3, 0],
        [4, 7],
      ],
      luscherPairRes: [],
    }
  },
  methods: {
    ...mapActions('survey', ['addSurveyResults']),
    saveLuscherRes({ step, colorIndex }) {
      this.luscherPairRes[step] = colorIndex
      this.luscherStep = step + 1
    },
    prevStep() {
      if (this.luscherStep === 0) {
        this.$emit('on-prev-step')
      } else {
        this.luscherStep -= 1
      }
    },
  },
  watch: {
    luscherStep() {
      if (this.luscherStep === this.luscherPairColors.length) {
        const payload = {
          type: this.stepType,
          step: this.currentStep,
          result: this.luscherPairRes,
        }
        this.addSurveyResults(payload).then(() => {
          this.$emit('on-next-step', payload)
        })
      }
    },
  },
  computed: {
    ...mapGetters('survey', ['surveyResults']),
    stepPercentage() {
      const percent =
        (this.luscherStep + 1) / (this.luscherPairColors.length + 1)
      return Math.round(percent * 100)
    },
  },
}
</script>

<style scoped></style>
