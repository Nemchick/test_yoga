export default {
  data() {
    return {
      isHistory: false,
      isFavorites: false,
      isMyProgram: false,
      isSearch: false,
      isLanding: false,
      header: '',
    }
  },
  methods: {
    goBack() {
      if (this.isHistory) {
        this.$router.push({
          name: 'UserHistory',
        })
        return
      }
      if (this.isFavorites) {
        this.$router.push({
          name: 'UserFavorites',
        })
        return
      }
      if (this.isMyProgram || this.isRecommendedArticel || this.isLanding) {
        this.$router.push({
          name: 'MyProgram',
        })
        return
      }
      if (this.isSearch) {
        this.$router.go(-1)
        return
      }
      this.$router.push({
        name: 'LibDetails',
        params: { libID: this.libID },
      })
    },
    getLessonDataHistory() {
      this.localLoading = true
      this.$http
        .get(`/api/library/history/lesson/${this.lessonID}`)
        .then((res) => res.json())
        .then(
          (lessonInfo) => {
            this.lessonInfo = lessonInfo
            this.header = 'История'
          },
          (err) => {
            if (err.status === 404) {
              this.$router.push('/')
            }
          }
        )
        .finally(() => {
          this.localLoading = false
        })
    },
    getLessonDataFavorites() {
      this.localLoading = true
      this.$http
        .get(`/api/library/favorites/lesson/${this.lessonID}`)
        .then((res) => res.json())
        .then(
          (lessonInfo) => {
            this.lessonInfo = lessonInfo
            this.header = 'Избранное'
          },
          (err) => {
            if (err.status === 404) {
              this.$router.push('/')
            }
          }
        )
        .finally(() => {
          this.localLoading = false
        })
    },
    getLessonDataLibrary() {
      this.localLoading = true
      this.$http
        .get(`/api/library/program/${this.libID}/lesson/${this.lessonID}`)
        .then((res) => res.json())
        .then(
          (lessonInfo) => {
            this.lessonInfo = lessonInfo
            this.header = lessonInfo.titleProgram
          },
          (err) => {
            if (err.status === 404) {
              this.$router.push('/')
            }
          }
        )
        .finally(() => {
          this.localLoading = false
        })
    },
    getLessonMyProgram() {
      this.localLoading = true
      this.$http
        .get(`/api/program/my/lesson/${this.lessonID}`)
        .then((res) => res.json())
        .then(
          (lessonInfo) => {
            this.lessonInfo = lessonInfo
            this.header = 'Моя программа'
          },
          (err) => {
            if (err.status === 404) {
              this.$router.push('/')
            }
          }
        )
        .finally(() => {
          this.localLoading = false
        })
    },
    getLessonSearch() {
      this.localLoading = true
      this.$http
        .get(`/api/library/lesson/${this.lessonID}`)
        .then((res) => res.json())
        .then(
          (lessonInfo) => {
            this.lessonInfo = lessonInfo
            this.header = 'Поиск'
          },
          (err) => {
            if (err.status === 404) {
              this.$router.push('/')
            }
          }
        )
        .finally(() => {
          this.localLoading = false
        })
    },
    getRecommendedArticle() {
      this.localLoading = true
      this.$http
        .get(`/api/library/lesson/${this.lessonID}`)
        .then((res) => res.json())
        .then(
          (lessonInfo) => {
            this.lessonInfo = lessonInfo
            this.header = 'Моя программа'
          },
          (err) => {
            if (err.status === 404) {
              this.$router.push('/')
            }
          }
        )
        .finally(() => {
          this.localLoading = false
        })
    },
  },
  mounted() {
    this.libID = Number(this.$route.params.libID)
    this.lessonID = Number(this.$route.params.lessonID)
    this.isLanding =
      this.$route.name === 'VideoLessonS' ||
      this.$route.name === 'ArticleLessonS'
    this.isFavorites =
      this.$route.name === 'VideoLessonFavorites' ||
      this.$route.name === 'ArticleLessonFavorites'
    this.isHistory =
      this.$route.name === 'VideoLessonHistory' ||
      this.$route.name === 'ArticleLessonHistory'
    this.isMyProgram =
      this.$route.name === 'VideoLessonProgram' ||
      this.$route.name === 'ArticleLessonProgram'
    this.isRecommendedArticel = this.$route.name === 'ArticleLessonS'
    this.isSearch =
      this.$route.name === 'VideoLessonSearch' ||
      this.$route.name === 'ArticleLessonSearch'
    if (this.isFavorites) {
      this.getLessonDataFavorites()
    } else if (this.isHistory) {
      this.getLessonDataHistory()
    } else if (this.isMyProgram) {
      this.getLessonMyProgram()
    } else if (this.isSearch) {
      this.getLessonSearch()
    } else if (this.isRecommendedArticel || this.isLanding) {
      this.getRecommendedArticle()
    } else {
      this.getLessonDataLibrary()
    }
  },
}
