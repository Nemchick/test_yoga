<template>
  <div class="feedback__wrapper">
    <div navigation ref="swiper" class="swiper" data-slider-feedback>
      <ul class="swiper-wrapper">
        <li
          class="swiper-slide feedback-slider__item"
          v-for="item in feedbacks"
          :key="item.id"
        >
          <div class="feedback__rating">
            <i
              class="icon-star filled"
              v-for="n in item.rating"
              :key="`${item.id}_filled_${n}`"
            />
            <i
              class="icon-star"
              v-for="m in 5 - item.rating"
              :key="`${item.id}_empty_${m}`"
            />
          </div>
          <div class="feedback__content">
            {{ item.body }}
          </div>
          <div class="feedback__name">{{ item.username }}</div>
        </li>
      </ul>
    </div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper, { Navigation, Autoplay } from 'swiper'

export default {
  name: 'FeedbackSwiper',
  data() {
    return {
      feedbacks: [
        {
          id: 1,
          username: 'Пётр',
          body: 'Очень доволен, даже не ожидал. Чувствую себя более энергичным и спокойным одновременно. Большое спасибо!',
          rating: 5,
        },
        {
          id: 2,
          username: 'Елена',
          body: 'Я новичок в йоге, и этот сервис идеален для меня. Команда предоставляет отличные инструкции и поддержку. с нетерпением жду продолжения занятий.',
          rating: 5,
        },
        {
          id: 3,
          username: 'Светлана',
          body: 'Уже несколько лет занимаюсь йогой, но тут мне открылись новые аспекты практики. Упражнения были разнообразными и вызвали у меня положительные изменения как на физическом так и на эмоциональном уровне.',
          rating: 5,
        },
        {
          id: 4,
          username: 'Пётр',
          body: 'Очень доволен, даже не ожидал. Чувствую себя более энергичным и спокойным одновременно. Большое спасибо!',
          rating: 4,
        },
        {
          id: 5,
          username: 'Олег',
          body: 'Все упражнения были хорошо структурированы. Прогресс я чувствую после каждого занятия.',
          rating: 5,
        },
        {
          id: 6,
          username: 'Ольга',
          body: 'Смогла не только улучшить свою физическую форму, но и стала более осознанной и спокойной благодаря ребятам. Вы действительно помогли мне изменить жизнь к лучшему.',
          rating: 5,
        },
        {
          id: 7,
          username: 'Андрей',
          body: 'Очень отзывчивые товарищи по ту сторону экрана. Отдельно выделю отлично сделанные ролики и невероятную подачу!',
          rating: 5,
        },
        {
          id: 8,
          username: 'Инна',
          body: 'Рада, что выбрала подходящую программу. Она помогла мне справиться со стрессом в сложный период',
          rating: 5,
        },
        {
          id: 9,
          username: 'Игнат',
          body: 'Мне все нравится, хотя приходилось нелегко поначалу. Сейчас чувствую себя более сфокусированным и энергичным.',
          rating: 4,
        },
        {
          id: 10,
          username: 'Алла',
          body: 'Довольна результатами. Занятия помогли мне укрепить тело и улучшить гибкость.',
          rating: 5,
        },
        {
          id: 11,
          username: 'Влад',
          body: 'К сожалению, быстрого эффекта не получилось. Программа действительно работает, но я ощутил заметные результаты только после нескольких недель занятий.',
          rating: 4,
        },
        {
          id: 12,
          username: 'Катя',
          body: 'Была приятно удивлена качеством контента! быстро смогла справиться с моими проблемами со спиной. А практика с нижней чакрой… Муж тоже доволен)',
          rating: 5,
        },
        {
          id: 13,
          username: 'Александр',
          body: 'Сервис супер, особенно ребята из поддержки. Такие спокойные, видно тоже практикуют) Правда программу я взял слишком сложную, но мы без проблем заменили её',
          rating: 5,
        },
      ],
    }
  },
  mounted() {
    new Swiper(this.$refs.swiper, {
      loop: true,
      autoplay: {
        delay: 10000,
      },
      speed: 2000,
      slidesPerView: 1,
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      modules: [Navigation, Autoplay],
    })
  },
}
</script>

<style scoped></style>
