<template>
  <div class="rating-group">
    <input
      disabled
      checked
      class="rating__input rating__input--none"
      :name="`rating_${type}`"
      :id="`${type}1-none`"
      value="0"
      type="radio"
      @input="saveLevel"
    />
    <label aria-label="1 star" class="rating__label" :for="`${type}1-1`">
      <i class="rating__icon icon-lotus"></i>
    </label>
    <input
      class="rating__input"
      :name="`rating_${type}`"
      :id="`${type}1-1`"
      value="1"
      type="radio"
      @input="saveLevel"
    />
    <label aria-label="2 stars" class="rating__label" :for="`${type}1-2`">
      <i class="rating__icon icon-lotus"></i>
    </label>
    <input
      class="rating__input"
      :name="`rating_${type}`"
      :id="`${type}1-2`"
      value="2"
      type="radio"
      @input="saveLevel"
    />
    <label aria-label="3 stars" class="rating__label" :for="`${type}1-3`">
      <i class="rating__icon icon-lotus"></i>
    </label>
    <input
      class="rating__input"
      :name="`rating_${type}`"
      :id="`${type}1-3`"
      value="3"
      type="radio"
      @input="saveLevel"
    />
    <label aria-label="4 stars" class="rating__label" :for="`${type}1-4`">
      <i class="rating__icon icon-lotus"></i>
    </label>
    <input
      class="rating__input"
      :name="`rating_${type}`"
      :id="`${type}1-4`"
      value="4"
      type="radio"
      @input="saveLevel"
    />
    <label aria-label="5 stars" class="rating__label" :for="`${type}1-5`">
      <i class="rating__icon icon-lotus"></i>
    </label>
    <input
      class="rating__input"
      :name="`rating_${type}`"
      :id="`${type}1-5`"
      value="5"
      type="radio"
      @input="saveLevel"
    />
  </div>
</template>

<script>
export default {
  name: 'SharingLevelSelector',
  props: ['value', 'type'],
  methods: {
    saveLevel(e) {
      this.$emit('input', Number(e.target.value))
    },
  },
}
</script>

<style scoped></style>
