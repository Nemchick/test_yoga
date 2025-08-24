<template>
  <div class="modal__wrapper">
    <div class="modal">
      <button class="button--close" @click="closeModal(false)">
        <i class="icon-close" />
      </button>
      <div class="modal__content">
        <div class="modal__title">
          <h3>Выберите, сколько дней вы готовы практиковать крийю</h3>
        </div>
        <div class="modal__description">
          <p>Рекомендуем выбрать 40 или более дней.</p>
        </div>
        <div class="form">
          <fieldset class="form__section form__section--wide">
            <div class="days-select">
              <div class="radio--square">
                <input
                  type="radio"
                  name="days"
                  id="variant01"
                  :value="0"
                  v-model="selectedRepeats"
                />
                <label for="variant01">Без лимита по дням</label>
              </div>
              <div class="radio--square">
                <input
                  type="radio"
                  name="days"
                  id="variant02"
                  :value="40"
                  v-model="selectedRepeats"
                />
                <label for="variant02"><span>40</span>дней</label>
              </div>
              <div class="radio--square">
                <input
                  type="radio"
                  name="days"
                  id="variant03"
                  :value="90"
                  v-model="selectedRepeats"
                />
                <label for="variant03"><span>90</span>дней</label>
              </div>
              <div class="radio--square">
                <input
                  type="radio"
                  name="days"
                  id="variant04"
                  :value="120"
                  v-model="selectedRepeats"
                />
                <label for="variant04"><span>120</span>дней</label>
              </div>
            </div>
          </fieldset>
          <fieldset class="form__section">
            <button
              type="submit"
              class="button button--s1 button--t1"
              @click="setRepeats"
            >
              <span>Сохранить</span>
            </button>
          </fieldset>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LessonRepeatsSetter',
  props: {
    lessonID: {
      type: Number,
      required: true,
    },
    currentRepeatsCount: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      selectedRepeats: this.currentRepeatsCount,
    }
  },
  methods: {
    closeModal(payload) {
      this.$emit('on-close-modal', payload)
    },
    setRepeats() {
      const payload = {
        repeats: this.selectedRepeats,
      }
      this.$http
        .post(`/api/library/lesson/${this.lessonID}/repeats/set`, payload)
        .then(() => {
          this.closeModal(this.selectedRepeats)
        })
    },
  },
}
</script>

<style scoped></style>
