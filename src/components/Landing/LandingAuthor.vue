<template>
  <div class="container kirill_container_pading_40px">
    <h2 class="section__title">Знакомьтесь, авторы сервиса</h2>
    <div class="kirilll_container_authors">
      <div
        class="kirill_box_authors"
        :class="{ collapsed: feedback.isCollapsed }"
        v-for="feedback in feedbacks"
        :key="feedback.id"
      >
        <img
          class="kirill_authors_img"
          v-lazy="feedback.cover"
          alt="author Yulia Chai"
        />
        <div class="kirill_name_authors">{{ feedback.name }}</div>
        <ul class="kirill_ul_successes">
          <li class="kirill_successes_text" style="display: block">
            {{ feedback.title }}
          </li>
        </ul>

        <div class="kirill_authors_img_quotes">
          <i class="icon-feedback"></i>
        </div>
        <div class="kirill_authors_main_text">
          {{ feedback.body }}
        </div>
        <button class="kirill_button_open" @click="toggleCollapse(feedback)">
          {{ feedback.isCollapsed ? 'Подробнее' : 'Скрыть' }}
          <img
            class="kirill_img_button"
            v-if="feedback.isCollapsed"
            src="@/assets/img/elements/Arrow-down.svg"
            alt="Открыть"
          />
          <img
            class="kirill_img_button"
            v-else
            src="@/assets/img/elements/Arrow-up.svg"
            alt="Закрыть"
          />
        </button>
      </div>
      <!-- <div
        class="kirill_box_authors"
        :class="{ collapsed: author2.isCollapsed }"
      >
        <img
          class="kirill_authors_img"
          src="https://yycare.life/storage/educator1.png"
          alt="author YLiya Sokolova"
        />
        <div class="kirill_name_authors">Лия Соколова</div>
        <ul class="kirill_ul_successes">
          <li class="kirill_successes_text" style="display: block">
            Преподаватель кундалини-йоги более 10 лет
          </li>
        </ul>
        <div class="kirill_authors_img_quotes">
          <i class="icon-feedback"></i>
        </div>
        <div class="kirill_authors_main_text">
          Yoga Care — ресурс, который помогает подбирать практики Кундалини
          йоги под индивидуальный запрос. Он будет полезен как новичкам, так и
          уже практикующим йогу. Одна из задач нашего проекта — оказывать
          поддержку и вдохновлять на регулярную практику йоги, что так важно для
          получения желаемых результатов. В проект вложено много любви и желания
          сделать древние техники Кундалини йоги более доступными и понятными,
          чтобы все больше людей становились здоровыми, счастливыми и полнее
          раскрывали свой потенциал.
        </div>
        <button class="kirill_button_open" @click="toggleCollapse('author2')">
          {{ author2.isCollapsed ? 'Подробнее' : 'Скрыть' }}
          <img
            class="kirill_img_button"
            v-if="author2.isCollapsed"
            src="@/assets/img/elements/Arrow-down.svg"
            alt="Открыть"
          />
          <img
            class="kirill_img_button"
            v-else
            src="@/assets/img/elements/Arrow-up.svg"
            alt="Закрыть"
          />
        </button>
      </div> -->
      <!-- <div
        class="kirill_box_authors"
        :class="{ collapsed: author3.isCollapsed }"
      >
        <img
          class="kirill_authors_img"
          src="https://yycare.life/storage/educator2.png"
          alt="author Natalia Kozarenko"
        />
        <div class="kirill_name_authors">Наталья Козаренко</div>
        <ul class="kirill_ul_successes">
          <li class="kirill_successes_text" style="display: block">
            Психотерапевт
          </li>
        </ul>
        <div class="kirill_authors_img_quotes">
          <i class="icon-feedback"></i>
        </div>
        <div class="kirill_authors_main_text">
          Проведенные командой исследования позволили создать анкету, которая
          отражают полную картину о потребностях и целях каждого клиента. Это
          легло в основу создания индивидуализированных сценариев занятий. Наша
          цель — не только учить правильной технике йоги, но и помогать людям
          обрести внутреннюю гармонию и радость благодаря этому мудрому
          искусству
        </div>
        <button class="kirill_button_open" @click="toggleCollapse('author3')">
          {{ author3.isCollapsed ? 'Подробнее' : 'Скрыть' }}
          <img
            class="kirill_img_button"
            v-if="author3.isCollapsed"
            src="@/assets/img/elements/Arrow-down.svg"
            alt="Открыть"
          />
          <img
            class="kirill_img_button"
            v-else
            src="@/assets/img/elements/Arrow-up.svg"
            alt="Закрыть"
          />
        </button>
      </div> -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      feedbacks: [],
    }
  },
  beforeDestroy() {
    window.removeEventListener(
      'orientationchange',
      this.handleOrientationChange
    )
  },
  created() {
    this.handleOrientationChange()
    window.addEventListener('orientationchange', this.handleOrientationChange)
  },
  methods: {
    getData() {
      this.$http
        .get('/api/educator')
        .then((res) => res.json())
        .then((feedbacks) => {
          this.feedbacks = feedbacks.map((feedback) => ({
            ...feedback,
            isCollapsed: false, // Добавляем isCollapsed по умолчанию
          }))
        })
    },
    toggleCollapse(feedback) {
      if (window.innerWidth < 980) {
        feedback.isCollapsed = !feedback.isCollapsed
      }
    },
    handleOrientationChange() {
      if (window.innerWidth < 980) {
        this.feedbacks.forEach((feedback) => {
          feedback.isCollapsed = true
        })
      } else {
        this.feedbacks.forEach((feedback, index) => {
          feedback.isCollapsed = index !== 0
        })
      }
    },
  },
  mounted() {
    this.getData()
  },
}
</script>
