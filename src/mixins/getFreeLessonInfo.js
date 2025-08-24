// @/mixins/getFreeLessonInfo.js
export default {
  data() {
    return {
      localLoading: true,
      lessonID: null,
      lessonInfo: null,
    }
  },
  methods: {
    getLessonInfo() {
      this.localLoading = true
      this.$http
        .get(`/api/library/free/${this.lessonID}`)
        .then((res) => res.json())
        .then(
          (lessonInfo) => {
            this.lessonInfo = lessonInfo
          },
          (err) => {
            if (err.status === 404) {
              this.$router.push({
                name: 'Error404',
              })
            }
          }
        )
        .finally(() => {
          this.localLoading = false
        })
    },
  },
  mounted() {
    this.lessonID = Number(this.$route.params.lessonID)
    if (!this.lessonID) {
      this.$router.push('/')
      return
    }
    this.getLessonInfo()
  },
}
