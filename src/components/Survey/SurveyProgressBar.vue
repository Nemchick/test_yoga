<template>
  <div class="questionnaire-progress">
    <div
      class="questionnaire-progress__section"
      :style="{ 'background-size': `${stepTwoProgress}%` }"
    ></div>
    <div
      class="questionnaire-progress__section"
      :style="{ 'background-size': `${stepThreeProgress}%` }"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'SurveyProgressBar',
  props: {
    stepTwoProgress: {
      type: Number,
      default: 0,
    },
    stepThreeProgress: {
      type: Number,
      default: 0,
    },
  },
}
</script>

<style scoped></style>
