<template>
  <section class="kirill_section_0">
    <h2 class="title_section_0">Как начать заниматься уже сейчас:</h2>
    <div class="kirill_container_section_0">
      <div class="kirill_box_section_0">
        <div class="kirill_number_section_0">
          <div class="kirill_number_text_section_0">1.</div>
        </div>
        <img src="@/assets/img/elements/2.1.png" class="kirill_img_section_0" />
        <div class="kirill_box_text_section_0">
          <div class="kirill_text_section_0">Пройдите анкету</div>
          <div class="kirill_box_clock_section_O">
            <img
              src="@/assets/img/elements/ClockCountdown.svg"
              class="kirill_clock"
            />
            <div class="kirill_clock_text_section">10 минут</div>
          </div>
        </div>
      </div>
      <div class="kirill_box_section_0">
        <div class="kirill_number_section_0">
          <div class="kirill_number_text_section_0">2.</div>
        </div>
        <img src="@/assets/img/elements/2.2.png" class="kirill_img_section_0" />
        <div class="kirill_box_text_section_0">
          <div class="kirill_text_section_0">
            Получите своё уникальное колесо баланса
          </div>
        </div>
      </div>
      <div class="kirill_box_section_0">
        <div class="kirill_number_section_0">
          <div class="kirill_number_text_section_0">3.</div>
        </div>
        <img src="@/assets/img/elements/2.3.png" class="kirill_img_section_0" />
        <div class="kirill_box_text_section_0">
          <div class="kirill_text_section_0">
            Выберите наиболее подходящий вам тариф
          </div>
        </div>
      </div>
      <div class="kirill_box_section_0">
        <div class="kirill_number_section_0">
          <div class="kirill_number_text_section_0">4.</div>
        </div>
        <img src="@/assets/img/elements/2.4.png" class="kirill_img_section_0" />
        <div class="kirill_box_text_section_0">
          <div class="kirill_text_section_0">
            Получите доступ к вашей персональной программе обновления
          </div>
        </div>
      </div>
      <div class="kirill_box_section_0_v2">
        <div class="kirill_number_section_0">
          <div class="kirill_number_text_section_0">5.</div>
        </div>

        <div class="kirill_box_text_section_0_v2">
          <h3 class="kirill_sub_title_section_0">
            Начните путь <br />
            к желаемому результату!
          </h3>
          <div class="kirill_conteiner_vector_button">
            <div class="kirill_conteiner_vector_text">
              Получите персональную программу<br />и занимайтесь
              <span class="kirill_text_decor_section_0">7 дней бесплатно</span>
              <img
                class="kirill_conteiner_vector_one"
                src="@/assets/img/elements/Vector 1.svg"
                alt="arrow button"
              />
            </div>
            <router-link
              to="/survey/"
              class="button kirill_button--s1 button--t1 step_5_lending"
            >
              Сделать первый шаг
            </router-link>
          </div>
        </div>
        <img
          src="@/assets/img/backgrounds/woman-stretching.png"
          class="kirill_img_section_0_v2"
        />
      </div>
      <div class="kirill_box_mobil">
        <div class="kirill_conteiner_vector_button">
          <div class="kirill_conteiner_vector_text">
            Получите персональную программу<br />и занимайтесь
            <span class="kirill_text_decor_section_0">7 дней бесплатно</span>
            <img
              class="kirill_conteiner_vector_one"
              src="@/assets/img/elements/Vector 1.svg"
              alt="arrow button"
            />
          </div>
          <router-link
            to="/survey/"
            class="button kirill_button--s1 button--t1"
          >
            Сделать первый шаг
          </router-link>
        </div>
      </div>
    </div>
    <div
      class="kirill_green_ball kirill_green_ball_position_v1_section_0"
    ></div>
    <div
      class="kirill_green_ball kirill_green_ball_position_v2_section_0"
    ></div>
  </section>
</template>
<style scoped>
.kirill_conteiner_vector_text {
  font-size: 16px;
  line-height: 24px;
  max-width: 275px;
}
.kirill_conteiner_vector_one {
  left: 265px;
}

@media (max-width: 575px) {
  .kirill_box_section_0_v2 .kirill_conteiner_vector_button {
    display: none;
  }
  .kirill_section_0 {
    margin-top: 0px;
  }
}
</style>
