<template>
  <div class="recommendation">
    <div class="recommendation__wrapper">
      <div class="recommendation__img">
        <img v-lazy="articleInfo.cover" alt="" />
      </div>
      <div class="recommendation__content">
        <h3>{{ articleInfo.title }}</h3>
        <a class="read-more add-pointer" @click="goToArticle">Читать статью</a>
      </div>
    </div>
    <button class="button-close" @click="closeRecommendation">
      <i class="icon-close" />
    </button>
  </div>
</template>

<script>
export default {
  name: 'RecommendedArticle',
  props: {
    articleInfo: {
      type: Object,
    },
  },
  methods: {
    closeRecommendation() {
      this.$emit('on-close-recommendation')
    },
    goToArticle() {
      this.$emit('on-read-article', this.articleInfo.id)
    },
  },
}
</script>
