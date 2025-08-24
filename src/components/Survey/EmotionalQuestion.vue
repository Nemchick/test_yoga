<template>
  <div>
    <div class="questionnaire__description-wrapper">
      <img :src="require(`@/assets/img/icons/${icon}.svg`)" alt="" />
      <div class="questionnaire__description">
        <p>{{ text }}</p>
      </div>
    </div>
    <form method="post" action="#" class="form form--sadness">
      <fieldset class="form__section">
        <div class="radio__group">
          <div class="radio" v-for="(level, id) in levels" :key="`level_${id}`">
            <input
              :id="`radio_${id}`"
              name="radio"
              :value="level.value"
              type="radio"
              v-model="selectedLevel"
            />
            <label :for="`radio_${id}`" class="radio-label">
              {{ level.title }}
              <span v-if="id === 0">минимальный уровень</span>
              <span v-if="id === levels.length - 1">максимальный уровень</span>
            </label>
          </div>
        </div>
        <div class="label-sadness">
          <span>минимальный уровень</span><span>максимальный уровень</span>
        </div>
      </fieldset>
      <fieldset class="form__section form__section--submit">
        <a
          class="button button--t5"
          :class="{ disabled: selectedLevel === '' }"
          @click="selectAnswer"
        >
          <span>Продолжить</span>
        </a>
      </fieldset>
    </form>
  </div>
</template>

<script>
export default {
  name: 'EmotionalQuestion',
  props: {
    questionType: {
      type: String,
      require: true,
    },
    icon: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    levels: {
      type: Array,
      required: true,
    },
    prevAnswers: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedLevel: '',
    }
  },
  mounted() {
    if (this.prevAnswers.length) {
      const curPrevAnswer = this.prevAnswers.find(
        (x) => x.type === this.questionType
      )
      this.selectedLevel = curPrevAnswer?.level?.value
    }
  },
  methods: {
    selectAnswer() {
      if (this.selectedLevel === '') {
        return
      }
      const selectedValue = this.levels.find(
        (x) => x.value === this.selectedLevel
      )
      const payload = {
        type: this.questionType,
        level: selectedValue,
      }
      this.$emit('on-select-answer', payload)
    },
  },
}
</script>

<style scoped></style>
