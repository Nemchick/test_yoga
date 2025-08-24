<template>
  <div class="questionnaire__description">
    <p>{{ relQuestion.question }}</p>
    <div class="form form--level">
      <fieldset class="form__section form__section--submit">
        <a class="button button--t1" @click="selectAnswer(true)">
          <span>Да</span>
        </a>
        <a class="button button--t1" @click="selectAnswer(false)">
          <span>Нет</span>
        </a>
      </fieldset>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RelationQuestions',
  props: {
    relQuestion: {
      type: Object,
      required: true,
    },
  },
  methods: {
    selectAnswer(answer) {
      const payload = {
        relQuestion: this.relQuestion,
        answer: answer,
      }
      this.$emit('on-select-answer', payload)
    },
  },
}
</script>

<style scoped></style>
