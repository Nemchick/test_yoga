export default {
  methods: {
    loginVK() {
      this.$http
        .get('/api/signin/vk')
        .then((res) => res.json())
        .then(({ link }) => {
          window.location = link
        })
    },
    loginMailRU() {
      this.$http
        .get('/api/signin/mailru')
        .then((res) => res.json())
        .then(({ link }) => {
          window.location = link
        })
    },
    loginOK() {
      this.$http
        .get('/api/signin/ok')
        .then((res) => res.json())
        .then(({ link }) => {
          window.location = link
        })
    },
    loginGoogle() {
      this.$http
        .get('/api/signin/google')
        .then((res) => res.json())
        .then(({ link }) => {
          window.location = link
        })
    },

    // loginYandex() {
    //   this.$http
    //     .get('/api/signin/yandex')
    //     .then((res) => res.json())
    //     .then(({ link }) => {
    //       window.location = link
    //     })
    // },
  },
}
