<template>
  <div :class="{ 'helper logged': !isOnSubscriptionPage }">
    <header v-if="!isOnSubscriptionPage" class="header header--logged">
      <div class="container">
        <div class="header-layout">
          <div class="header-row">
            <div class="logo">
              <router-link to="/">
                <img src="@/assets/img/logos/logo.svg" alt="Logo" />
                <span class="logo__text">Yoga Care</span>
              </router-link>
            </div>
          </div>
          <div class="header-row">
            <ul class="header-menu">
              <li class="header-menu__item">
                <router-link
                  to="/cabinet/my-program"
                  active-class="active"
                  class="header-menu__link"
                >
                  Моя программа
                </router-link>
              </li>
              <li class="header-menu__item">
                <router-link
                  to="/cabinet/favorite"
                  class="header-menu__link"
                  active-class="active"
                >
                  Избранное
                </router-link>
              </li>
              <li class="header-menu__item">
                <router-link
                  to="/cabinet/library"
                  active-class="active"
                  class="header-menu__link"
                >
                  Библиотека
                </router-link>
              </li>
            </ul>
          </div>
          <div class="header-row">
            <div class="user-avatar__wrapper">
              <div class="user-avatar" @click="toggleUserMenu">
                <template v-if="user.pic !== ''">
                  <img id="avatar" :src="user.pic" />
                </template>
                <template v-else>
                  <span id="avatar" v-if="user.username !== ''">
                    {{ user.username[0].toUpperCase() }}
                  </span>
                  <span id="avatar" v-else>
                    {{ user.email[0].toUpperCase() }}
                  </span>
                </template>
              </div>
            </div>
          </div>
          <UserMenu :menu="userMenu" @on-close-menu="userMenu = false" />
        </div>
      </div>
    </header>
    <ul v-if="!isOnSubscriptionPage" class="menu-mobile">
      <li class="menu-mobile__item">
        <router-link
          to="/cabinet/my-program"
          active-class="active"
          class="menu-mobile__link"
        >
          <i class="icon-lotus" />
          <span>Моя программа</span>
        </router-link>
      </li>
      <li class="menu-mobile__item">
        <router-link
          to="/cabinet/favorite"
          class="menu-mobile__link"
          active-class="active"
        >
          <i class="icon-fav-filled" />
          <span>Избранное</span>
        </router-link>
      </li>
      <li class="menu-mobile__item">
        <router-link
          to="/cabinet/library"
          active-class="active"
          class="menu-mobile__link"
        >
          <i class="icon-fill" />
          <span>Библиотека</span>
        </router-link>
      </li>
      <li class="menu-mobile__item">
        <router-link
          to="/profile"
          active-class="active"
          class="menu-mobile__link"
        >
          <i class="icon-profile" />
          <span>Профиль</span>
        </router-link>
      </li>
    </ul>
    <main class="main">
      <router-view name="cabinet" />
      <CitationOfDay
        :citation="citation"
        @on-close-citation="
          (disableCitation) => {
            closeCitation(disableCitation)
          }
        "
        v-if="citation !== null"
      />
      <MotivationPopup
        :motivation="motivation"
        @on-close-motivation="closeMotivation"
        v-if="motivation !== null"
      />
    </main>
    <footer class="footer" v-if="false">
      <div class="footer-layout">
        <div class="container">
          <div class="footer-layout--top">
            <div class="footer-row">
              <div class="logo">
                <a href="/index.html"
                  ><img src="@/assets/img/logos/logo-grey.svg" alt="Logo"
                /></a>
              </div>
            </div>
            <div class="footer-row">
              <ul class="footer-menu">
                <li class="footer-menu__item">
                  <router-link
                    to="/cabinet/library"
                    active-class="active"
                    class="footer-menu__item-link"
                  >
                    Библиотека
                  </router-link>
                </li>
                <li class="footer-menu__item">
                  <a href="/pages/faq.html" class="footer-menu__item-link"
                    >Все, что нужно знать о Кундалини йоге</a
                  >
                </li>
              </ul>
              <p class="copyright">
                Фото:
                <a href="https://freepik.com" target="_blank">freepik.com</a>,
                <a href="https://yogibhajan.org" target="_blank"
                  >yogibhajan.org</a
                >
              </p>
            </div>
            <div class="footer-row">
              <a href="#" class="button button--contact"
                ><i class="icon-chat"></i> Напишите нам</a
              >
            </div>
          </div>
          <div class="footer-copyright">
            <p class="copyright">
              Фото:
              <a href="https://freepik.com" target="_blank">freepik.com</a>,
              <a href="https://yogibhajan.org" target="_blank"
                >yogibhajan.org</a
              >
            </p>
            <div class="logo">
              <a href="/index.html"
                ><img src="@/assets/img/logos/logo-grey.svg" alt="Logo"
              /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
    <transition name="fade" mode="out-in">
      <AudioPlayer v-if="showAudioPlayer" />
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import UserMenu from '@/components/Cabinet/UserMenu.vue'
import AudioPlayer from '@/components/Cabinet/AudioPlayer.vue'
import CitationOfDay from '@/components/Cabinet/CitationOfDay.vue'
import MotivationPopup from '@/components/Cabinet/MotivationPopup.vue'

export default {
  name: 'CabinetMain',
  components: { CitationOfDay, AudioPlayer, UserMenu, MotivationPopup },
  data() {
    return {
      userMenu: false,
    }
  },
  methods: {
    ...mapActions('user', ['clearCitation', 'clearMotivation', 'setUser']),
    toggleUserMenu() {
      this.userMenu = !this.userMenu
    },
    async closeCitation(disableCitation) {
      if (disableCitation) {
        const payload = {
          citationEnabled: false,
        }
        await this.$http
          .post('/api/user', payload)
          .then((res) => res.json())
          .then((userInfo) => {
            this.setUser(userInfo)
          })
      }
      this.clearCitation()
    },
    closeMotivation() {
      this.clearMotivation()
    },
  },
  computed: {
    ...mapGetters('shared', ['isMobile']),
    ...mapGetters('user', ['user', 'citation', 'motivation']),
    ...mapGetters('audioPlayer', ['showAudioPlayer']),
    isOnSubscriptionPage() {
      return [
        '/cabinet/subscription-option',
        '/cabinet/subscription-option-old',
      ].includes(this.$route.path)
    },
  },
  watch: {
    $route() {
      this.userMenu = false
      const routeName = this.$route.name
      if (routeName == 'UserProfile') {
        this.userMenu = true
      }
    },
  },
}
</script>
