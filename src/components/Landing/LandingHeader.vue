<template>
  <div>
    <header class="header">
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
                <router-link to="/video/14" class="header-menu__link">
                  Пробное&nbsp;занятие
                </router-link>
              </li>
              <li class="header-menu__item">
                <router-link to="/library" class="header-menu__link">
                  О&nbsp;Йоге
                </router-link>
              </li>
              <li class="header-menu__item">
                <router-link to="/login/" class="header-menu__link">
                  Войти
                </router-link>
              </li>
              <li class="header-menu__item">
                <router-link to="/survey/" class="button button--s1 button--t1">
                  Подобрать программу
                </router-link>
              </li>
            </ul>
            <div class="burger-menu__opener" data-burger-menu-opener>
              <i class="icon-menu" @click="showMobileMenu = true"></i>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div
      class="burger-menu__wrapper"
      :class="{ opened: showMobileMenu === true }"
      data-burger-menu
    >
      <div class="burger-menu__closer" data-burger-menu-closer>
        <i class="icon-close" @click="showMobileMenu = false"></i>
      </div>
      <ul class="burger-menu">
        <li class="burger-menu__item">
          <router-link to="/login/">Войти</router-link>
        </li>
        <li class="burger-menu__item">
          <router-link to="/survey/">Подобрать программу</router-link>
        </li>
        <li class="burger-menu__item">
          <router-link to="/video/14">Пробное&nbsp;Занятие</router-link>
        </li>
        <li class="burger-menu__item">
          <router-link to="/library">О&nbsp;Йоге</router-link>
        </li>
      </ul>
      <div class="burger-menu__footer">
        <!--        <a href="#" class="button button&#45;&#45;contact"-->
        <!--          ><i class="icon-chat"></i> Напишите нам</a-->
        <!--        >-->
        <div class="logo">
          <router-link to="/">
            <img src="@/assets/img/logos/logo-grey.svg" alt="Logo" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LandingHeader',
  data() {
    return {
      showMobileMenu: false,
    }
  },
}
</script>
