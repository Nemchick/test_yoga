<template>
  <div
    class="user-menu__wrapper"
    :class="{ opened: menu }"
    v-if="isMobile === false"
    v-click-outside="vcoConfig"
  >
    <div class="user-info">
      <div class="user-info__name empty" v-if="user.username === ''">
        <span v-if="!usernameEditable">Имя не заполнено</span>
        <input
          type="text"
          v-model="localUsername"
          v-else
          @keydown.enter="saveUsername"
          @blur="saveUsername"
        />
        <i class="icon-edit" @click="editUsername" />
      </div>
      <div class="user-info__name" v-else>
        <span v-if="!usernameEditable">{{ user.username }}</span>
        <input
          type="text"
          v-model="localUsername"
          v-else
          @keydown.enter="saveUsername"
          @blur="saveUsername"
        />
        <i class="icon-edit" @click="editUsername" />
      </div>
      <div class="user-info__email">{{ user.email }}</div>
    </div>
    <div class="socials__wrapper">
      <div class="socials__title">Подключить аккаунты</div>
      <ul class="socials">
        <li class="socials__item">
          <a
            class="socials__link"
            :class="{
              active: userSocials.google,
              'social-disabled': userSocials.google,
            }"
            @click="attachGoogle"
          >
            <img src="@/assets/img/icons/google.svg" alt="" />
          </a>
        </li>
        <li class="socials__item">
          <a
            class="socials__link"
            :class="{
              active: userSocials.vk,
              'social-disabled': userSocials.vk,
            }"
            @click="attachVK"
          >
            <img src="@/assets/img/icons/vk.svg" alt="" />
          </a>
        </li>
        <li class="socials__item">
          <a
            class="socials__link"
            :class="{
              active: userSocials.ok,
              'social-disabled': userSocials.ok,
            }"
            @click="attachOK"
          >
            <img src="@/assets/img/icons/ok.svg" alt="" />
          </a>
        </li>
        <li class="socials__item">
          <a
            class="socials__link"
            :class="{
              active: userSocials.mailru,
              'social-disabled': userSocials.mailru,
            }"
            @click="attachMailRU"
          >
            <img src="@/assets/img/icons/mailru.svg" alt="" />
          </a>
        </li>
      </ul>
    </div>
    <div class="quote__wrapper">
      <div class="form__input--switch">
        <label for="quote">Получать цитату дня</label>
        <input
          class="switch"
          id="quote"
          type="checkbox"
          :value="user.citationEnabled ? 1 : 0"
          :checked="user.citationEnabled"
          @change="setCitation"
        />
      </div>
    </div>
    <div class="socials__wrapper">
      <div class="socials__title">Служба поддержки</div>
      <ul class="support">
        <li class="support__item">
          <a class="support__link" :href="waURL" target="_blank">
            <img src="@/assets/img/icons/whatsapp.svg" alt="" />
          </a>
        </li>
        <li class="support__item">
          <a class="support__link" :href="tgURL" target="_blank">
            <img src="@/assets/img/icons/telegram.svg" alt="" />
          </a>
        </li>
      </ul>
    </div>
    <!-- <div class="socials__wrapper">
      <div class="socials__title">Выбор видое плеера</div>
      <ul class="support">
        <li class="support__item">
          <img src="@/assets/img/icons/youtube.png" alt="" />
        </li>
        <li class="support__item">
          <input
            class="switch"
            type="checkbox"
            v-model="isVkActive"
            @change="updatePlayer"
          />
        </li>
        <li class="support__item">
          <img src="@/assets/img/icons/vk.svg" alt="" />
        </li>
      </ul>
    </div> -->
    <ul class="user-menu">
      <li class="user-menu__item add-pointer">
        <i class="icon-subscribes"></i>
        <a @click="menuItemClick('UserSubscription')">Моя подписка</a>
      </li>
      <li class="user-menu__item add-pointer">
        <i class="icon-password"></i>
        <a @click="menuItemClick('UserChangePassword')">Сменить пароль</a>
      </li>
      <li class="user-menu__item add-pointer">
        <i class="icon-logout"></i>
        <a @click="logoutLocal">Выйти из аккаунта</a>
      </li>
    </ul>
  </div>
  <div class="profile-mobile__wrapper" :class="{ opened: menu }" v-else>
    <div class="header-layout">
      <div class="header-row">
        <div class="logo">
          <router-link to="/">
            <img src="@/assets/img/logos/logo.svg" alt="Logo" />
            <span class="logo__text">Yoga Care</span>
          </router-link>
        </div>
      </div>
    </div>
    <div class="profile-mobile__header">
      <div class="user-info">
        <div class="user-info__name empty" v-if="user.username === ''">
          <span v-if="!usernameEditable">Имя не заполнено</span>
          <input
            type="text"
            v-model="localUsername"
            v-else
            @keydown.enter="saveUsername"
            @blur="saveUsername"
          />
          <i class="icon-edit" @click="editUsername" />
        </div>
        <div class="user-info__name" v-else>
          <span v-if="!usernameEditable">{{ user.username }}</span>
          <input
            type="text"
            v-model="localUsername"
            v-else
            @keydown.enter="saveUsername"
            @blur="saveUsername"
          />
          <i class="icon-edit" @click="editUsername" />
        </div>
        <div class="user-info__email">{{ user.email }}</div>
      </div>
      <div class="user-avatar">
        <template v-if="user.pic !== ''">
          <img :src="user.pic" />
        </template>
        <template v-else>
          <span v-if="user.username !== ''">
            {{ user.username[0].toUpperCase() }}
          </span>
          <span v-else>
            {{ user.email[0].toUpperCase() }}
          </span>
        </template>
      </div>
    </div>
    <div class="socials__wrapper">
      <div class="socials__title">Подключить аккаунты</div>
      <ul class="socials">
        <li class="socials__item">
          <a
            class="socials__link"
            :class="{
              active: userSocials.google,
              'social-disabled': userSocials.google,
            }"
            @click="attachGoogle"
          >
            <img src="@/assets/img/icons/google.svg" alt="" />
          </a>
        </li>
        <li class="socials__item">
          <a
            class="socials__link"
            :class="{
              active: userSocials.vk,
              'social-disabled': userSocials.vk,
            }"
            @click="attachVK"
          >
            <img src="@/assets/img/icons/vk.svg" alt="" />
          </a>
        </li>
        <li class="socials__item">
          <a
            class="socials__link"
            :class="{
              active: userSocials.ok,
              'social-disabled': userSocials.ok,
            }"
            @click="attachOK"
          >
            <img src="@/assets/img/icons/ok.svg" alt="" />
          </a>
        </li>
        <li class="socials__item">
          <a
            class="socials__link"
            :class="{
              active: userSocials.mailru,
              'social-disabled': userSocials.mailru,
            }"
            @click="attachMailRU"
          >
            <img src="@/assets/img/icons/mailru.svg" alt="" />
          </a>
        </li>
      </ul>
    </div>
    <div class="quote__wrapper">
      <div class="form__input--switch">
        <label for="quote">Получать цитату дня</label>
        <input
          class="switch"
          id="quote"
          type="checkbox"
          :value="user.citationEnabled ? 1 : 0"
          :checked="user.citationEnabled"
          @change="setCitation"
        />
      </div>
    </div>
    <div class="socials__wrapper">
      <div class="socials__title">Служба поддержки</div>
      <ul class="support">
        <li class="support__item">
          <a class="support__link" :href="waURL" target="_blank">
            <img src="@/assets/img/icons/whatsapp.svg" alt="" />
          </a>
        </li>
        <li class="support__item">
          <a class="support__link" :href="tgURL" target="_blank">
            <img src="@/assets/img/icons/telegram.svg" alt="" />
          </a>
        </li>
      </ul>
    </div>
    <!-- <div class="socials__wrapper">
      <div class="socials__title">Выбор видое плеера</div>
      <ul class="support">
        <li class="support__item">
          <img src="@/assets/img/icons/youtube.png" alt="" />
        </li>
        <li class="support__item">
          <input
            class="switch"
            type="checkbox"
            v-model="isVkActive"
            @change="updatePlayer"
          />
        </li>
        <li class="support__item">
          <img src="@/assets/img/icons/vk.svg" alt="" />
        </li>
      </ul>
    </div> -->
    <ul class="user-menu">
      <li class="user-menu__item add-pointer">
        <i class="icon-subscribes"></i>
        <a @click="menuItemClick('UserSubscription')">Моя подписка</a>
      </li>
      <li class="user-menu__item add-pointer">
        <i class="icon-password"></i>
        <a @click="menuItemClick('UserChangePassword')">Сменить пароль</a>
      </li>
      <li class="user-menu__item add-pointer">
        <i class="icon-logout"></i>
        <a @click="logoutLocal">Выйти из аккаунта</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'UserMenu',
  props: {
    menu: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  data() {
    return {
      waURL: 'https://wa.me/message/AKZBY44543YRD1',
      tgURL: 'https://t.me/YYCareLife',
      usernameEditable: false,
      localUsername: '',
      isVkActive: true,
      vcoConfig: {
        handler: this.closeMenu,
        middleware: this.middleware,
        events: ['dblclick', 'click'],
      },
    }
  },
  mounted() {
    this.localUsername = this.user?.username
    const storedPlayer = localStorage.getItem('switch_player')
    if (storedPlayer) {
      this.isVkActive = storedPlayer === 'vk'
    }
  },
  methods: {
    updatePlayer() {
      // Сохраняем значение в localStorage
      localStorage.setItem('switch_player', this.isVkActive ? 'vk' : 'youtube')
    },
    ...mapActions('user', ['setUser', 'logout']),
    middleware(event) {
      return event.target.id !== 'avatar'
    },
    closeMenu() {
      if (this.menu === true) {
        this.$emit('on-close-menu')
      }
    },
    attachVK() {
      this.$http
        .get('/api/user/add/vk')
        .then((res) => res.json())
        .then(({ link }) => {
          window.location = link
        })
    },
    attachMailRU() {
      this.$http
        .get('/api/user/add/mailru')
        .then((res) => res.json())
        .then(({ link }) => {
          window.location = link
        })
    },
    attachGoogle() {
      this.$http
        .get('/api/user/add/google')
        .then((res) => res.json())
        .then(({ link }) => {
          window.location = link
        })
    },
    attachOK() {
      this.$http
        .get('/api/user/add/ok')
        .then((res) => res.json())
        .then(({ link }) => {
          window.location = link
        })
    },
    editUsername() {
      this.usernameEditable = true
    },
    menuItemClick(routeName) {
      this.$emit('on-close-menu')
      this.$router.push({
        name: routeName,
      })
    },
    setCitation() {
      const payload = {
        citationEnabled: !this.user.citationEnabled,
      }
      this.$http
        .post('/api/user', payload)
        .then((res) => res.json())
        .then((userInfo) => {
          this.setUser(userInfo)
        })
    },
    saveUsername() {
      if (this.localUsername === this.user.username) {
        this.usernameEditable = false
        return
      }
      const payload = {
        username: this.localUsername,
      }
      this.$http
        .post('/api/user', payload)
        .then((res) => res.json())
        .then((userInfo) => {
          this.setUser(userInfo)
          this.localUsername = userInfo.username
          this.usernameEditable = false
        })
    },
    logoutLocal() {
      this.logout().then(() => {
        this.$router.push({
          name: 'Landing',
        })
      })
    },
  },
  computed: {
    ...mapGetters('shared', ['isMobile']),
    ...mapGetters('user', ['user']),
    userSocials() {
      return this.user.social
    },
  },
}
</script>

<style scoped>
.profile-mobile__wrapper {
  padding-top: 0;
}
.profile-mobile__header {
  padding-top: 24px;
}
.social-disabled {
  pointer-events: none;
}
</style>
