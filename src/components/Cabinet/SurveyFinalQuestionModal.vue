<template>
  <div class="modal__wrapper">
    <div class="modal">
      <button class="button--close" @click="closeModal">
        <i class="icon-close" />
      </button>
      <div class="modal__content">
        <div class="modal__subtitle">
          <h4>Помогите нам стать лучше</h4>
        </div>
        <template v-if="localLoading"> <LoaderComponent /> </template>
        <template v-else>
          <div class="modal__description">
            <p>
              Мы оценили ваше текущее состояние и видим, что сфера «{{
                recommendedSphere
              }}» является наиболее приоритетной для вас сейчас. Поэтому
              рекомендуем вам начать с программы «{{ programTitle }}». Актуальны
              ли для вас сейчас улучшения в этой сфере?
            </p>
          </div>
          <div class="modal__buttons">
            <button
              type="submit"
              class="button button--t1"
              @click="selectAnswer(true)"
            >
              <span>Да</span>
            </button>
            <button
              type="submit"
              class="button button--t3"
              @click="selectAnswer(false)"
            >
              <span>Нет</span>
            </button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import LoaderComponent from '@/components/UI/Components/LoaderComponent.vue'

export default {
  name: 'SurveyFinalQuestionModal',
  components: { LoaderComponent },
  props: {
    programTitle: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      localLoading: true,
      surveyResults: null,
    }
  },
  methods: {
    closeModal() {
      this.$emit('on-close-modal')
    },
    selectAnswer(result) {
      this.$emit('on-select-answer', result)
    },
    getLastSurveyResult() {
      this.localLoading = true
      this.$http
        .get('/api/program/survey')
        .then((res) => res.json())
        .then((surveyResults) => {
          this.surveyResults = surveyResults
        })
        .finally(() => {
          this.localLoading = false
        })
    },
  },
  computed: {
    recommendedSphere() {
      return this.surveyResults?.recommended_program?.sphere
    },
  },
  mounted() {
    this.getLastSurveyResult()
  },
}
</script>
