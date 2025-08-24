<template>
  <footer class="footer">
    <div class="kirill_footer_nav">
      <div class="kirill_advantage_online_text">Задайте нам вопрос</div>
      <div class="kirill_box_button_nav">
        <a href="https://t.me/YYCareLife" class="kirill_button_nav"
          ><img src="@/assets/img/icons/telegram.svg" alt="telegram"
        /></a>
        <a href="https://wa.me/message/AKZBY44543YRD1" class="kirill_button_nav"
          ><img src="@/assets/img/icons/whatsapp.svg" alt="whatsapp"
        /></a>
      </div>
    </div>
    <div class="footer-layout">
      <div class="container">
        <div class="footer-layout--top">
          <div class="footer-row">
            <div class="logo">
              <router-link to="/">
                <img src="@/assets/img/logos/logo-grey.svg" alt="Logo" />
              </router-link>
            </div>
          </div>
          <div class="kirill_section_button_nav">
            <div class="kirill_box_down_button_nav">
              <router-link to="/login/" class="kirill_accordion_content">
                Войти</router-link
              >
              <router-link to="/survey/" class="kirill_accordion_content">
                Подобрать программу</router-link
              >
              <router-link to="/library" class="kirill_accordion_content"
                >О Йоге</router-link
              >
              <a href="/article/67 " class="kirill_accordion_content"
                >Противопоказания</a
              >
              <a href="/article/72" class="kirill_accordion_content"
                >Для начинающих</a
              >
              <a href="/article/97" class="kirill_accordion_content"
                >Что дает регулярная практика?</a
              >
              <a
                href="https://storage.yandexcloud.net/yyc-images/Terms_of_use_06.01.25.pdf"
                target="_blank"
                class="kirill_accordion_content"
                >Пользовательское соглашение
              </a>
            </div>
          </div>
          <!-- <div class="footer-row">
            <p class="copyright">
              Фото:
              <a href="https://freepik.com" target="_blank">freepik.com</a>,
              <a href="https://yogibhajan.org" target="_blank"
                >yogibhajan.org</a
              >
            </p>
          </div> -->
        </div>
        <div class="footer-copyright">
          <p class="copyright">
            Фото:
            <a href="https://freepik.com" target="_blank">freepik.com</a>,
            <a href="https://yogibhajan.org" target="_blank">
              yogibhajan.org
            </a>
          </p>
          <div class="logo">
            <router-link to="/">
              <img src="@/assets/img/logos/logo-grey.svg" alt="Logo" />
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'LandingFooter',
}
</script>
