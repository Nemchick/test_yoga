<template>
  <div class="modal__wrapper">
    <div class="modal">
      <button class="button--close" @click="closeCitation()">
        <i class="icon-close" />
      </button>
      <div class="modal modal--quote">
        <div class="modal__img">
          <img v-lazy="citation.cover" alt="" />
        </div>
        <div class="modal__content">
          <div class="modal__description">
            <p>{{ citation.body }}</p>
          </div>
          <button class="button button--s2 button--t1" @click="closeCitation()">
            Продолжить
          </button>
          <div class="form__input form__input--checkbox checkbox">
            <input type="checkbox" id="agree2" v-model="disableCitation" />
            <label for="agree2">Больше не показывать</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CitationOfDay',
  props: ['citation'],
  data() {
    return {
      disableCitation: false,
    }
  },
  methods: {
    closeCitation() {
      this.$emit('on-close-citation', this.disableCitation)
    },
  },
}
</script>
