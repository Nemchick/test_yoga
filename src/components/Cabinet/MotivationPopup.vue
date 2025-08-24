<template>
  <div class="modal__wrapper">
    <div class="modal">
      <button class="button--close" @click="closeMotivationPopup">
        <i class="icon-close" />
      </button>
      <div class="modal modal--quote">
        <div class="modal__img">
          <img v-lazy="motivation.cover" alt="" />
        </div>
        <div class="modal__content">
          <div class="modal__description">
            <p>{{ motivation.body }}</p>
          </div>
          <button
            class="button button--s2 button--t1"
            @click="closeMotivationPopup"
          >
            Продолжить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MotivationPopup',
  props: ['motivation'],
  data() {
    return {
      disableCitation: false,
    }
  },
  methods: {
    closeMotivationPopup() {
      this.$emit('on-close-motivation')
    },
  },
}
</script>
