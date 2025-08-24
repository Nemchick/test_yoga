<template>
  <div class="questionnaire questionnaire--step01">
    <div class="questionnaire__header">
      <div class="questionnaire__header--left">
        <div class="logo">
          <router-link to="/">
            <img src="@/assets/img/logos/logo-white.svg" alt="" />
          </router-link>
        </div>
      </div>
      <div class="questionnaire__header--center">
        <div class="questionnaire-progress__wrapper">
          <SurveyProgressBar />
        </div>
      </div>
      <div class="questionnaire__header--right">
        <button class="button--close" @click="$emit('on-go-home')">
          <i class="icon-close"></i>
        </button>
      </div>
    </div>
    <div class="questionnaire__content">
      <div class="questionnaire__title">
        <h1>{{ stepTitle }}</h1>
      </div>
      <div class="questionnaire__description">
        <p>Заполните поля ниже, а мы подберем индивидуальную программу</p>
      </div>
      <form method="post" action="#" class="form">
        <fieldset class="form__section">
          <div class="form__input form__input--text input">
            <label class="label-input" for="name">Имя</label>
            <input
              type="text"
              id="name"
              value=""
              v-model="name"
              placeholder="Имя"
            />
          </div>
          <div class="form__input radio-switch">
            <input
              type="radio"
              id="men"
              name="radio"
              v-model="sex"
              value="men"
              checked
            />
            <label for="men">Мужской</label>
            <input
              type="radio"
              id="female"
              name="radio"
              v-model="sex"
              value="female"
            />
            <label for="female">Женский</label>
          </div>
          <div class="form__input form__input--text input">
            <label class="label-input" for="date">Дата рождения</label>
            <input
              id="date"
              type="text"
              v-mask="'##.##.####'"
              v-model="birthDate"
              placeholder="ДД.ММ.ГГГГ"
            />
          </div>
        </fieldset>
        <fieldset
          class="form__section form__section--submit form__section disabled"
        >
          <a
            class="button button--t1"
            :class="{ disabled: !formIsValid }"
            @click="saveResultAndGoNext"
          >
            <span>Продолжить</span>
          </a>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import stepProgressMixin from '@/mixins/stepProgressMixin'
import { parse, isValid, getYear } from 'date-fns'
import surveyMetaTags from '@/mixins/surveyMetaTags'

export default {
  name: 'SurveyStep01',
  mixins: [stepProgressMixin, surveyMetaTags],
  props: {
    stepType: {
      type: String,
      required: true,
    },
    currentStep: {
      type: Number,
      required: true,
    },
    stepTitle: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      sex: 'female',
      name: '',
      birthDate: '',
    }
  },
  mounted() {
    if (Object.keys(this.surveyResults) > 0) {
      const stepResult = this.surveyResults[this.stepType]
      if (stepResult) {
        this.sex = stepResult.result.sex
        this.name = stepResult.result.name
        this.birthDate = stepResult.result.birthDate
      }
    }
    if (this.user !== null) {
      this.restoreFirstStepAnswers()
    }
  },
  methods: {
    ...mapActions('survey', ['addSurveyResults']),
    ...mapActions('shared', ['setError']),
    birhYearCorrect(date) {
      const bYear = getYear(date)
      const cYear = getYear(new Date())
      if (bYear > cYear) {
        this.setError('Год рождения не может быть больше текущего года')
        return false
      }
      if (cYear - bYear >= 120 || cYear - bYear < 10) {
        this.setError('Введите корректный год рождения')
        return false
      }
      return true
    },
    saveResultAndGoNext() {
      const bYear = this.birthDate.split('.').at(-1)
      let parsed = null
      if (bYear.length === 2) {
        parsed = parse(this.birthDate, 'dd.MM.yy', new Date(), {
          useAdditionalWeekYearTokens: true,
        })
      } else if (bYear.length === 4) {
        parsed = parse(this.birthDate, 'dd.MM.yyyy', new Date())
      }
      if (!isValid(parsed)) {
        this.setError('Введите корректную дату рождения')
        return
      }
      if (!this.birhYearCorrect(parsed)) {
        // this.setError('Введите корректный год рождения')
        return
      } else {
        this.birthDate = this.$date(parsed, 'dd.MM.yyyy')
      }
      const payload = {
        step: this.currentStep,
        type: this.stepType,
        result: {
          name: this.name,
          sex: this.sex,
          birthDate: this.birthDate,
        },
      }
      this.addSurveyResults(payload).then(() => {
        this.$emit('on-next-step', 'final')
      })
    },
    restoreFirstStepAnswers() {
      this.$http
        .get('/api/program/survey')
        .then((res) => res.json())
        .then((surveyResults) => {
          const personInfo = surveyResults?.answers?.personInfo?.result
          if (personInfo) {
            this.name = personInfo.name
            this.sex = personInfo.sex
            this.birthDate = personInfo.birthDate
          }
        })
        .finally(() => {
          this.localLoading = false
        })
    },
  },
  computed: {
    ...mapGetters('survey', ['surveyResults']),
    ...mapGetters('user', ['user']),
    formIsValid() {
      if (this.name === '') {
        return false
      }
      if (this.birthDate === '') {
        return false
      }
      return true
    },
  },
}
</script>

<style scoped></style>
