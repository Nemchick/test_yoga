<template>
  <LoaderComponent v-if="localLoading" />
  <div class="page page-program" v-else>
    <section class="section section--program-final">
      <div class="container">
        <div class="program-final__wrapper">
          <div class="program-final__img">
            <img src="@/assets/img/elements/final.jpg" alt="" />
          </div>
          <div class="program-final__content">
            <div class="progress-bar__wrapper">
              <div class="progress-bar"></div>
              <div class="progress-bar__mask" style="left: 100%"></div>
            </div>
            <h2 class="program-final__title">
              Поздравляем! Вы успешно прошли программу «{{ programTitle }}»
            </h2>
            <div class="program-final__description">
              Поделитесь с нами впечатлениями.
            </div>
            <div class="form form--feedback" v-if="feedbackReceived === false">
              <div class="feedback__rating rating-group">
                <input
                  disabled
                  checked
                  class="rating__input rating__input--none"
                  name="rating1"
                  id="rating1-none"
                  value="0"
                  type="radio"
                />
                <label
                  aria-label="1 star"
                  class="rating__label"
                  for="rating1-1"
                >
                  <i class="rating__icon icon-star" />
                </label>
                <input
                  class="rating__input"
                  name="rating1"
                  id="rating1-1"
                  value="1"
                  v-model="rating"
                  type="radio"
                />
                <label
                  aria-label="2 stars"
                  class="rating__label"
                  for="rating1-2"
                >
                  <i class="rating__icon icon-star" />
                </label>
                <input
                  class="rating__input"
                  name="rating1"
                  id="rating1-2"
                  value="2"
                  v-model="rating"
                  type="radio"
                />
                <label
                  aria-label="3 stars"
                  class="rating__label"
                  for="rating1-3"
                >
                  <i class="rating__icon icon-star" />
                </label>
                <input
                  class="rating__input"
                  name="rating1"
                  id="rating1-3"
                  value="3"
                  v-model="rating"
                  type="radio"
                />
                <label
                  aria-label="4 stars"
                  class="rating__label"
                  for="rating1-4"
                >
                  <i class="rating__icon icon-star" />
                </label>
                <input
                  class="rating__input"
                  name="rating1"
                  id="rating1-4"
                  value="4"
                  v-model="rating"
                  type="radio"
                />
                <label
                  aria-label="5 stars"
                  class="rating__label"
                  for="rating1-5"
                >
                  <i class="rating__icon icon-star" />
                </label>
                <input
                  class="rating__input"
                  name="rating1"
                  id="rating1-5"
                  value="5"
                  v-model="rating"
                  type="radio"
                />
              </div>
              <div class="form__input form__input--textarea textarea">
                <textarea
                  id="feedback"
                  v-model="feedbackText"
                  placeholder="Что вам понравилось?"
                ></textarea>
              </div>
              <div class="form__section--submit">
                <button
                  type="submit"
                  class="button button--s1"
                  :class="{
                    disabled: feedbackText.length === 0,
                    'button--t1': feedbackText.length > 0,
                  }"
                  @click="postFeedback"
                >
                  <span>Отправить отзыв</span>
                </button>
              </div>
            </div>
            <div class="feedback__submitted" v-else>
              <p>Благодарим за отзыв!</p>
            </div>
            <div class="program-final__buttons" style="margin-top: 32px">
              <router-link
                to="/survey/"
                :class="{
                  'button--t1':
                    feedbackText.length === 0 || feedbackReceived === true,
                  'button--t3':
                    feedbackText.length > 0 && feedbackReceived === false,
                }"
                class="button button--s2"
              >
                Подобрать новую программу
              </router-link>
              <a class="button button--s2 button--t3" @click="resetProgram">
                Пройти программу повторно
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section section--sharing">
      <div class="container">
        <div class="sharing__wrapper">
          <h3 class="sharing__title">Дневник эмоций</h3>
          <div class="sharing__graph">
            <MySharings :sharings="programInfo.sharing" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import LoaderComponent from '@/components/UI/Components/LoaderComponent.vue'
import MySharings from '@/components/UI/Components/MySharings.vue'

export default {
  name: 'MyProgramFinal',
  components: { MySharings, LoaderComponent },
  data() {
    return {
      localLoading: true,
      programInfo: null,
      feedbackText: '',
      feedbackReceived: false,
      rating: '0',
    }
  },
  methods: {
    getMyProgram() {
      this.localLoading = true
      this.$http
        .get('/api/program/my')
        .then((res) => res.json())
        .then((programInfo) => {
          this.programInfo = programInfo
          if (programInfo.progress < 100) {
            this.$router.push({
              name: 'MyProgram',
            })
          }
        })
        .finally(() => {
          this.localLoading = false
        })
    },
    postFeedback() {
      const payload = {
        star: Number(this.rating),
        body: this.feedbackText,
      }
      this.$http.post('/api/program/my/review', payload).then(() => {
        this.feedbackReceived = true
      })
    },
    resetProgram() {
      this.$http.put('/api/program/my/restart').then(() => {
        this.$router.push({
          name: 'MyProgram',
        })
      })
    },
  },
  mounted() {
    this.getMyProgram()
  },
  computed: {
    programTitle() {
      return this.programInfo?.about?.title
    },
  },
}
</script>
