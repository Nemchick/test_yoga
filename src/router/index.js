import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

const LandingPage = () =>
  import(/* webpackChunkName: "Landing" */ '@/pages/LandingPage.vue')
const LandingPageV1 = () =>
  import(/* webpackChunkName: "Landing" */ '@/pages/LandingPageV1.vue')
const LandingPageV2 = () =>
  import(/* webpackChunkName: "Landing" */ '@/pages/LandingPageV2.vue')
const LandingPageV3 = () =>
  import(/* webpackChunkName: "Landing" */ '@/pages/LandingPageV3.vue')
const LandingPageV4 = () =>
  import(/* webpackChunkName: "Landing" */ '@/pages/LandingPageV4.vue')
const LandingPageNovichki = () =>
  import(/* webpackChunkName: "Landing" */ '@/pages/LandingPageNovichki.vue')
const LandingPageMeditation = () =>
  import(/* webpackChunkName: "Landing" */ '@/pages/LandingPageMeditation.vue')
const NotFound = () =>
  import(/* webpackChunkName: "Landing" */ '@/pages/NotFound.vue')
const LandingArticles = () =>
  import(/* webpackChunkName: "Landing" */ '@/pages/LandingArticles.vue')

const LandingArticle = () =>
  import(
    /* webpackChunkName: "LandingLesson" */ '@/components/Landing/LandingArticle.vue'
  )
const LandingVideo = () =>
  import(
    /* webpackChunkName: "LandingLesson" */ '@/components/Landing/LandingVideo.vue'
  )

// UserPages
const UserLogin = () =>
  import(/* webpackChunkName: "UserManaged" */ '@/pages/User/UserLogin.vue')
const UserRegistration = () =>
  import(
    /* webpackChunkName: "UserManaged" */ '@/pages/User/UserRegistration.vue'
  )
const RestorePassword = () =>
  import(
    /* webpackChunkName: "UserManaged" */ '@/pages/User/RestorePassword.vue'
  )
const RestoreConfirm = () =>
  import(
    /* webpackChunkName: "UserManaged" */ '@/pages/User/RestoreConfirm.vue'
  )
const NewPassword = () =>
  import(/* webpackChunkName: "UserManaged" */ '@/pages/User/NewPassword.vue')
const ChangePassword = () =>
  import(
    /* webpackChunkName: "UserManaged" */ '@/pages/User/ChangePassword.vue'
  )
const RegistrationConfirm = () =>
  import(
    /* webpackChunkName: "UserManaged" */ '@/pages/User/RegistrationConfirm.vue'
  )
const RegistrationEmailVerify = () =>
  import(
    /* webpackChunkName: "UserManaged" */ '@/pages/User/RegistrationEmailVerify.vue'
  )

// Socials
const SigninVK = () =>
  import(/* webpackChunkName: "Socials" */ '@/pages/User/Socials/SigninVK.vue')
const AddVK = () =>
  import(/* webpackChunkName: "Socials" */ '@/pages/User/Socials/AddVK.vue')
const SigninMailRU = () =>
  import(
    /* webpackChunkName: "Socials" */ '@/pages/User/Socials/SigninMailRu.vue'
  )
const AddMailRU = () =>
  import(/* webpackChunkName: "Socials" */ '@/pages/User/Socials/AddMailRU.vue')
const SigninOK = () =>
  import(/* webpackChunkName: "Socials" */ '@/pages/User/Socials/SigninOK.vue')
const AddOK = () =>
  import(/* webpackChunkName: "Socials" */ '@/pages/User/Socials/AddOK.vue')
const SigninGoogle = () =>
  import(
    /* webpackChunkName: "Socials" */ '@/pages/User/Socials/SigninGoogle.vue'
  )
const AddGoogle = () =>
  import(/* webpackChunkName: "Socials" */ '@/pages/User/Socials/AddGoogle.vue')

// CabinetPages
const CabinetMain = () =>
  import(
    /* webpackChunkName: "CabinetRegistered" */ '@/pages/Cabinet/CabinetMain.vue'
  )
const MyProgram = () =>
  import(
    /* webpackChunkName: "CabinetRegistered" */ '@/pages/Cabinet/MyProgram.vue'
  )
const MyProgramFinal = () =>
  import(
    /* webpackChunkName: "CabinetRegistered" */ '@/pages/Cabinet/MyProgramFinal.vue'
  )
const MySubscription = () =>
  import(
    /* webpackChunkName: "CabinetRegistered" */ '@/components/Cabinet/Subscriptions/SubscriptionComponent.vue'
  )
const SubscriptionOptions = () =>
  import(
    /* webpackChunkName: "CabinetRegistered" */ '@/components/Cabinet/Subscriptions/SubscriptionOption.vue'
  )
const SubscriptionOptionsNew = () =>
  import(
    /* webpackChunkName: "CabinetRegistered" */ '@/components/Cabinet/Subscriptions/SubscriptionOptionNew.vue'
  )
const CancelSubscription = () =>
  import(
    /* webpackChunkName: "CabinetRegistered" */ '@/pages/Cabinet/CancelSubscription.vue'
  )
const FavoritesMain = () =>
  import(
    /* webpackChunkName: "CabinetRegistered" */ '@/pages/Cabinet/Favorites/FavoritesMain.vue'
  )
const LibraryMain = () =>
  import(
    /* webpackChunkName: "CabinetRegistered" */ '@/pages/Cabinet/Library/LibraryMain.vue'
  )
const LibraryDetail = () =>
  import(
    /* webpackChunkName: "CabinetRegistered" */ '@/pages/Cabinet/Library/LibraryDetail.vue'
  )
const VideoLesson = () =>
  import(
    /* webpackChunkName: "CabinetRegistered" */ '@/pages/Cabinet/Library/Lessons/VideoLesson.vue'
  )
const ArticleLesson = () =>
  import(
    /* webpackChunkName: "CabinetRegistered" */ '@/pages/Cabinet/Library/Lessons/ArticleLesson.vue'
  )
const HistoryMain = () =>
  import(
    /* webpackChunkName: "CabinetRegistered" */ '@/pages/Cabinet/History/HistoryMain.vue'
  )
const LibrarySearch = () =>
  import(
    /* webpackChunkName: "CabinetRegistered" */ '@/components/Cabinet/Library/LibrarySearch.vue'
  )

// SurveyPages
const SurveyMain = () =>
  import(/* webpackChunkName: "Survey" */ '@/pages/Survey/SurveyMain.vue')
const SurveyFinal = () =>
  import(/* webpackChunkName: "Survey" */ '@/pages/Survey/SurveyFinal.vue')
const SurveyAfterFinal = () =>
  import(/* webpackChunkName: "Survey" */ '@/pages/User/SurveyAfterFinal.vue')
const SurveyFinalRegistered = () =>
  import(
    /* webpackChunkName: "Survey" */ '@/pages/Survey/SurveyFinalRegistered.vue'
  )
const BalanceWheelPopup = () =>
  import(
    /* webpackChunkName: "Survey" */ '@/components/Cabinet/BalanceWheelPage.vue'
  )

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/v4',
      name: 'Landing',
      components: {
        main: LandingPage,
      },
    },
    {
      path: '/v1',
      name: 'LandingV1',
      components: {
        main: LandingPageV1,
      },
    },
    {
      path: '/v2',
      name: 'LandingV2',
      components: {
        main: LandingPageV2,
      },
    },
    {
      path: '/v3',
      name: 'LandingV3',
      components: {
        main: LandingPageV3,
      },
    },
    {
      path: '/',
      name: 'LandingV4',
      components: {
        main: LandingPageV4,
      },
    },
    {
      path: '/novichki',
      name: 'LandingPageNovichki',
      components: {
        main: LandingPageNovichki,
      },
    },
    {
      path: '/library',
      name: 'LandingArticles',
      components: {
        main: LandingArticles,
      },
    },
    {
      path: '/meditation',
      name: 'LandingPageMeditation',
      components: {
        main: LandingPageMeditation,
      },
    },
    {
      path: '/article/:lessonID',
      name: 'LandingArticle',
      components: {
        main: LandingArticle,
      },
    },
    {
      path: '/video/:lessonID',
      name: 'LandingVideo',
      components: {
        main: LandingVideo,
      },
    },
    {
      path: '/survey/final',
      components: {
        main: SurveyFinal,
      },
    },
    {
      path: '/survey/final-registered',
      components: {
        main: SurveyFinalRegistered,
      },
    },
    {
      path: '/survey/email',
      name: 'SurveyAfterFinal',
      components: {
        main: SurveyAfterFinal,
      },
    },
    {
      path: '/survey/',
      components: {
        main: SurveyMain,
      },
    },
    {
      path: '/login',
      name: 'UserLogin',
      components: {
        main: UserLogin,
      },
    },
    {
      path: '/register',
      components: {
        main: UserRegistration,
      },
    },
    {
      path: '/password-restore',
      name: 'RestorePassword',
      components: {
        main: RestorePassword,
      },
    },
    {
      path: '/registration/confirm',
      name: 'RegistrationConfirm',
      components: {
        main: RegistrationConfirm,
      },
    },
    {
      path: '/registration/accept',
      name: 'RegistrationAccept',
      components: {
        main: NewPassword,
      },
    },
    {
      path: '/registration/verify',
      name: 'RegistrationEmailVerify',
      components: {
        main: RegistrationEmailVerify,
      },
    },
    {
      path: '/password-restore/confirm',
      components: {
        main: RestoreConfirm,
      },
    },
    {
      path: '/password-reset/accept',
      name: 'PasswordResetAccept',
      components: {
        main: NewPassword,
      },
    },
    {
      path: '/signin/vk',
      name: 'SignInVK',
      components: {
        main: SigninVK,
      },
    },
    {
      path: '/signin/mailru',
      name: 'SignInMailRU',
      components: {
        main: SigninMailRU,
      },
    },
    {
      path: '/signin/ok',
      name: 'SignInOK',
      components: {
        main: SigninOK,
      },
    },
    {
      path: '/signin/google',
      name: 'SignInGoogle',
      components: {
        main: SigninGoogle,
      },
    },
    {
      path: '/social/add/vk',
      name: 'UserAddVK',
      components: {
        main: AddVK,
      },
    },
    {
      path: '/social/add/mailru',
      name: 'UserAddMailRU',
      components: {
        main: AddMailRU,
      },
    },
    {
      path: '/social/add/ok',
      name: 'UserAddOK',
      components: {
        main: AddOK,
      },
    },
    {
      path: '/social/add/google',
      name: 'UserAddGoogle',
      components: {
        main: AddGoogle,
      },
    },
    {
      path: '/cabinet',
      name: 'Cabinet',
      components: {
        main: CabinetMain,
      },
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: '/wheel',
          name: 'BalanceWheel',
          components: {
            cabinet: BalanceWheelPopup,
          },
        },
        {
          path: '/profile',
          name: 'UserProfile',
          components: {
            main: CabinetMain,
          },
        },
        {
          path: '/library/search',
          name: 'LibrarySearch',
          components: {
            cabinet: LibrarySearch,
          },
        },
        {
          path: '/change-password',
          name: 'UserChangePassword',
          components: {
            cabinet: ChangePassword,
          },
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: '/cabinet/my-program',
          name: 'MyProgram',
          components: {
            cabinet: MyProgram,
          },
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: '/cabinet/my-program/final',
          name: 'MyProgramFinal',
          components: {
            cabinet: MyProgramFinal,
          },
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: '/cabinet/my-program/video/:lessonID',
          name: 'VideoLessonProgram',
          components: {
            cabinet: VideoLesson,
          },
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: '/cabinet/video/:lessonID',
          name: 'VideoLessonSearch',
          components: {
            cabinet: VideoLesson,
          },
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: '/cabinet/article/:lessonID',
          name: 'ArticleLessonSearch',
          components: {
            cabinet: ArticleLesson,
          },
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: '/library/article/:lessonID',
          name: 'ArticleLessonS',
          components: {
            cabinet: ArticleLesson,
          },
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: '/library/video/:lessonID',
          name: 'VideoLessonS',
          components: {
            cabinet: VideoLesson,
          },
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: '/cabinet/my-program/article/:lessonID',
          name: 'ArticleLessonProgram',
          components: {
            cabinet: ArticleLesson,
          },
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: '/cabinet/my-subscription',
          name: 'UserSubscription',
          components: {
            cabinet: MySubscription,
          },
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: '/cabinet/subscription-option-old',
          name: 'SubscriptionOption',
          components: {
            cabinet: SubscriptionOptions,
          },
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: '/cabinet/subscription-option',
          name: 'SubscriptionOptionNew',
          components: {
            cabinet: SubscriptionOptionsNew,
          },
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: '/cabinet/cancel-subscription',
          components: {
            cabinet: CancelSubscription,
          },
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: '/cabinet/favorite',
          name: 'UserFavorites',
          components: {
            cabinet: FavoritesMain,
          },
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: '/cabinet/library',
          name: 'LibraryMain',
          components: {
            cabinet: LibraryMain,
          },
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: '/cabinet/history',
          name: 'UserHistory',
          components: {
            cabinet: HistoryMain,
          },
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: '/cabinet/library/:libID',
          name: 'LibDetails',
          components: {
            cabinet: LibraryDetail,
          },
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: '/cabinet/library/:libID/video/:lessonID',
          name: 'VideoLesson',
          components: {
            cabinet: VideoLesson,
          },
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: '/cabinet/favorite/video/:lessonID',
          name: 'VideoLessonFavorites',
          components: {
            cabinet: VideoLesson,
          },
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: '/cabinet/history/video/:lessonID',
          name: 'VideoLessonHistory',
          components: {
            cabinet: VideoLesson,
          },
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: '/cabinet/history/article/:lessonID',
          name: 'ArticleLessonHistory',
          components: {
            cabinet: ArticleLesson,
          },
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: '/cabinet/favorite/article/:lessonID',
          name: 'ArticleLessonFavorites',
          components: {
            cabinet: ArticleLesson,
          },
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: '/cabinet/library/:libID/article/:lessonID',
          name: 'ArticleLesson',
          components: {
            cabinet: ArticleLesson,
          },
          meta: {
            requiresAuth: true,
          },
        },
      ],
    },
    {
      path: '*',
      name: 'Error404',
      components: {
        main: NotFound,
      },
    },
  ],
  mode: 'history',
})

router.beforeEach((to, from, next) => {
  const { matched, path, name } = to
  const token = store.state.user.token
  window.scrollTo(0, 0)
  const hasRequires = (val) => matched.some((record) => record.meta[val])

  if (name === 'BalanceWheel' && !token) {
    next('/login')
    return
  }

  if (hasRequires('requiresAuth') && !token) {
    next('/')
    return
  }
  if (path === '/' && token) {
    next({ name: 'MyProgram' })
    return
  }
  next()
})

export default router
