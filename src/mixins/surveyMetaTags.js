export default {
  metaInfo() {
    return {
      meta: [
        {
          vmid: 'surveyStepTitle',
          name: 'surveyStepTitle',
          content: this.stepTitle,
        },
        {
          vmid: 'surveyStepType',
          name: 'surveyStepType',
          content: this.stepType,
        },
      ],
    }
  },
}
