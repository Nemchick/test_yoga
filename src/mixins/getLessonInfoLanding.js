import { mapGetters } from 'vuex'

export default {
  metaInfo() {
    return {
      title: this.headTitle,
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: this.headDescription,
        },
        {
          vmid: 'keywords',
          name: 'keywords',
          content: this.headKeywords,
        },
      ],
    }
  },
  data() {
    return {
      localLoading: true,
      lessonID: null,
      lessonInfo: null,
      headTitle: undefined,
      headDescription: undefined,
      headKeywords: undefined,
    }
  },
  methods: {
    getLessonInfo() {
      this.localLoading = true
      this.$http
        .get(`/api/library/lesson/${this.lessonID}`)
        .then((res) => res.json())
        .then(
          (lessonInfo) => {
            this.lessonInfo = lessonInfo
            this.headDescription = lessonInfo.headDescription
            this.headTitle = lessonInfo.headTitle
            this.headKeywords = lessonInfo.headKeywords
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
          this.$meta().refresh
        })
    },
  },
  mounted() {
    this.lessonID = Number(this.$route.params.lessonID)
    if (this.lessonID === undefined) {
      this.$router.push('/')
      return
    }
    if (this.user !== null) {
      if (this.$route.name === 'LandingArticle') {
        this.$router.push({
          name: 'ArticleLessonS',
          params: { lessonID: this.lessonID },
        })
      }
      if (this.$route.name === 'LandingVideo') {
        this.$router.push({
          name: 'VideoLessonS',
          params: { lessonID: this.lessonID },
        })
      }
    }
    this.getLessonInfo()
  },
  computed: {
    ...mapGetters('user', ['user']),
  },
}
