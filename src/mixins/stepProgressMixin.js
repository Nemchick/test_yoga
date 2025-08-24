import SurveyProgressBar from '@/components/Survey/SurveyProgressBar.vue'
export default {
  components: { SurveyProgressBar },
  computed: {
    stepPercentage() {
      return Math.round((this.currentStep / 13) * 100)
    },
  },
}
