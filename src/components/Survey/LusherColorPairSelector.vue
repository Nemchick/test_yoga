<template>
  <div class="luscher__grid luscher__grid--two">
    <div
      class="luscher__item add-pointer"
      :style="{ background: luscherColorMap[key] }"
      v-for="(key, index) in colorPair"
      :key="index"
      @click="selectColor(key)"
    />
  </div>
</template>

<script>
import { luscherColorMap } from '@/utils'

export default {
  name: 'LusherColorPairSelector',
  props: {
    colorPair: {
      type: Array,
      required: true,
    },
    luscherStep: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      luscherColorMap: luscherColorMap,
    }
  },
  methods: {
    selectColor(key) {
      const payload = {
        step: this.luscherStep,
        colorIndex: key,
      }
      this.$emit('on-color-select', payload)
    },
  },
}
</script>

<style scoped></style>
