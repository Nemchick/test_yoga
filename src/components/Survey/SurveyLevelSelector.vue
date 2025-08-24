<template>
  <div class="form form--level">
    <fieldset class="form__section">
      <fieldset class="form__section">
        <div class="label-range">
          <span>ужасно</span><span>хорошо</span><span>отлично</span>
        </div>
        <div
          class="range-slider"
          ref="rangeSlider"
          style="--min: 0; --max: 10; --step: 1; --value: 5; --text-value: '5'"
        >
          <input
            type="range"
            ref="levelSelector"
            min="0"
            max="10"
            step="1"
            :value="value"
            @input="saveSelection"
          />
          <output></output>
          <div class="range-slider__progress"></div>
        </div>
      </fieldset>
    </fieldset>
    <fieldset class="form__section form__section--submit">
      <a
        class="button button--t5"
        :class="{ disabled: value == 0 }"
        @click="nextStep"
      >
        <span>Продолжить</span>
      </a>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'SurveyLevelSelectorNew',
  props: ['value'],
  methods: {
    nextStep() {
      if (this.value == 0) {
        return
      }
      this.$emit('on-next-step')
    },
    saveSelection(e) {
      this.$emit('input', e.target.value)
      this.$nextTick(() => {
        this.$refs.rangeSlider.style.setProperty('--value', this.value)
        this.$refs.rangeSlider.style.setProperty(
          '--text-value',
          `'${this.value}'`
        )
      })
    },
    fillLevelBackground() {
      const target = this.$refs.levelSelector
      // const rangeText = this.$refs.rangeText
      const val = target.value
      let bgSize = ''
      // const opt = Array.from(target.list.children).find((x) => x.value === val)
      if (val === '10') {
        bgSize = '100% 100%'
      } else {
        // bgSize = opt.offsetLeft + opt.offsetWidth - 16 + 'px 100%'
        bgSize = val * 10 - 5 + '% 100%'
      }
      // rangeText.style.left = opt.offsetLeft + opt.offsetWidth - 16 - 4 + 'px' //Set range left position
      target.style.backgroundSize = bgSize
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.fillLevelBackground()
      this.$refs.rangeSlider.style.setProperty('--value', this.value)
      this.$refs.rangeSlider.style.setProperty(
        '--text-value',
        `'${this.value}'`
      )
    })
    window.addEventListener('resize', this.fillLevelBackground)
  },
  destroyed() {
    window.removeEventListener('resize', this.fillLevelBackground)
  },
  watch: {
    value() {
      this.fillLevelBackground()
    },
  },
}
</script>
