<template>
  <section v-if="showStartSection" class="kirill_section_start">
    <div class="kirill_conteiner_start">
      <div class="kirill_box_start_text">
        <div class="kirill_box_start_text_v2">
          <div class="kirill_advantage_online_title">
            С чего начать занятия?
          </div>
          <div class="kirill_start_text">
            Прочитайте короткую статью от наших мастеров йоги, узнайте
            рекомендации для начинающих: как проходят занятия, как правильно
            заниматься и многое другое
          </div>
        </div>
        <div class="kirill_box_start_button">
          <router-link
            :to="{
              path: '/cabinet/library/73/article/72',
              query: { customBackText: 'Назад' },
            }"
            class="button button--t4_v2"
          >
            Читать статью
          </router-link>
        </div>
      </div>
      <img src="@/assets/img/elements/rug.svg" class="kirill_start_img" />
      <img
        src="@/assets/img/icons/Close.svg"
        class="kirill_start_img_close"
        @click="showStartSection = false"
      />
    </div>
  </section>
</template>
<script>
export default {
  name: 'StartSection',
  data() {
    return {
      showStartSection: true,
    }
  },
}
</script>
