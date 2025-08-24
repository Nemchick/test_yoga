<template>
  <div class="modal__wrapper">
    <div class="modal">
      <button class="button--close" @click="closeModal">
        <i class="icon-close"></i>
      </button>
      <div class="modal__content">
        <div class="modal__title">
          <h3>Оцените своё состояние</h3>
        </div>
        <fieldset class="form__section">
          <p>Ощущения</p>
          <SharingLevelSelector
            type="feel"
            v-model="feelLevel"
            key="feelLevel_selector"
          />
        </fieldset>
        <fieldset class="form__section">
          <p>Мысли</p>
          <SharingLevelSelector
            type="thoughts"
            v-model="thoughtsLevel"
            key="thoughtsLevel_selector"
          />
        </fieldset>
        <fieldset class="form__section">
          <p>Чувства</p>
          <SharingLevelSelector
            type="feelings"
            v-model="feelingsLevel"
            key="feelingsLevel_selector"
          />
        </fieldset>
        <fieldset class="form__section">
          <div class="form__input form__input--text input">
            <input
              type="text"
              id="comment"
              placeholder="Оставьте отзыв о нас"
              v-model="comment"
            />
          </div>
        </fieldset>
        <fieldset class="form__section">
          <div class="form__description">
            <i class="icon-lightbulb"></i>
            <p>
              Анализируйте своё состояние время от времени, чтобы достичь
              желаемого
            </p>
          </div>
        </fieldset>
        <fieldset class="form__section">
          <button
            type="submit"
            :disabled="isDisabled"
            class="button button--s1 button--t1"
            :class="{ disabled: isDisabled }"
            @click="saveSharing"
          >
            <span>Сохранить</span>
          </button>
        </fieldset>
      </div>
    </div>
  </div>
</template>

<script>
import SharingLevelSelector from '@/components/UI/Components/SharingLevelSelector.vue'
import { mapActions } from 'vuex'

export default {
  name: 'SharingComponent',
  components: { SharingLevelSelector },
  props: {
    lessonID: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      feelLevel: 0,
      thoughtsLevel: 0,
      feelingsLevel: 0,
      comment: '',
    }
  },
  methods: {
    ...mapActions('shared', ['setInfo']),
    closeModal() {
      this.$emit('on-close-modal', null)
    },
    saveSharing() {
      const payload = {
        physical: this.feelLevel,
        mental: this.thoughtsLevel,
        emotional: this.feelingsLevel,
        text: this.comment,
      }
      this.$http
        .post(`/api/library/lesson/${this.lessonID}/share`, payload)
        .then(() => {
          this.setInfo('Запись в дневник эмоций успешна')
          this.closeModal()
        })
    },
  },
  computed: {
    isDisabled() {
      return !(
        this.feelLevel > 0 &&
        this.thoughtsLevel > 0 &&
        this.feelingsLevel > 0
      )
    },
  },
}
</script>

<style scoped></style>
