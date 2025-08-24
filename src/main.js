import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import VueResource from 'vue-resource'
import VueAWN from 'vue-awesome-notifications'
import VueDateFns from 'vue-date-fns'
import VueMask from 'v-mask'
import VueYoutube from 'vue-youtube'
import VueMeta from 'vue-meta'
import VueGtm from '@gtm-support/vue2-gtm'
import InfiniteLoading from 'vue-infinite-loading'
import 'vue-awesome-notifications/dist/styles/style.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/grid'
import locale from 'date-fns/locale/ru'
import VueLazyload from 'vue-lazyload'
import vClickOutside from 'v-click-outside'

const loadImage = require('@/assets/img/elements/video-bg.webp')
const errorImage = require('@/assets/img/logos/logo-grey.svg')

Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: loadImage,
  attempt: 1,
  adapter: {
    error({ el }) {
      el.setAttribute('src', errorImage)
      el.parentElement.classList.add('no-photo')
    },
  },
})

Vue.use(VueGtm, {
  id: 'GTM-TX5M688M', // Your GTM single container ID, array of container ids ['GTM-xxxxxx', 'GTM-yyyyyy'] or array of objects [{id: 'GTM-xxxxxx', queryParams: { gtm_auth: 'abc123', gtm_preview: 'env-4', gtm_cookies_win: 'x'}}, {id: 'GTM-yyyyyy', queryParams: {gtm_auth: 'abc234', gtm_preview: 'env-5', gtm_cookies_win: 'x'}}], // Your GTM single container ID or array of container ids ['GTM-xxxxxx', 'GTM-yyyyyy']
  defer: false, // Script can be set to `defer` to speed up page load at the cost of less accurate results (in case visitor leaves before script is loaded, which is unlikely but possible). Defaults to false, so the script is loaded `async` by default
  compatibility: false, // Will add `async` and `defer` to the script tag to not block requests for old browsers that do not support `async`
  nonce: '2726c7f26c', // Will add `nonce` to the script tag
  enabled: true, // defaults to true. Plugin can be disabled by setting this to false for Ex: enabled: !!GDPR_Cookie (optional)
  debug: true, // Whether or not display console logs debugs (optional)
  loadScript: true, // Whether or not to load the GTM Script (Helpful if you are including GTM manually, but need the dataLayer functionality in your components) (optional)
  vueRouter: router, // Pass the router instance to automatically sync with router (optional)
  ignoredViews: ['homepage'], // Don't trigger events for specified router names (optional)
  trackOnNextTick: false, // Whether or not call trackView in Vue.nextTick
})

Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true,
})

const options = {
  position: 'top-right',
  labels: {
    success: '',
    alert: '',
    info: '',
  },
}
Vue.use(VueAWN, options)

Vue.use(vClickOutside)

Vue.use(Vuelidate)
Vue.use(VueResource)
Vue.use(VueDateFns, 'dd MMMM yyyy', { locale })
Vue.use(VueMask)
Vue.use(VueYoutube)
Vue.use(InfiniteLoading)

Vue.config.productionTip = false

Vue.http.interceptors.push((request) => {
  if (request.url.indexOf('/signin/email') === -1) {
    const { token } = store.state.user
    if (token) {
      Vue.http.headers.common.Authorization = `Bearer ${token}`
    }
  } else {
    delete Vue.http.headers.common.Authorization
  }
  request.headers['Content-Type'] = 'application/json'
})

Vue.http.interceptors.push((request, next) => {
  next((res) => {
    if (!res.ok) {
      if (res.status === 401 && res.url.indexOf('/api/signin/email') === -1) {
        store.dispatch('user/logout')
        router.push('/')
        return
      }
      if (res.status === 409) return
      if (res.status === 417) return
      let { description } = res.body
      store.dispatch('shared/setError', description)
    }
  })
})

const token = localStorage.getItem('token')

if (token) {
  store.dispatch('user/setAuthToken', { token: token })
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  Vue.http
    .get('/api/user', { headers })
    .then((res) => res.json())
    .then(
      async (userInfo) => {
        store.dispatch('user/setUser', userInfo)
      },
      () => {
        localStorage.clear()
      }
    )
    .finally(() => {
      initializeVue()
    })
} else {
  initializeVue()
}
function initializeVue() {
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app')
}
