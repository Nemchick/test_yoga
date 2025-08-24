<template>
  <div class="helper landing">
    <LandingHeader />
    <main class="main">
      <div class="page page-main">
        <section class="section section--01">
          <div class="container test">
            <div class="section__content" style="margin-bottom: 0px">
              <h1 class="kirill_section__title_lending">
                Занятия йогой в любом месте и в любое время
              </h1>
              <div class="kirill_section_description_lending">
                Заполните анкету, получите персональную программу тренировок
                кундалини-йогой и бесплатный доступ на 7 дней к видеобиблиотеке
                практик и медитаций.
              </div>
              <div class="kirill_section_advantage">
                <div class="kirill_conteiner_advantage">
                  <img
                    class="kirill_container_img"
                    src="@/assets/img/icons/Body.svg"
                    alt="body"
                  />
                  <div class="kirill_conteiner_text">
                    избавьтесь от<br />
                    зажимов и боли в теле
                  </div>
                </div>
                <div class="kirill_conteiner_advantage">
                  <img
                    class="kirill_container_img"
                    src="@/assets/img/icons/Physical_copy.svg"
                    alt="body"
                  />
                  <div class="kirill_conteiner_text">
                    проработайте<br />
                    физический тонус
                  </div>
                </div>
                <div class="kirill_conteiner_advantage">
                  <img
                    class="kirill_container_img"
                    src="@/assets/img/icons/Mind.svg"
                    alt="body"
                  />
                  <div class="kirill_conteiner_text">
                    проработайте<br />
                    эмоциональное состояние
                  </div>
                </div>
              </div>
              <div class="kirill_section_button_lending">
                <div class="kirill_conteiner_vector_button">
                  <div class="kirill_conteiner_vector_text">
                    Альтернатива классическим занятиям йогой в зале.
                    <img
                      class="kirill_conteiner_vector_one"
                      src="@/assets/img/elements/Vector 1.svg"
                      alt="arrow button"
                    />
                  </div>
                  <RegisterModal />
                </div>
                <div class="kirill_conteiner_vector_button">
                  <div class="kirill_conteiner_vector_text">
                    Получите персональную программу<br />
                    с помощью оригинальной анкеты.
                    <img
                      class="kirill_conteiner_vector_two"
                      src="@/assets/img/elements/Vector 2.svg"
                      alt="arrow button"
                    />
                  </div>
                  <router-link
                    to="/survey/"
                    class="button kirill_button--s1 button--t1 pages_main"
                  >
                    Подобрать программу
                  </router-link>
                </div>
              </div>
            </div>
            <img
              src="@/assets/img/section/Chakras-girl.webp"
              class="kirill_lending_yoga_img_v2"
              alt="body"
              loading="eager"
            />
            <img
              class="kirill_lending_yoga_img"
              src="@/assets/img/section/pic01.webp"
            />
            <img
              class="kirill_langing_yoga section__pic"
              src="@/assets/img/section/pic01.webp"
              alt="Yoga Care"
            />
          </div>
          <div class="kirill_green_ball kirill_green_ball_position_v1"></div>
        </section>
        <section class="kirill_section_1">
          <div class="container">
            <div class="library-video__wrapper kirill_section_meditates_img">
              <div class="program-video" v-if="!videoStarted">
                <div @click="startVideoLesson" class="program-video__content">
                  <img
                    class="program-video__overlay kirilll_img_video_desctop"
                    src="@/assets/img/section/FrameVideo.webp"
                    alt="video"
                    loading="eager"
                  />
                  <img
                    class="program-video__overlay kirilll_img_video_mobail"
                    src="@/assets/img/section/FrameVideo_1.webp"
                    alt="video"
                    loading="eager"
                  />
                </div>
              </div>
              <div class="program-video" v-else>
                <div class="program-video__content">
                  <iframe
                    src="https://vk.com/video_ext.php?oid=-222954672&id=456239017&hd=2&hash=2811604aa264532f&autoplay=1&js_api=1"
                    allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;"
                    frameborder="0"
                    allowfullscreen
                  ></iframe>
                  <!-- <youtube
                      :video-id="'9RNFE8xv1PQ'"
                      @ended="videoEnded"
                      iframe-lazy
                    /> -->
                </div>
              </div>
            </div>
          </div>
          <div class="kirill_green_ball kirill_green_ball_position_v2"></div>
          <div class="kirill_green_ball kirill_green_ball_position_v3"></div>
        </section>
        <section class="section section--07">
          <LandingAuthor />
        </section>
        <section class="section section--07">
          <div class="container">
            <h2 class="section__title">Преимущества наших онлайн-сеансов:</h2>
          </div>
          <div class="kirill_section_advantage_online">
            <div class="container_advantage_online kirill_padding_lr_60px">
              <img
                src="@/assets/img/elements/asana.svg"
                class="kirill_advantage_online_img"
                alt="asana"
              />
              <div
                class="kirill_advantage_online_title kirill_text_align_center"
              >
                Персональная программа
              </div>
              <div
                class="kirill_advantage_online_text kirill_text_align_center"
              >
                Уникальная анкета, составленная вместе с профессионалами в
                психологии, всего за 10 минут позволит понять ваши потребности и
                подобрать программу занятий
              </div>
            </div>
            <div class="container_advantage_online kirill_padding_lr_20px">
              <img
                src="@/assets/img/elements/folder.svg"
                class="kirill_advantage_online_img"
                alt="folder"
              />
              <div
                class="kirill_advantage_online_title kirill_text_align_center"
              >
                Адаптивные комплексы
              </div>
              <div
                class="kirill_advantage_online_text kirill_text_align_center"
              >
                Сеансы можно подстраивать под ваш запрос: от дыхательных
                упражнений до активных тренировок
              </div>
            </div>
            <div class="container_advantage_online kirill_padding_lr_20px">
              <img
                src="@/assets/img/elements/handshake.svg"
                class="kirill_advantage_online_img"
                alt="handshake"
              />
              <div
                class="kirill_advantage_online_title kirill_text_align_center"
              >
                Связь с поддержкой
              </div>
              <div
                class="kirill_advantage_online_text kirill_text_align_center"
              >
                Наша команда готова оперативно отвечать на ваши вопросы и
                поможет добиться поставленных целей
              </div>
            </div>
            <div class="container_advantage_online kirill_padding_lr_20px">
              <img
                src="@/assets/img/elements/video.svg"
                class="kirill_advantage_online_img"
                alt="video"
              />
              <div
                class="kirill_advantage_online_title kirill_text_align_center"
              >
                38 программ разного уровня
              </div>
              <div
                class="kirill_advantage_online_text kirill_text_align_center"
              >
                Предлагаем широкий выбор занятий на ваш вкус: нормализация веса,
                укрепление осанки и многое другое
              </div>
            </div>
          </div>
        </section>
        <section class="section section--01">
          <div class="container kirill_section_more">
            <img
              class="kirill_container_pic"
              src="@/assets/img/section/kirill_pic01.webp"
              alt="Yoga Care"
            />
            <div class="kirill_container_more">
              <h2 class="section__title">Что ещё?</h2>
              <div class="kirill_container_more_text">
                <div class="kirill_box_more">
                  <img
                    src="@/assets/img/elements/flower_v2.svg"
                    class="kirill_more_img"
                    alt="flower"
                  />
                  <div class="kirill_box_more_text">
                    <div class="kirill_advantage_online_title">
                      Команда экспертов
                    </div>
                    <div class="kirill_advantage_online_text">
                      Будьте уверены в достижении ваших задач: каждый шаг на
                      пути к совершенству прорабатывался специалистами.
                    </div>
                  </div>
                </div>
                <div class="kirill_box_more">
                  <img
                    src="@/assets/img/elements/flower_v2.svg"
                    class="kirill_more_img"
                    alt="flower"
                  />
                  <div class="kirill_box_more_text">
                    <div class="kirill_advantage_online_title">
                      Занятия в удаленном формате
                    </div>
                    <div class="kirill_advantage_online_text">
                      Планируйте расписание так, как вам это удобно. Пусть все
                      будет в вашем ритме.
                    </div>
                  </div>
                </div>
                <div class="kirill_box_more">
                  <img
                    src="@/assets/img/elements/flower_v2.svg"
                    class="kirill_more_img"
                    alt="flower"
                  />
                  <div class="kirill_box_more_text">
                    <div class="kirill_advantage_online_title">
                      Сеансы от 15 минут
                    </div>
                    <div class="kirill_advantage_online_text">
                      Бережно относимся к вашему времени, концентрируясь на
                      самом главном.
                    </div>
                  </div>
                </div>
                <div class="kirill_box_more">
                  <img
                    src="@/assets/img/elements/flower_v2.svg"
                    class="kirill_more_img"
                    alt="flower"
                  />
                  <div class="kirill_box_more_text">
                    <div class="kirill_advantage_online_title">
                      7 дней пробного периода
                    </div>
                    <div class="kirill_advantage_online_text">
                      Приглашаем ознакомиться с достоинствами сервиса.
                      Бесплатно.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="kirill_green_ball kirill_green_ball_position_v4"></div>
          </div>
        </section>
        <section class="section section--01">
          <div class="container">
            <div class="kirill_section_quot">
              <div class="kirill_container_quot">
                <div class="kirill_box_quot">
                  <img
                    class="kirill_quot_img"
                    src="@/assets/img/elements/Group.svg"
                    alt="Human picture"
                  />
                  <div class="kirill_quot_text kirill_text_align_center">
                    Вчера я был умным, и поэтому я хотел изменить мир. Сегодня я
                    стал мудрым, и поэтому я меняю себя.
                  </div>
                  <div class="kirill_quot_name">Джалаладдин Руми</div>
                </div>
              </div>
              <img
                class="kirill_box_quot_img"
                src="@/assets/img/section/fransiskus.webp"
                alt="
  girl at the waterfall"
              />
            </div>
          </div>
        </section>

        <section class="section section--08">
          <div class="container">
            <div class="kirill_section_feedback">
              <div class="kirill_section_feedback_text">
                С нами занимаются уже:
              </div>
              <div class="kirill_section_feedback_text_decor">
                <div class="kirill_feedback_text_decor">1248 человек</div>
              </div>
            </div>
          </div>
          <FeedbackSwiperLanding />
        </section>

        <section class="kirill_section_button section">
          <div class="kirill_box_button">
            <router-link
              to="/survey/"
              class="button kirill_button--s1 button--t1"
            >
              Подобрать программу
            </router-link>
          </div>
          <div class="kirill_box_button">
            <RegisterModal />
          </div>
        </section>
        <LandingAccordion />
      </div>
    </main>
    <LandingFooter />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { ref } from 'vue'
import LandingFooter from '@/components/Landing/LandingFooter.vue'
import LandingHeader from '@/components/Landing/LandingHeader.vue'
import LandingAuthor from '@/components/Landing/LandingAuthor.vue'
import LandingAccordion from '@/components/Landing/LandingAccordion.vue'
import FeedbackSwiperLanding from '@/components/UI/Sliders/FeedbackSliderLanding.vue'
import RegisterModal from '@/pages/User/RegisterModal.vue'
import 'vue-youtube-embed'

export default {
  name: 'LandingPageV1',
  metaInfo() {
    return {
      title:
        'Занимайтесь йогой онлайн с сервисом Yoga Care. Уникальный подбор практики для решения вашего жизненого вопроса.',
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content:
            'Онлайн видео с практиками Кундалини-йоги, которые позволят справиться со стрессом и тревожностью, улучшить отношения с людьми, избавится от лишнего веса и многое другое. Используем уникальный метод подбора программы из библиотеки медитаций, крий и музыки под ваше текущее состояние и приоритеты. Попробуйте 7 дней бесплатно.',
        },
        {
          vmid: 'keywords',
          name: 'keywords',
          content:
            'yoga care, yyc, кундалини йога, онлайн йога, библиотека медитаций, библиотека крий, йога практика',
        },
      ],
    }
  },
  components: {
    FeedbackSwiperLanding,
    LandingHeader,
    LandingFooter,
    LandingAuthor,
    LandingAccordion,
    RegisterModal,
  },
  methods: {
    startVideoLesson() {
      this.videoStarted = true
    },
    videoEnded() {
      this.videoStarted = false
    },
  },

  data() {
    return {
      showMobileMenu: false,
      videoStarted: false,
    }
  },
  computed: {
    ...mapGetters('user', ['currentUser']),
  },
  setup() {
    const utm = ref({
      url: '',
      source: '',
      medium: '',
      campaign: '',
      content: '',
      term: '',
    })

    const currentUrl = window.location.href

    const queryString = currentUrl.split('?')[1]

    const urlParams = new URLSearchParams(currentUrl)

    const sourceIndex = queryString.indexOf('utm_source=')
    let sourceValue = null
    if (sourceIndex !== -1) {
      sourceValue = queryString.substring(
        sourceIndex + 'utm_source='.length,
        queryString.indexOf('&', sourceIndex)
      )
    }

    utm.value.url = currentUrl
    utm.value.source = sourceValue || ''
    utm.value.medium = urlParams.get('utm_medium') || ''
    utm.value.campaign = urlParams.get('utm_campaign') || ''
    utm.value.content = urlParams.get('utm_content') || ''
    utm.value.term = urlParams.get('utm_term') || ''
    localStorage.setItem('utm', JSON.stringify(utm.value))

    return { utm }
  },
}
</script>
<style scoped>
.kirill_section_1 {
  padding: 0px;
}
.kirill_section_meditates_img {
  max-height: fit-content;
}
</style>
